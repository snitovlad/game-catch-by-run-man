import { SetGamePlayer } from "./setGameSettings.component/playerChoice.js";
import { SetGameMode } from "./setGameSettings.component/setGameMode.js";
import { SetGameTime } from "./setGameSettings.component/setGameTime.js";
import { SetGridSize } from "./setGameSettings.component/setGreedSize.js";
import { SetMuteMode } from "./setGameSettings.component/setMuteMode.js";
import { SetPointsToWin } from "./setGameSettings.component/setPointsToWin.js";

export function Settings() {
   const containerElement = document.createElement('div');
   containerElement.classList = 'settings'

   const setGridSize = SetGridSize();
   containerElement.append(setGridSize)

   const setPointsToWin = SetPointsToWin();
   containerElement.append(setPointsToWin)

   const setGameTime = SetGameTime();
   containerElement.append(setGameTime);

   const setGameMode = SetGameMode();
   containerElement.append(setGameMode); 

   const setGamePlayer = SetGamePlayer();
   containerElement.append(setGamePlayer);

   const setMuteMode = SetMuteMode();
   containerElement.append(setMuteMode);

   return containerElement;
}