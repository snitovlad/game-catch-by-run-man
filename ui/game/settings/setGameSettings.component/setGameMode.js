import { getGameMode, selectGameMode, selectGameModeArr } from "../../../../data/game.data.js";


export function SetGameMode() {
   const containerElement = document.createElement('div');

   const titleElement = document.createElement('p');
   titleElement.append('Game mode');
   containerElement.append(titleElement);

   const selectElement = document.createElement('select');

   selectGameModeArr().map((el, index) => {
      const optionElement = document.createElement('option');
      //index - получили порядковый номер в массиве размеров игрового поля и присвоили value в option
      optionElement.value = index;
      optionElement.append(el);
      //выделяем нужный option
      if (el === selectGameMode()) {
        optionElement.selected = true
     }
      selectElement.append(optionElement);
   })


   selectElement.addEventListener('change', (e) => {
      const selectedIndex = e.currentTarget.value
      getGameMode(selectedIndex)
   })

   containerElement.append(selectElement);

   return containerElement;
}