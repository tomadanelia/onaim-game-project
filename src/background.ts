import { Application, Graphics} from "pixi.js";
import { initDevtools } from "@pixi/devtools";

const app = new Application();
initDevtools({ app });

await app.init({
  resizeTo: window,
  backgroundAlpha: 0,
});
document.body.appendChild(app.canvas);

const centerX = app.renderer.width / 2;
const centerY = app.renderer.height / 2;

const circleRadius = 150;

const background = new Graphics();
background.rect(0, 0, app.renderer.width, app.renderer.height);
background.fill(0x1a5c1a); 
app.stage.addChild(background);

const rays = new Graphics();
const numRays = 30; 
const radius = Math.max(app.renderer.width, app.renderer.height) * 1.5;
let isBonusRound=true;
function updateBackground() {
  const darkGreen = isBonusRound ? 0x4a1a5c : 0x1a5c1a;  
  const lightGreen = isBonusRound ? 0x6d2d7a : 0x2d7a2d;
  
  rays.clear();

for (let i = 0; i < numRays; i++) {
  const angle = (i * (360 / numRays)) * (Math.PI / 180);
  const nextAngle = ((i + 1) * (360 / numRays)) * (Math.PI / 180);
  
  const color = i % 2 === 0 ? lightGreen : darkGreen;
  
  rays.fill(color);
  rays.moveTo(centerX, centerY);
  rays.lineTo(
    centerX + Math.cos(angle) * radius,
    centerY + Math.sin(angle) * radius
  );
  rays.lineTo(
    centerX + Math.cos(nextAngle) * radius,
    centerY + Math.sin(nextAngle) * radius
  );
  rays.closePath();
  rays.fill();
}
}
updateBackground();
app.stage.addChild(rays);

const circle = new Graphics();
circle.circle(centerX, centerY, circleRadius);
circle.fill(0x2d7a2d);
circle.stroke({ width: 3, color: 0x1a5c1a });
app.stage.addChild(circle);
