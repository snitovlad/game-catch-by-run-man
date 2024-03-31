import { GAME_MODE, selectGameMode } from "../../../data/game.data.js"

export function stringInfo() {
    const containerElement = document.createElement('div')
    containerElement.classList = 'string-info-container'

    const stringInfoElement = document.createElement('div')
    stringInfoElement.classList = 'string-info'

    if (selectGameMode() === GAME_MODE.multiplayer) {
        stringInfoElement.innerText = 'ℹ️ Control is carried out with the help of arrows for player 1 "arrows", for player 2 "QAXC"'
    } else {
        stringInfoElement.innerText = 'ℹ️ The control is performed with the arrows on the keyboard'
    }
    containerElement.append(stringInfoElement)
    return containerElement
}