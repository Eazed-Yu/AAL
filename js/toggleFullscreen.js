function toggleFullscreen(section) {
    const chat = document.querySelector('.aiHelper');
    const editor = document.querySelector('.editor');
    const chatcontainer = document.querySelector('#chat-container');
    if (section === 'chat') {
        if (chat.classList.contains('fullscreen')) {
            chat.classList.remove('fullscreen');
            chat.style['height'] = '50%';
            editor.classList.remove('hiddenscreen')
            editor.style['display'] = 'block';
            chatcontainer.style['height'] = '40%';
        } else {
            chat.classList.add('fullscreen');
            chat.style['height'] = '100%';
            editor.classList.add('hiddenscreen');
            editor.style['display'] = 'none';
            chatcontainer.style['height'] = '70%';
        }
    } else if (section === 'editor') {
        if (editor.classList.contains('fullscreen')) {
            editor.classList.remove('fullscreen');
            editor.style['height'] = '50%';
            chat.classList.remove('hiddenscreen')
            chat.style['display'] = 'block';
        } else {
            editor.classList.add('fullscreen');
            editor.style['height'] = '100%';
            chat.classList.add('hiddenscreen');
            chat.style['display'] = 'none';
        }
    }
}
