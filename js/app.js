


var Game = (function() {

    var instance;


    function init(){
        return {
            running: true,
            allEnemies: [new Enemy(20, 20, 30), new Enemy(300, 20, 50),
                         new Enemy(100, 20, 10), new Enemy(800, 20, 10)],
            player: new Player(250, 250),
            lives:3,
            gameMap : [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]

        }

    }

    return {
        getInstance: function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }

    };


})();


class Enemy {
    constructor(x, y, speed){
        this.position = new Point(x, y);
        this.speed = speed;
        this.hitbox = [20, 20];
        this.size = [30, 30];
        // Temporary, will replace
        this.sprite = "images/enemy.png";
    }


    seachVector(){
        //TODO needs to be replaced with A* search
        let playerPosition = game.player.position;
        var position = this.position;
        var vector = {'x': 0, 'y': 0}
        
        let horizontal_delta = playerPosition.x - position.x;
        let vertical_delta = playerPosition.y - position.y
        
        vector.x = horizontal_delta > 0 ? 1 : -1;
        vector.y = vertical_delta > 0 ? 1 : -1;
        return vector;
    }

    update(timediff){
        //todo replace with map, and ASTAR
        var directionVector = this.seachVector();
        
        this.position.x += directionVector.x * (this.speed * timediff);
        this.position.y += directionVector.y * (this.speed * timediff);

        this.BoundaryCheck();
    }

    BoundaryCheck(){
        if (this.position.x < 0) {
            this.position.x = 0; 
        }

        if (this.position.x > ctx.canvas.width - this.size[0]) {
            this.position.x = ctx.canvas.width - this.size[0]; 
        }

        if (this.position.y > ctx.canvas.height - this.size[1]) {
            this.position.y = ctx.canvas.height - this.size[1]; 
        }

        if (this.position.y < 0) {
            this.position.y = 0; 
        }

    }

    render() {
        window.ctx.drawImage(resources.get(this.sprite), this.position.x, this.position.y);
    }

}


class Player {
    constructor(x, y){
        this.sprite = "images/player.png";
        this.position = new Point(x, y);
        this.size = [30, 30];
        this.hitbox = [20, 20];
        this.attacking = false;
    }

    render() {
        ctx.drawImage(resources.get(this.sprite), this.position.x, this.position.y);
    }
    
    update(){
        if (this.position.x < 0) {
            this.position.x = 0; 
        }

        if (this.position.x > ctx.canvas.width - this.size[0]) {
            this.position.x = ctx.canvas.width - this.size[0]; 
        }

        if (this.position.y > 330 - this.size[1]) {
            this.position.y = 330 - this.size[1]; 
        }

        if (this.position.y < 0) {
            this.position.y = 0; 
        }

    }   

    attack(){
        var id = setInterval(function(){
            if(this.attacking){
                this.attacking = false;
                this.sprite = 'images/player.png';
                clearInterval(id);
            } else {
                this.sprite = 'images/playerAttack.png';
                this.attacking = true;
            }
        }.bind(this), 200);
    }

    handleInput(key){
        switch(key){
            case 'left':
                this.position.x -= 20
                break;
            case 'right':
                this.position.x += 20
                break;
            case 'up':
                this.position.y -= 20
                break;
            case 'down':
                this.position.y += 20
                break;
            case 'space':
                this.attack();
                break;
        }
    }    
}


class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

var game = Game.getInstance();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };
    game.player.handleInput(allowedKeys[e.keyCode]);

});


