function drawSky(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 1000, 380);
}

function drawGrass(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 380, 1000, 120);
}

function drawSun(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, 70, 0, Math.PI);
    ctx.fill();
}

function drawHause(ctx) {
    ctx.fillStyle = 'orange';
    ctx.fillRect(360, 260, 260, 235);
}

function drawTrumpet(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(555, 155, 30, 90);
}

function drawWindow(ctx) {
    ctx.fillStyle = 'pink';
    ctx.fillRect(445, 290, 90, 120);
}

function drawFrames(ctx) {
    ctx.beginPath();
    ctx.moveTo(490, 290);
    ctx.lineTo(490, 410);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(445, 350);
    ctx.lineTo(535, 350);
    ctx.stroke();
}

function drawHauseRoof(ctx) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(500, 140);
    ctx.lineTo(620, 260);
    ctx.lineTo(360, 260);
    ctx.fill();
}

function drawCloud(ctx, beginX, beginY) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(beginX, beginY, 60, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(beginX + 40, beginY + 10, 60, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(beginX - 40, beginY + 10, 60, 24, 0, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    const canvas = document.getElementById('canvas');
    const maxWidth = canvas.width;
    const maxHeight = canvas.height;
    canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    
    drawSky(ctx);
    drawGrass(ctx);
    drawSun(ctx);
    drawCloud(ctx, 200, 80);
    drawCloud(ctx, 800, 80);
    drawCloud(ctx, 500, 50);
    drawHause(ctx);
    drawWindow(ctx);
    drawFrames(ctx);
    drawTrumpet(ctx);
    drawHauseRoof(ctx);
}

window.onload = function() {
    draw();
};