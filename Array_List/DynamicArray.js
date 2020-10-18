const Mocha = require('mocha');
const runner = new Mocha({});
const inspect = Symbol.for('nodejs.util.inspect.custom');

runner.addFile('./DynamicArray.test.js');

runner.run(failures => {
    if (failures) {
        console.error(failures);
    } else {
        console.log('All passed');
    }
});




class DynamicArray {
    constructor(...vals) {

        this.capacity = vals.length ? vals.length * 2 : 10;
        this.length = 0;
        this.data = {};
        if (vals.length) {
            this.push(...vals);
        }
    }
    toString() {
        return [...this.values()].join();
    }
    [inspect]() {
        // This function makes it so use of console.log on a DynamicArray reveals what appears to be a normal array 
        return [...this.values()];
    }
    push(...values) {
        let num = values.length;
        if (num + this.length >= this.capacity) {
            this.capacity *= 2;
        }
        while (num > 0) {
            let value = values[values.length - num];
            if (value && value.data) {
                value = [...value.values()];
            }
            this.data[this.length++] = value;
            num--;
        }
        return this.length;
    }
    pop() {
        return this.data[--this.length];
    }
    unshift(...values) {
        let num = values.length;
        if (num + this.length >= this.capacity) {
            this.capacity *= 2;
        }
        let length = this.length - 1;
        let newArray = {};
        while (length >= 0) {
            newArray[length + values.length] = this.data[length--];
        }

        let index = 0;
        while (index < num) {
            let value = values[index];
            if (value && value.data) {
                value = [...value.values()];
            }
            newArray[index++] = value;
            this.length++;
        }
        this.data = newArray;
        return this.length;
    }
    shift() {
        if (this.length > 0) {
            let first = this.data[0];
            for (let i = 1; i < this.length; i++) {
                this.data[i - 1] = this.data[i];
            }
            delete this.data[--this.length];
            return first;
        }
        return undefined;
    }
    reverse() {
        for (let i = 0, j = this.length - 1; i < this.length / 2; i++ , j--) {
            let temp = this.data[i];
            this.data[i] = this.data[j];
            this.data[j] = temp;
        }
        return [...this.values()];
    }
    *entries() {
        let next = 0;
        while (next < this.length) {
            yield [next, this.data[next++]];
        }
    }
    *keys() {
        let next = 0;
        while (next < this.length) {
            yield next++;
        }
    }
    *values() {
        let next = 0;
        while (next < this.length) {
            yield this.data[next++];
        }
    }
    every(callback, thisArgument) {
        let currentThis, index;
        if (this === null) {
            throw new TypeError("this is null or not defined");
        }
        // If callback isn't callable, throw error
        if (typeof callback !== 'function' && Object.prototype.toString.call(callback) !== '[object Function]') {
            throw new TypeError(`${JSON.stringify(callback)} is not a function`);
        }

        // Set the value of 'this' if it has been passed in
        if (arguments.length > 1) {
            currentThis = thisArgument;
        }

        index = 0;

        while (index < this.length) {
            let value;

            if (index in this.data) {
                let result;
                value = this.data[index];
                if (currentThis) {
                    result = callback(currentThis, value, index);
                } else {
                    result = callback(value, index);
                }
                if (!result) {
                    return false;
                }
            }
            index++;
        }
        return true;
    }
    some(callback, thisArgument) {
        let currentThis, index;
        if (this === null) {
            throw new TypeError("this is null or not defined");
        }
        // If callback isn't callable, throw error
        if (typeof callback !== 'function' && Object.prototype.toString.call(callback) !== '[object Function]') {
            throw new TypeError(`${JSON.stringify(callback)} is not a function`);
        }

        // Set the value of 'this' if it has been passed in
        if (arguments.length > 1) {
            currentThis = thisArgument;
        }

        index = 0;

        while (index < this.length) {
            let value;

            if (index in this.data) {
                let result;
                value = this.data[index];
                if (currentThis) {
                    result = callback(currentThis, value, index);
                } else {
                    result = callback(value, index);
                }
                if (result) {
                    return true;
                }
            }
            index++;
        }
        return false;
    }
    filter(callback, thisArgument) {
        let currentThis, index;
        if (this === null) {
            throw new TypeError("this is null or not defined");
        }
        // If callback isn't callable, throw error
        if (typeof callback !== 'function' && Object.prototype.toString.call(callback) !== '[object Function]') {
            throw new TypeError(`${JSON.stringify(callback)} is not a function`);
        }

        // Set the value of 'this' if it has been passed in
        if (arguments.length > 1) {
            currentThis = thisArgument;
        }

        index = 0;
        let newArr = [];
        while (index < this.length) {
            let value;

            if (index in this.data) {
                let result;
                value = this.data[index];
                if (currentThis) {
                    result = callback(currentThis, value, index);
                } else {
                    result = callback(value, index);
                }
                if (result) {
                    newArr.push(value);
                }
            }
            index++;
        }
        return [...newArr.values()];
    }
    includes(value, fromIndex = 0) {
        if (fromIndex >= this.length) {
            return false;
        }
        let index;
        if (fromIndex < 0) {
            index = this.length + fromIndex;
        } else {
            index = fromIndex;
        }
        while (index < this.length) {
            if (this.data[index++] === value) {
                return true;
            }
        }
        return false;
    }
    find(callback, thisArgument) {
        let currentThis, index;
        if (this === null) {
            throw new TypeError("this is null or not defined");
        }
        // If callback isn't callable, throw error
        if (typeof callback !== 'function' && Object.prototype.toString.call(callback) !== '[object Function]') {
            throw new TypeError(`${callback} is not a function`);
        }

        // Set the value of 'this' if it has been passed in
        if (arguments.length > 1) {
            currentThis = thisArgument;
        }

        index = 0;
        while (index < this.length) {
            let value;

            if (index in this.data) {
                let result;
                value = this.data[index];
                if (currentThis) {
                    result = callback(currentThis, value, index);
                } else {
                    result = callback(value, index);
                }
                if (result) {
                    return value;
                }
            }
            index++;
        }
        return undefined;
    }
    findIndex(callback, thisArgument) {
        let currentThis, index;
        if (this === null) {
            throw new TypeError("this is null or not defined");
        }
        // If callback isn't callable, throw error
        if (typeof callback !== 'function' && Object.prototype.toString.call(callback) !== '[object Function]') {
            throw new TypeError(`${callback} is not a function`);
        }
        if (this.length === 0) return -1;
        // Set the value of 'this' if it has been passed in
        if (arguments.length > 1) {
            currentThis = thisArgument;
        }

        index = 0;
        let newArr = [];
        while (index < this.length) {
            let value;

            if (index in this.data) {
                let result;
                value = this.data[index];
                if (currentThis) {
                    result = callback(currentThis, value, index);
                } else {
                    result = callback(value, index);
                }
                if (result) {
                    return index;
                }
            }
            index++;
        }
        return -1;
    }
    indexOf(value, fromIndex = 0) {
        if (fromIndex >= this.length) return -1;
        let index;
        if (fromIndex >= 0) {
            index = fromIndex;
        } else if (fromIndex < 0) {
            index = this.length + fromIndex;
        }
        while (index < this.length) {
            if (this.data[index] === value) {
                return index;
            }
            index++;
        }
        return -1;
    }
    lastIndexOf(value, fromIndex = this.length - 1) {
        let index;
        if (fromIndex < 0) {
            index = this.length + fromIndex;
        } else if (fromIndex >= this.length) {
            index = this.length - 1;
        } else {
            index = fromIndex;
        }
        if (index < 0) return -1;
        while (index >= 0) {
            if (this.data[index] === value) {
                return index;
            }
            index--;
        }
        return -1;
    }
    concat(...arrays) {
        if (arrays.length === 0) {
            return [...this.values()];
        }
        let newArr = new DynamicArray();
        const values = [...this.values()];
        newArr.push(...values);
        for (let i = 0; i < arrays.length; i++) {
            for (let element of arrays[i].values()) {
                newArr.push(element);
            }
        }
        return [...newArr.values()];
    }
    join(separator) {
        if (this.length === 0) {
            return "";
        }
        if (separator === undefined) {
            separator = ",";
        }
        let stringArr = '';
        for (let i = 0; i < this.length; i++) {
            let value;
            if (this.data[i] === undefined) {
                value = "";
            } else if (this.data[i] === null) {
                value = "";
            } else if (this.data[i].length && this.data[i].length === 0) {
                value = "";
            } else {
                value = this.data[i];
            }
            if (i === this.length - 1) {
                stringArr += value;
            } else {
                stringArr += value += separator;
            }
        }
        return stringArr;
    }
    copyWithin(target, start = 0, end = this.length) {
        if (target >= this.length) {
            return [...this.values()];
        }
        if (target < 0 && target + this.length > 0) {
            target += this.length;
        } else if (target < 0) {
            target = 0;
        } else if (target > this.length) {
            target = this.length;
        }
        if (start < 0 && start + this.length > 0) {
            start += this.length;
        } else if (start < 0) {
            start = 0;
        } else if (start > this.length) {
            start = this.length;
        }
        if (end < 0 && end + this.length > 0) {
            end += this.length;
        } else if (end < 0) {
            end = 0;
        } else if (end > this.length) {
            end = this.length;
        }
        let count = Math.min(end - start, this.length - target);
        let indexInCopy = start;
        let direction;
        if (start < target && target < (start + count)) {
            // We need to change values in an order where we won't be overwriting
            // If start < target && target < (start + count),
            // We want to iterate from the end of the array to the beginning
            direction = -1;
            start += count - 1;
            target += count - 1;
        } else {
            // Otherwise, we want to go from start of array to end of array
            direction = 1;
        }
        while (count > 0) {
            if (start in this.data) {
                this.data[target] = this.data[start];
            } else {
                delete this.data[target];
            }
            start += direction;
            target += direction;
            count--;
        }
        return [...this.values()];
    }
    flat(depth = 1) {
        function flattenLevel(arr, values, level) {
            if (level >= 0) {
                for (const value of values.values()) {
                    if (level >= 0) {
                        if (typeof value !== 'object') {
                            arr.push(value);
                        } else {
                            flattenLevel(arr, value, level - 1);
                        }
                    }
                }
            } else {
                for (const value of values.values()) {
                    arr.push(value);
                }
            }
            return arr;
        }
        let newArr = new DynamicArray();
        for (const value of this.values()) {
            if (typeof value !== 'object') {
                newArr.push(value);
            } else {
                flattenLevel(newArr, value, depth--);
            }
        }
        return [...newArr.values()];
    }
    map(cb, thisArg) {
        let currentThis, index;
        if (this === null) {
            throw new TypeError("this is null or not defined");
        }
        // If callback isn't callable, throw error
        if (typeof cb !== 'function' && Object.prototype.toString.call(cb) !== '[object Function]') {
            throw new TypeError(`${JSON.stringify(cb)} is not a function`);
        }

        // Set the value of 'this' if it has been passed in
        if (arguments.length > 1) {
            currentThis = thisArgument;
        }
        index = 0;
        let newArr = [];
        while (index < this.length) {
            let mapValue, value;

            if (index in this.data) {
                value = this.data[index];
                mapValue = cb.call(currentThis, value, index, this.data);
                newArr[index] = mapValue;
            }
            index++;
        }
        return newArr;
    }
    flatMap(cb, thisArg) {
        let currentThis, index;
        if (this === null) {
            throw new TypeError("this is null or not defined");
        }
        // If callback isn't callable, throw error
        if (typeof cb !== 'function' && Object.prototype.toString.call(cb) !== '[object Function]') {
            throw new TypeError(`${JSON.stringify(cb)} is not a function`);
        }

        // Set the value of 'this' if it has been passed in
        if (arguments.length > 1) {
            currentThis = thisArgument;
        }
        index = 0;
        let newArr = [];
        while (index < this.length) {
            let mapValue, value;

            if (index in this.data) {
                value = this.data[index];
                mapValue = cb.call(currentThis, value, index, this.data);
                newArr[index] = mapValue;
            }
            index++;
        }
        return newArr.flat();
    }
    toLocaleString(locales, options) {
        if (this.length === 0) {
            return "";
        }
        let obj = Object(this.data);
        let separator = ',';
        let stringArr;
        if (this.data[0] === undefined) {
            stringArr = "";
        } else if (obj[0] === null) {
            stringArr = "";
        } else {
            stringArr = obj[0].toLocaleString(locales, options);
        }
        for (let i = 1; i < this.length; i++) {
            let string = stringArr + separator;
            let value;
            if (obj[i] === undefined) {
                stringArr = "";
            } else if (obj[i] === null) {
                stringArr = "";
            } else {
                stringArr = obj[i].toLocaleString(locales, options);
            }
            stringArr = string + stringArr;
        }
        return stringArr;
    }
    slice(start = 0, end = this.length) {
        if (start < 0) {
            start += this.length;
        };
        if (start >= this.length) {
            return [];
        }
        if (end < 0) {
            end += this.length;
        } else if (end > this.length) {
            end = this.length;
        }
        let newArr = new DynamicArray();
        while (start < end) {
            newArr.push(this.data[start++])
        }
        return [...newArr.values()];
    }
    splice(start, deleteCount, ...values) {
        if (start > this.length) {
            start = this.length;
        } else if (start < 0) {
            start += this.length;
            if (start < 0) {
                start = 0;
            }
        }
        if (deleteCount >= (this.length - start) || deleteCount === undefined) {
            deleteCount = this.length - start;
        } else if (deleteCount < 0) {
            deleteCount = 0;
        }
        let numToAdd = values.length - deleteCount;
        if (numToAdd > 0) {
            for (let i = this.length - 1; i >= start + deleteCount; i--) {
                this.data[i + numToAdd] = this.data[i];
            }
        }
        let deleted = new DynamicArray();
        while (start < this.length) {
            if (deleteCount > 0) {
                deleted.push(this.data[start]);
                deleteCount--;
            }
            if (values.length > 0) {
                this.data[start] = values.shift();
            }
            start++;
        }
        this.length += numToAdd;
        return [...deleted.values()];
    }
    reduce(cb, initialValue) {
        // If callback isn't callable, throw error
        if (typeof cb !== 'function' && Object.prototype.toString.call(cb) !== '[object Function]') {
            throw new TypeError(`${JSON.stringify(cb)} is not a function`);
        }
        if (initialValue === undefined && this.length === 0) {
            throw new TypeError("You cannot reduce an empty array without an initialValue")
        }
        let index, accumulator;
        if (initialValue) {
            index = 0;
            accumulator = initialValue;
        } else {
            index = 1;
            accumulator = this.data[0];
        };
        while (index < this.length) {
            accumulator = cb(accumulator, this.data[index], index++, [...this.values()]);
        }
        return accumulator;
    }
    reduceRight(cb, initialValue) {
                // If callback isn't callable, throw error
        if (typeof cb !== 'function' && Object.prototype.toString.call(cb) !== '[object Function]') {
            throw new TypeError(`${JSON.stringify(cb)} is not a function`);
        }
        if (initialValue === undefined && this.length === 0) {
            throw new TypeError("You cannot reduce an empty array without an initialValue")
        }
        let index, accumulator;
        if (initialValue) {
            index = this.length - 1;
            accumulator = initialValue;
        } else {
            index = this.length - 2;
            accumulator = this.data[this.length - 1];
        };
        while (index >= 0) {
            accumulator = cb(accumulator, this.data[index], index--, [...this.values()]);
        }
        return accumulator;
    }
}


module.exports = { DynamicArray };
