function Board(sqNum, gCanvasElement) {

    this.gCanvasElement = gCanvasElement
    this.sqNum = sqNum
    this.positions = new Array();
    this.positionPieceMap = new Array()
    this.szSq = gCanvasElement.width / this.sqNum;
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

       this.move = function(position,player) {
          //console.debug('this.positions.length ' + this.positions.length + ' this.positionPieceMap ')
          if(this.positionPieceMap[this.mapKey(position)]) {
              console.debug(' map -- ' + this.positionPieceMap[this.mapKey(position)].player.color)
          }
          for(var i = 0; i < this.positions.length ; i ++) {

               if(this.positions[i].x == position.x && this.positions[i].y == position.y) {
                  if(this.positions[i].occupied == true) {
                    return {moved:false,message:'occupied'}
                  } else {
                      // not occupied, but it might be suicide
                      if(this.isSuicideMove(position,player)) {
                          alert( ' wow that is a suicide move, you can\'t do that')
                          return {moved:false,message:'suicide'};
                      }
                      this.positions[i].occupied = true
                      this.positions[i].player = player
                      console.debug(' set player ' + player.color)
                      this.positionPieceMap[this.mapKey(position)] = new Piece(this.positions[i], player)
                      this.checkLifeLines(position,i);

                      return {moved:true,pos:this.positions[i],message:'ok'};
                  }
             }
           }
           return {moved:false, message:'not legal'};
        }

    this.mapKey = function(position) {
          return position.x + '' + position.y
    }

    this.checkLifeLines = function(position) {
        //  this.positionPieceMap[this.mapKey(position)].position
        console.debug(' top occ ' + this.positionPieceMap[this.mapKey(this.getTopLL(position))])
        if(this.positionPieceMap[this.mapKey(this.getTopLL(position))]) {
            //check if surrounded
           if(this.checkIfSurrounded(this.getTopLL(position))) this.killIt(this.getTopLL(position))
        }

        console.debug('  bott occ ' + this.positionPieceMap[this.mapKey(this.getBottomLL(position))])
         if(this.positionPieceMap[this.mapKey(this.getBottomLL(position))]) {
            //check if surrounded
             if(this.checkIfSurrounded(this.getBottomLL(position))) this.killIt(this.getBottomLL(position))
        }

        console.debug('left occ ' + this.positionPieceMap[this.mapKey(this.getLeftLL(position))])
         if(this.positionPieceMap[this.mapKey(this.getLeftLL(position))]) {
            //check if surrounded
             if(this.checkIfSurrounded(this.getLeftLL(position))) this.killIt(this.getLeftLL(position))
        }
        console.debug('right occ ' + this.positionPieceMap[this.mapKey(this.getRightLL(position))])
         if(this.positionPieceMap[this.mapKey(this.getRightLL(position))]) {
            //check if surrounded
             if(this.checkIfSurrounded(this.getRightLL(position))) this.killIt(this.getRightLL(position))
        }
    }

    this.checkIfSurrounded = function(position,player) {
       var piece = this.positionPieceMap[this.mapKey(position)]
       console.debug(' piece ' + piece)
        var player
        if (piece) {
            player = piece.player
        }
       if(this.positionPieceMap[this.mapKey(this.getTopLL(position))] && this.positionPieceMap[this.mapKey(this.getTopLL(position))].player != player &&
               this.positionPieceMap[this.mapKey(this.getRightLL(position))] && this.positionPieceMap[this.mapKey(this.getRightLL(position))].player != player &&
                this.positionPieceMap[this.mapKey(this.getLeftLL(position))] && this.positionPieceMap[this.mapKey(this.getLeftLL(position))].player != player &&
                this.positionPieceMap[this.mapKey(this.getBottomLL(position))] && this.positionPieceMap[this.mapKey(this.getBottomLL(position))].player != player) {
             //surrounded kill it
          // console.debug('surrounded kill it ' +this.positionPieceMap[this.mapKey(position)].player.color)
           //this.positionPieceMap[this.mapKey(position)]=null
           return true
        }
        return false
    }

    this.isSuicideMove = function(position,player) {
       return this.checkIfSurrounded(position,player)
    }

    this.killIt = function(position) {
        //gDrawingContext.fillStyle = position.player.color;
        // draw the piece           obv don't hard code
        gDrawingContext.clearRect(position.x - 10 , position.y - 10, 20, 20)
        this.unSetPos(position)
    }

    this.unSetPos = function(position) {
        for(var i = 0; i < this.positions.length ; i ++) {
           if(this.positions[i].x == position.x && this.positions[i].y == position.y) {
                // not occupied the player can move there
                this.positions[i].occupied = false
                this.positions[i].player = null
                this.positionPieceMap[this.mapKey(position)] = null
           }
        }
    }
//    this.checkLL = functino(position) {
//        position.x position.y +
//    }
    this.getTopLL = function(position) {
        return new Position(position.x, position.y - this.szSq)
         //this.positionPieceMap[this.mapKey(position)].position +
    }

    this.getBottomLL = function(position) {
        return new Position(position.x, position.y + this.szSq)
    }

    this.getLeftLL = function(position) {
         return new Position(position.x - this.szSq, position.y)
    }

    this.getRightLL = function(position) {
        return new Position(position.x + this.szSq, position.y)
    }
      // init positions
      console.debug(' init boards')
      var szSq = gCanvasElement.width / gCanvasElement.numSq;
      console.debug(' gCanvasElement.width ' + gCanvasElement.width)
      var indx= 0;
      var y = 0.5
      while( y < gCanvasElement.width) {
          for (var x = 0.5; x < gCanvasElement.width; x += szSq) {
               this.positions[indx] = new Position(x,y)
               indx++
           }
           y = y + szSq
      }

//     for(var i = 0; i < this.positions.length ; i ++ ) {
//           console.debug(' pos ' + this.positions[i].x + ' y ' + this.positions[i].y)
//      }

}