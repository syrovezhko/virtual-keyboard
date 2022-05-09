import './../sass/main.scss'
import {container} from './modules/elements/container.js'
import {addChild} from './modules/methods/addChild.js'
import {title, inputBlockRow, keyboardBody, description, language} from './modules/elements/layout.js'
import {content} from './modules/elements/content.js'
import {addSymbolFromKey} from './modules/methods/addSymbol.js'
import {displayKeyByPhysicalKeyboard, hideKeyByPhysicalKeyboard, displaySymbol, switchLang} from './modules/methods/displayKey.js'

container()
addChild(title)
addChild(inputBlockRow)
addChild(keyboardBody)
for(let i = 0; i < content.length; i+=8) {
    let keyboardRow = {
        parent: 'keyboard',
        tag: 'div',
        class: `keyboard-row row${i/8 + 1}`,
        content: ''
    };
    addChild(keyboardRow);
    for(let j = 0; j < content[i].length; j++){
        let keyClass = '';
        if ((Number(content[i][j]) || Number(content[i][j])===0) && content[i][j] !== ' '){
            keyClass = `Digit${content[i][j]}`;
        } else {
            switch(content[i][j]){
                case '`':
                    keyClass = 'Backquote';
                    break;
                case '-':
                    keyClass = 'Minus';
                    break;
                case '=':
                    keyClass = 'Equal';
                    break;
                case '[':
                    keyClass = 'BracketLeft';
                    break;
                case ']':
                    keyClass = 'BracketRight';
                    break;
                case `\\`:
                    keyClass = 'Backslash';
                    break;
                case ';':
                    keyClass = 'Semicolon';
                    break;
                case `'`:
                    keyClass = 'Quote';
                    break;
                case ',':
                    keyClass = 'Comma';
                    break;
                case '.':
                    keyClass = 'Period';
                    break;
                case '/':
                    keyClass = 'Slash';
                    break;
                case '▲':
                    keyClass = 'ArrowUp';
                    break;
                case ' ':
                    keyClass = 'Space';
                    break;
                case '◄':
                    keyClass = 'ArrowLeft';
                    break;
                case '▼':
                    keyClass = 'ArrowDown';
                    break;
                case '►':
                    keyClass = 'ArrowRight';
                    break;
                case 'CapsLock':
                    keyClass = 'CapsLock';
                    break;
                case 'Tab':
                    keyClass = 'Tab';
                    break;
                case 'BackSpace':
                    keyClass = 'Backspace';
                    break;
                case 'Enter':
                    keyClass = 'Enter';
                    break;
                case 'Shift':
                    keyClass = 'Shift';
                    break;
                case 'Ctrl':
                    keyClass = 'Control';
                    break;
                case 'Win':
                    keyClass = 'MetaLeft';
                    break;
                case 'Alt':
                    keyClass = 'Alt';
                    break;
                default:
                    keyClass = `Key${content[i][j].toUpperCase()}`;
                    break;
            }
        }
        let key = {
            parent: `row${i/8 + 1}`,
            tag: 'div',
            class: `key ${keyClass}`,
            content: ''
        };
        if (j === 0 && i === 24 || j === 0 && i === 32 || j === 2 && i === 32) {
            keyClass = `${keyClass}Left`
            key.class += ' ' + keyClass;
        }
        if (i === 24 && j === content[i].length-1 || j === content[i].length-1 && i === 32 || j === content[i].length-5 && i === 32) {
            keyClass = `${keyClass}Right`
            key.class += ' ' + keyClass;
        }
        addChild(key);
        let rus = {
            parent: `${keyClass}`,
            tag: 'span',
            class: `rus rus-${keyClass} hidden`,
            content: ''
        };
        let eng = {
            parent: `${keyClass}`,
            tag: 'span',
            class: `eng eng-${keyClass}`,
            content: ''
        };
        addChild(rus);
        addChild(eng);
        let caseDownRus = {
            parent: `rus-${keyClass}`,
            tag: 'span',
            class: `caseDown caseDown-${keyClass}`,
            content: content[i+4][j]
        }
        let caseUpRus = {
            parent: `rus-${keyClass}`,
            tag: 'span',
            class: `caseUp caseUp-${keyClass} hidden`,
            content: content[i+5][j]
        }
        let capsRus = {
            parent: `rus-${keyClass}`,
            tag: 'span',
            class: `caps caps-${keyClass} hidden`,
            content: content[i+6][j]
        }
        let shiftCapsRus = {
            parent: `rus-${keyClass}`,
            tag: 'span',
            class: `shiftCaps shiftCaps-${keyClass} hidden`,
            content: content[i+7][j]
        }


        let caseDownEng = {
            parent: `eng-${keyClass}`,
            tag: 'span',
            class: `caseDown caseDown-${keyClass}`,
            content: content[i][j]
        }
        let caseUpEng = {
            parent: `eng-${keyClass}`,
            tag: 'span',
            class: `caseUp caseUp-${keyClass} hidden`,
            content: content[i+1][j]
        }
        let capsEng = {
            parent: `eng-${keyClass}`,
            tag: 'span',
            class: `caps caps-${keyClass} hidden`,
            content: content[i+2][j]
        }
        let shiftCapsEng = {
            parent: `eng-${keyClass}`,
            tag: 'span',
            class: `shiftCaps shiftCaps-${keyClass} hidden`,
            content: content[i+3][j]
        }
        addChild(caseDownRus)
        addChild(caseDownEng)
        addChild(caseUpRus)
        addChild(caseUpEng)
        addChild(capsRus)
        addChild(capsEng)
        addChild(shiftCapsRus)
        addChild(shiftCapsEng)
    }
}
addChild(description)
addChild(language)


let arr = [
    [0, 1, 2, 3],
    [4, 5, 6, 7]
]
let lang;
if (localStorage.getItem("lang") === null) {
    localStorage.setItem('lang', '0')
  }
if (lang === 'undefined') {
    switchLang(0);
    lang = Number(localStorage.getItem('lang'))
}

let isUp = 0

switchLang(arr[Number(localStorage.getItem('lang'))][isUp]);

let keyScreen;
let keysPressed = {};
document.addEventListener('mousedown', function (event){
    keyScreen = (event.path[0].classList.item(1));
    if(keyScreen !== null){

        if (keyScreen.indexOf('-')) {
            let i = keyScreen.indexOf('-')
            keyScreen = keyScreen.slice(i+1)
        }
        if (keyScreen !== 'row1' && keyScreen !== 'row2' && keyScreen !== 'row3' && keyScreen !== 'row4' && keyScreen !== 'row5') {
            keysPressed[keyScreen] = true;
            event.preventDefault();
            if (keysPressed['ShiftLeft'] && keyScreen == 'AltLeft' || keysPressed['AltLeft'] && keyScreen == 'ShiftLeft') {
                lang = Number(localStorage.getItem('lang'))
                lang++;
                lang %= 2;
                localStorage.setItem('lang', lang.toString())
                
            }
            let caps = document.getElementsByClassName('CapsLock')[0];
            if (keyScreen === 'CapsLock' || caps.matches('.active')) {
                isUp = 2;
                if (keysPressed['ShiftLeft'] || keysPressed['ShiftRight']) {
                    isUp = 3
                }
            }
            if (keyScreen === 'ShiftLeft' || keyScreen === 'ShiftRight') {
                isUp = 1;
            }
            addSymbolFromKey(event.key, keyScreen, arr[Number(localStorage.getItem('lang'))][isUp]);
            switchLang(arr[Number(localStorage.getItem('lang'))][isUp]);
            displayKeyByPhysicalKeyboard(keyScreen);
            displaySymbol(keyScreen, arr[Number(localStorage.getItem('lang'))][isUp]);
        }
    }

})
document.addEventListener('keydown', function (event){
    keysPressed[event.code] = true;
    event.preventDefault();
    if (keysPressed['ShiftLeft'] && event.code == 'AltLeft' || keysPressed['AltLeft'] && event.code == 'ShiftLeft') {
        lang = Number(localStorage.getItem('lang'));
        lang++;
        lang %= 2;
        localStorage.setItem('lang', lang.toString())
    }
    let caps = document.getElementsByClassName('CapsLock')[0];
    if (event.code === 'CapsLock' || caps.matches('.active')) {
        isUp = 2;
        if (keysPressed['ShiftLeft'] || keysPressed['ShiftRight']) {
            isUp = 3
        }
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        isUp = 1;
    }
    addSymbolFromKey(event.key, event.code, arr[Number(localStorage.getItem('lang'))][isUp]);
    switchLang(arr[Number(localStorage.getItem('lang'))][isUp]);
    displayKeyByPhysicalKeyboard(event.code);
    displaySymbol(event.code, arr[Number(localStorage.getItem('lang'))][isUp]);

})

document.addEventListener('keyup', function (event){
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        isUp = 0;
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        isUp = 0;
    }
    let caps = document.getElementsByClassName('CapsLock')[0];
    if (event.code === 'CapsLock' || caps.matches('.active')) {
        if (keysPressed['ShiftLeft'] || keysPressed['ShiftRight']) {
            isUp = 3
        }
    }
    delete keysPressed[event.code];
    hideKeyByPhysicalKeyboard(event.code);
    displaySymbol(event.code, arr[Number(localStorage.getItem('lang'))][isUp]);
    // console.log(`Input lang is ${lang === 0 ? "Russian" : "English"}`,
    //             '\n----------------------------------------',
    //             `\nkeyboard>keyboard-row>key>${lang === 0 ? "rus" : "eng"} child No ${arr[lang][isUp]%4}`);
    
})

document.addEventListener('mouseup', function (event) {
    keyScreen = (event.path[0].classList.item(1));
    if(keyScreen !== null){

        if (keyScreen.indexOf('-')) {
            let i = keyScreen.indexOf('-')
            keyScreen = keyScreen.slice(i+1)
        }
        if (keyScreen === 'ShiftLeft' || keyScreen === 'ShiftRight') {
            isUp = 0;
        }
        if (keyScreen === 'ShiftLeft' || keyScreen === 'ShiftRight') {
            isUp = 0;
        }
        
        delete keysPressed[keyScreen];
        hideKeyByPhysicalKeyboard(keyScreen);
        // console.log(`Input lang is ${lang === 0 ? "Russian" : "English"}`,
        //             '\n----------------------------------------',
        //             `\nkeyboard>keyboard-row>key>${lang === 0 ? "rus" : "eng"} child No ${arr[lang][isUp]%4}`);
    }
})
