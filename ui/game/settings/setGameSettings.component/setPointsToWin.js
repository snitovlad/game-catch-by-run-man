import { getPointsToWin, selectGamePointToWin, selectPointToWinSettings } from "../../../../data/game.data.js";
import { createOptions } from "../../../../utils/ui-kit/ui-kit.js";


export function SetPointsToWin() {

    const containerElement = document.createElement('div');

    createOptions(containerElement, 'Points to win', selectPointToWinSettings(),
        'pts', selectGamePointToWin(), getPointsToWin, )

    return containerElement;
}

