//'Enter' instead of clicking 'Send'
const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);

            // console.log(input,"input");
    }
});

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, ""); //Regex to standardize inputs
    text = text
      .replace(/ a /g, " ")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");
   
    if (compare(utterances, answers, text)) {
      product = compare(utterances, answers, text);
    } 
    else {
      product = alternatives[Math.floor(Math.random() * alternatives.length)];
    }

console.log("Output product:", product);

    //Update DOM
    addChatEntry (input, product);
};

function compare(utterancesArray, answersArray, string) {
    let item;
    for (let x = 0; x < utterancesArray.length; x++) {
      for (let y = 0; y < utterancesArray[x].length; y++) {
        if (utterancesArray[x][y] === string) {
          items = answersArray[x];
          item = items[Math.floor(Math.random() * items.length)];
        }
      }
    }
    return item;
};

//Update the DOM
function addChatEntry(input, product) {

  const messagesContainer = document.getElementById("messages");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user-response";
    userDiv.innerHTML = `${input}`;
    messagesContainer.appendChild(userDiv);
    
    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botDiv.className = "bot-response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);
    
    //After an intentional wait, display the bot response (product)
    setTimeout(() => {
      botText.innerText = `${product}`;
      messagesContainer.scrollTop = messagesContainer.scrollHeight; //makes the messages box scroll to the newest response automatically
    }, 1000); 
};

const utterances = [ 
      ["how are you", "how is life", "how are things"],//0
      ["hi", "hey", "hello", "hi santa", "hello santa", "santa", "santa claus", "saint nick", "saint nicholas", "father christmas"],//1
      ["good morning"],//2
      ["good afternoon"],//3
      ["good evening"],//4
      ["merry christmas eve"],//5
      ["merry christmas"],//6
      ["merry christmas and happy new year"],//7
      ["what are you doing", "what is going on", "what is up"],//8
      ["how old are you"],//9
      ["who are you", "are you human", "are you bot", "are you human or bot"],//10
      [""]
];
     
    
// Possible responses corresponding to triggers
//TODO: create a prompt for name and use {$name} in future responses.
const answers = [
       [
        "Fine... how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
      ],//0
      [
        "Hello!", "Hi!", "Hey!", "Hi there!", "Howdy",
        "Ho ho ho!", "HO HO!", "Ho HO ho", "Ho ho ho ho-ho!", "Ho-ho, Merry Christmas",
      ],//1
      [
        "Nothing much",
        "About to go to sleep",
        "Can you guess?",
        "I don't know actually"
      ],//2
      ["I am infinite"],//3
      ["I am just a bot", "I am a bot. What are you?"],	//4 
];
     
    
// For any other user input 
const alternatives = [
      "Go on...",
      "Try again",
];
    