function Game(gCanvasElement,sqNum) {

    this.gCanvasElement = gCanvasElement

    this.p1 = new Player('#FFFFFF', 1, true)

    this.p2 = new Player('#000000', 1, false)

    this.currentPlayer = this.p1

    this.board = new Board(sqNum,gCanvasElement)

    this.sounds = new Array();

    this.sounds["place"] = 'audiotag1'
    this.sounds["buzz"] = 'audiotag2'

    this.occupiedPos = new Array()

    this.move = function(position) {
        // is position open?
        var move = this.checkMove(position)
         console.debug(' move valid ' +move.valid + ' ' +move.message)
         if( move.valid == true) {
             this.drawMove(move.pos, 20, 20)
             this.playSound(this.sounds["place"])
             if (this.currentPlayer == this.p1) {
                 this.currentPlayer = this.p2
                 this.p2.turn = true
                 this.p1.turn = false
             } else {
                 this.currentPlayer = this.p1
                 this.p1.turn = true
                 this.p2.turn = false
             }
             console.debug(' current p ' +this.currentPlayer.color)

         }
    }

    this.normalizePos = function(position,szSq) {

       var xPos = position.x
       var yPos = position.y
      // console.debug(' pos x ' + xPos + ' yPos ' + yPos)

       var xVal = -1
       var yVal = -1

       for (var x = 0.5; x < gCanvasElement.width; x += szSq) {
                if(xPos > x - 10 && xPos < x + 10)  {
                     xVal = x
                     break;
                 }
        }

        for (var y = 0.5; y < gCanvasElement.height; y += szSq) {
            if(yPos > y - 3 && yPos < y + 3)  {
                  yVal = y
                  break;
             }
          }
        return new Position(xVal,yVal)
    }

    this.checkMove = function(position) {

               var xPos = position.x
               var yPos = position.y

               var szSq = gCanvasElement.width / gCanvasElement.numSq;
               var normPosition = this.normalizePos(position,szSq)

               //console.debug(' norm pos is x ' + normPosition.x + ' y ' + normPosition.y )
               var player = this.currentPlayer // (this.p1.turn) ? this.p1 : this.p2
               var moveRes = this.board.move(normPosition, player)
               console.debug('moveRes ' + moveRes.message)
               if(moveRes.moved == true) {
                 return {valid:true, pos:moveRes.pos}
               }
               return {valid:false};
    }


    this.drawMove = function(position, w, h) {
            //console.debug(position.player.color)
            gDrawingContext.fillStyle = position.player.color;
             // draw the piece
             gDrawingContext.fillRect(position.x - 10 , position.y - 10, w, h);
     }

    this.playSound = function play_single_sound(id) {
        console.debug('play sound ');
        document.getElementById(id).play();
    }
    // init
    this.board.draw(sqNum)

}