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
        if (
             pos.x + x < 0 ||
             pos.x + x >= gameData.length || 
             pos.y + y < 0 || 
             pos.y + y >= gameData[0].length || 
             gameData[pos.x + x][pos.y + y] == 1
            ) 
        {
            return false;
        } 
        else {
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
        refreshDiv(gameData, gameDivs);
        return true;
        } else{
            return false
        }
    }
    //right
    var right = function(){
        if(cur.canRight(isValid)) {
            clearData();
            cur.right()
            setData();
            refreshDiv(gameData, gameDivs)
            }
        
    }
    //left
    var left = function(){
        if(cur.canLeft(isValid)) {
            clearData();
            cur.left()
            setData();
            refreshDiv(gameData, gameDivs)
            }
        
    }
    var rotate = function(){
        if(cur.canRotate(isValid)) {
            clearData();
            cur.rotate()
            setData();
            refreshDiv(gameData, gameDivs)
            }
        
    }
    var init = function (doms) {
        gameDiv = doms.gameDiv
        nextDiv = doms.nextDiv

        var num =Math.floor(Math.random()*7+1)
        var dir =Math.floor(Math.random()*4-1)
        console.log(num,dir)
       
        cur = new SquareFactory().make(num,dir)
        next = new SquareFactory().make(num,dir)
       
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
    this.right = right;
    this.left = left;
    this.rotate = rotate;
    this.fall = function(){
        while(down()){
            down()
        }
    }
}
