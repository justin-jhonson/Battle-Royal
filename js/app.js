


var Game = (function() {

    var instance;


    function init(){
        return {
            running: true,
            allEnemies: [new Enemy(new Point(20,20), 30)],
            player: new Player(new Point(250,250)),
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
    constructor(point, speed){
        if(!(point instanceof Point)){
            throw "Point is not of class Point!";
        }
        this.position = point;
        this.speed = speed;
        this.hitbox = [20, 20];
        this.health = 40;
        this.size = [30, 30];
        // Temporary, will replace
        this.sprite = "images/enemy.png";
    }


    randomMotion(){
        //TODO needs to be replaced with A* search
        var directions = ['down', 'up', 'up', 'left', 'right'];
        var directionDecision = Math.floor(Math.random() * (directions.length));
        return directions[directionDecision];
    }

    update(timediff){
        //todo replace with map, and ASTAR
        var direction = this.randomMotion();
        switch(direction){
            case 'left':
                this.position.x -= (this.speed * timediff)
            case 'right':
                this.position.x += (this.speed * timediff)
            case 'up':
                this.position.y -= (this.speed * timediff)
            case 'down':
                this.position.y += (this.speed * timediff)
        }
        
        if (this.position.x < 0) {
            this.position.x = 0; 
        }

        if (this.position.x > ctx.canvas.width - this.size[0]) {
            this.position.x = ctx.canvas.width - this.size[0]; 
        }

        if (this.position.y > 350 - this.size[1]) {
            this.position.y = 350 - this.size[1]; 
        }

        if (this.position.y < 0) {

            this.position.y = 0; 
        }
    }

    render() {
        window.ctx.drawImage(resources.get(this.sprite), this.position.x, this.position.y);
    }

}


class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}


class Player {
    constructor(point){
        if(!(point instanceof Point)){
            throw "Point is not of class Point!";
        }

        this.sprite = "images/player.png";
        this.attackSprite = "images/enemyAttack.png";
        this.position = point;
        this.size = [30, 30];
        this.hitbox = [20, 20];
        this.health = 50;
    }

    render() {
        ctx.drawImage(resources.get(this.sprite), this.position.x, this.position.y);
    }
    
    attack(){
        ctx.drawImage(resources.get(this.attackSprite), this.position.x, this.position.y);
    }

    update(){
        if (this.position.x < 0) {
            this.position.x = 0; 
        }

        if (this.position.x > ctx.canvas.width - this.size[0]) {
            this.position.x = ctx.canvas.width - this.size[0]; 
        }

        if (this.position.y > 350 - this.size[1]) {
            this.position.y = 350 - this.size[1]; 
        }

        if (this.position.y < 0) {

            this.position.y = 0; 
        }

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
            case 'enter':
                this.attack()
                break;

        }
    }    
}

var game = Game.getInstance();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter',
    };
    game.player.handleInput(allowedKeys[e.keyCode]);

});


