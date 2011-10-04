;(function (root) {

    // Setup `next` to use `process.nextTick` if it's there and `setTimeout` if not.
    var next = (typeof process === 'undefined' || !process.nextTick) ? function (fn) { setTimeout(fn, 0); } : process.nextTick;

    // Main export
    root.Defer = function () {
        // Keep track of our context and any deferred functions.
        var udef, context, deferred = [];

        // ### Defer.trigger
        // Triggers any functions on the deferred stack.
        this.trigger = function trigger (context) {
            context = context || this;
            deferred.forEach(function (fn) {
                next(fn.bind(context));
            });
            deferred = [];
        };

        // ### Defer.defer (fn)
        // #### fn `{Function}` Function to defer execution of
        // If the event has been called execute `fn` immeditely. Otherwise wait until `trigger` is called.
        this.defer = function defer (fn) {
            if (context) {
                next(fn.bind(context));
            } else {
                deferred.push(fn);
            }
        };

        // ### Defer.reset
        // Resets the `trigger`. Useful for staging multiple deferred functions and then restacking more for
        // another event.
        this.reset = function reset () {
            context = udef;
        };

        return this;
    };
}(typeof exports === "undefined" ? window : exports));