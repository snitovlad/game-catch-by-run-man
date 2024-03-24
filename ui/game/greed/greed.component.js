import {
   moveRewardToRandomPosition, movePlayer1Down, movePlayer1Left, movePlayer1Right, movePlayer1Up,
   selectSettingsColumnsCount, selectSettingsRowsCount, subscribe,
   movePlayer2Up, movePlayer2Left, movePlayer2Down, movePlayer2Right, 
   selectGameMode, GAME_MODE, selectGameStatus, GAME_STATUS
} from '../../../data/game.data.js';
import { Cell } from './cell/cell.component.js'

export function Greed() {

   moveRewardToRandomPosition(); //запустили случайную отрисовку начальных координат
   subscribe(() => updateGrid(selectSettingsRowsCount(), selectSettingsColumnsCount(), containerElement))

   const containerElement = document.createElement('table');
   containerElement.classList = 'grid';
   updateGrid(selectSettingsRowsCount(), selectSettingsColumnsCount(), containerElement)
   return containerElement;
}

//будем двигать человечка
window.addEventListener('keyup', (e) => {
   if (selectGameStatus() === GAME_STATUS.in_process) {
      switch (e.code) {
         case 'ArrowUp':
            movePlayer1Up();
            break;
         case 'ArrowDown':
            movePlayer1Down();
            break;
         case 'ArrowLeft':
            movePlayer1Left();
            break;
         case 'ArrowRight':
            movePlayer1Right();
            break;
      }
      if (selectGameMode() === GAME_MODE.multiplayer) {
         switch (e.code) {
            case 'KeyQ':
               movePlayer2Up();
               break;
            case 'KeyA':
               movePlayer2Down();
               break;
            case 'KeyX':
               movePlayer2Left();
               break;
            case 'KeyC':
               movePlayer2Right();
               break;
         }
      }
   }
})

function updateGrid(rows, columns, containerElement) {
   containerElement.innerHTML = '';
   for (let y = 0; y < rows; y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < columns; x++) {
         const cell = Cell(x, y);
         row.append(cell)
      }
      containerElement.append(row)
   }
}