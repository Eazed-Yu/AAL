function toggleFullscreen(section) {
    const chat = document.querySelector('.aiHelper');
    const editor = document.querySelector('.editor');
    if (section === 'chat') {
        if (chat.classList.contains('fullscreen')) {
            chat.classList.remove('fullscreen');
            editor.classList.remove('hiddenscreen')
            chatcontainer.style['height'] = '40%';
        } else {
            chat.classList.add('fullscreen');
            editor.classList.add('hiddenscreen');
            chatcontainer.style['height'] = '70%';
        }
    } else if (section === 'editor') {
        if (editor.classList.contains('fullscreen')) {
            editor.classList.remove('fullscreen');
            chat.classList.remove('hiddenscreen')
        } else {
            editor.classList.add('fullscreen');
            chat.classList.add('hiddenscreen');
        }
    }
}
