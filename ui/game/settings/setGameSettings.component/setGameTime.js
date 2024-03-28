import { getGameTime, selectStartGameTime, selectTimeSettings } from "../../../../data/game.data.js";
import { createOptions, createTitleForSelect } from "../../../../utils/ui-kit/ui-kit.js";


export function SetGameTime() {
   const containerElement = document.createElement('div');

   const titleElement = createTitleForSelect('Time') 
   const selectElement = createOptions( selectTimeSettings(), 'min', selectStartGameTime(), getGameTime)

   containerElement.append(titleElement);
   containerElement.append(selectElement);
   
   return containerElement;
}