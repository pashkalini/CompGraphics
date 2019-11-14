function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");

    //Stage - это контейнер для всех DisplayObject
    var stage = new createjs.Stage(canvas);

    var envi  = new createjs.Shape();

    // envi.graphics
    //     .beginFill('#000')
    //     .beginStroke("#000")
    //     .rect(0,  620, 250, 80)
    //     .moveTo(200, 620).lineTo(200, 560)
    //     .moveTo(210, 620).lineTo(210, 580)
    //     .moveTo(220, 620).lineTo(220, 555)
    //     .moveTo(230, 620).lineTo(230, 570)
    //     .moveTo(240, 620).lineTo(240, 560)
    //     .rect(250, 500, 150, 200)
    //     .moveTo(420, 700).lineTo(420, 600)
    //     .moveTo(440, 700).lineTo(440, 650)
    //     .moveTo(460, 700).lineTo(460, 550)
    //     .moveTo(480, 700).lineTo(480, 530)
    //     .moveTo(500, 700).lineTo(500, 570)
    //     .rect(460, 400, 80, 40)

    var map = ["........",
               "........",
               "...#....",
               "########"];

    // envi.regX = 50;
    // envi.regY = 50;
    // envi.x = 150;
    // envi.y = 150;

    stage.addChild(envi);
    stage.update();



}