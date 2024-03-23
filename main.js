import { Game } from './ui/game/game.component.js';
import { GAME_STATUS, buttonStartStop, globalSubscribe, selectGamePointToWin, selectGameStatus, selectPlayer1, selectPlayer2 } from './data/game.data.js';
import { gameStatusWinLose } from './ui/game/gameStatuses/gameStatusWinLose.js';
import { Button } from './ui/game/button/button.component.js';


function renderApp() {
   document.body.innerHTML = "";
   if (selectGameStatus() === GAME_STATUS.you_win) {
      let title = ' YOU ARE WIN'
      if (selectPlayer1().score === selectGamePointToWin()) {
         title = selectPlayer1().name + title
      }
      if (selectPlayer2().score === selectGamePointToWin()) {
         title = selectPlayer2().name + title
      }
      const statusWinLose = gameStatusWinLose(title)
      const button = Button('start', buttonStartStop)
      document.body.append(statusWinLose, button)
   } else if (selectGameStatus() === GAME_STATUS.you_lose) {
      const statusWinLose = gameStatusWinLose('YOU ARE LOSE')
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
