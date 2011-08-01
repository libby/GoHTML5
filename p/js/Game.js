function Game(gCanvasElement,sqNum) {

    this.gCanvasElement = gCanvasElement

    this.p1 = new Player('#FF0000', 1, true)

    this.p2 = new Player('#000000', 1, false)

    this.board = new Board(sqNum,gCanvasElement)

    this.occupiedPos = new Array()
//    this.registerCanvas = function(clickFn) {
//        // gCanvasElement.width = kPixelWidth;
//        // gCanvasElement.height = kPixelHeight;
//        // gDrawingContext = gCanvasElement.getContext("2d");
//        var el = document.getElementById('c1');
//        //var gDrawingContext =  el.getContext("2d");
//        el.addEventListener("click", clickFn, false);
//      }
       this.checkMove = function(xPos, yPos) {
               console.debug(' in check move')
               var szSq = gCanvasElement.width / gCanvasElement.numSq;
               var xOK = false;
               var yOK = false;

               var xVal;
               var yVal;
               for (var x = 0.5; x < gCanvasElement.width; x += szSq) {

                 if(xPos > x - 10 && xPos < x + 10)  {
                     xVal = x
                     xOK = true;
                     break;
                 }
               }

               for (var y = 0.5; y < gCanvasElement.height; y += szSq) {
                 if(yPos > y - 3 && yPos < y + 3)  {
                     yVal = y
                     yOK = true;
                     break;
                 }
               }
              var valid = false;

              var message = "please click on an intersection"

              if((yOK && xOK)) {
                  valid = true;
                  //var player = (players.p1.turn) ? "p1" : "p2";
                  var player = this.p1.turn ? "p1" : "p2";
                  var jsonXY =  { xOcc : xVal, yOcc : yVal, player : player }

                  if(this.isSpaceOccupied(jsonXY) == false) {
                      this.occupiedPos[this.occupiedPos.length] = jsonXY
                   } else {
                      valid = false
                      message = "oops, your opponent is already occupying that space =("
                  }
              }
              return {valid:valid, xPos : xVal, yPos : yVal,message:message}
           }

          this.isSpaceOccupied = function(jsonXY) {
             if(this.occupiedPos.length > 0) {
                  for(var i = 0 ; i < this.occupiedPos.length ; i++) {
                     if(this.occupiedPos[i].xOcc == jsonXY.xOcc && this.occupiedPos[i].yOcc == jsonXY.yOcc) {
                            console.debug(' space is occupied')
                            return true;
                        }
                   }
             }
             return false;
          }
    // init
    this.board.draw(sqNum)
    //this.registerCanvas(this.board.goBoardClick)

}