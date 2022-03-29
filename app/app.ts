import {
	ctx,  
	player, 
	space,
	reset,
	clearSize, 
	collisions, 
	ms		 
} 
from './globals';

import { 
	playerImage, 
	spaceImage
} 
from './images';

//Top level defining.
let startTime : number;

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
}

//Draws the main image being erased by player.
const drawspace = () => {
	player.x = reset; // Reset player location
	player.y = reset;

	ctx.drawImage(
		space.image,
		space.x,
		space.y,
		space.sizex,
		space.sizey
	);
}

//Keyboard done by wasd (Code just returns if a key is not doing anything, fixes a bug I found.)
const playerKeyboard = ( elapsed : number ) => {
	const vel : number = ( 100 * elapsed ) / ms;
	window.addEventListener ( 'keydown', (event) => {
		if ( event.key === 'd' ) {
			player.vy = reset;
			player.vx += vel;
		}

		if ( event.key === 'a' ) {
			player.vy = reset;
			player.vx -= vel;
		}

		if ( event.key === 'w' ) {
			player.vx = reset;
			player.vy -= vel;
		}

		if ( event.key === 's' ) {
			player.vx = reset;
			player.vy += vel;
		}

		if ( event.key != 'd','a','w','s' ) {
			return
		}
	} );
}

//Caps player movement to 400 x and y (Done a little lazily but w/e).
const playerCap = () => {
	const cap : number = 400;

	if ( player.vx > cap ) {
		player.vx = cap;
	}

	if ( player.vx < -cap ) {
		player.vx = -cap;
	}

	if ( player.vy > cap ) {
		player.vy = cap;
	}

	if ( player.vy < -cap ) {
		player.vy = -cap;
	}
}

//Collisions, works good enough.
const playerCollisons = () => {
	const bottommod : number = 0.95;
	const rightmod : number = 0.97;

	if ( player.y > ( collisions.bottom * bottommod ) ) {
		player.y = collisions.bottom * bottommod;
		player.vy = reset;
		player.vx = reset;
	}

	if ( player.x < collisions.left ) {
		player.x = collisions.left;
		player.vy = reset;
		player.vx = reset;
	}

	if ( player.x > ( collisions.right * rightmod ) ) {
		player.x = collisions.right * rightmod;
		player.vy = reset;
		player.vx = reset;
	}

	if ( player.y < collisions.top ) {
		player.y = collisions.top;
		player.vy = reset;
		player.vx = reset;
	}
}

//Updates player movement
const updatePlayer = ( elapsed : number ) => {
	playerKeyboard( elapsed );
	playerCap();
	playerCollisons();

	player.x += ( player.vx * elapsed ) / ms;
	player.x = Math.round ( player.x );
	player.y += ( player.vy * elapsed ) / ms;
	player.y = Math.round ( player.y );
}

//Handles animating the player
const animatePlayer = ( timestamp : number = reset ) => {
	let elapsed : number;

	if ( timestamp ) {
		if ( !startTime ) {
			startTime = timestamp;
			elapsed = reset;
		}
		else {
			elapsed = timestamp - startTime;
			startTime = timestamp;
		}
		updatePlayer( elapsed );
	}

	drawPlayer();
	requestAnimationFrame( animatePlayer );
}

//Stuff done on load, handles player animation and reloading the space.
const onLoad = () => {
	playerImage.addEventListener ( "load", () => {
		animatePlayer();
	} );
	spaceImage.addEventListener ( "load", () => {
		const delay : number = 120000;
		drawspace();
		setInterval( drawspace, delay );
	} );
}

onLoad(); //Call onLoad and run game.