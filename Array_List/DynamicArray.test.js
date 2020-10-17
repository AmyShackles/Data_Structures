const { DynamicArray } = require('./index.js');
const expect = require('chai').expect;

describe('DynamicArray', () => {
    describe('push', () => {
        it('should add a value to the end of the array', () => {
            let arr = new DynamicArray();
            arr.push({ name: 3 }, 4);
            const actual = arr;
            const expected = {
                length: 2,
                data: { 0: { name: 3 }, 1: 4 },
                capacity: 10
            };
            expect(actual).to.deep.equal(expected);
        });
        it('should return the new length of the array', () => {
            let arr = new DynamicArray();
            const actualLength = arr.push(3, 4);
            const expectedLength = 2;
            expect(actualLength).to.equal(expectedLength);
        });
        it('should double the capacity if the length meets or exceeds capacity', () => {
            let arr = new DynamicArray(2);
            arr.push(2, 3);
            const actual = arr.capacity;
            const expected = 4
            expect(actual).to.equal(expected)
        });
    });
    describe('pop', () => {
        describe('should remove the last element from the list and return it', () => {
            it('should work for numbers', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5);
                const actual = arr.pop();
                const expected = 5;
                expect(actual).to.equal(expected)
            });
            it('should work for strings', () => {
                let arr = new DynamicArray();
                arr.push('One', 'for', 'the', 'money');
                const actual = arr.pop();
                const expected = 'money';
                expect(actual).to.equal(expected)
            });
            it('should work for objects', () => {
                let arr = new DynamicArray();
                arr.push({ doe: 'a deer' }, { ray: 'a drop of golden sun' }, { me: 'a name I call myself' }, { fa: 'a long, long way to run' });
                const actual = arr.pop();
                const expected = { fa: 'a long, long way to run' }
                expect(actual).to.deep.equal(expected)
            });
        });
    });
    describe('shift', () => {
        describe('should remove the first element of the list and return it', () => {
            it('should work for numbers', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 3, 4);
                const actual = arr.shift();
                const expected = 1;
                expect(actual).to.equal(expected)
            });
            it('should work for strings', () => {
                let arr = new DynamicArray();
                arr.push('One', 'is', 'the', 'loneliest', 'number');
                const actual = arr.shift();
                const expected = 'One';
                expect(actual).to.equal(expected)
            });
            it('should work for objects', () => {
                let arr = new DynamicArray();
                arr.push({ love: 'love me do' }, { you: 'know I love you' });
                const actual = arr.shift();
                const expected = { love: 'love me do' };
                expect(actual).to.deep.equal(expected)
            });
        });
    });
    describe('unshift', () => {
        it('should add values to the start of the array', () => {
            let arr = new DynamicArray();
            arr.push(8, 9, 10);
            arr.unshift(1, 2);
            const actual = arr;
            const expected = {
                length: 5,
                capacity: 10,
                data: {
                    0: 1,
                    1: 2,
                    2: 8,
                    3: 9,
                    4: 10,
                }
            };
            expect(actual).to.deep.equal(expected);
        });
        it('should return the new length of the array', () => {
            let arr = new DynamicArray();
            arr.push(3);
            const actual = arr.unshift(7, 8, 9);
            const expected = 4;
            expect(actual).to.equal(expected)
        });
        it('should double the capacity if the length meets or exceeds capacity', () => {
            let arr = new DynamicArray();
            arr.unshift(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
            const actual = arr.capacity;
            const expected = 20;
            expect(actual).to.equal(actual)
        });
    });
    describe('reverse', () => {
        it('should reverse the order of the elements of the list', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3, 4, 5, 6);
            arr.reverse();
            const actual = arr;
            const expected = {
                length: 6,
                capacity: 10,
                data: {
                    0: 6,
                    1: 5,
                    2: 4,
                    3: 3,
                    4: 2,
                    5: 1
                }
            }
            expect(actual).to.deep.equal(expected)
        });
        it('should return an array of the reversed list', () => {
            let arr = new DynamicArray();
            arr.push(6, 5, 4, 3, 2, 1);
            const actual = arr.reverse();
            const expected = [1, 2, 3, 4, 5, 6];
            expect(actual).to.deep.equal(expected)
        });
    });
    describe('entries', () => {
        it('should return an iterator with a next() function', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3, 4, 5);
            let iterator = arr.entries();
            const actual = iterator.next().value;
            const expected = [0, 1];
            expect(actual).to.deep.equal(expected)
        });
        it('should return an iterable', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3, 4, 5);
            let actual = [...arr.entries()];
            const expected = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]];
            expect(actual).to.deep.equal(expected)
        });
        it('should return undefined for next().value if array is empty', () => {
            let arr = new DynamicArray();
            let iterator = arr.entries();
            const actual = iterator.next().value;
            const expected = undefined;
            expect(actual).to.deep.equal(expected)
        });
        it('should return an empty array if array is empty', () => {
            let arr = new DynamicArray();
            let actual = [...arr.entries()];
            const expected = []
            expect(actual).to.deep.equal(expected)
        });
    });
    describe('keys', () => {
        it('should return an iterator with next() function', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3, 4);
            let iterator = arr.keys();
            const actual = iterator.next().value;
            const expected = 0;
            expect(actual).to.deep.equal(expected);
        });
        it('should return an iterable', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3, 4);
            const actual = [...arr.keys()];
            const expected = [0, 1, 2, 3];
            expect(actual).to.deep.equal(expected);
        });
        it('should return undefined for next().value if array is empty', () => {
            let arr = new DynamicArray();
            let iterator = arr.keys();
            const actual = iterator.next().value;
            const expected = undefined;
            expect(actual).to.deep.equal(expected)
        });
        it('should return an empty array if array is empty', () => {
            const arr = new DynamicArray();
            const actual = [...arr.keys()];
            const expected = [];
            expect(actual).to.deep.equal(expected)
        });
    });
    describe('values', () => {
        it('should return an iterator with next() function', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3, 4);
            let iterator = arr.values();
            const actual = iterator.next().value;
            const expected = 1;
            expect(actual).to.equal(expected)
        });
        it('should return an iterable', () => {
            let arr = new DynamicArray();
            arr.push("Never", "gonna", "give", "you", "up");
            const actual = [...arr.values()];
            const expected = ["Never", "gonna", "give", "you", "up"];
            expect(actual).to.deep.equal(expected)
        });
        it('should return undefined for next().value if the array is empty', () => {
            const arr = new DynamicArray();
            let iterator = arr.values();
            const actual = iterator.next().value;
            const expected = undefined;
            expect(actual).to.deep.equal(expected)
        });
        it('should return an empty array if array is empty', () => {
            const arr = new DynamicArray();
            const actual = [...arr.values()];
            const expected = [];
            expect(actual).to.deep.equal(expected)
        });
    });
    describe('every', () => {
        it('should return true if every element in the array passes the test implemented by the callback', () => {
            let arr = new DynamicArray();
            arr.push(2, 4, 6, 8, 10);
            const actual = arr.every((val) => val % 2 === 0);
            const expected = true;
            expect(actual).to.equal(expected)
        });
        it('should return false if not every element in the array passes the test implemented by the callback', () => {
            let arr = new DynamicArray();
            arr.push(2, 4, 6, 8, 9);
            const actual = arr.every((val) => val % 2 === 0);
            const expected = false;
            expect(actual).to.equal(expected)
        });
        it('should return true if the array is empty', () => {
            const arr = new DynamicArray();
            const actual = arr.every((val) => val % 2 === 0);
            const expected = true;
            expect(actual).to.equal(expected)
        })
        it('should throw a TypeError if no callback is passed in', () => {
            const arr = new DynamicArray();
            expect(() => {
                arr.every()
            }).to.throw(TypeError, 'undefined is not a function')
        })
        it('should throw a TypeError if the callback is not a function', () => {
            const arr = new DynamicArray();
            expect(() => {
                arr.every(12);
            }).to.throw(TypeError, '12 is not a function')
        })
    });
    describe('some', () => {
        it('should return true if one or more elements pass the test implemented by the callback', () => {
            let arr = new DynamicArray();
            arr.push(1, 1, 1, 1, 1, 1, 2);
            const actual = arr.some((val) => val % 2 === 0);
            const expected = true;
            expect(actual).to.equal(expected);
        });
        it('should return false if none of the elements pass the test implemented by the callback', () => {
            let arr = new DynamicArray();
            arr.push(1, 1);
            const actual = arr.some((val) => val % 2 === 0);
            const expected = false;
            expect(actual).to.equal(expected)
        });
        it('should throw a TypeError if no callback is passed in', () => {
            let arr = new DynamicArray();
            expect(() => {
                arr.some();
            }).to.throw(TypeError, 'undefined is not a function')
        });
        it('should throw a TypeError if the callback is not a function', () => {
            let arr = new DynamicArray();
            let obj = { some: 'BODY' };
            expect(() => {
                arr.some(obj);
            }).to.throw(TypeError, `${JSON.stringify(obj)} is not a function`)
        });
    });
    describe('filter', () => {
        it('should return a new array with all elements the pass the test implemented by the callback', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3, 4, 5, 6, 7);
            const actual = arr.filter((val) => val % 2 === 0);
            const expected = [2, 4, 6];
            expect(actual).to.deep.equal(expected)
        });
        it('should not modify the original array', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3, 4, 5, 6, 7);
            arr.filter((val) => val % 2 === 0);
            const actual = arr;
            const expected = {
                length: 7,
                data: {
                    0: 1,
                    1: 2,
                    2: 3,
                    3: 4,
                    4: 5,
                    5: 6,
                    6: 7
                },
                capacity: 10
            }
            expect(actual).to.deep.equal(expected)
        });
        it('should throw a TypeError if no callback is passed in', () => {
            let arr = new DynamicArray();
            expect(() => {
                arr.filter();
            }).to.throw(TypeError, 'undefined is not a function')
        });
        it('should throw a TypeError if the callback is not a function', () => {
            let arr = new DynamicArray();
            expect(() => {
                arr.filter(5);
            }).to.throw(TypeError, '5 is not a function')
        });
    });
    describe('includes', () => {
        describe('should return true if a value is present in the array', () => {
            it('should work for numbers', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3);
                const actual = arr.includes(3);
                const expected = true;
                expect(actual).to.equal(expected);
            });
            it('should work for strings', () => {
                let arr = new DynamicArray();
                arr.push('Once', 'in', 'a', 'lifetime');
                const actual = arr.includes('lifetime');
                const expected = true;
                expect(actual).to.equal(expected)
            });
            it('should work for objects', () => {
                let arr = new DynamicArray();
                let a = { name: "I'm" };
                let b = { name: "a" };
                let c = { name: "believer" };
                let d = { name: "I couldn't" };
                let e = { name: "leave her" };
                let f = { name: "if I tried" };
                arr.push(a, b, c, d, e, f);
                const actual = arr.includes(d);
                const expected = true;
                expect(actual).to.equal(expected)
            });
        });
        describe('should return true if the value is present in the array based on the index passed in', () => {
            it('should work for numbers', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 2);
                const actual = arr.includes(2, 3);
                const expected = true;
                expect(actual).to.equal(expected)
            });
            it('should work for strings', () => {
                let arr = new DynamicArray();
                arr.push('love', 'love', 'me', 'do');
                const actual = arr.includes('love', 1);
                const expected = true;
                expect(actual).to.equal(expected);
            });
            it('should work for objects', () => {
                let arr = new DynamicArray();
                let a = { name: 'ABC' };
                let b = { name: 'as easy as' };
                let c = { name: '123' };
                arr.push(a, b, c, a, c);
                const actual = arr.includes(a, 2);
                const expected = true;
                expect(actual).to.equal(expected)
            });
        })
        describe('should return false if the value is not present in the array', () => {
            it('should work for numbers', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3);
                const actual = arr.includes(5);
                const expected = false;
                expect(actual).to.equal(expected);
            });
            it('should work for strings', () => {
                let arr = new DynamicArray();
                arr.push('Once', 'in', 'a', 'lifetime');
                const actual = arr.includes('life');
                const expected = false;
                expect(actual).to.equal(expected)
            });
            it('should work for objects', () => {
                let arr = new DynamicArray();
                let a = { name: "I'm" };
                let b = { name: "a" };
                let c = { name: "believer" };
                let d = { name: "I couldn't" };
                let e = { name: "leave her" };
                let f = { name: "if I tried" };
                arr.push(a, b, c, e, f);
                const actual = arr.includes(d);
                const expected = false;
                expect(actual).to.equal(expected)
            });
        })
        describe('should return false if the value is not present in the array based on the index passed in', () => {
            it('should work for numbers', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 2);
                const actual = arr.includes(3, 3);
                const expected = false;
                expect(actual).to.equal(expected)
            });
            it('should work for strings', () => {
                let arr = new DynamicArray();
                arr.push('love', 'love', 'me', 'do');
                const actual = arr.includes('love', 2);
                const expected = false;
                expect(actual).to.equal(expected);
            });
            it('should work for objects', () => {
                let arr = new DynamicArray();
                let a = { name: 'ABC' };
                let b = { name: 'as easy as' };
                let c = { name: '123' };
                arr.push(a, a, b, c, c);
                const actual = arr.includes(a, 2);
                const expected = false;
                expect(actual).to.equal(expected)
            });
        })
    });
    describe('find', () => {
        it('should return the value of the first element in the array that passes the test implemented by the callback', () => {
            let arr = new DynamicArray();
            arr.push(1, 3, 4, 7);
            const actual = arr.find(val => val % 2 === 0);
            const expected = 4;
            expect(actual).to.equal(expected)
        });
        it('should throw a TypeError if no callback is passed', () => {
            let arr = new DynamicArray();
            expect(() => {
                arr.find();
            }).to.throw(TypeError, 'undefined is not a function')
        });
        it('should throw a TypeError if the callback is not a function', () => {
            let arr = new DynamicArray();
            expect(() => {
                arr.find(15);
            }).to.throw(TypeError, '15 is not a function')
        });
        it('should return undefined if no elements in the array passe the test', () => {
            let arr = new DynamicArray();
            arr.push(1, 1, 3, 5);
            const actual = arr.find(val => val % 2 === 0);
            const expected = undefined;
            expect(actual).to.equal(expected)
        })
    });
    describe('findIndex', () => {
        it('should return the index of the first element in the array that passes the test implemented by the callback', () => {
            let arr = new DynamicArray();
            arr.push(1, 5, 2, 7);
            const actual = arr.find(val => val % 2 === 0);
            const expected = 2;
            expect(actual).to.equal(expected)
        });
        it('should throw a TypeError if no callback is passed', () => {
            let arr = new DynamicArray();
            expect(() => {
                arr.findIndex();
            }).to.throw(TypeError, 'undefined is not a function')
        });
        it('should throw a TypeError if the callback is not a function', () => {
            let arr = new DynamicArray();
            expect(() => {
                arr.findIndex(12)
            }).to.throw(TypeError, '12 is not a function')
        });
        it('should return -1 if the array is empty', () => {
            let arr = new DynamicArray();
            const actual = arr.findIndex(val => val % 2 === 0);
            const expected = -1;
            expect(actual).to.equal(expected)
        })
        it('should return -1 if no element in the array passes the test', () => {
            let arr = new DynamicArray();
            arr.push(1, 3, 5, 7);
            const actual = arr.findIndex(val => val % 2 === 0);
            const expected = -1;
            expect(actual).to.equal(expected)
        })
    });
    describe('indexOf', () => {
        it('should return the first index the provided element is found', () => {
            let arr = new DynamicArray();
            arr.push('one', 'two', 'three', 'three');
            const actual = arr.indexOf('two');
            const expected = 1;
            expect(actual).to.equal(expected);
        });
        it('should return the first index the provided element is found relative to the index passed in', () => {
            let arr = new DynamicArray();
            arr.push('one', 'two', 'one', 'two');
            const actual = arr.indexOf('one', 2);
            const expected = 2;
            expect(actual).to.equal(expected);
        });
        it('should return -1 if the element is not found in the array', () => {
            let arr = new DynamicArray();
            arr.push('badger', 'badger', 'badger', 'badger', 'badger');
            const actual = arr.indexOf('mushroom mushroom');
            const expected = -1;
            expect(actual).to.equal(expected);
        });
    });
    describe('lastIndexOf', () => {
        it('should return the last index the provided element can be found', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 2, 3, 2);
            const actual = arr.lastIndexOf(2);
            const expected = 4;
            expect(actual).to.equal(expected);
        });
        it('should return the last index the provided element is found relative to the index passed in', () => {
            let arr = new DynamicArray();
            arr.push(2, 5, 9, 2);
            const actual = arr.lastIndexOf(2, -2);
            const expected = 0;
            expect(actual).to.equal(expected);
        })
        it('should return -1 if the element is not found in the array', () => {
            let arr = new DynamicArray();
            arr.push('the', 'vorpal', 'blade', 'went');
            const actual = arr.lastIndexOf('snickersnack');
            const expected = -1;
            expect(actual).to.equal(expected);
        });
    });
    describe('concat', () => {
        it('should not change the original arrays', () => {
            let a = new DynamicArray();
            a.push(1, 2, 3);
            let b = new DynamicArray();
            b.push(5, 6, 7);
            a.concat(b);
            const actualA = a;
            const actualB = b;
            const expectedA = {
                length: 3,
                capacity: 10,
                data: {
                    0: 1,
                    1: 2,
                    2: 3
                }
            };
            const expectedB = {
                length: 3,
                capacity: 10,
                data: {
                    0: 5,
                    1: 6,
                    2: 7
                }
            };
            expect(actualA).to.deep.equal(expectedA);
            expect(actualB).to.deep.equal(expectedB);
        });
        it('should return a new array that includes the values of the original array and the values of any arrays passed in', () => {
            let a = new DynamicArray();
            a.push('A', 'B', 'C');
            let b = new DynamicArray();
            b.push('as', 'easy', 'as');
            let c = new DynamicArray();
            c.push(1, 2, 3);
            const actual = a.concat(b, c);
            const expected = ['A', 'B', 'C', 'as', 'easy', 'as', 1, 2, 3];
            expect(actual).to.deep.equal(expected);
        });
        it('should handle nested Dynamic Arrays', () => {
            let a = new DynamicArray();
            let b = new DynamicArray();
            b.push(1);
            a.push(b);
            let c = new DynamicArray();
            let d = new DynamicArray();
            let e = new DynamicArray();
            d.push(3);
            e.push(d);
            c.push(2, e);
            const actual = a.concat(c);
            const expected = [[1], 2, [[3]]];
            expect(actual).to.deep.equal(expected)
        });
        it('should handle nested JavaScript arrays', () => {
            let a = new DynamicArray();
            a.push([1]);
            let b = new DynamicArray();
            b.push(2, [[3]]);
            const actual = a.concat(b);
            const expected = [[1], 2, [[3]]];
            expect(actual).to.deep.equal(expected)
        })
    });
    describe('join', () => {
        describe('it should create a string concatenating all elements in the array', () => {
            it('should separate elements by commas if no separator is passed', () => {
                let arr = new DynamicArray();
                arr.push('Fire', 'Earth', 'Wind', 'Fire');
                const actual = arr.join();
                const expected = 'Fire,Earth,Wind,Fire';
                expect(actual).to.deep.equal(expected)
            });
            it('should use no separator if an empty string is passed', () => {
                let arr = new DynamicArray();
                arr.push('Fire', 'Earth', 'Wind', 'Fire');
                const actual = arr.join('');
                const expected = 'FireEarthWindFire';
                expect(actual).to.deep.equal(expected)
            });
            it('should use whatever separator is provided', () => {
                let arr = new DynamicArray();
                arr.push('Fire', 'Air', 'Water');
                const actual = arr.join(' + ');
                const expected = 'Fire + Air + Water';
                expect(actual).to.deep.equal(expected);
            })
            it('should convert elements that are undefined, null or [] to empty string', () => {
                let arr = new DynamicArray();
                arr.push(undefined, null, []);
                const actual = arr.join();
                const expected = ',,';
                expect(actual).to.equal(expected)
            })
        })
    });
    describe('copyWithin', () => {
        describe('should shallow copy part of an array to another location in the array and return it without modifying its length', () => {
            it('should work with a negative target, negative start, and negative end', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5, 6, 7, 8);
                const actual = arr.copyWithin(-2, -3, -1);
                const expected = [1, 2, 3, 4, 5, 6, 6, 7];
                expect(actual).to.deep.equal(expected)
            });
            it('should work with a negative target, negative start, and no end passed', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5, 6, 7, 8);
                const actual = arr.copyWithin(-2, -1);
                const expected = [1, 2, 3, 4, 5, 6, 8, 8];
                expect(actual).to.deep.equal(expected);
            })
            it('should work with a negative target when no start or end is passed', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5);
                const actual = arr.copyWithin(-2);
                const expected = [1, 2, 3, 1, 2];
                expect(actual).to.deep.equal(expected)
            });
            it('should work with a negative target, negative start, and positive end', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5, 6, 7, 8);
                const actual = arr.copyWithin(-5, -7, 3);
                const expected = [1, 2, 3, 2, 3, 6, 7, 8];
                expect(actual).to.deep.equal(expected)
            });
            it('should work with a negative target, positive start, and negative end', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5, 6, 7, 8);
                const actual = arr.copyWithin(-7, 3, -1);
                const expected = [1, 4, 5, 6, 7, 6, 7, 8];
                expect(actual).to.deep.equal(expected)
            });
            it('should work with a positive target, negative start, and positive end', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5, 6, 7, 8);
                const actual = arr.copyWithin(0, -5, 6);
                const expected = [4, 5, 6, 4, 5, 6, 7, 8];
                expect(actual).to.deep.equal(expected)
            });
            it('should work with a positive target, positive start, and positive end', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5, 6, 7, 8);
                const actual = arr.copyWithin(0, 2, 5);
                const expected = [3, 4, 5, 4, 5, 6, 7, 8];
                expect(actual).to.deep.equal(expected)
            });
            it('should work with a positive target, positive start, and no end passed', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5, 6, 7, 8);
                const actual = arr.copyWithin(3, 4);
                const expected = [1, 2, 3, 5, 6, 7, 8, 8];
                expect(actual).to.deep.equal(expected);
            });
            it('should work with a postiive target with no start or end passed', () => {
                let arr = new DynamicArray();
                arr.push('a', 'b', 'c', 'd', 'e');
                const actual = arr.copyWithin(2);
                const expected = ["a", "b", "a", "b", "c"];
                expect(actual).to.deep.equal(expected);
            });
            it('should work with a positive target, positive start, and negative end', () => {
                let arr = new DynamicArray();
                arr.push('a', 'b', 'c', 'd', 'e');
                const actual = arr.copyWithin(1, 3, -1);
                const expected = ["a", "d", "c", "d", "e"];
                expect(actual).to.deep.equal(expected);
            });
            it('should work with positive target, negative start, and positive end', () => {
                let arr = new DynamicArray();
                arr.push('a', 'b', 'c', 'd', 'e');
                const actual = arr.copyWithin(2, -4, 4);
                const expected = ["a", "b", "b", "c", "d"];
                expect(actual).to.deep.equal(expected);
            });
            it('should work with negative target, positive start, and negative end', () => {
                let arr = new DynamicArray();
                arr.push('a', 'b', 'c', 'd', 'e');
                const actual = arr.copyWithin(-3, 1, -2);
                const expected = ["a", "b", "b", "c", "e"];
                expect(actual).to.deep.equal(expected);
            });
            it('should return the unmodified array if the target is greater than the length of the array', () => {
                let arr = new DynamicArray();
                arr.push(1, 2, 3, 4, 5, 6, 7, 8);
                const actual = arr.copyWithin(12, 1, 2);
                const expected = [1, 2, 3, 4, 5, 6, 7, 8];
                expect(actual).to.deep.equal(expected);
            });
        });
    });
    describe("flat", () => {
        it('should return a new array', () => {
            let arr = new DynamicArray();
            arr.push(1, 2, 3);
            const actual = arr.flat();
            const expected = [1, 2, 3];
            expect(actual).to.deep.equal(expected);
        })
        it('should flatten by one level if no depth is passed', () => {
            let arr = new DynamicArray();
            let a = new DynamicArray();
            a.push(1,2);
            let b = new DynamicArray();
            b.push(3,4);
            a.push(b);
            arr.push(a);
            const actual = arr.flat();
            const expected = [1,2,3,4];
            expect(actual).to.deep.equal(expected);
        });
        it('should flatten by two levels if a depth of 2 is passed', () => {
            let arr = new DynamicArray();
            let a = new DynamicArray();
            a.push(1,2,3);
            let b = new DynamicArray();
            b.push(1);
            let c = new DynamicArray();
            c.push(2,3);
            b.push(c);
            let d = new DynamicArray();
            let e = new DynamicArray();
            let f = new DynamicArray();
            f.push(5,6);
            e.push(3,4,f);
            d.push(2,e);
            arr.push(a, b, d);
            const actual = arr.flat(2);
            const expected = [1,2,3,1,2,3,2,3,4,[5,6]];
            expect(actual).to.deep.equal(expected);
        });
        it('should flatten by three levels if a depth of 3 is passed', () => {
            let arr = new DynamicArray([1,2,3], [1,[2,3]], [2,[3,4, [5,6]]]);
            const actual = arr.flat(3);
            const expected = [1,2,3,1,2,3,2,3,4,5,6];
            expect(actual).to.deep.equal(expected);
        });
    });
    describe('map', () => {
        it('should not change the original array', () =>{
             let arr = new DynamicArray(1,4,9);
             arr.map(num => Math.sqrt(num));
             const actual = [...arr.values()];
             const expected = [1,4,9];
             expect(actual).to.deep.equal(expected);
        })
        it('should return a new array populated with tge results of calling cb on every element', () => {
            let arr = new DynamicArray(1,4,9);
            const actual = arr.map(num => Math.sqrt(num));
             const expected = [1,2,3];
             expect(actual).to.deep.equal(expected); 
        });
        it('can be used to reformat an array of objects', () => {
            const arr = new DynamicArray({key: 1, value: 10}, { key: 2, value: 20}, {key: 3, value: 30});
            const actual = arr.map(obj => {
                let newObj = {};
                newObj[obj.key] = obj.value;
                return newObj;
            });
            const expected = [{1: 10}, {2:20}, {3:30}];
            expect(actual).to.deep.equal(expected); 
        });
    });
    describe("flatMap", () => {
        it('should return a new array applying the callback to each element and then flattening by one level', () => {
            const arr = new DynamicArray(1,2,3,4);
            const actual = arr.flatMap(x => [x, x * 2]);
            const expected = [1,2,2,4,3,6,4,8];
            expect(actual).to.deep.equal(expected)
        });
        it('should be able to handle more complex operations', () => {
            let arr = new DynamicArray(5,4,-3,20,17,-33,-4,18);
            const actual = arr.flatMap(n => (n < 0) ? [] : (n % 2 == 0) ? [n] : [n-1, 1]);
            const expected = [4,1,4,20,16,1,18];
            expect(actual).to.deep.equal(expected);
        })
    });
    describe('toString', () => {
        it('should return the values of the array separated by commas', () => {
            let arr = new DynamicArray(1,2,3);
            const actual = arr.toString();
            const expected = '1,2,3';
            expect(actual).to.deep.equal(expected);
        });
        it('should handle a nested array', () => {
            let arr = new DynamicArray(['krunal', 'ankit', ['hello']], ['rushabh', 'dhaval']);
            const actual = arr.toString();
            const expected = 'krunal,ankit,hello,rushabh,dhaval';
            expect(actual).to.deep.equal(expected);
        })
    })
})
