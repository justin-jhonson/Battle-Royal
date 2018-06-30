/*
    These Models


*/

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class GameCharacter {

    constructor(x, y){
        this.position = new Point(x, y);
    }

    BoundaryCheck() {
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
        ctx.drawImage(resources.get(this.sprite), this.position.x, this.position.y);
    }

}

class Player extends GameCharacter {
    constructor(x, y){
        super(x,y);
        this.sprite = "images/playerLeft.png";
        this.size = [32, 39];
        this.hitbox = [30, 20];
        this.attacking = false;
        this.directionLeft = true;
    }

    
    update(){
        this.directionUpdate();
        this.BoundaryCheck();
    }   

    directionUpdate(){
        if (this.directionLeft){
            this.sprite = this.attacking ? "images/playerAttackLeft.png" : "images/playerLeft.png";

        } else {
            this.sprite = this.attacking ? "images/playerAttackRight.png" : "images/playerRight.png";
        }

    }

    melee(){
        var id = setInterval(function(){
            if(this.attacking){
                this.attacking = false;
                // this.sprite = 'images/playerLeft.png';
                clearInterval(id);
            } else {
                this.attacking = true;
            }
        }.bind(this), 200);
    }

    handleInput(key){
        switch(key){
            case 'left':
                this.directionLeft = true;
                this.position.x -= 20;
                break;
            case 'right':
                this.directionLeft = false;
                this.position.x += 20;
                break;
            case 'up':
                this.position.y -= 20
                break;
            case 'down':
                this.position.y += 20
                break;
            case 'space':
                this.melee();
                break;
        }
    }    
}


class Enemy extends GameCharacter {
    constructor(x, y, speed){
        super(x, y);
        this.speed = speed;
        this.hitbox = [30, 30];
        this.size = [35, 25];
        this.sprite = "images/enemyLeft.png";
    }

    directionUpdate(){
        if (this.directionLeft){
            this.sprite = "images/enemyLeft.png";

        } else {
            this.sprite = "images/enemyRight.png";
        }

    }



    searchVector(){
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
        var directionVector = this.searchVector();
        
        this.position.x += directionVector.x * (this.speed * timediff);
        this.position.y += directionVector.y * (this.speed * timediff);
        this.directionLeft = directionVector.x < 0 && directionVector.y != 0;
        this.directionUpdate()
        this.BoundaryCheck();
    }


    render() {
        window.ctx.drawImage(resources.get(this.sprite), this.position.x, this.position.y);
    }

}
