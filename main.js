import { Game } from './ui/game/game.component.js';
import { Player } from './sound/player.js'

Player()

function renderApp() {
   document.body.innerHTML = "";
   const gameEl = Game();
   document.body.append(gameEl);
}

renderApp();