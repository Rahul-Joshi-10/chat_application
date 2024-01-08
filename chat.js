function sendMessage() {
  var userName = prompt("Please enter your name:");
  var userEmail = prompt("Please enter your email:");
  var userPhone = prompt("Please enter your phone number:");

  var data = new FormData();
  data.append('name', userName);
  data.append('email', userEmail);
  data.append('phone', userPhone);

  fetch('process.php', {
    method: 'POST',
    body: data,
  })
  .then(response => response.json())
  .then(data => {
    appendMessage(data.message || data.error, 'bot');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function askUserDetails() {
    appendMessage("Hi there! What's your name?", 'bot', true);
}

function sendMessageToServer(userInput) {
    var data = new FormData();
    data.append('message', userInput);

    fetch('process.php', {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        appendMessage(data.message || data.error, 'bot');
        if (data.showUserDetails) {
            showUserDetails();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showUserDetails() {
    appendMessage("Great! Please provide your email:", 'bot', true);
}



function appendMessage(message, sender, isQuestion) {
  var chatContainer = document.getElementById('chatContainer');
  var chat = document.getElementById('chat');
  var messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message';

  if (sender === 'user') {
      messageDiv.style.backgroundColor = '#e6f7ff';
  }

  messageDiv.textContent = message;
  chat.appendChild(messageDiv);

  // Scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;

  if (isQuestion) {
      // Add event listener for user response
      document.addEventListener('keypress', function handleKeyPress(event) {
          if (event.key === 'Enter') {
              var userInput = document.getElementById('userInput').value;
              sendMessageToServer(userInput);
          }
      });
  }
}

// Start the conversation by asking for the user's name
askUserDetails();
