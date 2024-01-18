export const OFFER_STATUSES = {
   default: 'default',
   caught: 'caught',
   miss: 'miss'
}

const _data = {
   settings: {
      rowsCount: 5,
      columnsCount: 4,
      pointToWin: 10,
      maximumMisses: 3,
      decreaseDeltaInMs: 100,
      isMuted: true
   },
   offerStatus: OFFER_STATUSES.default,
   coords: {
      offer: {
         current: {
            //наверно можно убрать начальные координаты
            x: 0,
            y: 0
         },
         previous: {
            x: 1,
            y: 1
         }
      },
      player1: {
         current: {
            x: 1,
            y: 2
         }
      }
   },
   score: {
      missCount: 2,
      caughtCount: 1
   }
}

let subscribers = [];

export function subscribe(newSubscriber) {
   subscribers.push(newSubscriber);
}
//запускаем по очереди функции-подписчики
function _notify() {
   subscribers.forEach(subscriber => subscriber())
}

let stepIntervalId;
function _runStepInterval() {
   stepIntervalId = setInterval(() => {
      _missOffer();
      _moveOfferToRandomPosition();
      _notify();
   }, 2000)
}
_runStepInterval();

function _moveOfferToRandomPosition() {
   let newX = null;
   let newY = null;
   do {
      newX = _getRandom(_data.settings.columnsCount - 1);
      newY = _getRandom(_data.settings.rowsCount - 1);

      var offerIsOnNewCoords = _data.coords.offer.current.x === newX && _data.coords.offer.current.y === newY
      var player1IsOnNewCoords = _data.coords.player1.current.x === newX && _data.coords.player1.current.y === newY

   } while (offerIsOnNewCoords || player1IsOnNewCoords)

   //присваиваются новые координаты для offer
   _data.coords.offer.current.x = newX;
   _data.coords.offer.current.y = newY;
}

//создали функцию для промаха
function _missOffer() {
   _data.offerStatus = OFFER_STATUSES.miss;
   //считаем количество промахов
   _data.score.missCount++;
   //присвоили предыдущие координаты для промаха
   _data.coords.offer.previous = { ..._data.coords.offer.current }

   setTimeout(() => {
      _data.offerStatus = OFFER_STATUSES.default;
      _notify()

   }, 200)

}

function _getRandom(N) {
   return Math.floor(Math.random() * (N + 1))
}

//создали функцию для попадания
export function catchOffer() {
   _data.offerStatus = OFFER_STATUSES.caught;
   //считаем количество попаданий
   _data.score.caughtCount++;
   //присвоили предыдущие координаты для попадания
   _data.coords.offer.previous = { ..._data.coords.offer.current }

   setTimeout(() => {
      _data.offerStatus = OFFER_STATUSES.default;
      _notify()
   }, 200)
   //чтобы offer переместился сразу после попадания, а не ждал setInterval
   _moveOfferToRandomPosition();
   _notify(); //добавили, т.к. убрали из moveOfferToRandomPosition
   //очистили интервал
   clearInterval(stepIntervalId);
   //запустили интервал заново
   _runStepInterval()
}

//====двигаем человечка=========================
function _movePlayerWithinGridUpLeft(coord, rowOrColumnCount) {
   if (_data.coords.player1.current[coord] - 1 < 0) {
      _data.coords.player1.current[coord] = _data.settings[rowOrColumnCount] - 1
   } else {     
      _data.coords.player1.current[coord]--;
   }
   _checkCatching()
   _notify()
}

function _movePlayerWithinGridDownRight(coord, rowOrColumnCount) {
   if (_data.coords.player1.current[coord] + 1 > _data.settings[rowOrColumnCount] - 1) {
      _data.coords.player1.current[coord] = 0
   } else {     
      _data.coords.player1.current[coord]++;
   }
   _checkCatching()
   _notify()
}

export function movePlayer1Up() {
   _movePlayerWithinGridUpLeft('y', 'rowsCount')
}
export function movePlayer1Down() {
   _movePlayerWithinGridDownRight('y', 'rowsCount')
}
export function movePlayer1Left() {
   _movePlayerWithinGridUpLeft('x', 'columnsCount')
}
export function movePlayer1Right() {
   _movePlayerWithinGridDownRight('x', 'columnsCount')
}

function _checkCatching() {
   if (_data.coords.player1.current.x === _data.coords.offer.current.x 
      && _data.coords.player1.current.y === _data.coords.offer.current.y ) {
         catchOffer()
      }
 }

//==============selectors==============================
export function selectCurrentOfferCoords() {
   return _data.coords.offer.current
}
export function selectPreviousOfferCoords() {
   return _data.coords.offer.previous
}
export function selectOfferStatus() {
   return _data.offerStatus
}
export function selectSettingsRowsCount() {
   return _data.settings.rowsCount
}
export function selectSettingsColumnsCount() {
   return _data.settings.columnsCount
}
export function selectScoreCaughtCount() {
   return _data.score.caughtCount
}
export function selectScoreMissCount() {
   return _data.score.missCount
}
export function selectPlayer1Coords() {
   return _data.coords.player1.current;
}