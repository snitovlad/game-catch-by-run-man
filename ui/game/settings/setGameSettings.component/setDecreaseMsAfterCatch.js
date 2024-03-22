// import { data, getDecreaseMsAfterTheCatch } from "../../../../data/game.data.js";


// export function SetDecreaseMsAfterCatch() {
//    const containerElement = document.createElement('div');

//    const titleElement = document.createElement('p');
//    titleElement.append('Decrease ms after the catch');
//    containerElement.append(titleElement);

//    const selectElement = document.createElement('select');

//    data.decreaseMsAfterTheCatch.map((el, index) => {
//       const optionElement = document.createElement('option');
//       //index - получили порядковый номер в массиве размеров игрового поля и присвоили value в option
//       optionElement.value = index;
//       optionElement.append(`${el} ms`);
//       selectElement.append(optionElement);
//    })


//    selectElement.addEventListener('change', (e) => {
//       const selectedIndex = e.currentTarget.value
//       getDecreaseMsAfterTheCatch(selectedIndex)
//    })

//    containerElement.append(selectElement);

//    return containerElement;
// }