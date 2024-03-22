// import { data, getPointsToWin } from "../../../../data/game.data.js";


// export function SetPointsToWin() {
//    const containerElement = document.createElement('div');

//    const titleElement = document.createElement('p');
//    titleElement.append('Points to win');
//    containerElement.append(titleElement);

//    const selectElement = document.createElement('select');

//     data.pointToWinSettings.map((el, index) => {
//       const optionElement = document.createElement('option');
//       //index - получили порядковый номер в массиве размеров игрового поля и присвоили value в option
//        optionElement.value = index;
//       optionElement.append(`${el} pts`);
//       selectElement.append(optionElement);
//     })


//    selectElement.addEventListener('change', (e) => {
//       const selectedIndex = e.currentTarget.value
//       getPointsToWin(selectedIndex)
//    })

//    containerElement.append(selectElement);

//    return containerElement;
// }