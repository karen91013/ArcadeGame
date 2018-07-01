class Entity {
	constructor(){
		this.sprite = 'images/';
		this.x = 4;
		this.y = 5;
	}

	update(dt) {
		this.isOutofBoundsX = this.x > 5;
		this.isOutofBoundsY = this.y < 1;
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
	}

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

class Player extends Entity {
	constructor() {
		super();
		this.sprite += 'char-cat-girl.png';
		this.moving = false;
		this.win = false;
	}

	update(dt) {
		super.update();
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

class Enemy extends Entity {
	constructor(x, y) {
		super();
		this.sprite += 'enemy-bug.png';
		this.x = x;
		this.y = y;
		this.speed = Math.random() * (6);

	}

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