function Board(sqNum, gCanvasElement) {

    this.gCanvasElement = gCanvasElement
    this.sqNum = sqNum
    this.positions = new Array();

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
          console.debug('this.positions.length ' + this.positions.length)

          for(var i = 0; i < this.positions.length ; i ++) {

               if(this.positions[i].x == position.x && this.positions[i].y == position.y) {
                  if(this.positions[i].occupied == true) {
                    return {moved:false,message:'occupied'}
                  } else {
                      // not occupied the player can move there
                      this.positions[i].occupied = true
                      this.positions[i].player = player
                      return {moved:true,pos:this.positions[i]};
                  }
             }
           }
           return {moved:false,message:'not legal'};
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

     for(var i = 0; i < this.positions.length ; i ++ ) {
           console.debug(' pos ' + this.positions[i].x + ' y ' + this.positions[i].y)
      }

}