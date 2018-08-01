
 class Square {
    constructor() {
        this.data = [
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0]
        ];
        //gameData的索引，x:10表示第十行
        this.origin = {
            x: 0,
            y: 0
        }
    }

    canDown(isValid) {
        var test = {};
        test.x = this.origin.x + 1;
        test.y = this.origin.y;
        return isValid(test, this.data)
    }

    down(isValid) {
        this.origin.x = this.origin.x + 1
    }

    
}












// var Square = function(){
//     //方块数据
//     this.data = [
//         [0,0,2,0],
//         [0,0,2,0],
//         [2,2,2,0],
//         [0,0,0,0]
//     ];
//     //gameData的索引，x:10表示第十行
//     this.origin ={
//         x:0,
//         y:0
//     }

// }
// Square.prototype.canDown =function(isValid){
//     var test = {};
//     test.x = this.origin.x+1;
//     test.y = this.origin.y;
//     return isValid(test,this.data)
// }
// Square.prototype.down =function(isValid){

//   this.origin.x = this.origin.x +1
// }