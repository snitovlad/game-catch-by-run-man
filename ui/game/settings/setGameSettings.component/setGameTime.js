import { getGameTime, selectStartGameTime, selectTimeSettings } from "../../../../data/game.data.js";


export function SetGameTime() {
   const containerElement = document.createElement('div');

   const titleElement = document.createElement('p');
   titleElement.append('Time');
   containerElement.append(titleElement);

   const selectElement = document.createElement('select');

   selectTimeSettings().map((el, index) => {
      const optionElement = document.createElement('option');
      //index - получили порядковый номер в массиве размеров игрового поля и присвоили value в option
      optionElement.value = index;
      optionElement.append(`${el / 60} min`);
      //выделяем нужный option
      if (el === selectStartGameTime()) {
         optionElement.selected = true
      }
      selectElement.append(optionElement);
   })


   selectElement.addEventListener('change', (e) => {
      const selectedIndex = e.currentTarget.value
      getGameTime(selectedIndex)
   })

   containerElement.append(selectElement);

   return containerElement;
}