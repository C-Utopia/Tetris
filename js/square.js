class Square {
    constructor() {
        this.data = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        //gameData的索引，x:10表示第十行
        this.origin = {
            x: 0,
            y: 0
        };
        //旋转数组
        this.dir = 0;

        this.rotates = [


            [
                [0, 0, 2, 0],
                [0, 0, 2, 0],
                [0, 0, 2, 0],
                [0, 0, 2, 0]
            ],
            [
                [0, 0, 0, 0],
                [2, 2, 2, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 2, 0],
                [0, 0, 2, 0],
                [0, 0, 2, 0],
                [0, 0, 2, 0]
            ],
            [
                [0, 0, 0, 0],
                [2, 2, 2, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        ];
    }

    canRotate(isValid) {
        var d = this.dir + 1;
        if (d == 4) {
            d = 0;
        }
        var test = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[0].length; j++) {
                test[i][j] = this.rotates[d][i][j]
            }
        }
        console.log(test)
        return isValid(this.origin, test)
    }

    rotate() {
        this.dir = this.dir + 1;
        if (this.dir == 4) this.dir = 0;
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[0].length; j++) {
                this.data[i][j] = this.rotates[this.dir][i][j]
            }
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
    canRight(isValid) {
        var test = {};
        test.x = this.origin.x;
        test.y = this.origin.y + 1;
        return isValid(test, this.data)
    }

    right(isValid) {
        this.origin.y = this.origin.y + 1
    }
    canLeft(isValid) {
        var test = {};
        test.x = this.origin.x;
        test.y = this.origin.y - 1;
        return isValid(test, this.data)
    }

    left(isValid) {
        this.origin.y = this.origin.y - 1
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

// Square.prototype.canRight =function(isValid){
//     var test = {};
//     test.x = this.origin.x;
//     test.y = this.origin.y+1;
//     return isValid(test,this.data)
// }
// Square.prototype.right =function(isValid){

//   this.origin.y = this.origin.y +1
// }