import { selectPlayer1, selectPlayer2, subscribe, selectCurrentGameTime, selectGameMode, GAME_MODE } from '../../../data/game.data.js'

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
   
   // let time = selectCurrentGameTime() * 60
   // console.log(time)
   let min = Math.floor(selectCurrentGameTime() / 60).toString()
   if (min.length === 1) min = 0 + min
   let sec = (selectCurrentGameTime() % 60).toString()
   if (sec.length === 1) sec = 0 + sec
   if (selectGameMode() === GAME_MODE.multiplayer) {
      containerElement.append('player1: ' + selectPlayer1().score
         + '; player2: ' + selectPlayer2().score
         + '; time: ' + min + ': ' + sec);
   } else { containerElement.append('player1: ' + selectPlayer1().score + '; time: ' + min + ': ' + sec); }
}