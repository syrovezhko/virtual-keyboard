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