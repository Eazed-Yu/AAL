const animationMap = new Map();


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



function getDomAnimation(scrollStart, scrollEnd, dom, container) {

    const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.3, 1);
    const opacityAnimtion = createAnimation(scrollStart, scrollEnd, 0.3, 1);
    
    const xAnimation = createAnimation(scrollStart, scrollEnd, Number(dom.dataset.shift), 0);
    const yAnimation = createAnimation(scrollStart, scrollEnd, container.offsetTop + container.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2, 0);

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
    animationMap.clear()
    
    const playGrounds = document.querySelectorAll('.playground');
    playGrounds.forEach( playGround => {

        const playGroundRect = playGround.getBoundingClientRect();
        const scrollStart = playGroundRect.top + window.scrollY - 500;
        const scrollEnd = playGroundRect.bottom + window.scrollY - window.innerHeight * 2;
        const container = playGround.querySelector(".animation-container");
        const items = container.children
        for (const item of items) {
            animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item, container))
        }

    } )
}

function updateStyles() {
    const scroll = window.scrollY;
    for (let [dom, value] of animationMap) {
        for (const cssProp in value) {
            dom.style[cssProp] = value[cssProp](scroll);
        }
    }
}


window.addEventListener('load', function () {
    updateMap();
    updateStyles();
})
window.addEventListener('scroll', () => {
    updateMap();
    updateStyles();
});
window.addEventListener('resize', function () {
    updateMap();
    updateStyles();
})