import { getGameMode, selectGameMode, selectGameModeArr } from "../../../../data/game.data.js";
import { createOptions, createTitleForSelect } from "../../../../utils/ui-kit/ui-kit.js";


export function SetGameMode() {
    const containerElement = document.createElement('div');

    const titleElement = createTitleForSelect('Game mode')
    const selectElement = createOptions( selectGameModeArr(), '', selectGameMode(), getGameMode)

    containerElement.append(titleElement);
    containerElement.append(selectElement);

    return containerElement;
}