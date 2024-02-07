export class Shape {
    public size: number;
    public directionX: number;
    public directionY: number;
    public posX: number;
    public posY: number;
    public speed: number;

    constructor(size: number, directionX: number, directionY: number, posX: number, posY: number, speed: number) {
        this.size = size;
        this.directionX = directionX;
        this.directionY = directionY;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
    }

    move(): void {
        this.posX += this.directionX * this.speed;
        this.posY += this.directionY * this.speed;
    }
}