//'Enter' instead of clicking 'Send'
const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
    }
});

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, ""); //Regex to standardize inputs
    text = text
      .replace(/ a /g, " ")//makes all inputs with the word "a"  (as in "I want |a| hamburger") be removed. Example: I want a hamburger -> I want hamburger.
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
      ["hi", "hey", "hello", "hi santa", "hello santa", "santa", "santa claus", "saint nick", "saint nicholas", "father christmas", "hello santa bot 1000", "hi santa bot 1000", "hello santa bot", "hi santa bot"],//1
      ["good morning"],//2
      ["good afternoon"],//3
      ["good evening", "good night"],//4
      ["merry christmas eve"],//5
      ["can i have robot toy that walks"],//6
      ["merry christmas"],//7
      ["merry christmas and happy new year", "happy new year"],//8
      ["what are you doing", "what is going on", "what is up"],//9
      ["how old are you"],//10
      ["who are you", "are you human", "are you bot", "are you human or bot", "what are you", "whats your name"],//11
      ["i am bodhi", "my name is bodhi", "im bodhi", "bodhi"], //12
      ["i am gavin", "my name is gavin", "im gavin", "gavin"], //13
      ["i am evelyn", "my name is evelyn", "im evelyn", "evelyn"], //14
      ["i am river", "my name is river", "im river", "river"], //15
      ["what is your favorite color", "whats your favorite color"], //16
      ["bye", "good bye", "bye bye", "see you later"], //17
      ["i love you", "i love you santa", "i love you santa claus", "i love you saint nick", "i love you saint nicholas", "i love you father christmas", "i love you robot santa", "i love you santa bot", "i love you santabot", "i love you santabot 1000", "i love you santa bot 1000"],
];
     
    
// Possible responses corresponding to triggers
//TODO: create a prompt for name and use {$name} in future responses.
const answers = [
       [
        "Jolly! Ho ho.",
        "Just like sugar-plums and eggnog!",
        "I've made my list and checked it twice... how are you?"
      ],//0
      [
        "Hi!", "Hey!", "Hi there!",
        "Ho ho ho!", "HO HO!", "Ho HO ho", "Ho ho ho ho-ho!", "Ho-ho, Merry Christmas",
      ],//1
      [
        "Good morning to you.",
        "Good almost-christmas-morning!",
      ],//2
      [
        "And a good afternoon to you.",
      ],//3
      [
        "Nighty-night!", "Sleep tight!", "Good night!", "I'm watching you! HOHOHO!",
      ],	//4 
      [
        "Ho-ho, it's almost time for me to go!",
      ], //5
      [
        "HO, why not?",
      ], //6
      [
        "And a happy new year! HOHOHO!", "MERRY CHRISTMAS!", "OH-ho-ho, Merry Christmas!", "Bah...humbug!...Ho! Just pulling your leg, Merry Christmas!"
      ], //7
      [
        "Hoho! Merrrrrry Christmas!",
      ], //8
      [
        "Ordering my elves around.",
        "Eating cookies and pie.",
        "Drinking hot cocoa.",
        "Just polishing my sleigh. Gonna sleigh all night!",
      ], //9
      [
        "Possibly 2024 years old, but more like over 3000 years old. Ho.",
      ], //10
      [
        "I am Santa Bot 1000. And what is your name, my child?", "I am a robot Santa. What is your name, my dear?",
      ], //11
      [
        "Hello there, Bodhi! Ho ho!",
      ], //12
      [
        "Hello Gavin! Ho ho ho!",
      ],//13
      [
        "Hi there Evelyn. HOHO-HO!",
      ],//14
      [
        "Ho-ho, hello River!",
      ],//15
      [
        "Why, red... no, green... well I AM partial to candy cane, does that count? Ho ho!",
      ], //16
      [
        "Farewell, little one! Ho-ho-ho!", "Bye bye and a Merry Christmas to you!", "Merry Christmas, one and all! HOHOHO.", "MERRY CHRISTMAS! Oh-ho!", "Hohoho, talk to you again soon!",
      ], //17
      [
        "I love you too, little one. Ho ho!", "Hoho, and I love you!",
      ] //18
]; 
     
    
// For any other user input 
const alternatives = [
      "Go on...",
      "Try again.",
      "-BRRZT- DOES NOT COMPUTE -HO HO HO-.",
];
  
// Dark mode toggle

// const darkButton = document.getElementById("darkToggle")
// darkButton.addEventListener("click", function(darkToggle) {
//   function darkToggle() {
//     var element = document.body;
//     element.classList.toggle("dark-mode");
//   }
// });

// Access toggle switch HTML element
var darkToggle = document.querySelector("dark-toggle");
var container = document.querySelector(".body");

// Set default mode to dark
var mode = "dark-mode";

// Listen for a click event on toggle switch
darkToggle.addEventListener("click", function() {
  // If mode is dark, apply light background
  if (mode === "dark-mode") {
    mode = "light-mode";
    container.setAttribute("class", "light-mode");
  }
  // If mode is light, apply dark background 
  else {
    mode = "dark-mode";
    container.setAttribute("class", "dark-mode");
  }
});