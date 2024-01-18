import { OFFER_STATUSES, subscribe } from "../data/game.data.js";
import { selectOfferStatus } from "../data/game.data.js";

export function Player() {
   const catchAudio = new Audio();
   catchAudio.src = 'assets/sounds/catch.wav';
   subscribe(() => {
      if (selectOfferStatus() === OFFER_STATUSES.caught) {
         catchAudio.currentTime = 0;
         catchAudio.play()
      }
   })

}