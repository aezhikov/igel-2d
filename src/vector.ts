/**
 * Copyright © 2018 Aleksei Ezhikov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Mathf = require("./mathf");

interface IVector2 {
    readonly x: number;
    readonly y: number;
}

class Vector2 implements IVector2 {
    public x: number;
    public y: number;

    static readonly zero: Vector2 = new Vector2();
    static readonly one: Vector2 = new Vector2({x: 1, y: 1});
    static readonly down: Vector2 = new Vector2({x: 0, y: -1});
    static readonly up: Vector2 = new Vector2({x: 0, y: 1});
    static readonly left: Vector2 = new Vector2({x: -1, y: 0});
    static readonly right: Vector2 = new Vector2({x: 1, y: 0});

    /**
     * Returns the unsigned angle in degrees between from and to. The angle returned is the unsigned acute angle
     * between the two vectors. This means the smaller of the two possible angles between the two vectors is used.
     * The result is never greater than 180 degrees.
     *
     * @param from The {Vector2} from which the angular difference is measured.
     * @param to   The {Vector2} to which the angular difference is measured.
     * @returns {number} unsigned angle in degrees between from and to
     */
    static angle(from: Vector2, to: Vector2): number {
        return Math.acos(Vector2.dot(from, to) / (from.magnitude() * to.magnitude())) * 180 / Math.PI;
    }

    static clampMagnitude(vector: Vector2, maxLength: number): Vector2 {
        const t = maxLength / vector.magnitude();
        return new Vector2({x: vector.x * t, y: vector.y * t});
    }

    static distance(a: IVector2, b: IVector2): number {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }

    static dot(a: IVector2, b: IVector2): number {
        return a.x * b.x + a.y * b.y;
    }

    static lerp(a: IVector2, b: IVector2, t: number): Vector2 {
        let clamped = Mathf.clamp01(t);
        return new Vector2({x: a.x + (b.x - a.x) * clamped, y: a.y + (b.y - a.y) * clamped});
    }

    static lerpUnclamped(a: IVector2, b: IVector2, t: number): Vector2 {
        return new Vector2({x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t});
    }

    static max(a: IVector2, b: IVector2): Vector2 {
        return new Vector2({x: Math.max(a.x, b.x), y: Math.max(a.y, b.y)});
    }

    static min(a: IVector2, b: IVector2): Vector2 {
        return new Vector2({x: Math.min(a.x, b.x), y: Math.min(a.y, b.y)});
    }

    static moveTowards(a: IVector2, b: IVector2, maxDelta: number): Vector2 {
        return Vector2.lerp(a, b, maxDelta / Vector2.distance(a, b));
    }

    static perpendicular(direction: IVector2): Vector2 {
        return new Vector2({x: -direction.y, y: direction.x});
    }

    static reflect(direction: Vector2, normal: Vector2): Vector2 {
        return direction.minus(normal.times(Vector2.dot(direction, normal) * 2));
    }

    static scale(a: IVector2, b: IVector2): Vector2 {
        return new Vector2({x: a.x * b.x, y: a.y * b.y});
    }

    static signedAngle(a: Vector2, b: Vector2): number {
        return (Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x)) * 180 / Math.PI;
    }

    static of(x: number, y: number): Vector2 {
        return new Vector2({x: x, y: y})
    }

    constructor();
    constructor(obj: IVector2);
    constructor(obj?: any) {
        this.x = obj && obj.x || 0;
        this.y = obj && obj.y || 0;
    }

    public plus(other: IVector2): Vector2 {
        return new Vector2({x: this.x + other.x, y: this.y + other.y});
    }

    public minus(other: IVector2): Vector2 {
        return new Vector2({x: this.x - other.x, y: this.y - other.y});
    }

    public times(other: number): Vector2 {
        return new Vector2({x: this.x * other, y: this.y * other});
    }

    public div(other: number): Vector2 {
        return new Vector2({x: this.x / other, y: this.y / other});
    }

    public magnitude(): number {
        return Math.sqrt(this.sqrMagnitude());
    }

    public normalized(): Vector2 {
        return this.copy().div(this.magnitude());
    }

    public normalize(): void {
        const m = this.magnitude();
        this.x = this.x / m;
        this.y = this.y / m;
    }

    public sqrMagnitude(): number {
        return this.x * this.x + this.y * this.y;
    }

    public copy(): Vector2 {
        return new Vector2({x: this.x, y: this.y});
    }

    public equals(other?: any): boolean {
        if (this === other) return true;
        if (other == null || typeof this !== typeof other) return false;
        return other.x == this.x && other.y == this.y;
    }

    public toString(): string {
        return `Vector2{x:${this.x}, y:${this.y}}`
    }
}

export = Vector2;
