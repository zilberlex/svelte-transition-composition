    <script lang="ts">
        let i = 0;
        let j = 0;
        let result = $state('');
        
        const out = {
            a: 0,
            b: 0
        };
        
        function hardWorkOptimized() {
            i = 0;
            j = 0;

            let count = 0;
            let time = bench(() => {
                for (let index = 0; index < 100000000; index++) {
                    giveNumbersOptimized(out);
                    count += out.a + out.b;
                }
            });

            console.log('Optimized count', count);
            result = `<i>Optimized</i> count: ${count}. Time = ${time}`;
        }

        function hardWorkUnoptimized() {
            i = 0;
            j = 0;
            
            let count = 0;
            let time = bench(() => {
                for (let index = 0; index < 100000000; index++) {
                    let { a, b } = giveNumbersUnoptimized();
                    count += a + b;
                }
            });

            console.log('Unoptimized count', count);
            result = `<i>Unoptimized</i> count: ${count}. Time = ${time}`;
        }

        function bench(func: () => any) {
            const start = performance.now();
            func();
            const end = performance.now();
            return end - start;
        }

        function giveNumbersUnoptimized() {
            return {
                a: ++i,
                b: ++j
            }
        }

        function giveNumbersOptimized(out) {
            out.a = ++i;
            out.b = ++j;
            return out;
        }

    </script>

    <button onclick={hardWorkOptimized}>
    Optimized
    </button>
    <button onclick={hardWorkUnoptimized}>
    Unoptimized
    </button>

    <div>
        Results: {result}; 
    </div>

    <style>
        :global(i) {
            color: var(--color2);
        }
    </style>