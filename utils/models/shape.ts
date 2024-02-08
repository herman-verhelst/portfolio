import {mapNumber} from "~/utils/number-utils";

export class Shape {
    public size: number;
    public directionX: number;
    public directionY: number;
    public posX: number;
    public posY: number;
    public speed: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        const
            sizeMin = 2,
            sizeMax = 5,
            directionMin = -1,
            directionMax = 1,
            speedMin = .01,
            speedMax = .02;

        this.size = Math.random() * (sizeMax - sizeMin) + sizeMin;
        this.speed = Math.random() * (speedMax - speedMin) + speedMin;

        this.directionX = Math.random() * (directionMax - directionMin) + directionMin;
        this.directionY = Math.random() * (directionMax - directionMin) + directionMin;

        const generatedSide = Math.random();
        if (generatedSide < .25) {
            // left
            this.posY = Math.random() * canvasHeight;
            this.posX = -this.size / 2;
            this.directionX = mapNumber(this.directionX, 0, directionMax, directionMin, directionMax)

        } else if (generatedSide < .5) {
            // right
            this.posY = Math.random() * canvasHeight;
            this.posX = canvasWidth + this.size / 2;
            this.directionX = mapNumber(this.directionX, directionMin, 0, directionMin, directionMax)
        } else if (generatedSide < .75) {
            // top
            this.posX = Math.random() * canvasWidth;
            this.posY = -this.size / 2;
            this.directionY = mapNumber(this.directionY, 0, directionMax, directionMin, directionMax)
        } else {
            // bottom
            this.posX = Math.random() * canvasWidth;
            this.posY = canvasHeight + this.size / 2;
            this.directionY = mapNumber(this.directionY, directionMin, 0, directionMin, directionMax)

        }
    }

    isOutsideCanvas(canvasWidth: number, canvasHeight: number): boolean {
        return this.posX < (-this.size / 2)
            || this.posX > (canvasWidth + this.size / 2)
            || this.posY < (-this.size / 2)
            || this.posY > (canvasHeight + this.size / 2)
    }

    move(): void {
        this.posX += this.directionX * this.speed;
        this.posY += this.directionY * this.speed;
    }
}