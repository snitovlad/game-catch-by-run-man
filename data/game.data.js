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

export const GAME_MODE = {
   multiplayer: 'Multiplayer',
   single: 'Single'
}

const _data = {

   settings: {
      rowsCount: 3,
      columnsCount: 3,
      pointToWin: 5,
      isMuted: true,
      timing: {
         start: 30,
         current: 30
      },
      gameMode: GAME_MODE.multiplayer
   },

   gridSettings: [
      { width: 3, height: 3 },
      { width: 4, height: 4 },
      { width: 5, height: 5 },
      { width: 6, height: 6 },
      { width: 7, height: 7 },
      { width: 8, height: 8 },
   ],
   timeSettings: [30, 60, 120, 180, 240, 300],
   pointToWinSettings: [5, 20, 30, 40, 60, 80, 100],
   //получили массив всех значений из объекта GAME_MODE
   gameModes: Object.values(GAME_MODE),
   gameStatus: GAME_STATUS.settings,
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
      score: 0,
      name: 'player1',
   },
   player2: {
      coords: {
         x: 2,
         y: 2,
      },
      score: 0,
      name: 'player2'
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



//создали функцию для попадания
export function catchReward(player) {
   _data.reward.status = REWARD_STATUSES.caught;
   //считаем количество попаданий
   player.score++;
   if (player.score === _data.settings.pointToWin) {
      //_data.gameStatus = GAME_STATUS.you_win
      _timeoutForCatchImage()
      gameStatusYouWin()
      clearInterval(decreasOfGameTimeInterval)
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
//=====settings===============================================================

//функция для смены размера сетки
export function getGridSize(index) {
   _data.settings.rowsCount = _data.gridSettings[index].width;
   _data.settings.columnsCount = _data.gridSettings[index].height;
   _notify(); //перерисовываем в greed.component.js
}
//функция для времени игры
let decreasOfGameTimeInterval;
export function decreasOfGameTime() {
   decreasOfGameTimeInterval = setInterval(() => {
      _data.settings.timing.current--;
      if (_data.settings.timing.current === 0) {
         clearInterval(decreasOfGameTimeInterval)
         clearInterval(stepIntervalId)
         _data.gameStatus = GAME_STATUS.you_lose
         globalSubscriber()
      }
      _notify();
      //console.log(_data.settings.timing.current)
   }, 1000)
}
export function getGameTime(index) {
   _data.settings.timing.start = _data.timeSettings[index];
   _data.settings.timing.current = _data.timeSettings[index];
   _notify()
   console.log(_data.settings.timing)
}
//устанавливаем количество очков для выигрыша
export function getPointsToWin(index) {
   _data.settings.pointToWin = _data.pointToWinSettings[index]
}
//устанавливаем режим игры single or multiplayer
export function getGameMode(index) {
   _data.settings.gameMode = _data.gameModes[index]
   if (selectGameMode() === GAME_MODE.single) {
      _data.player2.coords.x = -10;
      _data.player2.coords.y = -10;
   } else {
      _data.player2.coords.x = 2;
      _data.player2.coords.y = 2;
   }
   
   globalSubscriber()
   // _data.player2.coords.x = -10;
   // _data.player2.coords.y = -10;
}
// export function multiplayerGameMode() {
//    _data.settings.gameMode = GAME_MODE.multiplayer
//    _data.player2.coords.x = 2;
//    _data.player2.coords.y = 2;
// }

//====статусы игры============================================================
export function gameStatusYouWin() {
   _data.gameStatus = GAME_STATUS.you_win
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
   decreasOfGameTime()
   clearInterval(stepIntervalId)
   moveRewardToRandomPosition();
   //startTime = new Date;
   _data.player1.score = 0;
   _data.player2.score = 0;
   _data.gameStatus = GAME_STATUS.in_process
   _data.settings.timing.current = selectStartGameTime()
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
export function selectGameMode() {
   return _data.settings.gameMode
}
export function selectGameModeArr() {
   return _data.gameModes
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
export function selectTimeSettings() {
   return _data.timeSettings;
}
export function selectStartGameTime() {
   return _data.settings.timing.start;
}
export function selectCurrentGameTime() {
   return _data.settings.timing.current;
}

export function selectGameStatus() {
   return _data.gameStatus;
}
export function selectGamePointToWin() {
   return _data.settings.pointToWin;
}
export function selectPointToWinSettings() {
   return _data.pointToWinSettings;
}
