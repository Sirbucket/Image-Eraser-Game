import {
	playerImage,
	spaceImage
}
	from './images';

//Top level defining
export const canvas: HTMLCanvasElement = document.createElement('canvas');
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
export const width: number = 1600;
export const height: number = 900;
export const ms: number = 1000;
export const reset: number = 0;

const app: HTMLDivElement = document.querySelector('#app');
const size: number = 40;
const style: CSSStyleDeclaration = canvas.style;

//Player (The circle)
export const player = {
	size: size,
	x: reset,
	y: reset,
	vx: reset,
	vy: reset,
	image: playerImage
}

// The image you delete
export const space = {
	sizex: width,
	sizey: height,
	x: reset,
	y: reset,
	image: spaceImage
}

// Size of the eraser box
export const clearSize = {
	offset: size / 2, //Should be 1/4th of clearSize size.
	size: size * 2
}

// Defining the base of where the player collides
export const collisions = {
	bottom: height,
	left: reset,
	right: width,
	top: reset
}

// Canvas width and height
canvas.width = width;
canvas.height = height;
style.width = `${width}px`;
style.height = `${height}px`;

app.appendChild(canvas);