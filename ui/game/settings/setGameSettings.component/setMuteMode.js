import { getMuteMode, selectMuteMode, soundSubscribe } from "../../../../data/game.data.js";



export function SetMuteMode() {
    soundSubscribe(() => {
        titleElement.innerHTML = ''
        imageElement.innerHTML = ''
        updateMuteMode(imageElement, titleElement)
    })

    const containerElement = document.createElement('div');

    const titleElement = document.createElement('p');
    const imageElement = document.createElement('img');

    updateMuteMode(imageElement, titleElement)

    imageElement.addEventListener('click', () => getMuteMode())

    containerElement.append(titleElement);
    containerElement.append(imageElement);
    return containerElement;
}

function updateMuteMode(imageElement, titleElement) {
    if (selectMuteMode()) {
        imageElement.src = 'assets/images/sound-off.png';
        titleElement.append('Sound off')
    } else {
        imageElement.src = 'assets/images/sound-on.png';
        titleElement.append('Sound on')
    }
}