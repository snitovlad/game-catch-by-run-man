import { catchOffer, OFFER_STATUSES, selectPlayer1Coords, subscribe } from "../../../../data/game.data.js";
import { selectCurrentOfferCoords, selectOfferStatus, selectPreviousOfferCoords } from "../../../../data/game.data.js";
import { Image } from "../../../../utils/ui-kit/ui-kit.js";

export function Cell(x, y) {
   subscribe(() => {
      update(x, y, cellEl)
   })
   const cellEl = document.createElement('td');
   update(x, y, cellEl);
   return cellEl;
}

function update(x, y, cellEl) {

   const isCellCoordsEqualCurrent = x === selectCurrentOfferCoords().x && y === selectCurrentOfferCoords().y;
   const didCatchOffer = selectOfferStatus() === OFFER_STATUSES.caught;
   const isCellCoordsEqualPrevious = x === selectPreviousOfferCoords().x && y === selectPreviousOfferCoords().y;
   const didMissOffer = selectOfferStatus() === OFFER_STATUSES.miss;
   const didDefaultStatus = selectOfferStatus() === OFFER_STATUSES.default;
   const isPlayer1InsideCell = x === selectPlayer1Coords().x && y === selectPlayer1Coords().y

   cellEl.innerHTML = '';

   if (isCellCoordsEqualCurrent) {
      // const offerEl = Image('assets/images/offer.png', {click: catchOffer})
      //offerEl.addEventListener('click', catchOffer)
      const offerEl = Image('assets/images/offer.png')
      cellEl.append(offerEl);
   }
   if (didCatchOffer && isCellCoordsEqualPrevious) {
      const caughtEl = Image('assets/images/caught-offer.png')
      cellEl.append(caughtEl);
   }
   if (didMissOffer && isCellCoordsEqualPrevious) {
      const missedEl = Image('assets/images/missed-offer.png')
      cellEl.append(missedEl);
   }
   //здесь логика, чтобы одновременно в ячейке присутствовала только одна картинка
   if (isPlayer1InsideCell && (didDefaultStatus || (didMissOffer && !isCellCoordsEqualPrevious))) {
      const player1 = Image('assets/images/player1.png')
      cellEl.append(player1);
   }
}