import { GAME_STATUS, buttonStartStop, gameStatusSetting, selectCurrentGameTime, selectGamePointToWin, selectGameStatus, selectPlayer1, selectPlayer2, selectStartGameTime } from "../../../data/game.data.js"
import { Button } from "../button/button.component.js"

export function GameWinOrLose(classWinLose) {

    const containerElement = document.createElement('div')
    containerElement.classList = classWinLose

    const wrapperForEl = document.createElement('div')
    wrapperForEl.classList = 'score_list'

    const title = document.createElement('p')
    const catchEl = document.createElement('p')
    if (selectPlayer1().score === selectGamePointToWin()) {
        title.innerText = selectPlayer1().name
        catchEl.innerText = 'Catch: ' + selectPlayer1().score
    }
    if (selectPlayer2().score === selectGamePointToWin()) {
        title.innerText = selectPlayer2().name
        catchEl.innerText = 'Catch: ' + selectPlayer2().score
    }

    const timeEl = document.createElement('p')
    let time = selectStartGameTime() * 60 - selectCurrentGameTime()
    let min = Math.floor(time / 60).toString()
    if (min.length === 1) min = 0 + min
    let sec = (time % 60).toString()
    if (sec.length === 1) sec = 0 + sec
    timeEl.innerText = 'Time: ' + min +' : ' + sec  

    const button = Button('start', buttonStartStop)
    const buttonSet = Button('Settings', gameStatusSetting)
    buttonSet.classList = 'button_set'
    


    wrapperForEl.append(title)
    wrapperForEl.append(catchEl)
    wrapperForEl.append(timeEl)
    wrapperForEl.append(button)
    wrapperForEl.append(buttonSet)

    containerElement.append(wrapperForEl)
    
    return containerElement
}


// export function youWinLose(classWinLose) {

//     // const containerElement = document.createElement('div')
//     // containerElement.classList = classWinLose

//     // const wrapperForEl = document.createElement('div')
//     // wrapperForEl.classList = 'score_list'

//     const catchEl = document.createElement('p')
//     catchEl.innerText = 'Catch: ' + selectPlayer1().score

//     const timeEl = document.createElement('p')
//     timeEl.innerText = 'Time: ' + resultTime()


//     wrapperForEl.append(catchEl);
//     wrapperForEl.append(timeEl);

//     const button = Button('Play again', buttonStartStop)
//     wrapperForEl.append(button)

//     const buttonSet = Button('Settings', gameStatusSetting)
//     buttonSet.classList = 'button_set'
//     wrapperForEl.append(buttonSet)

//     containerElement.append(wrapperForEl)

//     return containerElement
// }
