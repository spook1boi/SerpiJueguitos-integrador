const socket = io();
const productContainer = document.getElementById('product-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

let userEmail;

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

do {
    userEmail = prompt("Please enter your email address:");

    if (!validateEmail(userEmail)) {
        alert("Invalid email address. Try again.");
    }
} while (!validateEmail(userEmail));

const resetMessageInput = () => {
    messageInput.value = '';
}

socket.on('newMessages', messages => {
    const messagesList = messages.map(msg => {
        return `
            <div class="message-card">
                <div class="message-header">
                    <img src="avatar.jpg" alt="Avatar" class="avatar">
                    <h5>${msg.user}</h5>
                </div>
                <p class="message-text">${msg.message}</p>
            </div>
        `;
    }).join(' ');

    productContainer.innerHTML = messagesList;
});

messageForm.addEventListener('submit', event => {
    event.preventDefault();

    const newMessage = {
        user: userEmail,
        message: messageInput.value,
    }

    socket.emit('sendMessage', newMessage);
    resetMessageInput();
});