export class Pixel {
    private readonly r: number;
    private readonly g: number;
    private readonly b: number;
    // @ts-ignore
    private readonly a: number;

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    getGreyValueRGB(): string {
        const value = this.getGreyValue();
        return `rgb(${value}, ${value}, ${value})`
    }

    getGreyValue(): number {
        return (this.r + this.g + this.b) / 3;
    }

    getNormalizedGreyValue(): number {
        return this.getGreyValue() / 255;
    }
}