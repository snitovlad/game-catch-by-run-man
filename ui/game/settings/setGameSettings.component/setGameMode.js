import { getGameMode, selectGameMode, selectGameModeArr } from "../../../../data/game.data.js";
import { createOptions } from "../../../../utils/ui-kit/ui-kit.js";


export function SetGameMode() {
   const containerElement = document.createElement('div');

   createOptions(containerElement, 'Game mode', selectGameModeArr(),
        '', selectGameMode(), getGameMode)

   return containerElement;
}