import {serviceKeys} from './../elements/content.js'

export function addSymbolFromKey(keyClass) {
    let inputField = document.getElementsByClassName('input')[0];
    let cursorPosition = inputField.selectionEnd;
    if (keyClass === 'Tab') {
        inputField.value += '    ';
    } else if (keyClass === 'ArrowUp') {
        inputField.value += '▲';
    } else if (keyClass === 'ArrowLeft') {
        inputField.value += '◄';
    } else if (keyClass === 'ArrowDown') {
        inputField.value += '▼';
    } else if (keyClass === 'ArrowRight') {
        inputField.value += '►'
    } else if (keyClass === 'Backspace') {
        let tail = inputField.value.substring(cursorPosition);
        inputField.value = inputField.value.substring(0, cursorPosition-1)+tail;
    } else if (keyClass === 'Enter') {
        inputField.value = inputField.value + "\n";
    } else if (!serviceKeys.includes(keyClass)){
        inputField.value += keyClass;
    }
}