import { selectPlayer1, selectPlayer2, selectCurrentGameTime, selectGameMode, GAME_MODE, scoreSubscribe } from '../../../data/game.data.js'

export function Scores() {

   scoreSubscribe(() => {
      player1ScoreElement.innerHTML = ''
      player2ScoreElement.innerHTML = ''
      timeElement.innerHTML = ''
      update(containerElement, player1ScoreElement, player2ScoreElement, timeElement);
   })

   const containerElement = document.createElement('div');
   containerElement.classList = 'score-block'

   const player1ScoreElement = document.createElement('div');
   const player2ScoreElement = document.createElement('div');
   const timeElement = document.createElement('div');

   update(containerElement, player1ScoreElement, player2ScoreElement, timeElement);
   return containerElement;
}

function update(containerElement, player1ScoreElement, player2ScoreElement, timeElement) {

   let min = Math.floor(selectCurrentGameTime() / 60).toString()
   if (min.length === 1) min = 0 + min
   let sec = (selectCurrentGameTime() % 60).toString()
   if (sec.length === 1) sec = 0 + sec

   player1ScoreElement.append(selectPlayer1().name + ': ' + selectPlayer1().score)
   player2ScoreElement.append(selectPlayer2().name + ': ' + selectPlayer2().score)
   timeElement.append('time: ' + min + ': ' + sec)
   if (selectGameMode() === GAME_MODE.multiplayer) {
      containerElement.append(player1ScoreElement, player2ScoreElement, timeElement)
   } else {
      containerElement.append(player1ScoreElement, timeElement)

   }
}