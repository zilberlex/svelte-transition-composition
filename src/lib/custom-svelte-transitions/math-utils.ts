export function lerp(a: number, b: number, t: number) {
    return a * (1 - t) + b * t;
}

export function inverseLerp(v: number, min: number, max: number): number {
    return (v - min) / (max - min); 
}

export function clippedInverseLerp(v: number, min: number, max: number): number {
    return clip(inverseLerp(v, min, max), 0, 1);
}

export function clip(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v));
}
