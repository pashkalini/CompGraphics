function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d"); /*или назвать ctx*/

    function getCurrentTime() {
        //колличество миллисекунд, которые прошли с
        //1 января 1970
        return new Date().getTime();
    }

    //момент рисования предыдущего кадра
    var lastFrameTime = getCurrentTime();

    //двигаем шарик. Это координаты центра
    var x = 0;
    var y = 0;
    var SPEED = 42; //пикселя в секунду

    /*
    // получаем доступ к картинке, которая уже
    // загрузилась на html странице
    var catImageFromHTML =
        document.getElementById('cat-img');
    // или загрузим картинку прямо в коде
    var catImageFromJS = new Image(); //виртуальный <img>
    catImageFromJS.src = "cat.jpg";
    catImageFromJS.onload = function() {
        console.info("cat.jpg image loaded!");
    }; // это событие обрабатывать не обязательно

    function drawFrame() {
        c.clearRect(0, 0, canvas.width, canvas.height);

        c.beginPath();
        c.arc(x, y, 10, 0, 2 * Math.PI);
        c.fillStyle = "red";
        c.strokeStyle = "green";
        c.fill();
        c.stroke();

        //как нарисовать картинку?
        // c.drawImage(catImageFromJS, x, y);
        // c.drawImage(catImageFromHTML, x, y);
        c.drawImage(
            catImageFromHTML,
            x, y,
            // можно указать размер, какой рисовать
            40, 40
        );
        c.drawImage(
            catImageFromJS,
            50, 50, // координаты в исходной картинке,
            100, 100, // размер выреза
            x, y, // координаты, где рисовать
            100, 100 // размер, какой рисовать
        );
    }
    */

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

    function drawFrame() {
        c.clearRect(0, 0, canvas.width, canvas.height);

        c.drawImage(
            ballsSprites,
            //x, y, откда вырезать
            SPRITE_X0 + SPRITE_W * frameIndex,
            SPRITE_Y0,
            // размер вырезания
            SPRITE_W, SPRITE_H,
            // где рисуем
            x, y,
            // размер рисования
            SPRITE_W, SPRITE_H
        )
    }

    //передаем текущее время и
    //сколько прошло времени с момента рисования
    //предыдущего кадра. В секунду
    function animate(currentTime, elapsedTime) {
        //анимируем только координаты
        x += SPEED * elapsedTime;
        y += SPEED * elapsedTime;
        frameIndex = Math.floor( //округление вниз
            FPS * (currentTime - rotation_start_time)
        ) % SPRITES_IN_LINE;
    }

    //"игровой цикл"
    function loop() {
        var currentTime = getCurrentTime();
        animate(
            currentTime / 1000,
            (currentTime - lastFrameTime) / 1000
        );
        lastFrameTime = currentTime;

        drawFrame();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}