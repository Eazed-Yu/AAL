const items = document.querySelectorAll('.list-item');
const playGround = document.querySelector('.playground');
const list = document.querySelector('.list');

function createAnimation(scrollStart, scrollEnd, valueStart, valueEnd) {
    return function (scroll) {
        if (scroll <= scrollStart) {
            return valueStart;
        }
        if (scroll >= scrollEnd) {
            return valueEnd;
        }
        return valueStart + (scroll - scrollStart) * (valueEnd - valueStart) / (scrollEnd - scrollStart);
    }
}

const animationMap = new Map();

function getDomAnimation(scrollStart, scrollEnd, dom) {

    const scaleAnimation = createAnimation(scrollStart, scrollEnd / 3, 0.1, 1);
    const opacityAnimtion = createAnimation(scrollStart, scrollEnd / 3, 0, 1);
    const xAnimation = createAnimation(scrollStart, scrollEnd / 3, list.offsetLeft + list.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2, 0);
    const yAnimation = createAnimation(scrollStart, scrollEnd / 3, list.offsetTop + list.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2, 0);

    const opacity = function (scroll) {
        return opacityAnimtion(scroll);
    };

    const transform = function (scroll) {
        return `translate(${xAnimation(scroll)}px, ${yAnimation(scroll)}px) scale(${scaleAnimation(scroll)})`;
    }


    return {
        opacity,
        transform,
    };
}

function updateMap() {
    animationMap.clear();
    const playGroundRect = playGround.getBoundingClientRect();
    const scrollStart = playGroundRect.top + window.scrollY;
    const scrollEnd = playGroundRect.bottom + window.scrollY - window.innerHeight;
    for (const item of items) {
        animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item))
    }
}

function updateStyles() {
    const scroll = window.scrollY;
    for (let [dom, value] of animationMap) {
        for (const cssProp in value) {
            dom.style[cssProp] = value[cssProp](scroll);
        }
    }
}

updateMap();
updateStyles();

window.addEventListener('scroll', updateStyles);