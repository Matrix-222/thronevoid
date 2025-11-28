const canvas = document.getElementById("gameCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let player = { x: 50, y: canvas.height/2 - 25, width: 50, height: 50, speed: 2 };
    let direction = 1;

    function gameLoop() {
        // مسح الشاشة
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // رسم اللاعب
        ctx.fillStyle = "cyan";
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // حركة اللاعب
        player.x += player.speed * direction;
        if(player.x + player.width > canvas.width || player.x < 0) {
            direction *= -1;
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}

// Starfield background للصفحة الرئيسية
const starCanvas = document.getElementById('stars');
if(starCanvas){
    const ctx2 = starCanvas.getContext('2d');
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    const stars = Array.from({length:200}, () => ({
        x: Math.random()*starCanvas.width,
        y: Math.random()*starCanvas.height,
        size: Math.random()*2,
        speed: Math.random()*0.5 + 0.2
    }));

    function animateStars(){
        ctx2.clearRect(0,0,starCanvas.width,starCanvas.height);
        ctx2.fillStyle='white';
        stars.forEach(s=>{
            ctx2.beginPath();
            ctx2.arc(s.x,s.y,s.size,0,Math.PI*2);
            ctx2.fill();
            s.y += s.speed;
            if(s.y > starCanvas.height) s.y = 0;
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();
}
