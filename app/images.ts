import playerUrl from './assets/target-min.png';
import space1Url from './assets/blackspace1-min.jpeg';
import space2Url from './assets/blackspace2-min.jpeg';

const assetDiv : HTMLDivElement = document.querySelector( '#assets' );

//Player image
export const playerImage : HTMLImageElement = document.createElement( 'img' );
playerImage.src = playerUrl;
assetDiv.appendChild( playerImage );

//Erased image
export const spaceImage : HTMLImageElement = document.createElement( 'img' );
spaceImage.src = space1Url;
assetDiv.appendChild( spaceImage );

//Background image
document.querySelector( 'body' ).style = `--current-image : url( "${ space2Url }" )`;

assetDiv.style.display = 'none'; // hide the images