// 添加你的 API 密钥
const apiKey = '4cd856e76fe8bb2b6141118e52c1a06b.mD4DfC42Rag0haVS';
// 初始化消息历史
let chatGPTmessages = [
    { role: 'system', content: '你是一个编程助手，帮助用户编程和算法入门。' },
    { role: 'system', content: '这是题目描述和用户代码：' },
];


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
    const input = document.getElementById('input-message');

    const message = input.value
    if (!message) {
        alert('请输入消息！');
        return;
    }

    const userCode = editor.getValue();
    const problem = window.problemDescription; // 获取题目内容
    chatGPTmessages[2] = { role: 'system', content: `题目描述：\n${problem}\n这是用户代码：\n${userCode}` };

    chatGPTmessages.push({ role: 'user', content: message })

    input.value = ''; // 清空输入框
    displayMessage('You: ' + message, true); // 显示用户消息

    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    const messageMarkdown = document.createElement('div');
    messageDiv.classList.add('message', 'ai');
    messageMarkdown.classList.add('markdown')
    container.appendChild(messageDiv);
    messageDiv.appendChild(messageMarkdown);



    // 创建请求体
    const data = {
        model: 'glm-4',
        messages: chatGPTmessages,
        stream: true // 启用流式传输
    };
    try {
        // 发送 POST 请求到 OpenAI API
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(data)
        });

    // 检查响应是否成功
    if (!response.ok) {
        response.json().then(data => {
            alert('出错了：' + data.error.message);
        });
        return;
    }

        // 处理流式响应
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        let responseText = '';
        let reply = ''
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            responseText += decoder.decode(value, { stream: true });
            reply = parseStreamedResponse(responseText);
            if (reply) {
                messageMarkdown.innerHTML = marked.parse(reply);
                renderMathInElement(messageMarkdown, {
                    delimiters: [
                        {left: "$$", right: "$$", display: true},
                        {left: "$", right: "$", display: false}
                    ],
                    throwOnError: false
                });
            }
        }
        console.log(reply)
        chatGPTmessages.push({ role: 'assistant', content: reply })
    } catch (error) {
        console.log("出错了：" + error)
    }
}
function parseStreamedResponse(buffer) {
    try {
        const lines = buffer.split('\n').filter(line => line.trim() !== '');
        let result = '';
        let lastLineIncomplete = false;

        for (let line of lines) {
            if (line.trim().startsWith('data:')) {
                line = line.replace('data: ', '').trim();
                if (line !== '[DONE]') {
                    try {
                        const parsedLine = JSON.parse(line);
                        result += parsedLine.choices[0].delta.content || '';
                        lastLineIncomplete = false;
                    } catch (e) {
                        lastLineIncomplete = true;
                    }
                }
            }
        }

        return lastLineIncomplete ? null : result;
    } catch (e) {
        return null;
    }
}
