const canvas = document.getElementById('canvas');
const cont = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArr = [];
var hue = 0;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for(var i = 0; i < 3; i++){
        particlesArr.push(new Particle);
    }
})

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for(var i = 0; i < 3; i++){
        particlesArr.push(new Particle);
    }
})

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + '100%, ' + '50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2){
            this.size -= 0.15;
        }
    }
    draw(){
        cont.fillStyle = 'hsl(' + hue + ',100%,' + '50%)';
        cont.beginPath();
        cont.arc(this.x, this.y, this.size , 0, Math.PI * 2);
        cont.fill();
    }
}

handleParticle = () => {
    for(var i = 0; i < particlesArr.length ; i++){
        particlesArr[i].update();
        particlesArr[i].draw();
        for(var j = i; j < particlesArr.length; j++){
            var dx = particlesArr[i].x - particlesArr[j].x;
            var dy = particlesArr[i].y - particlesArr[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
                cont.beginPath();
                cont.strokeStyle = 'hsl(' + hue + ',100%,' + '50%)';
                cont.lineWidth = .2;
                cont.moveTo(particlesArr[i].x, particlesArr[i].y);
                cont.lineTo(particlesArr[j].x, particlesArr[j].y);
                cont.stroke();
            }
        }
        if(particlesArr[i].size <= 0.3){
            particlesArr.splice(i, 1);
            i--;
        }
    }
}

animate = () => {
    // cont.clearRect(0, 0, canvas.width, canvas.height);
    cont.fillStyle = 'rgba(255, 255,255, .5)'
    cont.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue += 2;
    requestAnimationFrame(animate);
}

animate();
