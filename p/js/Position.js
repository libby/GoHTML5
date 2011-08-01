function Position(x,y) {
     this.x = x
     this.y = y
     this.occupied = false
     this.player = null
//     this.piece = null

     this.setY = function(y) {
         this.y = y
     }

    this.occupied = function(b) {
         this.occupied = b
     }

    this.player = function(p) {
         this.player = p
     }

//    this.piece = function(p) {
//         this.piece = p
//     }
}
