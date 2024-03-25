import { getGridSize, selectGridSetting, selectSettingsColumnsCount, selectSettingsRowsCount } from "../../../../data/game.data.js";
import { createOptions } from "../../../../utils/ui-kit/ui-kit.js";

export function SetGridSize() {

   //создаем переменные, чтобы можно было пользоваться функцией для создания select и options
   const arrOfGridSettings = selectGridSetting().map(el => `${el.width} x ${el.height}`)
   const settingsColumnsCountXRowsCount = selectSettingsColumnsCount() + ' x ' + selectSettingsRowsCount()

   const containerElement = document.createElement('div');
   createOptions(containerElement, 'Grid size', arrOfGridSettings, '', settingsColumnsCountXRowsCount, getGridSize)
   return containerElement;
}