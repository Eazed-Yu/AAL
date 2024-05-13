let editor;

window.addEventListener('load', function () {

    require.config({
        paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' }
    });
    require(['vs/editor/editor.main'], function () {
        editor = monaco.editor.create(document.getElementById('monaco-editor'), {
            automaticLayout: true,
            value: [
                '#include <iostream>',
                'int main() {',
                '   std::cout << "Hello, world!" << std::endl;',
                '   return 0;',
                '}'
            ].join('\n'),
            language: 'cpp',
            theme: 'vs-dark',
            minimap: {
                enabled: false // 关闭小地图
            }
        });

        document.getElementById('languageSelector').addEventListener('change', function (e) {
            monaco.editor.setModelLanguage(editor.getModel(), e.target.value);
        });

        document.getElementById('themeSelector').addEventListener('change', function (e) {
            editor.updateOptions({ theme: e.target.value });
        });

        document.getElementById('fontSizeSelector').addEventListener('change', function (e) {
            editor.updateOptions({ fontSize: e.target.value });
        });
    });
});
