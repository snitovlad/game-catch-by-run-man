import { Game } from './ui/game/game.component.js';
import { GAME_STATUS, globalSubscribe, selectGameStatus } from './data/game.data.js';
import { gameStatusWinLose } from './ui/game/gameStatuses/gameStatusWinLose.js';


function renderApp() {
   document.body.innerHTML = "";
   if (selectGameStatus() === GAME_STATUS.you_win
      || selectGameStatus() === GAME_STATUS.you_lose) {
      const winLose = gameStatusWinLose()
      document.body.append(winLose);
   } else {
      const gameEl = Game();
      document.body.append(gameEl);
   }
}

globalSubscribe(renderApp)
renderApp();
