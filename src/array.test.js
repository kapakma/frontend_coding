import { uniqueArray, flatten } from './array';

describe('array exercises', () => {
    describe('uniqueArray > ', () => {
        test('empty array', () => {
            expect(uniqueArray([])).toEqual([]);
        });

        test('one value', () => {
            expect(uniqueArray([0])).toEqual([0]);
        });

        test('different values', () => {
            expect(uniqueArray([2, 3])).toEqual([2, 3]);
            expect(uniqueArray([0, 1, 2, 3])).toEqual([0, 1, 2, 3]);
        });

        test('duplicate values', () => {
            expect(uniqueArray([2, 1, 2])).toEqual([2, 1]);
            expect(uniqueArray([2, 2, 1])).toEqual([2, 1]);
            expect(uniqueArray([2, 1, 2, 3])).toEqual([2, 1, 3]);
        });

        test('string values', () => {
            expect(uniqueArray(['foo', 'bar', 'foo'])).toEqual(['foo', 'bar']);
            expect(uniqueArray(['foo', 'bar', 'bar', 'foo'])).toEqual(['foo', 'bar']);
            expect(uniqueArray(['1', '2', '2', '3'])).toEqual(['1', '2', '3']);
        });

        test('boolean values', () => {
            expect(uniqueArray([false])).toEqual([false]);
            expect(uniqueArray([false, true])).toEqual([false, true]);
            expect(uniqueArray([true, false, true])).toEqual([true, false]);
            expect(uniqueArray([true, true, false])).toEqual([true, false]);
        });

        test('null-ish values', () => {
            expect(uniqueArray([null])).toEqual([null]);
            expect(uniqueArray([null, null])).toEqual([null]);
            expect(uniqueArray([null, undefined])).toEqual([null, undefined]);
            expect(uniqueArray([null, undefined, null])).toEqual([null, undefined]);
            expect(uniqueArray([null, null, undefined])).toEqual([null, undefined]);
        });

        test('mixed values', () => {
            expect(uniqueArray([2, 1, '2', '1'])).toEqual([2, 1, '2', '1']);
            expect(uniqueArray(['2', 2, 2, 1, 1, '2', '1'])).toEqual(['2', 2, 1, '1']);
            expect(uniqueArray([true, 'true', true])).toEqual([true, 'true']);
        });
    });

    describe('flatten > ', () => {
        test('empty array', () => {
            expect(flatten([])).toEqual([])
            expect(flatten([])).toEqual([])
            expect(flatten([])).toEqual([])
            expect(flatten([[]])).toEqual([])
            expect(flatten([])).toEqual([])
            expect(flatten([])).toEqual([])
            expect(flatten([[]])).toEqual([])
            expect(flatten([[[]]])).toEqual([])
            expect(flatten([[],[[[]]]])).toEqual([])
            expect(flatten([[],[[]],[[],[[[]]]]])).toEqual([])
        });

        test('single-element array', () => {
            expect(flatten([1])).toEqual([1]);
            expect(flatten(["foo"])).toEqual(["foo"]);
            expect(flatten([null])).toEqual([null]);
        });

        test('array with only one level', () => {
            expect(flatten([1,2,3])).toEqual([1,2,3]);
            expect(flatten(["foo","bar"])).toEqual(["foo","bar"]);
            expect(flatten([null,true,null])).toEqual([null,true,null]);
        });

        test('array with multiple levels of nesting', () => {
            expect(flatten([3,4])).toEqual([3,4])
            expect(flatten([0,1,2,[3,4]])).toEqual([0,1,2,3,4])
            expect(flatten([3])).toEqual([3])
            expect(flatten([2,[3]])).toEqual([2,3])
            expect(flatten([1,[2,[3]]])).toEqual([1,2,3])
            expect(flatten([1,2])).toEqual([1,2])
            expect(flatten([3,4])).toEqual([3,4])
            expect(flatten([[1,2],[3,4]])).toEqual([1,2,3,4])
            expect(flatten(["bar"])).toEqual(["bar"])
            expect(flatten(["foo",["bar"]])).toEqual(["foo","bar"])
            expect(flatten([true])).toEqual([true])
            expect(flatten([null,[true]])).toEqual([null,true])
            expect(flatten([[null,[true]],null])).toEqual([null,true,null])
        });

        test('list-style array', () => {
            expect(flatten([5])).toEqual([5])
            expect(flatten([4,[5]])).toEqual([4,5])
            expect(flatten([3,[4,[5]]])).toEqual([3,4,5])
            expect(flatten([2,[3,[4,[5]]]])).toEqual([2,3,4,5])
            expect(flatten([1,[2,[3,[4,[5]]]]])).toEqual([1,2,3,4,5])
            expect(flatten([1])).toEqual([1])
            expect(flatten([[1],2])).toEqual([1,2])
            expect(flatten([[[1],2],3])).toEqual([1,2,3])
            expect(flatten([[[[1],2],3],4])).toEqual([1,2,3,4])
            expect(flatten([[[[[1],2],3],4],5])).toEqual([1,2,3,4,5])
        });

        test('deeply-nested single-element array', () => {
            expect(flatten([1])).toEqual([1])
            expect(flatten([[1]])).toEqual([1])
            expect(flatten([[[1]]])).toEqual([1])
            expect(flatten([[[[1]]]])).toEqual([1])
        });
    });
});