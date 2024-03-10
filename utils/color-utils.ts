export function convertHSBToRGB(h: number, s: number, b: number) {
    s /= 100;
    b /= 100;
    const k = (n: number) => (n + h / 60) % 6;
    const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return `rgb(${Math.floor(255 * f(5))}, ${Math.floor(255 * f(3))}, ${Math.floor(255 * f(1))})`;
}

export function convertHSBToHex(h: number, s: number, b: number) {
    let rgb: string = convertHSBToRGB(h, s, b);
    let rgbValues: number[] | undefined = rgb.match(/\d+/g)?.map(Number);
    if (!rgbValues) return;
    return rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
}

function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c: number) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
