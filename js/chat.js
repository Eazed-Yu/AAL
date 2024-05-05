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
async function sendMessage() {
    const preTalk = ''
    const input = document.getElementById('input-message');
    const problem = document.getElementsByClassName('markdown').textContent
    const userCode = editor.getValue();
    const systemPrompt = '```' + '你对话的对象是用户，使用第二人称对话、不要使用任何markdown等格式，帮助用户解决代码问题' + '对话历史：' + preTalk + '题目：' +  problem + '用户代码：' +  userCode + '用户问题：' +  input.value + '```'
    const message = input.value


    input.value = ''; // 清空输入框
    displayMessage('You: ' + message, true); // 显示用户消息
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    container.appendChild(messageDiv);
    const evtSource = new EventSource(`http://localhost:8080/ai/generateStream?message=${encodeURIComponent(systemPrompt)}`);

    evtSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data); // 解析JSON字符串为JavaScript对象
        const finishReason = eventData.result.metadata.finishReason; // 获取finishReason属性的值
    
        if (finishReason === "STOP") {
            evtSource.close(); // 关闭SSE连接
            console.log("SSE连接已关闭，因为finishReason为STOP");
        } else {
            const content = eventData.result.output.content; // 获取content属性的值
            console.log(content); // 打印content的值
            messageDiv.textContent += content; // 将content的值添加到messageDiv中
        }
    };
    
}

