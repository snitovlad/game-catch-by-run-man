import { GAME_MODE, selectChoicePlayerInSetting, selectChoicePlayers, selectGameMode, selectedPlayer } from "../../../../data/game.data.js";
import { createOptions, createTitleForSelect } from "../../../../utils/ui-kit/ui-kit.js";


export function SetGamePlayer() {
   const containerElement = document.createElement('div');

   const titleElement = createTitleForSelect('Choose who you will play for')
   const selectElement = createOptions(selectChoicePlayers(), '', selectChoicePlayerInSetting(), selectedPlayer)

   if (selectGameMode() === GAME_MODE.multiplayer) selectElement.disabled = true

   containerElement.append(titleElement);
   containerElement.append(selectElement);

   return containerElement;
}