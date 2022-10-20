/**
 * @param {Object} object
 * @param {string|Array<string>} path
 * @param {*} defaultValue
 * @return {*}
 */
export function get(object, path, defaultValue) {
    const paths = path.split('.');
    return getHelper(object, 0);

    function getHelper(obj, i) {
        if (i < paths.length) {
          const prop = paths[i];
          if (Object.hasOwn(obj, prop)) {
              if (i === paths.length-1) {
                  return obj[prop];
              }
              return getHelper(obj[prop], i+1);
          }
        }
        return defaultValue;
    }
}


/**
 * @param {Object} object
 * @return {Object}
 */
export function camelCaseKeys(object) {
    if (Array.isArray(object)) {
        const arr = [];
        object.forEach(item => {
            arr.push(camelCaseKeys(item));
        });
        return arr;
    }
    else if (object && typeof object === 'object') {
        const obj = {};
        for (const [key, value] of Object.entries(object)) {
            obj[toCamelCase(key)] = camelCaseKeys(value);
        }
        return obj;
    }
    return object;


    function toCamelCase(value) {
        const tokens = value.toLowerCase().split('_');
        let s = '';
        tokens.forEach((token, i) => {
            if (i === 0) {
                s += token;
            }
            else {
                s += `${token.charAt(0).toUpperCase()}${token.slice(1)}`;
            }
        });
        return s;
    }
}


export function squashObject(object) {
  return squashObjectHelper(object, []);

  function squashObjectHelper(object, keys) {
      const obj = {};
      if (Array.isArray(object)) {
          for (let i = 0; i < object.length; i++) {
              const newObj = squashObjectHelper(object[i], [...keys, i]);
              for (const prop in newObj) {
                  obj[prop] = newObj[prop];
              }
          }
      }
      else if (object && typeof object === 'object') {
          for (const key in object) {
              const newObj = squashObjectHelper(object[key], [...keys, key]);
              for (const prop in newObj) {
                  obj[prop] = newObj[prop];
              }
          }
      }
      else {
          obj[[...keys].join('.')] = object;
      }
      return obj;
  }
}