import { subscribe } from './data/game.data.js';
import {Game} from './ui/game/game.component.js';
import {Player} from './sound/player.js'


   Player();

   

//не будем перерисовывать все целиком
//subscribe(renderApp);

function renderApp() {
   document.body.innerHTML = "";
   const gameEl = Game();
   document.body.append(gameEl);   
}

renderApp();