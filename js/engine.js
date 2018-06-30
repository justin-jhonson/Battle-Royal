var Engine = (function(){

    var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'), 
    lastTime;

    canvas.width = 900;
    canvas.height = 340;


    function init() {
        lastTime = Date.now();
        main();
    }
    
    function main(){
        var now = Date.now(),
            currentTime = (now - lastTime) / 1000.0;

        update(currentTime);
        renderMap(game.gameMap);
        lastTime = now;

        if(!game.running){return;}
        window.requestAnimationFrame(main);

    }

    function reset(){
        game.player.position = new Point(250, 250);
        game.running = true;
        init();

    }
    

    function update(currentTime) {
        if(game.allEnemies.length == 0){
            ctx.font="80px Georgia";
            ctx.fillText("You've Won!" + game.lives, 300, 300);
        }

        function collisionCheck(){
            player = game.player;
            for(i=0; i < game.allEnemies.length; i++){
                
                enemy = game.allEnemies[i];
                if(player.position.x < enemy.position.x + enemy.hitbox[1] && 
                   player.position.x + player.hitbox[0] > enemy.position.x &&
                   player.position.y < enemy.position.y + enemy.hitbox[0] &&
                   player.position.y + player.hitbox[0] > enemy.position.y
                ){
                    if(player.attacking){
                        game.allEnemies.splice(i, 1);
                    } else {
                        game.running = false;
                        
                        ctx.font="80px Georgia";

                        ctx.fillText("TRY AGAIN!" + game.lives, 300, 300);

                        if (!(game.lives - 1 < 0)){
                            game.lives -= 1;
                            reset();
                        } else {
                            alert("Sorry out of lives");
                            return;
                            //should redirect away
                        }
                    }
                }
            }
        updateEntities(currentTime);     
        }
        
        collisionCheck();

    }


    function renderMap(gameMap){
        var rowImages = [
            'images/water.png',
            'images/grass.png',
        ],

        RowLengths = gameMap[0].length,
        numRows = gameMap.length,
        numCols = RowLengths,
        row, col;  


        for(row=0; row < numRows; row++){
            for(col=0; col < numCols; col++){
                
                if(gameMap[row][col] == 1){
                    ctx.drawImage(resources.get(rowImages[0]), col*27, row*31);
                } else {
                    ctx.drawImage(resources.get(rowImages[1]), col*27, row*31);
                }
            }
        }
        ctx.font="20px Georgia";

        ctx.fillText("Lives: " + game.lives, 25, 20);

        renderEntities()
    }

    function updateEntities(currentTime){
        game.allEnemies.forEach(function(enemy){
            enemy.update(currentTime);
        });
        game.player.update();
    }

    function renderEntities(){
        game.allEnemies.forEach(function(enemy){
            enemy.render();
        });
        game.player.render();
    }



    resources.load([
        'images/grass.png',
        'images/water.png',
        'images/playerLeft.png',
        'images/playerRight.png',
        'images/enemyLeft.png',
        'images/enemyRight.png',
        'images/playerAttackLeft.png',
        'images/playerAttackRight.png'


    ]);

    resources.onReady(init);
    window.ctx = ctx;  

})();

