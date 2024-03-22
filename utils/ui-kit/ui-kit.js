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