// 添加窗口加载事件监听器
window.addEventListener('load', function () {
    // 配置 requireJS 以从 CDN 加载 marked.js 和 KaTeX
    require.config({
        paths: {
            'marked': 'https://cdn.jsdelivr.net/npm/marked/marked.min',
            'katex': 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min',
            'auto-render': 'https://cdn.jsdelivr.net/npm/katex/dist/contrib/auto-render.min'
        },
        shim: {
            'auto-render': ['katex'] // 确保先加载 katex
        }
    });

    // 同时加载 marked 和 KaTeX 模块
    require(['marked', 'katex', 'auto-render'], function (marked, katex, autoRender) {
        // 设置 marked 的选项
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
                // 使用 highlight.js 插件解析文档中代码部分
                return hljs.highlightAuto(code, [lang]).value;
            }
        });

        // 获取页面上所有 class 为 "markdown" 的元素
        let markdownElements = document.getElementsByClassName('markdown');
        // 遍历找到的 markdown 元素
        for (let elem of markdownElements) {
            // 获取每个元素中 id 为 "markdown-content" 的子元素的文本内容
            let markdownText = elem.querySelector('#markdown-content').textContent;
            // 使用 marked 将 Markdown 文本转换为 HTML
            let renderedHTML = marked.parse(markdownText);
            // 将转换后的 HTML 设置为元素的内容
            elem.innerHTML = renderedHTML;
            
            // 使用 KaTeX 渲染页面上的所有数学公式
            autoRender(elem, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                ],
                throwOnError: false
            });
        }
    });
});
