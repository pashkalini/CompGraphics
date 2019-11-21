function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");

    //Stage - это контейнер для всех DisplayObject
    var stage = new createjs.Stage(canvas);

//    var envi  = new createjs.Shape();
    var blockX = 50;
    var blockY = 50;
    var map = ["................", // 16:8
               "................",
               ".........##.....",
               ".##............",
               "......#.....#...",
               ".........#......",
               "...#....##......",
               "######........##"];
    var block = new createjs.Shape();

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i].charAt(j) === "#") {
                block.graphics
                    .beginFill('#567b89')
                    .rect(blockX * j, blockY * i, blockX, blockY);
                stage.addChild(block);
            }
        }
    }
    stage.update();

    var ss = new createjs.SpriteSheet({
        images: ["Monster.png"], //16 на 34 кадра
        frames: {
            width: 32,
            height: 32, //высота и ширина кадра
            count: 192,
            regX: 8, //pivot точка
            regY: 8
        },
        // animations: { //список анимаций
        //     //названия придумаем сами
        //     one: 42, //один кадр номер 42
        //     small: [0, 33, "small"], //с 0 до 33 кадра,
        //                              //а потом опять small
        //     big: [0, 5, "big"],
        //     boom: [6, 11] //последняя строка
        // }
    });
    var monster = new createjs.Sprite(ss);
    monster.x = 5;
    monster.y = 330;
    //monster.gotoAndPlay("big");
    stage.addChild(monster);

    stage.update();

}