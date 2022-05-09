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
        };
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
let i = 0
let arr = [
    [0, 1, 2, 3],
    [4, 5, 6, 7]
]
let lang = 1
let isUp = 0
let index = arr[lang][isUp]


let keysPressed = {};
document.addEventListener('keydown', function (event){
    keysPressed[event.code] = true;
    event.preventDefault();
    // console.log('index in main =', lang, isUp)
    if (keysPressed['ShiftLeft'] && event.code == 'AltLeft' || keysPressed['AltLeft'] && event.code == 'ShiftLeft') {
        lang++;
        lang %= 2;
        // console.log(`lang is ${lang === 1 ? "rus" : "eng"}`)
    }
    let caps = document.getElementsByClassName('CapsLock')[0];
    if (event.code === 'CapsLock' || caps.matches('.active')) {
        // console.log('CapsLock')
        isUp = 2;
        if (keysPressed['ShiftLeft'] || keysPressed['ShiftRight']) {
            isUp = 3
        }
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        isUp = 1;
    }
    addSymbolFromKey(event.key, event.code, arr[lang][isUp]);
    switchLang(event.code, arr[lang][isUp]);
    displayKeyByPhysicalKeyboard(event.code);
    displaySymbol(event.code, arr[lang][isUp]);

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
    displaySymbol(event.code, arr[lang][isUp]);
    console.log(`Input lang is ${lang === 0 ? "Russian" : "English"}`,
                '\n----------------------------------------',
                `\nkeyboard>keyboard-row>key>${lang === 0 ? "rus" : "eng"} child No ${arr[lang][isUp]%4}`);
    
})


