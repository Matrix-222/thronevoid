```javascript
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = 400;


let x = 50;
let speed = 2;


function loop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);


ctx.fillStyle = "cyan";
ctx.fillRect(x, 180, 50, 50);


x += speed;
if (x > canvas.width - 50 || x < 0) speed *= -1;


requestAnimationFrame(loop);
}


loop();
```
