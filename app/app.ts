import { ctx, player, clearSize, collisions, ms, void1 } from './globals';
import { playerImage, voidImage } from './images';
//Top defining
let startTime = null;

//Draws player with an eraser so every time it is ran it erases the previous instance.
const drawPlayer = () => {
	ctx.clearRect(
		player.x - clearSize.offset,
		player.y - clearSize.offset,
		clearSize.size,
		clearSize.size
	);
	ctx.drawImage(
		player.image,
		player.x,
		player.y,
		player.size,
		player.size
	);
};

const resetPlayer = () => {
		player.x = 0;
		player.y = 0;
}

//Draws the main image being erased by player.
const drawVoid = () => {
	resetPlayer(); //Resets players position whenever drawVoid is called.
	ctx.drawImage(
		void1.image,
		void1.x,
		void1.y,
		void1.sizex,
		void1.sizey
	);
}

//Keyboard done by wasd (Code just returns if a key is not doing anything, fixes a bug I found.)
const playerKeyboard = (elapsed: number) => {
	let vel = (100 * elapsed) / ms;
	window.addEventListener(
		'keydown',
		(event) => {
			if (event.key === 'd') {
				player.vy = 0;
				player.vx += vel;
			};
			if (event.key === 'a') {
				player.vy = 0;
				player.vx -= vel;
			};
			if (event.key === 'w') {
				player.vx = 0;
				player.vy -= vel;
			};
			if (event.key === 's') {
				player.vx = 0;
				player.vy += vel;
			};
			if (event.key != 'd','a','w','s') {
					return
			};
		}
	);
}

//Caps player movement to 400 x and y (Done a little lazily but w/e).
const playerCap = () => {
	const cap = 400;
	if (player.vx > cap) {
		player.vx = cap;
	}
	if (player.vx < -cap) {
		player.vx = -cap;
	}
	if (player.vy > cap) {
		player.vy = cap;
	}
	if (player.vy < -cap) {
		player.vy = -cap;
	}
}

//Collisions, works good enough.
const playerCollisons = () => {
	if (player.y > collisions.bottom * .95) {
		player.y = collisions.bottom * .95;
		player.vy = 0;
		player.vx = 0;
	}
	if (player.x < collisions.left) {
		player.x = collisions.left;
		player.vy = 0;
		player.vx = 0;
	}
	if (player.x > collisions.right * .97) {
		player.x = collisions.right * .97;
		player.vy = 0;
		player.vx = 0;
	}
	if (player.y < collisions.top) {
		player.y = collisions.top;
		player.vy = 0;
		player.vx = 0;
	}
}

//Updates player movement
const updatePlayer = (elapsed: number) => {
	playerKeyboard(elapsed);
	playerCap();
	playerCollisons();
	player.x += (player.vx * elapsed) / ms;
	player.x = Math.round(player.x);
	player.y += (player.vy * elapsed) / ms;
	player.y = Math.round(player.y);
};

//Handles animating the player
const animatePlayer = (timestamp: number = 0) => {
	let elapsed: number
	if (timestamp) {
		if (!startTime) {
			startTime = timestamp;
			elapsed = 0;
		}
		else {
			elapsed = timestamp - startTime;
			startTime = timestamp;
		}
		updatePlayer(elapsed);
	}
	drawPlayer();
	requestAnimationFrame(animatePlayer);
};

//Stuff done on load, handles player animation and reloading the void.
const onLoad = () => {
	const delay = 120000;
	playerImage.addEventListener("load", () => {
		animatePlayer();
	});
	voidImage.addEventListener("load", () => {
		drawVoid();
		setInterval(drawVoid, delay);
	});
}

onLoad();