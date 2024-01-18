import { movePlayer1Down, movePlayer1Left, movePlayer1Right, movePlayer1Up, selectSettingsColumnsCount, 
   selectSettingsRowsCount } from '../../../data/game.data.js';
import { Cell } from './cell/cell.component.js'

export function Greed() {
   const containerElement = document.createElement('table');
   for (let y = 0; y < selectSettingsRowsCount(); y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < selectSettingsColumnsCount(); x++) {
         const cell = Cell(x, y);
         row.append(cell)

      }
      containerElement.append(row)
   }

   //будем двигать человечка
   window.addEventListener('keydown', (e) => {
      //console.log(e.code)
      switch(e.code) {

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
   })

   return containerElement;
}