import { GAME_STATUS, buttonStartStop, selectGamePointToWin, selectGameStatus, selectPlayer1, selectPlayer2 } from "../../../data/game.data.js"
import { Button } from "../button/button.component.js"

export function gameStatusWinLose() {


    let title = ' YOU ARE WIN'
    if (selectGameStatus() === GAME_STATUS.you_win) {
        
        if (selectPlayer1().score === selectGamePointToWin()) {
            title = selectPlayer1().name + title
        }
        if (selectPlayer2().score === selectGamePointToWin()) {
            title = selectPlayer2().name + title
        }
    } else {
        title = ' YOU ARE LOSE'
    }

    const button = Button('start', buttonStartStop)
    
    const containerElement = document.createElement('div')
    containerElement.append(title)
    containerElement.append(button)
    return containerElement
}

