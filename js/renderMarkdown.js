window.addEventListener('load', function () {
    require.config({
        paths: {
            'marked': 'https://cdn.jsdelivr.net/npm/marked/marked.min'
        }
    });

    require(['marked'], function (marked) {
        var markdownContainer = document.getElementById('markdown-content');
        if (markdownContainer) {
            var markdownText = markdownContainer.dat
            renderedHTML = marked.parse(markdownText);
            markdownContainer.innerHTML = renderedHTML;
        }
    });
});
