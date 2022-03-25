import playerUrl from './assets/target-min.png';
import void1Url from './assets/blackvoid1-min.jpeg';
import void2Url from './assets/blackvoid2-min.jpeg';

const assetDiv: HTMLDivElement = document.querySelector('#assets');

//Background image
document.querySelector('body').style = `--current-image : url("${void2Url}")`;

//Player image
export const playerImage = document.createElement('img');
playerImage.src = playerUrl;
assetDiv.appendChild(playerImage);

//Erased image
export const voidImage = document.createElement('img');
voidImage.src = void1Url;
assetDiv.appendChild(voidImage);

assetDiv.style.display = 'none'; // hide the images