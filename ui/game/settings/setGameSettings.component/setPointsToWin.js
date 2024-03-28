import { getPointsToWin, selectGamePointToWin, selectPointToWinSettings } from "../../../../data/game.data.js";
import { createOptions, createTitleForSelect } from "../../../../utils/ui-kit/ui-kit.js";


export function SetPointsToWin() {

    const containerElement = document.createElement('div');

    const titleElement = createTitleForSelect('Points to win')
    const selectElement = createOptions(selectPointToWinSettings(), 'pts', selectGamePointToWin(), getPointsToWin)

    containerElement.append(titleElement);
    containerElement.append(selectElement);

    return containerElement;
}

