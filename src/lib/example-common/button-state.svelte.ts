export interface ButtonState {
    name: string;
    isDown: boolean;
}

export function stateObject(name: string): ButtonState {
    return {
        name,
        isDown: false
    }
}