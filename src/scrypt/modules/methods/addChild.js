export function addChild(value) {
    let index = 0;
    if (value.index !== undefined) index = value.index;
    let parent = document.getElementsByClassName(value.parent)[index];
    let content = document.createElement(value.tag);
    content.textContent = value.content;
    content.className = value.class;
    parent.append(content);
}