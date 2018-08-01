var Game = function () {

    var gameDiv;
    var nextDiv;

    var gameData = [

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


    ]

    //divs
    var nextDivs = [];
    var gameDivs = [];

    var cur;
    var next;
    //初始化div
    var initDiv = function (container, data, divs) {

        for (var i = 0; i < data.length; i++) {
            var div = [];
            for (var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div')
                newNode.className = 'none';
                newNode.style.top = (i * 20) + 'px';
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode)
                div.push(newNode)
            }
            divs.push(div)
        }
    }
    //刷新div
    var refreshDiv = function (data, divs) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] == 0) {
                    divs[i][j].className = 'none'
                } else if (data[i][j] == 1) {
                    divs[i][j].className = 'done'
                } else {
                    divs[i][j].className = 'current'
                }
            }
        }
    }
    //检查点是否合法
    var check = function (pos, x, y) {
        if (pos.x + x < 0 || pos.x + x >= gameData.length || pos.y + y < 0 || pos.y + y > gameData[0].length || gameData[pos.x + x][pos.y + y] == 1) {
            return false;
        } else {
            return true
        }
    }
    //检查数据是否合法
    var isValid = function(pos,data){
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[0].length;j++){                  
                    if(data[i][j] !=0){
                        if(!check(pos,i,j)){
                            return false;
                        }
                    }
            }
        }
        return true;
    }

    //清除数据
    var clearData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0
                }
            }
        }
    }
    //设置数据
    var setData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                console.log(cur.origin.x + i, cur.origin.y + j)

                if(check(cur.origin,i,j)){           
                gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j]
            }

            }
        }
    }
    //down
    var down = function () {

       if(cur.canDown(isValid)) {
        clearData();
        cur.down()
        setData();
        refreshDiv(gameData, gameDivs)
        }
    }
    //right
    var right = function(){

        
    }
    var init = function (doms) {
        gameDiv = doms.gameDiv
        nextDiv = doms.nextDiv
        cur = new Square()
        next = new Square()

        initDiv(gameDiv, gameData, gameDivs)
        initDiv(nextDiv, next.data, nextDivs)

        //拷贝数据
        cur.origin.x = 0;
        cur.origin.y = 0;
        setData();

        refreshDiv(gameData, gameDivs)
        refreshDiv(next.data, nextDivs)
    }
    //导出函数
    this.init = init;
    this.down = down;
}
