function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    let canvas = document.getElementById("game");

    //Stage - это контейнер для всех DisplayObject
    let stage = new createjs.Stage(canvas);
    const G = 9.8 * 40;
//    var envi  = new createjs.Shape();
    let blockX = 45;
    let blockY = 45;
    let CHAR_WIDTH = 20;
    let CHAR_HEIGHT = 23;

    let map = ["................", // 16:9
        "................",
        "................",
        ".........##.....",
        ".##............",
        "............#...",
        "......#..#......",
        "...#....##......",
        "######........##"];

    let block = new createjs.Shape();
    let blockCords = [];

    let image = new Image();
    image.src = "block.png";

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i].charAt(j) === "#") {
                block.graphics
                    //.beginStroke('#567b89')
                    .beginBitmapFill(image, 'repeat')
                    .rect(blockX * j, blockY * i, blockX, blockY);
                // block.x3 = blockX * j;
                // block.y3 = blockY * j;
                // block.x4 = blockX * j + blockX;
                // block.y4 = blockY * j + blockY;
                stage.addChild(block);

                blockCords.push([blockX * j, blockY * i, blockX * j + blockX,
                    blockY * i + blockY]);

            }
        }
    }
    stage.update();

    let ss = new createjs.SpriteSheet({
        images: ["Monster_walk.png"], //16 на 34 кадра
        frames: {
            width: 32,
            height: 32, //высота и ширина кадра
            count: 192,
            regX: 8, //pivot точка
            regY: 8
        },
        animations: { //список анимаций
            idle: 0,
            run: [0, 5, "run"],
        }
    });

    let monster = new createjs.Sprite(ss);

    monster.x = 5;// левый верхний угол
    monster.y = -45;

    monster.vx = 0;
    monster.vy = 0;

    // var tickTime = createjs.Ticker.getTime();
    // var curTime = createjs.Ticker.getEventTime();
    // var delta_t = (curTime - tickTime) / 1000;

    let keys = {};

    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;

    function keydown(event) {
        keys[event.keyCode] = true;
    }

    function keyup(event) {
        delete keys[event.keyCode];
    }


    function find_intersecting_block() {
        let x1 = monster.x;
        let y1 = monster.y;
        let x2 = monster.x + CHAR_WIDTH;
        let y2 = monster.y + CHAR_HEIGHT;

        for (let blockCord of blockCords) {
            let x3 = blockCord[0];
            let y3 = blockCord[1];
            let x4 = blockCord[2];
            let y4 = blockCord[3];
            // if monster пересекся со стеной снизу, vy = 0,
            // вернуть y как он был до изменения
            // if monster пересекся со стеной сбоку, vx = 0,
            // вернуть y как он был до изменения
            //условие пересечения блока и монстра

            if (!(x2 <= x3 || x4 <= x1) && !(y2 <= y3 || y4 <= y1)) {
                let variants = [];

                let left = x2 - x3;
                variants.push([-left, 0, false]);
                let right = x4 - x1;
                variants.push([right, 0, false]);
                let up = y2 - y3;
                variants.push([0, -up, true]); // стоит на земле
                let down = y4 - y1;
                variants.push([0, down, false]); //TODO variants = [[], [], ...]

                let min_len = 1e10;
                let optimal_move = [0, 0, false];
                for (let xy of variants) {
                    let len = Math.abs(xy[0]) + Math.abs(xy[1]);
                    if (len < min_len) {
                        min_len = len;
                        optimal_move = xy;
                    }
                }

                return [blockCord, optimal_move];
            }
        }

        return null;
    }

    let onGround;

    let currentAnimation = "";

    function heroAnimation(hero) {
        if (hero === currentAnimation)
            return;
        currentAnimation = hero;
        monster.gotoAndPlay(hero);
    }

    monster.on('tick', function () {
        let delta_t = 1 / createjs.Ticker.getMeasuredFPS();

        let monster_old_x = monster.x;
        let monster_old_y = monster.y;

        monster.vy += G * delta_t;
        monster.y += monster.vy * delta_t;

        //monster.vx += delta_t;
        monster.x += monster.vx * delta_t;

        let blockCordAndOptimalMove = find_intersecting_block();
        if (blockCordAndOptimalMove !== null) {
            let optimal_move = blockCordAndOptimalMove[1];
            monster.x += optimal_move[0];
            monster.y += optimal_move[1];
            //monster.vx = 0;
            monster.vy = 0;
            //monster.y = monster_old_y;
            if (optimal_move[2] === true)
                onGround = optimal_move[2];
            else
                onGround = false;
            //TODO точнее вычислить положение героя
        }
        //TODO прыжок только с земли

        //посмотреть управление с клавиш
        // нажали влево => vx = -100
        // нажали вправо => vx = 100
        // не нажали влево или вправо => vx = 0
        // нажали вверх => vy = -200

        let nextAnimation = "idle";

        if (keys[37]) {// влево
            //monster.x -= monster.vx;
            monster.vx = -150;
            //monster.gotoAndPlay("big");
            nextAnimation = "run";

        }

        if (keys[38] && onGround === true) { // вверх
            //monster.y -= monster.vy;
            monster.vy = -250;
            onGround = false;

        }

        if (keys[39]) {// вправо
            // monster.x += monster.vx;
            monster.vx = 150;
            nextAnimation = "run";
        }
        // console.log("vy", monster.vy);
        // console.log("vx", monster.vx);
        // console.log("y", monster.y);
        // console.log("x", monster.x);

        if (keys[40]) // вниз
            monster.vx = 0;

        if (!keys[37] && !keys[39])
            monster.vx = 0;

        heroAnimation(nextAnimation);
    });


    stage.addChild(monster);

    createjs.Ticker.framerate = 30;
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.on("tick", stage);
}
