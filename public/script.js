
document.addEventListener('DOMContentLoaded', function () {
    const socket = io();

    // DOM elements
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatOutput = document.getElementById('chat-output');

    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);

    // Listen for messages from the server
    socket.on('chat-message', function (data) {
        displayMessage(data);
    });

    // Function to send a message
    function sendMessage() {
        const message = messageInput.value.trim();

        if (message !== '') {
            // Emit the message to the server
            socket.emit('chat-message', {
                user: 'You',
                message: message,
                server1: 'AI',
                messageAI: serverFunction(message),
            });
            // Clear the input field
            messageInput.value = '';
        }
    }
    //Function to serach keyword of question and create answer
    function serverFunction(message){
        const keywords = ['price', 'display', 'os', 'ram', 'camera'];
        const messageWords = message.split(' ');
        let ans = '';
        let keywordFound = false;
    
        for (let i = 0; i < messageWords.length; i++) {
            const keywordIndex = keywords.indexOf(messageWords[i].toLowerCase());
    
            if (keywordIndex !== -1 && !keywordFound) {
                // Keyword found
                ans = generateAnswer(keywords[keywordIndex]) + ' ';
                keywordFound = true;//Set to true to stop searching for other keywords
            } else if (!keywordFound){
                ans += 'Ask a correct question. ';
            }
        }
    
        return ans.trim(); // Trim to remove leading/trailing spaces
    }
    // Function to generate an answer based on the keyword
function generateAnswer(keyword) {
    switch (keyword) {
        case 'price':
            return 'The price of the product is $100.';
            break;
        case 'display':
            return 'The display of the product is LED 45 inches.';
        case 'os':
            return 'The operating system of the product is Kitkat.';
        case 'ram':
            return 'The RAM of the product is 2GB.';
        case 'camera':
            return 'The camera resolution of the product is 128px.';
        default:
            return 'Ask a correct question.';
    }
}
    // Function to display a message in the chat
    function displayMessage(data) {
        
        const messageElement = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString();

        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}<br> 
                    <strong>${data.server1}</strong>:${data.messageAI}<br>
                    <span class="timestamp">${timestamp}</span>`;
        chatOutput.appendChild(messageElement);

        // Scroll to the bottom of the chat
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});