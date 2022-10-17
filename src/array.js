/**
 * Array.prototype.square
 * @return {number[]}
 */
Array.prototype.square = function () {
    const results = [];

    for (const item of this) {
        results.push(item ** 2);
    }
    
    return results;
};


/**
 * Unique Array
 * @param {Array} array
 * @return {Array}
 */
function uniqueArray(array) {
    const visited = new Set(),
          results = [];

    for (const item of array) {
        if (!visited.has(item)) {
            results.push(item);
        }
        visited.add(item);
    }

    return results;
}


/**
 * Array.prototype.filter
 * @callback callbackFn
 * @param {object} [thisArg]
 * @return {Array}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
    const results = [];

    for (let i = 0; i < this.length; i++) {
        const item = this[i];
        if (Object.hasOwn(this, i) && callbackFn.call(thisArg, item, i, this)) {
            results.push(item);
        } 
    }

    return results;
};


/**
 * Array.prototype.map
 * @callback callbackFn
 * @param {object} [thisArg]
 * @return {Array}
 */
Array.prototype.myMap = function (callbackFn, thisArg) {
    const results = new Array(this.length);

    for (let i = 0; i < this.length; i++) {
        if (Object.hasOwn(this, i)) {
            results[i] = callbackFn.call(thisArg, this[i], i, this);
        }
    }

    return results;
};


/**
 * Array.prototype.reduce
 * @callback callbackFn
 * @param {*} [initialValue]
 * @return {Array}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
    const noInitialValue = initialValue === undefined;
    if (noInitialValue && this.length === 0) { 
        throw new TypeError('Reduce of empty array with no initial value');
    }

    let value,
        startIndex;
  
    if (noInitialValue) {
        value = this[0];
        startIndex = 1;
    }
    else {
        value = initialValue;
        startIndex = 0;
    }
  
    for (let i = startIndex; i < this.length; i++) {
        if (Object.hasOwn(this, i)) {
            value = callbackFn(value, this[i], i, this);
        }
    }
  
    return value;
};


/**
 * Flatten
 * @param {Array<*|Array>} value
 * @return {Array}
 */
function flatten(values) {
    const results = [];

    for (const val of values) {
        if (Array.isArray(val)) {
            results.push(...flatten(val));
        }
        else {
            results.push(val);
        }
    }

    return results;
}

export { uniqueArray, flatten };
