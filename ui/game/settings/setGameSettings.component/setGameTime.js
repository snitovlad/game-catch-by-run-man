import { getGameTime, selectStartGameTime, selectTimeSettings } from "../../../../data/game.data.js";
import { createOptions } from "../../../../utils/ui-kit/ui-kit.js";


export function SetGameTime() {
   const containerElement = document.createElement('div');

   createOptions(containerElement, 'Time', selectTimeSettings(),
        'min', selectStartGameTime(), getGameTime)

   return containerElement;
}