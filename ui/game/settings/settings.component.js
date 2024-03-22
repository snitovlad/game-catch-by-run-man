// export function Settings() {
//    const containerElement = document.createElement('div');
//    containerElement.append('settings will be here')
//    return containerElement;
// }

import { SetGridSize } from "./setGameSettings.component/setGreedSize.js";
// import { SetPointsToWin } from "./setGameSettings.component/setPointsToWin.js";
// import { SetMaximumMisses } from "./setGameSettings.component/setMaximumMisses.js";
// import { SetDecreaseMsAfterCatch } from "./setGameSettings.component/setDecreaseMsAfterCatch.js";
// import { SetMuteMode } from "./setGameSettings.component/setMuteMode.js";


export function Settings() {
   const containerElement = document.createElement('div');

   const setGridSize = SetGridSize();
   containerElement.append(setGridSize)

   // const setPointsToWin = SetPointsToWin();
   // containerElement.append(setPointsToWin)

   // const setMaximumMisses = SetMaximumMisses();
   // containerElement.append(setMaximumMisses);

   // const setDecreaseMsAfterCatch = SetDecreaseMsAfterCatch();
   // containerElement.append(setDecreaseMsAfterCatch);

   // const setMuteMode = SetMuteMode();
   // containerElement.append(setMuteMode);

   return containerElement;
}