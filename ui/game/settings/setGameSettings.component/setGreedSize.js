import { getGridSize, selectGridSetting, selectSettingsColumnsCount, selectSettingsRowsCount } from "../../../../data/game.data.js";
import { createOptions, createTitleForSelect } from "../../../../utils/ui-kit/ui-kit.js";

export function SetGridSize() {

   //создаем переменные, чтобы можно было пользоваться функцией для создания select и options
   const arrOfGridSettings = selectGridSetting().map(el => `${el.width} x ${el.height}`)
   const settingsColumnsCountXRowsCount = selectSettingsColumnsCount() + ' x ' + selectSettingsRowsCount()

   const containerElement = document.createElement('div');

   const titleElement = createTitleForSelect('Grid size')   
   const selectElement = createOptions( arrOfGridSettings, '', settingsColumnsCountXRowsCount, getGridSize)

   containerElement.append(titleElement);
   containerElement.append(selectElement);

   return containerElement;
}