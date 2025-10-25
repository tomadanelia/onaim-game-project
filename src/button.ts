import { Graphics, Text } from "pixi.js";

export class CasinoButton extends Graphics {
  private textDisplay: Text;
  private isHovered = false;
  private buttonWidth: number;  
  private buttonHeight: number; 
  private buttonValue: number;  
  
  constructor(value: number, width = 90, height = 70) {
    super(); 
    
    this.buttonValue = value;
    this.buttonWidth = width;
    this.buttonHeight = height;
    
    this.eventMode = 'static';
    this.cursor = 'pointer';
    

    this.textDisplay = new Text({
      text: `$${this.buttonValue}`,
      style: {
        fontSize: 28,
        fontWeight: 'bold',
        fill: 0xFFD700,
      }
    });
    this.textDisplay.anchor.set(0.5);
    this.textDisplay.position.set(this.buttonWidth / 2, this.buttonHeight / 2);
    this.addChild(this.textDisplay);
    
    this.draw();
    this.setupInteractivity();
  }
  
  private draw() {
    this.clear();
    
    const borderColor = this.isHovered ? 0x4CAF50 : 0x2d7a2d;
    const bgColor = this.isHovered ? 0x2d7a2d : 0x1a5c1a;
    
  
    this.fill(0x0d2d0d);
    this.roundRect(2, 4, this.buttonWidth, this.buttonHeight, 8);
    this.fill();
    
   
    this.fill(bgColor);
    this.roundRect(0, 0, this.buttonWidth, this.buttonHeight, 8);
    this.fill();
    
    
    this.stroke({ width: 3, color: borderColor });
    this.roundRect(0, 0, this.buttonWidth, this.buttonHeight, 8);
    this.stroke();
  }
  
  private setupInteractivity() {
    this.on('pointerover', () => {
      this.isHovered = true;
      this.draw();
    });
    
    this.on('pointerout', () => {
      this.isHovered = false;
      this.draw();
    });
    
    this.on('pointerdown', () => {
      console.log(`Button $${this.buttonValue} clicked!`);
      this.emit('buttonClick', this.buttonValue);
    });
  }
}