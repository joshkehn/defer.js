;(function (root) {

    // Setup `next` to use `process.nextTick` if it's there and `setTimeout` if not.
    var next = (typeof process === 'undefined' || !process.nextTick) ? function (fn) { setTimeout(fn, 0); } : process.nextTick;

    // Main export
    function Defer () {
        // Keep track of our context and any deferred functions.
        this.udef;
        this.context;
        this.deferred = [];

        return this;
    };

    // ### Defer.trigger
    // Triggers any functions on the deferred stack.
    Defer.prototype.trigger = function trigger () {
        this.context = this;
        this.deferred.forEach(function (fn) {
            next(fn.bind(context));
        });
        this.deferred = [];
    };

    // ### Defer.defer (fn)
    // #### fn `{Function}` Function to defer execution of
    // If the event has been called execute `fn` immeditely. Otherwise wait until `trigger` is called.
    Defer.prototype.defer = function defer (fn) {
        if (this.context) {
            next(fn.bind(this.context));
        } else {
            this.deferred.push(fn);
        }
    };

    // ### Defer.reset
    // Resets the `trigger`. Useful for staging multiple deferred functions and then restacking more for
    // another event.
    Defer.prototype.reset = function reset () {
        this.context = this.udef;
    };

    root.Defer = Defer;

}(typeof exports === "undefined" ? window : exports));