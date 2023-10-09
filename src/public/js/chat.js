const socket = io(); 


const chatContainer = document.getElementById('chat-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

const clearMessageForm = () => {
    messageInput.value = '';
};

const renderMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const senderElement = document.createElement('span');
    senderElement.classList.add('message-sender');
    senderElement.textContent = message.user + ': ';
    messageElement.appendChild(senderElement);

    const textElement = document.createElement('span');
    textElement.classList.add('message-text');
    textElement.textContent = message.message;
    messageElement.appendChild(textElement);

    chatContainer.appendChild(messageElement);
};

socket.on('message', (message) => {
    renderMessage(message);
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = 'User';
    const messageText = messageInput.value;

    socket.emit('sendMessage', { user, message: messageText });

    clearMessageForm();
});