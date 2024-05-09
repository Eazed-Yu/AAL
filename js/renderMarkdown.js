document.addEventListener('DOMContentLoaded', function () {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: true,
        xhtml: false,
        highlight: function (code, lang) {
            return hljs.getLanguage(lang) ? hljs.highlight(lang, code).value : hljs.highlightAuto(code).value;
        }
    });

    document.querySelectorAll('.markdown').forEach(elem => {
        const content = elem.querySelector('#markdown-content').textContent;
        window.problemDescription = content;
        elem.innerHTML = marked.parse(content);
        renderMathInElement(elem, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ],
            throwOnError: false
        });
    });

});
