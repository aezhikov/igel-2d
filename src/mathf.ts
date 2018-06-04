class Mathf {
    static clamp01(f: number): number {
        return Math.min(Math.max(f, 0), 1);
    }
}

export = Mathf;