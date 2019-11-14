function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d"); /*или назвать ctx*/

    function getCurrentTime() {
        //количество миллисекунд, которые прошли с 1 янв 1970
        return new Date().getTime();
    }

    //момент рисования предыдущего кадра
    var lastFrameTime = getCurrentTime();

    //двигаем шарик. Это координаты центра
    var X0 = 100;
    var Y0 = 75;
    var H = 150;
    var W = 300;
    /*var r = 10;
    var x = X0 + r;
    var y = Y0 + r;
    var vx = 42;
    var vy = 42;*/
    balls = [
        {x: X0 + 15, y: Y0 + 10, r: 15, vx: 42 , vy: 42},
        {x: X0 + 20, y: Y0 + 20 + 20, r: 15 , vx: 50 * Math.random(), vy: 50 * Math.random()},
        {x: X0 + W  - 20, y: Y0 + 10, r: 15, vx: 32, vy: 32},
        {x: X0 + W - 20, y: Y0 + H - 25, r: 15, vx: 32, vy: 32},
        ];
    var SPEED = 42; //пикселя в секунду

    var ballsSprites = new Image();
    ballsSprites.src = "balls.png";
    //обратите внимание, загрузка картинки сделана
    //один раз. Не пишите загрузку картинки, например,
    //в drawFrame

    //параметры нашего листа со спрайтами
    var SPRITE_W = 16, SPRITE_H = 16;
    var SPRITES_IN_LINE = 34;
    //левый верхний угол, откуда начинать вырезать
    var SPRITE_X0 = 0, SPRITE_Y0 = 0;
    var FPS = 20;

    var frameIndex = 0; //номер кадра
    //это параметр, который будет анимироваться,
    //т.е. изменяться со временем

    //время начала вращения = время загрузки,
    //переводим в секунды
    var rotation_start_time = getCurrentTime() / 1000;

    canvas.addEventListener("click", canvasClicked);


    //функция рисования одного кадра
    function drawFrame() {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.strokeRect(X0, Y0, W, H);
        for (var b of balls) {
            c.beginPath();
            c.arc(b.x, b.y, b.r, 0, 2 * Math.PI);

            c.drawImage(
                ballsSprites,
                //x, y, откда вырезать
                SPRITE_X0 + SPRITE_W * frameIndex,
                SPRITE_Y0,
                // размер вырезания
                SPRITE_W, SPRITE_H,
                // где рисуем
                b.x, b.y,
                // размер рисования
                b.r, b.r
            );
        }
    }

    //сколько прошло времени с момента рисования предыдущего кадра
    function animate(currentTime, elapsedTime) {
        //анимируем только координаты

        for (var b of balls) {
            // b.x += b.vx * elapsedTime;
            // b.y += b.vy * elapsedTime;
            b.x += b.vx * elapsedTime;
            b.y += b.vy * elapsedTime;
            frameIndex = Math.floor( //округление вниз
                FPS * (currentTime - rotation_start_time)
            ) % SPRITES_IN_LINE;

            if (b.y + b.r > H + Y0)
                b.vy = -b.vy;
            if (b.y - b.r < Y0 - SPRITE_H)
                b.vy = -b.vy;
            if (b.x + b.r > X0 + W)
                b.vx = -b.vx;
            if (b.x - b.r < X0 + SPRITE_W)
                b.vx = -b.vx;
        }
    }

    //"игровой цикл"
    function loop() {
        var currentTime = getCurrentTime();
        animate(currentTime / 1000,
            (currentTime - lastFrameTime) / 1000);
        lastFrameTime = currentTime;

        drawFrame();
        requestAnimationFrame(loop);

    }

    requestAnimationFrame(loop);

    function canvasClicked(e) {
        console.info("click", e);

        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        //клик в (x, y)
        console.info("click at", x, y);
         if (x < X0 - SPRITE_W + W && x > X0 && y < Y0 - SPRITE_H + H && y > Y0)
             balls.push({x: x, y: y, r: 15, vx: 32, vy: 32});
         else
             console.info('out of canvas');

//        for (var i = 0; i < balls.length; i++) {
//            if ((balls[i].x == x) && (balls[i].y == y))
//                balls.splice(i, 1);
        //}
    }
}
