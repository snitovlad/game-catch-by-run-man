import { REWARD_STATUSES, subscribe } from "../data/game.data.js";
import { selectRewardStatus } from "../data/game.data.js";

export function Player() {
   const catchAudio = new Audio();
   catchAudio.src = 'assets/sounds/catch.wav';
   subscribe(() => {
      if (selectRewardStatus() === REWARD_STATUSES.caught) {
         catchAudio.currentTime = 0;
         catchAudio.play()
      }
   })

}