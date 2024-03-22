import { Game } from './ui/game/game.component.js';
import { GAME_STATUS, buttonStartStop, globalSubscribe, selectGameStatus } from './data/game.data.js';
import { gameStatusWinLose } from './ui/game/gameStatuses/gameStatusWinLose.js';
import { Button } from './ui/game/button/button.component.js';


function renderApp() {
   document.body.innerHTML = "";
   if (selectGameStatus() === GAME_STATUS.you_win) {
      const statusWinLose = gameStatusWinLose()
      const button = Button('start', buttonStartStop)
      document.body.append(statusWinLose, button)
   } else {
      const gameEl = Game();
      const button = Button('start', buttonStartStop)
      document.body.append(gameEl, button);
   }
}

globalSubscribe(renderApp)
renderApp();
