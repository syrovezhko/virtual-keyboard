import './../sass/main.scss'
import {container} from './modules/elements/container.js'
import {addChild} from './modules/methods/addChild.js'
import {title, inputBlockRow, keyboardBody, description, language} from './modules/elements/layout.js'
import {content} from './modules/elements/content.js'
import {addSymbolFromKey} from './modules/methods/addSymbol.js'
import {displayKeyByPhysicalKeyboard, hideKeyByPhysicalKeyboard} from './modules/methods/displayKey.js'

container()
addChild(title)
addChild(inputBlockRow)
addChild(keyboardBody)
for(let i = 0; i < content.length; i+=4) {
    let keyboardRow = {
        parent: 'keyboard',
        tag: 'div',
        class: `keyboard-row row${i/4 + 1}`,
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
            parent: `row${i/4 + 1}`,
            tag: 'div',
            class: `key ${keyClass}`,
            content: ''
        };
        if (j === 0 && i === 12 || j === 0 && i === 16 || j === 2 && i === 16) {
            keyClass = `${keyClass}Left`
            key.class += ' ' + keyClass;
        };
        if (i === 12 && j === content[i].length-1 || j === content[i].length-1 && i === 16 || j === content[i].length-5 && i === 16) {
            keyClass = `${keyClass}Right`
            key.class += ' ' + keyClass;
        }
        addChild(key);
        let rus = {
            parent: `${keyClass}`,
            tag: 'span',
            class: `rus, rus-${keyClass} hidden`,
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
            content: content[i+2][j]
        }
        let caseUpRus = {
            parent: `rus-${keyClass}`,
            tag: 'span',
            class: `caseUp caseUp-${keyClass} hidden`,
            content: content[i+3][j]
        }
        let capsRus = {
            parent: `rus-${keyClass}`,
            tag: 'span',
            class: `caps caps-${keyClass} hidden`,
            content: content[i+2][j].toUpperCase()
        }
        let shiftCapsRus = {
            parent: `rus-${keyClass}`,
            tag: 'span',
            class: `shiftCaps shiftCaps-${keyClass} hidden`,
            content: content[i+3][j].toLowerCase()
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
            content: content[i][j].toUpperCase()
        }
        let shiftCapsEng = {
            parent: `eng-${keyClass}`,
            tag: 'span',
            class: `shiftCaps shiftCaps-${keyClass} hidden`,
            content: content[i+1][j]
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

document.addEventListener('keydown', function (event){
    event.preventDefault();
    addSymbolFromKey(event.key);
    displayKeyByPhysicalKeyboard(event.code);
    // console.log(event.key);
})

document.addEventListener('keyup', function (event){
    hideKeyByPhysicalKeyboard(event.code);
    // console.log(event.key);
})
