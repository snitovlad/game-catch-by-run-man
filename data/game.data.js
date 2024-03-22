export const REWARD_STATUSES = {
   default: 'default',
   caught: 'caught',
}
export const GAME_STATUS = {
   settings: 'settings',
   in_process: 'in_process',
   you_win: 'you_win',
   you_lose: 'you_lose'
}
const _data = {
   settings: {
      rowsCount: 3,
      columnsCount: 3,
      pointToWin: 5,
      isMuted: true
   },
   gridSettings: [
      { width: 3, height: 3 },
      { width: 4, height: 4 },
      { width: 5, height: 5 },
      { width: 6, height: 6 },
      { width: 7, height: 7 },
      { width: 8, height: 8 },
   ],
   gameStatus: GAME_STATUS.in_process,
   reward: {
      status: REWARD_STATUSES.default,
      coords: {
         current: { x: 0, y: 0 },
         previous: { x: 1, y: 1 }
      }
   },
   player1: {
      coords: {
         x: 1,
         y: 1,
      },
      score: 0
   },
   player2: {
      coords: {
         x: 2,
         y: 2,
      },
      score: 0
   }
}
let globalSubscriber = null;
export function globalSubscribe(newGlobalSubscriber) {
   globalSubscriber = newGlobalSubscriber
}

let subscribers = [];
export function subscribe(newSubscriber) {
   subscribers.push(newSubscriber);
   console.log(subscribers)
}
//запускаем по очереди функции-подписчики
function _notify() {
   subscribers.forEach(subscriber => subscriber())
}

let stepIntervalId;
function _runStepInterval() {
   stepIntervalId = setInterval(() => {
      moveRewardToRandomPosition();
      _notify();
   }, 2000)
}
//_runStepInterval();

export function moveRewardToRandomPosition() {
   let newX = null;
   let newY = null;
   do {
      newX = _getRandom(_data.settings.columnsCount - 1);
      newY = _getRandom(_data.settings.rowsCount - 1);
      var rewardIsOnOldCoords = selectCurrentRewardCoords().x === newX && selectCurrentRewardCoords().y === newY
   } while (rewardIsOnOldCoords || !isCellOfGridIsFree(newX, newY))

   //присваиваются новые координаты для reward
   selectCurrentRewardCoords().x = newX;
   selectCurrentRewardCoords().y = newY;
}

function _getRandom(N) {
   return Math.floor(Math.random() * (N + 1))
}

//функция для смены размера сетки
export function getGridSize(index) {
   _data.settings.rowsCount = _data.gridSettings[index].width;
   _data.settings.columnsCount = _data.gridSettings[index].height;
   _notify(); //перерисовываем в greed.component.js
}

//создали функцию для попадания
export function catchReward(player) {
   _data.reward.status = REWARD_STATUSES.caught;
   //считаем количество попаданий
   player.score++;
   if (player.score === _data.settings.pointToWin) {
      //_data.gameStatus = GAME_STATUS.you_win
      _timeoutForCatchImage()
      gameStatusYouWin()
      return
   }
   //присвоили предыдущие координаты для попадания
   _data.reward.coords.previous = { ...selectCurrentRewardCoords() }
   _timeoutForCatchImage()
   //запустили интервал заново
   _runStepInterval()
}

function _timeoutForCatchImage() {
   setTimeout(() => {
      _data.reward.status = REWARD_STATUSES.default;
      _notify()
   }, 200)
   //чтобы offer переместился сразу после попадания, а не ждал setInterval
   moveRewardToRandomPosition();
   _notify(); //добавили, т.к. убрали из moveOfferToRandomPosition
   //очистили интервал
   clearInterval(stepIntervalId);
}
//====статусы игры============================================================
export function gameStatusYouWin() {
   _data.gameStatus = GAME_STATUS.you_win
   console.log('you win')
   clearInterval(stepIntervalId)
   globalSubscriber()
}
//====двигаем человечка=========================================================
export function movePlayer1Up() {
   movePlayer({ x: 0, y: -1 }, selectPlayer1())
}
export function movePlayer1Down() {
   movePlayer({ x: 0, y: 1 }, selectPlayer1())
}
export function movePlayer1Left() {
   movePlayer({ x: -1, y: 0 }, selectPlayer1())
}
export function movePlayer1Right() {
   movePlayer({ x: 1, y: 0 }, selectPlayer1())
}

export function movePlayer2Up() {
   movePlayer({ x: 0, y: -1 }, selectPlayer2())
}
export function movePlayer2Down() {
   movePlayer({ x: 0, y: 1 }, selectPlayer2())
}
export function movePlayer2Left() {
   movePlayer({ x: -1, y: 0 }, selectPlayer2())
}
export function movePlayer2Right() {
   movePlayer({ x: 1, y: 0 }, selectPlayer2())
}

function movePlayer(delta, player) {
   let newX = player.coords.x + delta.x;
   let newY = player.coords.y + delta.y;
   //проверяем, что ячейка не занята другим игроком
   if (!isCellOfGridIsFree(newX, newY)
      || isNewCoordsInsideGrid(newX, newY).x < 0
      || isNewCoordsInsideGrid(newX, newY).y < 0
      || isNewCoordsInsideGrid(newX, newY).x >= selectSettingsColumnsCount()
      || isNewCoordsInsideGrid(newX, newY).y >= selectSettingsRowsCount()) {
      return;
   }

   //устанавливаем условие, чтобы игрок не выбегал за границы сетки, а возвращался с другой стороны
   player.coords.x = isNewCoordsInsideGrid(newX, newY).x
   player.coords.y = isNewCoordsInsideGrid(newX, newY).y
   //debugger
   _checkCatching(player)
   _notify()
}

//устанавливаем условие, чтобы игрок не выбегал за границы сетки, а возвращался с другой стороны
function isNewCoordsInsideGrid(x, y) {
   let newX = x
   let newY = y
   if (x < 0) newX = selectSettingsColumnsCount() - 1;
   if (y < 0) newY = selectSettingsRowsCount() - 1;
   if (x >= selectSettingsColumnsCount()) newX = 0;
   if (y >= selectSettingsRowsCount()) newY = 0;
   if (!isCellOfGridIsFree(newX, newY)) return { x, y }

   return { x: newX, y: newY };

}

//проверяем, что ячейка не занята другим игроком
function isCellOfGridIsFree(newX, newY) {
   if (newX === selectPlayer1().coords.x && newY === selectPlayer1().coords.y) return false;
   if (newX === selectPlayer2().coords.x && newY === selectPlayer2().coords.y) return false;
   return true
}

function _checkCatching(player) {
   if (player.coords.x === selectCurrentRewardCoords().x
      && player.coords.y === selectCurrentRewardCoords().y) {
      catchReward(player)
   }
}
//==============кнопка==============================
export function buttonStartStop() {
   subscribers = [];
   clearInterval(stepIntervalId)
   moveRewardToRandomPosition();
   //startTime = new Date;
   _data.player1.score = 0;
   _data.player2.score = 0;
   _data.gameStatus = GAME_STATUS.in_process
   _runStepInterval()
   globalSubscriber()
}
//==============selectors==============================
export function selectCurrentRewardCoords() {
   return _data.reward.coords.current
}
export function selectPreviousRewardCoords() {
   return _data.reward.coords.previous
}
export function selectRewardStatus() {
   return _data.reward.status
}
export function selectSettingsRowsCount() {
   return _data.settings.rowsCount
}
export function selectSettingsColumnsCount() {
   return _data.settings.columnsCount
}
export function selectPlayer1() {
   return _data.player1;
}
export function selectPlayer2() {
   return _data.player2;
}
export function selectGridSetting() {
   return _data.gridSettings;
}
export function selectGameStatus() {
   return _data.gameStatus;
}