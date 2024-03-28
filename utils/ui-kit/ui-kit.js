import { GAME_STATUS, selectGameStatus } from "../../data/game.data.js";

// export function Image(src, option = {}) {
//    const image = document.createElement('img');
//    image.src = src;
//    if (option.click) {
//       image.addEventListener('click', option.click)
//    }
//    return image;
// }

//у нас мог быть не один addEventListener, а много с разными событиями
//поэтому можно написать более универсальную функцию
export function Image(src, listeners = {}) {
   const image = document.createElement('img');
   image.src = src;

   //в этой игре не нужно
   //очень изящное решение
   // Object.keys(listeners).forEach(key => {
   //пробегаемся по ключам объекта listeners и для каждого ключа вызываем функцию
   //    image.addEventListener(key, listeners[key])
   // })
   return image;
}

//=========функция для создания selector and options для settings=============================
export function createTitleForSelect(title) {
   const titleElement = document.createElement('p');
   titleElement.append(title);
   return titleElement
}

export function createOptions( arrayForOptions, unit, selectedOption, getValueForSelect) {
   
   const selectElement = document.createElement('select');

   arrayForOptions.map((el, index) => {
       const optionElement = document.createElement('option');
       //index - получили порядковый номер в массиве размеров игрового поля и присвоили value в option
       optionElement.value = index;
       optionElement.append(`${el} ${unit}`); //`${el} pts`
       //выделяем нужный option
       if (el === selectedOption) {
           optionElement.selected = true
       }
       selectElement.append(optionElement);

       selectElement.addEventListener('change', (e) => {
           const selectedIndex = e.currentTarget.value
           getValueForSelect(selectedIndex)
       })
   })
   if (selectGameStatus() === GAME_STATUS.in_process) selectElement.disabled = true
   return selectElement
}