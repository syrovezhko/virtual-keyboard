export function displayKeyByPhysicalKeyboard (key) {
    let index = 0;
    if (document.getElementsByClassName(key)[index] === 'undefined') {
        index = -2;
    }
    let virtualKey = document.getElementsByClassName(key)[index];
    if (key === 'CapsLock') {
        virtualKey.classList.toggle('active');
    } else {
        virtualKey.classList.add('active');
    }
}

export function hideKeyByPhysicalKeyboard (key) {
    let index = 0;
    if (document.getElementsByClassName(key)[index] === 'undefined') {
        index = -2;
    }
    let virtualKey = document.getElementsByClassName(key)[index];
    if (key !== 'CapsLock') {
        virtualKey.classList.remove('active');
    }
}

export function switchLang (key, index) {
    let lang = Math.floor(index/4);
    // console.log(`lang is ${lang === 0 ? "rus" : "eng"}`);
    let rus = document.getElementsByClassName('rus');
    let eng = document.getElementsByClassName('eng');

    if (!lang) {
        for(let elem of eng) {
            elem.classList.add('hidden');
        }
        for(let elem of rus) {
            elem.classList.remove('hidden');
        }
    } else {
        for(let elem of rus) {
            elem.classList.add('hidden');
        }
        for(let elem of eng) {
            elem.classList.remove('hidden');
        }
    }
}

export function displaySymbol(key, index) {
    let caseDown = document.getElementsByClassName('caseDown');
    let caseUp = document.getElementsByClassName('caseUp');
    let caps = document.getElementsByClassName('caps');
    let shiftCaps = document.getElementsByClassName('shiftCaps');

    if (index === 0 || index === 4) {
        for(let elem of caseDown) {
            elem.classList.remove('hidden');
        }
        for(let elem of caseUp) {
            elem.classList.add('hidden');
        }
        for(let elem of caps) {
            elem.classList.add('hidden');
        }
        for(let elem of shiftCaps) {
            elem.classList.add('hidden');
        }
    } else if (index === 1 || index === 5) {
        for(let elem of caseDown) {
            elem.classList.add('hidden');
        }
        for(let elem of caseUp) {
            elem.classList.remove('hidden');
        }
        for(let elem of caps) {
            elem.classList.add('hidden');
        }
        for(let elem of shiftCaps) {
            elem.classList.add('hidden');
        }
    } else if (index === 2 || index === 6) {
        for(let elem of caseDown) {
            elem.classList.add('hidden');
        }
        for(let elem of caseUp) {
            elem.classList.add('hidden');
        }
        for(let elem of caps) {
            elem.classList.remove('hidden');
        }
        for(let elem of shiftCaps) {
            elem.classList.add('hidden');
        }
    } else {
        for(let elem of caseDown) {
            elem.classList.add('hidden');
        }
        for(let elem of caseUp) {
            elem.classList.add('hidden');
        }
        for(let elem of caps) {
            elem.classList.add('hidden');
        }
        for(let elem of shiftCaps) {
            elem.classList.remove('hidden');
        }
    }
}