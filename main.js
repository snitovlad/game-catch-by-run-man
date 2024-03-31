import { Game } from './ui/game/gameStatuses/game.component.js';
import { GAME_STATUS, globalSubscribe, selectGameStatus } from './data/game.data.js';
import { GameWinOrLose } from './ui/game/gameStatuses/gameStatusWinLose.js';
import { GameSettings } from './ui/game/gameStatuses/gameStatusSettings.js';


function renderApp() {
   document.body.innerHTML = "";

   switch (selectGameStatus()) {
      case GAME_STATUS.in_process:
         const gameEl = Game();
         document.body.append(gameEl);
         break;
      case GAME_STATUS.you_win:
         const winEl = GameWinOrLose('you_win');
         document.body.append(winEl);
         break;
      case GAME_STATUS.you_lose:
         const loseEl = GameWinOrLose('you_lose');
         document.body.append(loseEl);
         break;
      case GAME_STATUS.settings:
         const setting = GameSettings();
         document.body.append(setting);
         break;
   }
}

globalSubscribe(renderApp)
renderApp();
