import { REWARD_STATUSES, selectPlayer1, selectPlayer2 } from "../../../../data/game.data.js";
import { selectCurrentRewardCoords, selectRewardStatus, selectPreviousRewardCoords } from "../../../../data/game.data.js";
import { Image } from "../../../../utils/ui-kit/ui-kit.js";

export function Cell(x, y) {
   // subscribe(() => {
   //    update(x, y, cellEl)
   // })
   const cellEl = document.createElement('td');
   update(x, y, cellEl);
   return cellEl;
}

function update(x, y, cellEl) {

   const isCellCoordsEqualCurrent = x === selectCurrentRewardCoords().x && y === selectCurrentRewardCoords().y;
   const didCatchOffer = selectRewardStatus() === REWARD_STATUSES.caught;
   const isCellCoordsEqualPrevious = x === selectPreviousRewardCoords().x && y === selectPreviousRewardCoords().y;
   const didDefaultStatus = selectRewardStatus() === REWARD_STATUSES.default;
   const isPlayer1InsideCell = x === selectPlayer1().coords.x && y === selectPlayer1().coords.y
   const isPlayer2InsideCell = x === selectPlayer2().coords.x && y === selectPlayer2().coords.y

   cellEl.innerHTML = '';

   if (isCellCoordsEqualCurrent) {
      const offerEl = Image('assets/images/offer.png')
      cellEl.append(offerEl);
   }
   if (didCatchOffer && isCellCoordsEqualPrevious) {
      const caughtEl = Image('assets/images/caught-offer.png')
      cellEl.append(caughtEl);
   }

   //здесь логика, чтобы одновременно в ячейке присутствовала только одна картинка
   if (isPlayer1InsideCell && (didDefaultStatus || !isCellCoordsEqualPrevious)) {
      const player1 = Image('assets/images/player1.png')
      cellEl.append(player1);
   }
   if (isPlayer2InsideCell && (didDefaultStatus || !isCellCoordsEqualPrevious)) {
      const player1 = Image('assets/images/player2.png')
      cellEl.append(player1);
   }
}