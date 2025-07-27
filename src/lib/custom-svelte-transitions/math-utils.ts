export function lerp(a: number, b: number, t: number) {
    return a * (1 - t) + b * t;
}

export function clippedInverseLerp(v: number, min: number, max: number): number {
    return clip((v - min) / (max - min), 0, 1); 
}

export function clip(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v));
}

// Always returns clipped and U values
export function extractLocalTAndU(tGlobal: number, localTStart: number, localTEnd: any, easing: any) { 
    const { t_linear_local, u_linear_local } = extractTLinearLocal(tGlobal, localTStart, localTEnd);
    const tLocal = easing ? easing(t_linear_local) : t_linear_local;
    const uLocal = easing ? easing(u_linear_local) : u_linear_local;
    return { tLocal, uLocal };
}

export function extractTLinearLocal(tGlobal: number, localTStart: number, localTEnd: number) {
    const t_linear_local = clippedInverseLerp(tGlobal, localTStart, localTEnd);
    const u_linear_local = 1 - t_linear_local;
    
    return { t_linear_local, u_linear_local };
}