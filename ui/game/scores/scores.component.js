import { selectPlayer1, selectPlayer2, subscribe } from '../../../data/game.data.js'

export function Scores() {
   subscribe(() => {
      containerElement.innerHTML = '';
      update(containerElement);
   })

   const containerElement = document.createElement('div');
   update(containerElement);
   return containerElement;
}

function update(containerElement) {
   containerElement.append('player1: ' + selectPlayer1().score + '; player2: ' + selectPlayer2().score);
}