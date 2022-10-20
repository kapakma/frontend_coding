import { get, camelCaseKeys, squashObject } from './object';

describe('object.js >', () => {
    describe('get >', () => {
        test('empty object', () => {
            expect(get({}, "a")).toBeUndefined();
            expect(get({}, "a.b")).toBeUndefined();
        });

        test('path contains one segment', () => {
            expect(get({"a":1}, "a")).toBe(1);
            expect(get({"c":2}, "b")).toBeUndefined();
            expect(get({"c":{"foo":1}}, "c")).toEqual({"foo":1});
        });

        test('path contains two segments', () => {
            expect(get({"a":{"b":2},"c":1}, "a.b")).toBe(2);
            expect(get({"a":{"b":2},"c":1}, "a.c")).toBeUndefined()  ;
            expect(get({"a":{"b":2,"c":{"foo":2}}}, "a.c")).toEqual({"foo":2});
        });

        test('path contains multiple segments', () => {
            expect(get({"a":{"b":2,"c":{"d":0}},"c":1}, "a.c.d")).toBe(0);
            expect(get({"a":{"b":2},"c":1}, "a.c.e.f")).toBeUndefined();
            expect(get({"a":{"b":2,"c":{"d":{"e":{"foo":3}}}},"c":1}, "a.c.d.e")).toEqual({"foo":3});
        });

        test('array values', () => {
            expect(get({"a":{"b":[1,2,3],"c":{"d":0}},"c":1}, "a.b.2")).toBe(3);
            expect(get({"a":{"b":[1,2,3,{"c":"bar"}],"c":{"d":0}},"c":1}, "a.b.3.c")).toBe("bar");
        });

        test('uses default value', () => {
            expect(get({}, "a", 1)).toBe(1);
            expect(get({}, "a.b", 2)).toBe(2);
            expect(get({"c":2}, "b", 3)).toBe(3);
            
        });

        test('correctly returns null values', () => {
            expect(get({"b":null}, "b")).toBeNull();
            expect(get({"a":{"b":2,"c":null},"c":1}, "a.c")).toBeNull();
            expect(get({"a":{"b":2,"c":{"d":{"e":null}}},"c":1}, "a.c.d.e")).toBeNull();
        });

    });

    describe('camelCaseKeys >', () => {
        test('simple object', () => {
            expect(camelCaseKeys({foo_bar: true})).toEqual({fooBar: true});
        });

        test('simple object with multiple keys', () => {
            expect(camelCaseKeys({foo_bar: true, baz: '1', quz: '2'})).toEqual({fooBar:true, baz:"1", quz:"2"});
        });

        test('nested object', () => {
            expect(camelCaseKeys({foo_bar: true, bar_baz: {baz_quz: "1", quz: "2"}})).toEqual({fooBar: true, barBaz:{bazQuz: "1", quz: "2"}});
        });

        test('arrays', () => {
            expect(camelCaseKeys([{baz_qux: true}, {foo: true}])).toEqual([{bazQux: true}, {foo: true}]);

        });

        test('objects containing arrays', () => {
            expect(camelCaseKeys({foo_bar: true, bar_baz: [{baz_qux: true}, {foo: true}]})).toEqual({fooBar: true, barBaz:[{bazQux: true}, {foo: true}]});
        });
    });

    describe('squashObject >', () => {
        test('object with no nesting', () => {
            expect(squashObject({"a":"1","b":"b"})).toEqual({"a":"1","b":"b"});
        });

        test('object with one level of nesting', () => {
            expect(squashObject({"a":5,"c":{"f":9}})).toEqual({"a":5,"c.f":9});
        });

        test('object with multiple levels of nesting', () => {
            expect(squashObject({"a":5,"b":6,"c":{"f":9,"g":{"m":17,"n":3}}})).toEqual({"a":5,"b":6,"c.f":9,"c.g.m":17,"c.g.n":3});
        });

        test('object with arrays and null-ish values', () => {
            expect(squashObject({"a":"hi","b":{"a":null,"b":["foo","",null,"bar"],"d":"hello","e":{"a":"yo","c":"sup","d":0,"f":[{"foo":123,"bar":123},{"foo":465,"bar":456}]}},"c":"world"})).toEqual({"a":"hi","b.a":null,"b.b.0":"foo","b.b.1":"","b.b.2":null,"b.b.3":"bar","b.d":"hello","b.e.a":"yo","b.e.c":"sup","b.e.d":0,"b.e.f.0.foo":123,"b.e.f.0.bar":123,"b.e.f.1.foo":465,"b.e.f.1.bar":456,"c":"world"});
        });
    });
});