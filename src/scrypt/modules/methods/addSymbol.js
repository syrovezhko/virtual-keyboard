import {serviceKeys} from './../elements/content.js'

export function addSymbolFromKey(keyCode, keyClass, index) {
    let inputField = document.getElementsByClassName('input')[0];
    let inputKey = document.getElementsByClassName(keyClass)[0];
    let cursorPosition = inputField.selectionEnd;
    if (keyCode === 'Tab') {
        inputField.value += '    ';
    } else if (keyCode === 'ArrowUp') {
        inputField.value += '▲';
    } else if (keyCode === 'ArrowLeft') {
        inputField.value += '◄';
    } else if (keyCode === 'ArrowDown') {
        inputField.value += '▼';
    } else if (keyCode === 'ArrowRight') {
        inputField.value += '►'
    } else if (keyCode === 'Backspace') {
        let tail = inputField.value.substring(cursorPosition);
        inputField.value = inputField.value.substring(0, cursorPosition-1)+tail;
    } else if (keyCode === 'Enter') {
        inputField.value = inputField.value + "\n";
    } else if (!serviceKeys.includes(keyCode)){
        inputField.value += inputKey.textContent[index];
    }
}