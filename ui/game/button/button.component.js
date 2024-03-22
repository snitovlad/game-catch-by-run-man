export function Button(title, func) {   
    const containerElement = document.createElement('div')
    
    const buttonElement = document.createElement('button')
    buttonElement.classList = 'button_start'
    buttonElement.innerText= title
   
    buttonElement.addEventListener('click', () => {
       func()
    })
    containerElement.append(buttonElement)
    return containerElement
 }