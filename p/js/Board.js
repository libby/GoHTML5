function Board(sqNum, gCanvasElement) {

    this.gCanvasElement = gCanvasElement
    this.sqNum = sqNum

    this.draw = function(sqNum) {
       var szSq = gCanvasElement.width / sqNum;
       var el = document.getElementById('c1');
       var context =  el.getContext("2d");
       for (var x = 0.5; x < gCanvasElement.width; x += szSq) {
           context.moveTo(x, 0);
           context.lineTo(x, gCanvasElement.width);
        }
        for (var y = 0.5; y < gCanvasElement.height; y += szSq) {
           context.moveTo(0, y);
           context.lineTo(gCanvasElement.height, y);
         }
         context.strokeStyle = "#444444";
         context.stroke();
     }
//
//     this.goBoardClick = function(e,board) {
//           console.debug('board clicked' + this)
//            var cell = game.board.getCursorPosition(e);
//          //  console.debug('board clicked! ' + cell +  'legal move ' + checkMove(cell[0],cell[1]));
//            var move = game.board.checkMove(cell[0],cell[1])
//            if(move.valid) {
//                drawMove(move.xPos-10,move.yPos-10,20,20)
//            }
//        }


         //http://snipt.net/sayanriju/get-cursor-position-of-clicked-mouse-on-a-html5-canvas/
        this.getCursorPosition = function(e) {
            var x;
            var y;
            if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
            }
            else {
            x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            // Convert to coordinates relative to the canvas
            x -= gCanvasElement.offsetLeft;
            y -= gCanvasElement.offsetTop;

            return [x,y]
        }



}