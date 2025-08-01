/**
 * @param {function} handler
 * @param {{debounceDelay?: number, cooldownDelay?: number, context?: string, shouldPreventDefault?: boolean}} options
 */
export function createSmartHandler(handler, options = {}) {
	const {
		debounceDelay = 0,
		cooldownDelay = 1500,
		context,
		shouldPreventDefault = true
	} = options;

	if (context)
		console.debug(
			'created smart handler context. options',
			options,
			'Handler:',
			handler.toString()
		);

	let smartHandler = _createSmartHandlerInternal(
		handler,
		debounceDelay,
		cooldownDelay,
		shouldPreventDefault
	);

	// Improving readabilty
	smartHandler.toString = function () {
		return (
			`Smart Handler. Params: ${JSON.stringify({ debounceDelay, cooldownDelay, shouldPreventDefault })}. Context [${context}]. for handler:` +
			handler.toString()
		);
	};

	return smartHandler;
}

/**
 * @param {(...args: any[]) => void} callback
 * @returns {(...args: any[]) => void}
 */
export function requestAnimationFrameThrottle(callback) {
	let ticking = false;
	/**
	 * @type {any[]}
	 */
	let lastArgs = [];

	return (/** @type {any[]} */ ...args) => {
		lastArgs = args;

		if (ticking) return;

		ticking = true;

		window.requestAnimationFrame(() => {
			callback(...lastArgs);
			ticking = false;
		});
	};
}

function _createSmartHandlerInternal(
  handler,
  debounceDelay,
  cooldownDelay,
  shouldPreventDefault
) {
  let debounceId;
  let cooldown = false;
  let isProcessing = false;

  // cache for the currently-pending debounce cycle
  let pendingPromise   = null;
  let pendingResolve   = null;
  let pendingReject    = null;
  let latestEvent      = null;   // we’ll run the handler with the *last* event

  function newDeferred() {
    return new Promise((res, rej) => {
      pendingResolve = res;
      pendingReject  = rej;
    });
  }

  function clearDeferred() {
    pendingPromise = pendingResolve = pendingReject = null;
  }

  return function smartHandler(event) {
    if (shouldPreventDefault) event?.preventDefault();
    latestEvent = event;                       // keep the most recent args

    // reset debounce timer
    if (debounceId) clearTimeout(debounceId);

    // create the shared promise if none exists yet
    if (!pendingPromise) pendingPromise = newDeferred();

    debounceId = setTimeout(async () => {
      // still in cooldown or already busy → finish early
      if (cooldown || isProcessing) {
        pendingResolve?.(false);               // resolve for all waiters
        clearDeferred();
        return;
      }

      isProcessing = true;
      cooldown = true;
      setTimeout(() => (cooldown = false), cooldownDelay);

      try {
        const result = await handler.call(this, latestEvent);
        pendingResolve?.(result);              // hand back handler’s result
      } catch (err) {
        pendingReject?.(err);
      } finally {
        isProcessing = false;
        clearDeferred();                       // next call starts fresh
      }
    }, debounceDelay);

    return pendingPromise;                     // every call shares it
  };
}
