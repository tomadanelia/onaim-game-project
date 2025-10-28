import  { Application, Graphics,Text, TextStyle } from "pixi.js";
export class BackgroundBoard {
    private centerX: number;
    private centerY: number;
    private shapeSize: number = 100; 
    private background: Graphics;
    private rays: Graphics;
    private shape: Graphics; 
    private numRays: number = 30;
    private radius: number;
    private isBonusRound: boolean = false; 
    private app: Application;

    constructor(app: Application) {
        this.app = app;
        
        this.centerX = app.renderer.width / 2;
        this.centerY = app.renderer.height / 2;
        this.radius = Math.max(app.renderer.width, app.renderer.height) * 1.5;

        this.background = new Graphics();
        this.rays = new Graphics();
        this.shape = new Graphics();

        this.createBackground();
        this.createRays();
        this.createShape();
    }

    private createBackground() {
        this.background.rect(0, 0, this.app.renderer.width, this.app.renderer.height);
        this.background.fill(0x1a5c1a);
        this.app.stage.addChild(this.background);
    }

    public toggleBonusRound(value: boolean) {
        this.isBonusRound = value;
        this.updateBackground();
        this.updateShape(); 
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

    private createShape() {
        this.updateShape();
        this.app.stage.addChild(this.shape);
    }

    private updateShape() {
        this.shape.clear();

        if (this.isBonusRound) {
            const squareSize = this.shapeSize * 2;
            this.shape.rect(
                this.centerX - squareSize / 2, 
                this.centerY - squareSize / 2, 
                squareSize, 
                squareSize
            );
            this.shape.fill(0xFFD700);
            this.shape.stroke({ width: 3, color: 0xDAA520 });
            const style = new TextStyle({
    fontFamily: "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
    fontSize: 40,
    fontWeight: "800",
    fill: "#ffffff",
    letterSpacing: 0,
    dropShadow: {
        color: "#163e16ff",      
        blur: 0,               
        angle: Math.PI / 4,    
        distance: 5,           
    },
});
            const text = new Text({
                text: "BONUS",
                style});
            text.x = this.centerX;
            text.y = this.centerY;
            text.anchor.set(0.5);
            this.shape.addChild(text);
             
        } else {

            
            this.shape.circle(this.centerX, this.centerY, this.shapeSize);
            this.shape.fill(0x2d7a2d);
            this.shape.stroke({ width: 3, color: 0x1a5c1a });
            const style = new TextStyle({
    fontFamily: "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
    fontSize: 40,
    fontWeight: "800",
    fill: "#ffffff",
    letterSpacing: 0,
    dropShadow: {
        color: "#163e16ff",      
        blur: 0,               
        angle: Math.PI / 4,    
        distance: 5,           
    },
});
            const text = new Text({
                text: "DEFAULT",
                style,
            });
           text.x = this.centerX;
        text.y = this.centerY;
            text.anchor.set(0.5);
            this.shape.addChild(text);
        }
    }
}