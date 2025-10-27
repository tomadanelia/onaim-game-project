import { Application, Graphics } from "pixi.js";
import { initDevtools } from "@pixi/devtools";

export class BackgroundBoard {
    public app: Application;
    private centerX: number;
    private centerY: number;
    private circleRadius: number = 150;
    private background: Graphics;
    private rays: Graphics;
    private circle: Graphics;
    private numRays: number = 30;
    private radius: number;
    private isBonusRound: boolean = true;

    constructor(pixels: HTMLElement) {
        this.app = new Application();
        initDevtools({ app: this.app });

        this.app.init({
            resizeTo: window,
            backgroundAlpha: 0,
        });

        pixels.appendChild(this.app.canvas);

        this.centerX = this.app.renderer.width / 2;
        this.centerY = this.app.renderer.height / 2;
        this.radius = Math.max(this.app.renderer.width, this.app.renderer.height) * 1.5;

        this.background = new Graphics();
        this.rays = new Graphics();
        this.circle = new Graphics();

        this.createBackground();
        this.createRays();
        this.createCircle();
    }

    private createBackground() {
        this.background.rect(0, 0, this.app.renderer.width, this.app.renderer.height);
        this.background.fill(0x1a5c1a);
        this.app.stage.addChild(this.background);
    }

    public toggleBonusRound(value: boolean) {
        this.isBonusRound = value;
        this.updateBackground();
    }

    private createRays() {
        this.updateBackground();
        this.app.stage.addChild(this.rays);
    }

    private updateBackground() {
        const darkGreen = this.isBonusRound ? 0x4a1a5c : 0x1a5c1a;
        const lightGreen = this.isBonusRound ? 0x6d2d7a : 0x2d7a2d;

        this.rays.clear();

        for (let i = 0; i < this.numRays; i++) {
            const angle = (i * (360 / this.numRays)) * (Math.PI / 180);
            const nextAngle = ((i + 1) * (360 / this.numRays)) * (Math.PI / 180);

            const color = i % 2 === 0 ? lightGreen : darkGreen;

            this.rays.fill(color);
            this.rays.moveTo(this.centerX, this.centerY);
            this.rays.lineTo(
                this.centerX + Math.cos(angle) * this.radius,
                this.centerY + Math.sin(angle) * this.radius
            );
            this.rays.lineTo(
                this.centerX + Math.cos(nextAngle) * this.radius,
                this.centerY + Math.sin(nextAngle) * this.radius
            );
            this.rays.closePath();
            this.rays.fill();
        }
    }

    private createCircle() {
        this.circle.circle(this.centerX, this.centerY, this.circleRadius);
        this.circle.fill(0x2d7a2d);
        this.circle.stroke({ width: 3, color: 0x1a5c1a });
        this.app.stage.addChild(this.circle);
    }
}
