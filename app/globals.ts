import { playerImage, voidImage } from './images';

//Basic defining
const app: HTMLDivElement = document.querySelector('#app');
export const canvas: HTMLCanvasElement = document.createElement('canvas');

export const ctx = canvas.getContext('2d');

export const width = 1600;
export const height = 900;

export const ms = 1000;

canvas.width = width;
canvas.height = height;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;

//Player (The circle)
export const player = 
{
	size: 40,
	x: 0,
	y: 0,
	vx: 20,
	vy: 20,
	image: playerImage
};

//The image you delete
export const void1 =
{
	sizex: width,
	sizey: height,
	x: 0,
	y: 0,
	image: voidImage
};

//Size of the eraser box
export const clearSize = 
{
	offset: 20, //Equal to 1/4th of size
	size: 80
};

//Defining the base of where the player collides
export const collisions =
{
	bottom: height,
	left: 0,
	right: width,
	top: 0
};

app.appendChild(canvas);