import { Game } from './ui/game/game.component.js';
import { GAME_STATUS, buttonStartStop, globalSubscribe, selectGameStatus } from './data/game.data.js';
import { gameStatusWinLose } from './ui/game/gameStatuses/gameStatusWinLose.js';
import { Button } from './ui/game/button/button.component.js';


function renderApp() {
   document.body.innerHTML = "";
   // if (selectGameStatus() === GAME_STATUS.you_win) {
   //    const statusWinLose = gameStatusWinLose()
   //    const button = Button('start', buttonStartStop)
   //    document.body.append(statusWinLose, button)
   // } else if (selectGameStatus() === GAME_STATUS.you_lose) {
   //    const statusWinLose = gameStatusWinLose('YOU ARE LOSE')
   //    const button = Button('start', buttonStartStop)
   //    document.body.append(statusWinLose, button)
   if (selectGameStatus() === GAME_STATUS.you_win
      || selectGameStatus() === GAME_STATUS.you_lose) {
         const winLose = gameStatusWinLose()
         document.body.append(winLose);
   } else {
      const gameEl = Game();
      const button = Button('start', buttonStartStop)
      document.body.append(gameEl, button);
   }
}

globalSubscribe(renderApp)
renderApp();
