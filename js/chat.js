// 显示消息的函数，isUser决定消息来源是用户还是AI
function displayMessage(message, isUser) {
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add('message');
    if (isUser) {
        messageDiv.classList.add('user');
    }
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight; // 自动滚动到底部
}

// 发送消息并接收AI响应的函数
function sendMessage() {
    let resp = ""
    const preTalk = ''
    const input = document.getElementById('input-message');
    const problem = window.problemDescription; // 获取渲染后的题目内容
    const userCode = editor.getValue();
    const systemPrompt = '```' + '你现在是在和用户说话帮助用户解决代码问题' + '对话历史：' + preTalk + '题目：' +  problem + '用户代码：' +  userCode + '用户问题：' +  input.value + '```'
    const message = input.value


    input.value = ''; // 清空输入框
    displayMessage('You: ' + message, true); // 显示用户消息
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    const messageMarkdown = document.createElement('div');
    messageDiv.classList.add('message', 'ai');
    messageMarkdown.classList.add('markdown')

    container.appendChild(messageDiv);
    messageDiv.appendChild(messageMarkdown);

    const evtSource = new EventSource(`http://localhost:8080/ai/generateStream?message=${encodeURIComponent(systemPrompt)}`);

    evtSource.onmessage = (event) => {

        const eventData = JSON.parse(event.data); // 解析JSON字符串为JavaScript对象
        const finishReason = eventData.result.metadata.finishReason; // 获取finishReason属性的值
    
        if (finishReason === "STOP") {
            console.log(resp);
            evtSource.close(); // 关闭SSE连接
            console.log("SSE连接已关闭，因为finishReason为STOP");
        } else {
            const content = eventData.result.output.content; // 获取content属性的值
            resp += content;
            messageMarkdown.innerHTML = marked.parse(resp);
            renderMathInElement(messageMarkdown, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                ],
                throwOnError: false
            });
        }
    };
    
}

