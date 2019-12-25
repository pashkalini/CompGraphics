function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");

    //Stage - это контейнер для всех DisplayObject
    var stage = new createjs.Stage(canvas);

    //сначала добавим на сцену Shape
    var house = new createjs.Shape();
    //рисовать на Shape можно как на Canvas
    //graphics - это аналог контекста, рисовать надо
    //на нем
    house.graphics
        .beginFill('#897b61')
        .beginStroke("#000")
        .rect(0, 0, 100, 80)
        .beginFill('#000')
        .moveTo(-10, 10).lineTo(50, -50).lineTo(110, 10).lineTo(-10, 10)
        .endFill()
        .beginStroke("#000")
        .rect(35, 25, 30, 30)
        .moveTo(50, 25).lineTo(50, 55)
        .moveTo(35, 40).lineTo(65, 40)
        .endStroke()
        .beginFill("#000")
        .rect(75, -40, 10, 30);
    house.regX = 50;
    house.regY = 50;
    house.x = 150;
    house.y = 150;

    //shape.rotation = 30;

    //добавить shape на сцену
    stage.addChild(house);

    //добавим еще спрайт на сцену
    //SpriteSheet - рисунок с кадрами
    var ss = new createjs.SpriteSheet({
        images: ["Monster.png"], //16 на 34 кадра
        frames: {
            width: 32,
            height: 32, //высота и ширина кадра
            count: 192,
            regX: 8, //pivot точка
            regY: 8
        },
        animations: { //список анимаций
            //названия придумаем сами
            one: 42, //один кадр номер 42
            small: [0, 33, "small"], //с 0 до 33 кадра,
                                     //а потом опять small
            big: [0, 5, "big"],
            boom: [6, 11] //последняя строка
        }
    });
    var monster = new createjs.Sprite(ss);
    monster.x = 200;
    monster.y = 200;
    monster.gotoAndPlay("big");
    stage.addChild(monster);

    stage.update(); //это команда на рисование сцены

    //либо давайте запустим таймер, который будет постоянно
    //перерисовывать сцену
    createjs.Ticker.framerate = 15; // кадров/сек
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    // createjs.Ticker.timingMode = createjs.Ticker.RAF;
    // createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;

    //метод on = addEventListener
    //добавить слушателя, что делать, когда сработал
    //таймер.
    //Особый случай. Если сцена указана как слушатель.
    //Тогда каждый раз вызывается stage.update()
    //createjs.Ticker.on("tick", stage);

    createjs.Ticker.on("tick", tick);

    var tickTime = createjs.Ticker.getTime();
    var speed = 100;

    function tick() {
      var curTime = createjs.Ticker.getEventTime();
      var elapsedTime = (curTime - tickTime) / 1000;
      tickTime = curTime;
      var dist = elapsedTime * speed;

        //теперь это тело игрового цикла
        var d = Math.sqrt((monster.x - house.x) * (monster.x - house.x) +
            (monster.y - house.y) * (monster.y - house.y));

        if (dist <= d) {
          monster.x += (house.x - monster.x) / d * dist;
          monster.y += (house.y - monster.y) / d * dist;
        }

        //это обновление данных, перемещаем шарик по сцене
        // sprite.x += 2;
        // if (sprite.x > 300)
        //     sprite.x = 10;

        //это перерисовка
        stage.update();
    }

    //добавим слушателя, который реагирует на нажатие
    //по шарику
    monster.on("click", boomClick);

    function boomClick() {
        monster.gotoAndPlay("boom");
        console.log("boom");
        monster.on("animationend", function () {
            console.log("boom finished");
            //уберем со сцены, объект больше
            //не будет рисоваться
            stage.removeChild(monster);
        });
    }

    house.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
    });
    house.on("pressup", function (evt) {
        console.log("up");
    })
}