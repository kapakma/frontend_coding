/**
 * @callback func
 * @return {Function}
 */
export function curry(func) {
    return function(...args) {
        if (func.length === args.length) {
            return func.call(this, ...args);
        }
        return curry(func.bind(this, ...args));
    }
}


/**
 * @param {number} number
 * @return {Function}
 */
export function sum(number) {
    return function(...args) {
        if (args.length === 0) {
            return number;
        }
        
        return sum(number + args[0]);
    };
}


/**
 * @param {Object} thisArg
 * @param {...*} boundArgs
 * @return {void}
 */
Function.prototype.myBind = function (thisArg, ...boundArgs) {
    const context = this;
    return function(...args) {
        return context.apply(thisArg, [...boundArgs, ...args]);
    };
};


/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export function debounce(func, wait) {
    let timeoutId = null;
    
    return function(...args) {
        if (timeoutId) {
           clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = null;
            func.apply(this, args);
        }, wait);
    }
}


/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {
    let timeoutId = null;

    return function(...args) {
        if (timeoutId !== null) {
            return;
        }

        func.apply(this, args)
        timeoutId = setTimeout(() => {
            timeoutId = null;
        }, wait);
    };
}