function HslColor({         // цвет
    hue,
    saturation,
    lightness,
}) {
    this.h = hue;          // оттенок 0..360
    this.s = saturation;   // насыщение 1
    this.l = lightness;    // светлота 1-белый, 0-черный

    this.toFillStyle = function () {
        const h = this.h;  // 240
        const s = this.s * 100;
        const l = this.l; 
        return "hsl(" + h + "," + s + "%," + l + "%)"; // меняется цвет, надо l
    }
}

function Sun({      // солнце
    startX,
    startY,
    radius,
    angle 
}) {
    this.x = startX;
    this.y = startY;
    this.r = radius;
    this.ang = angle;
}

function Sky({color}) {  // небо
    this.color = color;
}

function Cloud({  // облака
    startX,
    startY,
    radius,
    direction,  // конечная точка вектора (направление показывает)
    speed
}) {
    this.x = startX;
    this.y = startY;
    this.r = radius;
    this.dir = direction;
    this.s = speed
}

function drawSky({ctx, sky, width, height}) {  // небо
    ctx.fillStyle = sky.color.toFillStyle();
    ctx.fillRect(0, 0, width, height * 0.76);
}

function drawSun({ctx, sun})  {  // рисование солнца, х,у - берем из нашей модели Ball
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
    ctx.fill();
}

function drawGrass(ctx, width, height) { // трава (0, 380, 1000, 120);
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.rect(0, height * 0.76, width, height * 0.24);
    ctx.fill();
}

function drawHause(ctx, width, height) {  // дом (360, 260, 260, 235);
    ctx.fillStyle = "orange";
    ctx.fillRect(width * 0.36, height * 0.52, width * 0.26, height * 0.47);

// труба (555, 155, 30, 90);
    ctx.fillStyle = "silver";
    ctx.fillRect(width * 0.555, height * 0.31, width * 0.03, height * 0.18);

// окно (445, 290, 90, 120);
    ctx.fillStyle = "pink";
    ctx.fillRect(width * 0.445, height * 0.58, width * 0.09, height * 0.24);

// рамы (ctx, width, height)  
    ctx.beginPath();
    ctx.moveTo(width * 0.49, height * 0.58); // (490, 290)
    ctx.lineTo(width * 0.49, height * 0.82); // (490, 410)
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width * 0.445, height * 0.7); // (445, 350)
    ctx.lineTo(width * 0.535, height * 0.7); // (535, 350)
    ctx.stroke();

// крыша (ctx, width, height)  
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.28); // (500, 140)
    ctx.lineTo(width * 0.62, height * 0.52); // (620, 260)
    ctx.lineTo(width * 0.36, height * 0.52); // (360, 260)
    ctx.fill();
}

function drawCloud({ctx, cloud, rX, rY}) {  // облака
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.ellipse(cloud.x, cloud.y, rX, rY , 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloud.x + rX / 2, cloud.y + rY / 2, rX, rY , 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloud.x - rX / 2, cloud.y + rY / 2, rX, rY, 0, 0, Math.PI * 2);
    ctx.fill();
}

function redraw({ctx, sky, sun, clouds, width, height}) {  // общая перерисовка неба, солнца, облаков
   
    drawSky({ctx, sky, width, height});
    drawSun({ctx, sun});
    drawGrass(ctx, width, height);
    drawHause(ctx, width, height);
    for (const cloud of clouds) { 
        drawCloud({ctx, cloud, rX: 50, rY: 30});
    }
}

function moveSun({sun, boxWidth, boxHeight, dt}) {  // обновление позиции солнца (после смещения место)
    const distance = 0.5 * dt;  // скорость движения солнца
    sun.ang = (sun.ang + distance) % (2 * Math.PI);
    sun.x = 370 * Math.sin(-sun.ang) + boxWidth / 2; // радиус (центр)
    sun.y = 395 * Math.cos(sun.ang) + boxHeight * 0.8; 
}

function moveCloud({distance, cloud, boxWidth, boxHeight}) { // обновление позиции облака
    cloud.r = 50;
    cloud.x -= distance;
    cloud.y +=  0.5 * Math.sin(cloud.dir * cloud.x / boxWidth);

    if (cloud.x + cloud.r * 1.5 < 0) {
        cloud.x = boxWidth + cloud.r * 1.5;
        cloud.y = boxHeight * 0.1;
    }
}

function createClouds({boxWidth, boxHeight, speed, direction}) {
    const startX = boxWidth;
    const startY = boxHeight;
    return new Cloud({
        startX,
        startY,     
        speed,
        direction
    });
}

function moveClouds({clouds, dt, boxWidth, boxHeight}) {
    for (const cloud of clouds) {
        distance = cloud.s * dt;
        moveCloud({
            distance,
            cloud,
            boxWidth,
            boxHeight
        });   
    } 
}

function updateSky({sky, angle}) { // обновление цвета неба
    const lightness = (Math.sin(angle - Math.PI/2) + 1) * 50 - 50;
    sky.color.l = lightness
}

function update({clouds, sun, sky, boxWidth: width, boxHeight: height, dt}) { // обновление всей анимации
    moveClouds({dt, clouds, boxWidth: width, boxHeight: height}); 
    moveSun({dt, sun,  boxWidth: width, boxHeight: height});
    updateSky({sky, angle: sun.ang});
}

function main() {  
    const canvasEl = document.getElementById("canvas");

    const width = canvasEl.offsetWidth;
    const height = canvasEl.offsetHeight;
    const ctx = canvas.getContext('2d');

    const RADIUS = 40;
    const CLOUD_COUNT = 3;
    const CLOUD_SPEED = 10; //10px в секунду
  
    let clouds = [];

    for (let i = 0; i < CLOUD_COUNT; i++) {
        clouds.push(createClouds({
            boxWidth: Math.random() * width,
            boxHeight: Math.random() * 40 + 30,
            speed: Math.random() * CLOUD_SPEED + 100,
            direction: Math.random() * 20
        }));
    }

    let sun = new Sun({startX: width / 4, startY: height / 0.8, radius: RADIUS, angle: 0.5 * Math.PI});
    let hsl = new HslColor({hue: 240, saturation: 1, lightness: 25});
    let sky = new Sky({color: hsl});

    redraw({ctx, sky, sun, clouds, width, height});  // прорисовка статики первоначальная
  
    cloud = clouds[1];

    let lastTimestamp = Date.now(); //текущее время в ms
    const animateFn = () => {
        const currentTimeStamp = Date.now();
        const deltaTime = (currentTimeStamp - lastTimestamp) * 0.001; //сколько секунд прошло с прошлого кадра
        lastTimestamp = currentTimeStamp;
        update({clouds, sun, sky, boxWidth: width, boxHeight: height, dt: deltaTime});
        redraw({ctx, sky, sun, clouds, width, height});
        requestAnimationFrame(animateFn);  // рекурсивный вызов 
    }
    animateFn();  
}