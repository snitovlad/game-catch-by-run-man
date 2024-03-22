// import { data, getMaximumMisses } from "../../../../data/game.data.js";


// export function SetMaximumMisses() {
//    const containerElement = document.createElement('div');

//    const titleElement = document.createElement('p');
//    titleElement.append('Maximum misses');
//    containerElement.append(titleElement);

//    const selectElement = document.createElement('select');

//    data.maximumMissesSettings.map((el, index) => {
//       const optionElement = document.createElement('option');
//       //index - получили порядковый номер в массиве размеров игрового поля и присвоили value в option
//       optionElement.value = index;
//       optionElement.append(el);
//       selectElement.append(optionElement);
//    })


//    selectElement.addEventListener('change', (e) => {
//       const selectedIndex = e.currentTarget.value
//       getMaximumMisses(selectedIndex)
//    })

//    containerElement.append(selectElement);

//    return containerElement;
// }