// entity consists of both things both player & enemies have in common
class Entity {
	constructor(){
		this.sprite = 'images/';
		// starts sprite off at a certain place
		this.x = 2;
		this.y = 5;
	}

	update(dt) {
		// setting where boundaries are
		this.isOutofBoundsX = this.x > 5;
		this.isOutofBoundsY = this.y < 1;
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
	}

	// checking for collisions
	checkCollisions(playerOrEnemy) {
		if (this.y === playerOrEnemy.y) {
			if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
				return true;
			}
		}
		else {
			return false;
		}
	}
}

// specific to player sprite, uses some of entity 
class Player extends Entity {
	constructor() {
		super();
		this.sprite += 'char-cat-girl.png';
		this.moving = false;
		this.win = false;
	}

	update(dt) {
		super.update();
		// if user wins, display alert 
		if (this.isOutofBoundsY && !this.moving && !this.win){
			alert("You win!");
			this.win = true;
			player.y = 5;
            player.x = 2;
		}
	}

	render(){
		super.render();
		this.moving = false;
	}

	// user inputs controlling sprite: left, right, up, down
	handleInput(input) {
		switch (input) {
			case 'left':
				this.x = this.x > 0 ? this.x - 1: this.x;
				break;
			case 'up':
				this.y = this.y > 0 ? this.y - 1 : this.y;
				break;
			case 'right':
				this.x = this.x < 4 ? this.x + 1 : this.x;
				break;
			case 'down':
				this.y = this.y < 5 ? this.y + 1 : this.y;
				break;
			default:
				break;
		}
		this.moving = true;
	}
}

// enemy-specific, uses some of entity
class Enemy extends Entity {
	constructor(x, y) {
		super();
		this.sprite += 'enemy-bug.png';
		this.x = x;
		this.y = y;
		// set random speed
		this.speed = Math.random() * (6);

	}

// if they go out of bounds, start the bugs off screen again
	update(dt){
		super.update();
		if (this.isOutofBoundsX){
			this.x = -1;
		}
		else {
			this.x += dt * this.speed+0.01 ;
		}
	}
}