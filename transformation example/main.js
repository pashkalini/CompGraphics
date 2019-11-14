function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d"); /*или назвать ctx*/

    /*drawings go here*/
    var rotation1 = 1;
    var rotation2 = 1;
    var partsNumb = 12;

    function drawCords() { // рисуем координаты
        c.save();
//
//        //x axis
//        c.beginPath();
//        c.moveTo(250, 150);
//        c.lineTo(270, 150);
//        c.strokeStyle = 'blue';
//        c.stroke();
//
//        c.beginPath();
//        c.moveTo(250, 150);
//        c.lineTo(250, 130);
//        c.strokeStyle = 'red';
//        c.stroke();
//        c.restore();
//

//
//        c.restore();
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(20, 0);
        c.strokeStyle = 'blue';
        c.stroke();

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, 20);
        c.strokeStyle = 'red';
        c.stroke();

        c.restore();

    }

    function drawPart1(i) { // рисуем лопасти
        c.save();

        c.strokeStyle = "orange";
        c.strokeRect(0, 0, 40, 180);
        c.translate(20, 180);
        //drawCords();
        c.rotate(-rotation1 - (i / partsNumb) * 2 * Math.PI);
        drawRope1();

        c.restore();
    }

    function drawRope1() { //рисуем веревочки
        c.save();
        c.strokeRect(0, 0, 2, 120);
        c.translate(1, 120);

        c.rotate(-rotation2);
        for (var i = 1; i <= partsNumb; i++) {
            c.rotate(2 * Math.PI / partsNumb);
            drawPart2(i);
        }
        // drawPart2();
        c.restore();

    }

    function drawPart2(i) {
        c.save();

        c.strokeStyle = "orange";
        c.strokeRect(0, 0, 10, 40);
        c.translate(5, 40);
        c.rotate(rotation2 - Math.PI * 2 * i / partsNumb);

        //drawRope2();
        c.restore();
    }

    function drawRope2() { //рисуем веревочки
        c.save();
        c.strokeRect(0, 0, 1, 40);
        c.restore();
    }

    function draw() {

        //requestAnimationFrame(draw);
        var x0 = canvas.width / 2;    //250
        var y0 = canvas.height / 2;   //150
        // var w = 20;
        //var h = 100;
        //var rotation = 0;
        c.save();
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.translate(x0, y0);
        c.rotate(rotation1);

        for (var i = 1; i <= partsNumb; i++) {
            c.rotate(2 * Math.PI / partsNumb);
            drawPart1(i);
        }
        //c.restore();
        // c.save();


        //c.fillRect(0, 0, w, h);
        //c.rotate(rotation);
        c.restore();

        //rotation += Math.PI / 180;
    }

    function animate() {
        rotation1 += 0.01;
        rotation2 += 0.05;
    }

    function loop() {
        animate();
        draw();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}