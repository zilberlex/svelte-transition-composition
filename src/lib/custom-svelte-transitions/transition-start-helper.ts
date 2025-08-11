export class TransitionStartHelper {
    #shouldStart = true;
    #ended = false;
    #startingPoint = -1;

    tryStart(t: number): boolean {
        if (this.#shouldStart) {
            this.#shouldStart = false;
            this.#startingPoint = t;

            if (t != 0 && t != 1) {
                throw new Error('Expected starting point to be 0 or 1 when starting ' + t);
            }

            return true;
        }

        return false;
    }

    tryEnd(t: number): boolean {
        if ((t == 0 || t == 1) 
            && this.#startingPoint != t
            && !this.#ended) {

            this.#ended = true;

            return true;
        }

        return false;
    }
}