import Vector2 = require("../vector");
import Vector2 = require("../vector");

describe('Vector2 static properties', () => {
    it('zero', () => {
        expect(Vector2.zero).toEqual({x: 0, y: 0})
    });

    it('left', () => {
        expect(Vector2.left).toEqual({x: -1, y: 0})
    });

    it('right', () => {
        expect(Vector2.right).toEqual({x: 1, y: 0})
    });

    it('up', () => {
        expect(Vector2.up).toEqual({x: 0, y: 1})
    });

    it('down', () => {
        expect(Vector2.down).toEqual({x: 0, y: -1})
    })
});


describe('Vector2 static functions', () => {
    it('angel up to right', () => {
        expect(Vector2.angle(Vector2.up, Vector2.right)).toBe(90)
    });
    it('angel up to left', () => {
        expect(Vector2.angle(Vector2.up, Vector2.left)).toBe(90)
    });
    it('angel 45 deg', () => {
        expect(Vector2.angle(Vector2.up, new Vector2({x: 1, y: 1}))).toBeCloseTo(45)
    });
    it('angel up to down', () => {
        expect(Vector2.angle(Vector2.up, Vector2.down)).toBe(180)
    });
    it('angel down to down', () => {
        expect(Vector2.angle(Vector2.down, Vector2.down)).toBe(0)
    });
    it('clamp magnitude up to 1', () => {
        expect(Vector2.clampMagnitude(Vector2.up, 1)).toEqual(Vector2.up)
    });
    it('clamp magnitude', () => {
        let result = Vector2.clampMagnitude(new Vector2({x: 3, y: 4}), 1);
        expect(result.x).toBeCloseTo(.6);
        expect(result.y).toBeCloseTo(.8);
    });
    it('clamp magnitude', () => {
        let result = Vector2.clampMagnitude(new Vector2({x: .6, y: .8}), 5);
        expect(result.x).toBeCloseTo(3);
        expect(result.y).toBeCloseTo(4);
    });
    it('distance (in positive direction)', () => {
        expect(Vector2.distance({x: 0, y: 0}, {x: 3, y: 4})).toBeCloseTo(5);
    });
    it('distance (in negative direction)', () => {
        expect(Vector2.distance({x: 3, y: 4}, Vector2.zero)).toBeCloseTo(5);
    });
    it('dot product with zero vector', () => {
        let a = {x: 3, y: 4};
        expect(Vector2.dot(a, Vector2.zero)).toBe(0);
    });
    it('dot product with non zero vector', () => {
        let a = {x: 3, y: 4};
        let b = {x: 1, y: 1};
        expect(Vector2.dot(a, b)).toBe(7);
    });
    it('lerp 0', () => {
        let a = {x: 3, y: 4};
        let b = Vector2.zero;
        expect(Vector2.lerp(a, b, 0)).toEqual(a);
    });
    it('lerp 1', () => {
        let a = {x: 3, y: 4};
        let b = Vector2.zero;
        expect(Vector2.lerp(a, b, 1)).toEqual(b);
    });
    it('lerp 0.5', () => {
        let a = {x: 4, y: 4};
        let b = {x: 2, y: 2};
        expect(Vector2.lerp(a, b, 0.5)).toEqual({x: 3, y: 3});
    });
    it('lerp unclamped 2', () => {
        let a = {x: 4, y: 4};
        let b = {x: 1, y: 1};
        expect(Vector2.lerpUnclamped(a, b, 2)).toEqual({x: -2, y: -2});
    });
    it('lerp unclamped -1.5', () => {
        let a = {x: 4, y: 4};
        let b = {x: 1, y: 1};
        expect(Vector2.lerpUnclamped(a, b, -1.5)).toEqual({x: 8.5, y: 8.5});
    });
    it('max', () => {
        let a = {x: -4, y: 2};
        let b = {x: 0, y: 1};
        expect(Vector2.max(a, b)).toEqual({x: 0, y: 2});
    });
    it('min', () => {
        let a = {x: -4, y: 2};
        let b = {x: 0, y: 1};
        expect(Vector2.min(a, b)).toEqual({x: -4, y: 1});
    });
    it('move towards 1d', () => {
        let a = {x: 0, y: 0};
        let b = {x: 0, y: 5};
        expect(Vector2.moveTowards(a, b, 1)).toEqual({x: 0, y: 1});
    });
    it('move towards 2d', () => {
        let a = {x: 0, y: 0};
        let b = {x: 5, y: 5};
        expect(Vector2.moveTowards(a, b, 20)).toEqual(b);
    });
    it('perpendicular', () => {
        expect(Vector2.perpendicular(Vector2.right)).toEqual(Vector2.up);
    });
    it('reflect', () => {
        expect(Vector2.reflect(new Vector2({x: 1, y: -1}), Vector2.up)).toEqual({x: 1, y: 1});
    });
    it('reflect up to down', () => {
        expect(Vector2.reflect(Vector2.up, Vector2.up)).toEqual(Vector2.down);
    });
    it('scale to zero', () => {
        let a = {x: 0, y: 0};
        let b = {x: 5, y: 5};
        expect(Vector2.scale(a, b)).toEqual(Vector2.zero);
    });
    it('scale to 1', () => {
        let a = {x: 5, y: 5};
        let b = {x: 1, y: 1};
        expect(Vector2.scale(a, b)).toEqual(a);
    });
    it('scale', () => {
        let a = {x: 5, y: 5};
        let b = {x: 2, y: 3};
        expect(Vector2.scale(a, b)).toEqual({x: 10, y: 15});
    });
    it('signed angle 90', () => {
        expect(Vector2.signedAngle(Vector2.up, Vector2.left)).toBeCloseTo(90)
    });
    it('signed angle -90', () => {
        expect(Vector2.signedAngle(Vector2.up, Vector2.right)).toBeCloseTo(-90)
    });
    it('of method to create {Vector2}', () => {
        let result = Vector2.of(3, 4);
        expect(result).toBeInstanceOf(Vector2);
        expect(result).toEqual({x: 3, y: 4});
    });
});

describe('Vector2 functions', () => {
    it('plus', () => {
        expect(new Vector2.of(1, 2).plus({x: 3, y: 4})).toEqual({x: 4, y: 6});
    });
    it('minus', () => {
        expect(new Vector2.of(1, 2).minus({x: 1, y: 2})).toEqual(Vector2.zero);
    });
    it('times', () => {
        expect(new Vector2.of(1, 2).times(4)).toEqual({x: 4, y: 8});
    });
    it('div', () => {
        expect(new Vector2.of(4, -2).div(2)).toEqual({x: 2, y: -1});
    });
    it('magnitude', () => {
        expect(new Vector2.of(0.6, 0.8).magnitude()).toBeCloseTo(1);
    });
    it('normalized', () => {
        expect(new Vector2.of(3, 4).normalized()).toEqual({x: 0.6, y: 0.8});
    });
    it('normalize', () => {
        const vector = new Vector2.of(3, 4);
        vector.normalize();
        expect(vector).toEqual({x: 0.6, y: 0.8});
    });
    it('sqr magnitude', () => {
        expect(new Vector2.of(3, 4).sqrMagnitude()).toBeCloseTo(25);
    });
    it('copy', () => {
        const origin = Vector2.of(1, 2);
        const copy = origin.copy();
        expect(origin).toEqual(copy);
        origin.x = 10;
        expect(origin).not.toEqual(copy)
    });
    it('equals the same', () => {
        const origin = Vector2.of(1, 2);
        expect(origin.equals(origin)).toBeTruthy();
    });
    it('equals to null', () => {
        const origin = Vector2.of(1, 2);
        expect(origin.equals(null)).toBeFalsy();
    });
    it('equals is true', () => {
        const origin = Vector2.of(1, 2);
        const copy = origin.copy();
        expect(origin.equals(copy)).toBeTruthy();
    });
    it('equals is false', () => {
        const origin = Vector2.of(1, 2);
        const copy = Vector2.of(3, 2);
        expect(origin.equals(copy)).toBeFalsy();
    });
    it('to string', () => {
        expect(Vector2.of(1, 2).toString()).toMatch("Vector2{x:1, y:2}");
    });
});

