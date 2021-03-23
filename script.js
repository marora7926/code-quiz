// VARIABLES to set the scene
//  defining all query selector
var liveTimeValue = document.querySelector(".live-time-value");
var displayScreen = document.querySelector(".screen-display");
var correctOrWrong = document.querySelector(".answer-statement");
var highScoresButton = document.querySelector(".high-scores");


// Question bank for quiz as "arrays"
var questions =[{
    question: "What tag can be used to insert a line break or blank line in an HTML document?",
    options: [
        "<title></title>",
        "<br></br>",
        "<head></head>",
        "<body></body>",
    ],
    answer: "<br></br>" 
    },{
    question: "What group of tags are used to define the text headers in the body of the HTML document?",
    options: [
        "<h1> to <h3>",
        "<td>",
        "<footer>",
        "<button>",
        ],
    answer: "<h1> to <h3>"   
    },{
    question: "The correct sequence of HTML tags for starting a webpage is -",
    options: [
        "Head, Title, HTML, body",
        "HTML, Body, Title, Head",
        "HTML, Title, Head, Body",
        "HTML, Head, Title, Body",
        ],
    answer: "HTML, Head, Title, Body"  
    },{
    question: "What is the most important CSS property, used for controlling the layout?",
    options: [
        "Display",
        "Margin",
        "Padding",
        "<div>",
        ],
    answer: "Display"  
    },{
    question: "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
    options: [
        "Scope",
        "Range",
        "Restriction",
        "Output Level",
        ],
    answer: "Scope"  
    },{
    question: "Which of the following is the correct syntax to select the p siblings of a div element?",
    options: [
        "p",
        "div + p",
        "div p",
        "div ~ p",
        ],
    answer: "div ~ p"  
    },{
    question: "Where is the JavaScript placed inside an HTML document or page?",
    options: [
        "In the <title> section",
        "In the <meta> section",
        "In the <footer> section",
        "In the <body> and <head> sections",
        ],
        answer: "In the <body> and <head> sections"  
    }
]

// FUNCTIONS to make the website interactive
//variable for setting the screen that users will see when they launch the quiz 
var startScreen = {
    startTitle: "Coding-Quiz-Challenge",
    startInstructions: "Instructions: Try to answer the following code-related questions within the time limit. Keep in mind that every incorrect answers will penalize your score time by 10 seconds. Press START key to start the quiz. Good luck!",
    startKey: "Start"
}

// ENTRY SCREEN - function and variables what user will see on the "entry screen"
// Global scope variables that will be used on the "entry screen"
var totalSeconds = 50;

function entryScreen () {
    // entry screen title 
    var startScreenTitle = document.createElement("h1");
        startScreenTitle.textContent = startScreen.startTitle;
        startScreenTitle.setAttribute("class", "startTitle");
        displayScreen.appendChild(startScreenTitle);

    // entry screen instructions
    var startScreenInstructions = document.createElement("h3");
        startScreenInstructions.textContent = startScreen.startInstructions;
        startScreenInstructions.setAttribute("class", "startInstructions");
        displayScreen.appendChild(startScreenInstructions);

    // entry screen start button
    var startScreenButton = document.createElement("button");
        startScreenButton.textContent = startScreen.startKey;
        startScreenButton.setAttribute("class", "startKey");
        displayScreen.appendChild(startScreenButton);

    // defining the time on the live timer on the entry screen
    liveTimeValue.textContent = totalSeconds;

    // eventListner to start the even, in this case, start the quiz on the entry screen
    startScreenButton.addEventListener("click", startCodeQuiz);
}

// This function will be used from transitioning to next page or next section (question in our case)
function clearScreen() {
    displayScreen.innerHTML = "";
} 

// QUESTION SCREEN
// Global scope variables that will be used on the "question screen"
var questionNumber;
var score = 0;
var timeInterval;
var penaltyWrongAnswer = 10;
var secondsLeft = 0;
// variable for displaying the users if their answer is correct or wrong
var correctWrongMessage = {
    correctMessage: "Congratulations! Your answer is CORRECT.",
    wrongMessage: "Your answer is WRONG.",
    displayTime: 1000
}
// variable for displaying "out of time" when user do not compelte all question in allocated time
var timeOver = {
    timeOverHeading: "The quiz is terminated because you run out of time",
}
// variables for displaying the user for input additional information when the quiz is complete
var quizComplete = {
    completionHeading: "Congratulation! You have completed the quiz",
    completionMessage: "Your score: ",
    completionLabel: "Please enter your initials: ",
    completionButton: "Submit to save your results",
}

function timeOverMessage () {
var messageDisplayTimeOver = setTimeout(function() {
    correctOrWrong.textContent = "";
    }, correctWrongMessage.displayTime);
}

// Frame for "question screen"
function startCodeQuiz() {
    questionNumber = 0;
    score = 0;
    clearScreen();
    startLiveTimer();
    questionStyle();        
}
    
//defining fucntions for each frame for StartCodeQuiz  
// live timer to start at the launch of the quiz on the "question screen"
function startLiveTimer(){
    timeInterval = setInterval(function() {
    totalSeconds--;
    updateTimer();
    if(secondsLeft > totalSeconds){
    endTimer();
    }
    }, 1000);
}

// displayTimeIsOverScreen();
// this function is for updating the time every second 
function updateTimer(){
    if (secondsLeft > totalSeconds){
        liveTimeValue.textContent = 0;
    } else {
    liveTimeValue.textContent = totalSeconds - secondsLeft;
    }   
}

// this function will display on the screen when time is over 
function endTimer(){
    stopTheTimer();
    clearScreen();
    displayTimeIsOverScreen();
    var timeOverPost1s = setTimeout(function(){
        clearScreen();
        displayAllAnswered();
    }, 1000);
}

// Stop the time function 
function stopTheTimer() {
    clearInterval(timeInterval);
    secondsLeft = 0;
}

// this function is for displaying "out of time"
function displayTimeIsOverScreen() {
    var timeIsOverHeading = document.createElement("h1");
        timeIsOverHeading.textContent = timeOver.timeOverHeading;
        timeIsOverHeading.setAttribute("class", "timeIsOverHeading");
        displayScreen.appendChild(timeIsOverHeading);
}
        
// style of the question to be displayed on the "question screen"
function questionStyle(){
    // display question statement and its format on the "question screen"
    var questionStatement = document.createElement("p");
    questionStatement.textContent = questions[questionNumber].question;
    questionStatement.setAttribute("class", "question");
    displayScreen.appendChild(questionStatement);

    // display answer choice (unordered list element) on the "question screen" for each question
    var answerOptionsUl = document.createElement("ul");
    answerOptionsUl.setAttribute("class", "answerOptionsUl");
    displayScreen.appendChild(answerOptionsUl);
            
    //question list element
    for (var i = 0; i < questions[questionNumber].options.length; i++){
        var answerOptionsLi = document.createElement("li");
        answerOptionsLi.setAttribute("class", "answerOptionsLi");
        answerOptionsUl.appendChild(answerOptionsLi);

    // allocating button key to answers options
    var answerOptionsButton = document.createElement("button");
    answerOptionsButton.textContent = questions[questionNumber].options[i];
    answerOptionsButton.setAttribute("class", "answerOptionsButton");
    answerOptionsLi.appendChild(answerOptionsButton);

    //checking the answer on the "question screen"
    answerOptionsButton.addEventListener("click", validateAnswer);
    }
}
        
// validating (correct or wrong) the user input on the "question screen"
function validateAnswer(event) {
    // when an answer option is clicked, it will have one of the two components, as follow:
    // a) for correct answer 
    if (event.target.textContent == questions[questionNumber].answer){
    correctOrWrong.textContent = correctWrongMessage.correctMessage;
    score++;
    // b) for wrong answer
    } else {
    correctOrWrong.textContent = correctWrongMessage.wrongMessage;
    penaltyTime ();
    }
    
    // display each question on one "question screen" and clear the creen form next question 
    clearScreen();
    // clear the question and answer section when the time is over
    timeOverMessage();

    // when the user is at the last question 
    if (questionNumber === questions.length - 1) {
        // stop the time
        stopTheTimer();
        // and display all answered screen
        displayAllAnswered();
        
    } else {
        // move to next question
        questionNumber++;         
        // displays the next question on the "question screen"
        questionStyle();
    }
}

// function for time penalty
function penaltyTime () {
    secondsLeft += penaltyWrongAnswer;
}

// function for displaying score and addeding initials 
function displayAllAnswered() {
    // All answered heading
    var allAnsweredHeading = document.createElement("h1");
        allAnsweredHeading.textContent = quizComplete.completionHeading;
        allAnsweredHeading.setAttribute("class", "allAnsweredHeading");
        displayScreen.appendChild(allAnsweredHeading);

    // All answered message
    var allAnsweredMessage = document.createElement("h2");
        allAnsweredMessage.textContent = `${quizComplete.completionMessage} ${score}`;
        allAnsweredHeading.setAttribute("class", "allAnsweredMessage");
        displayScreen.appendChild(allAnsweredMessage);

    // User input label
    var allAnsweredLabel = document.createElement("label");
        allAnsweredLabel.textContent = quizComplete.completionLabel;
        allAnsweredLabel.setAttribute("class", "allAnsweredLabel");
        allAnsweredLabel.setAttribute("for", "allAnsweredInput");
        displayScreen.appendChild(allAnsweredLabel);

    // User input
    var allAnsweredInput = document.createElement("input");
        allAnsweredInput.setAttribute("id", "allAnsweredInput");
        allAnsweredInput.setAttribute("type", "check");
        displayScreen.appendChild(allAnsweredInput);

    // submit button
    var allAnsweredButton = document.createElement("button");
        allAnsweredButton.textContent = quizComplete.completionButton;
        allAnsweredButton.setAttribute("class", "allAnsweredButton");
        displayScreen.appendChild(allAnsweredButton);

    // event listerner on button click
    allAnsweredButton.addEventListener("click", submitScores);
}

// global variables for scores and intial to database
var saveUserInput = {
    userScore: 0,
    userInitials: ""
}
var saveDatabase = [];

// function to extract a user score and save them to localStorage 
function submitScores() {
    
    //this will load scores from local storage to user database
    loadUserScores()
    
    //add the score of a user to saveUserInput data variable 
    saveUserInput.userScore = score;
    
    // add initial of a user to saveUserInput data variable
    saveUserInput.userInitials = document.getElementById("allAnsweredInput").value;
    
    //add subsequent score and intial to user database
    saveDatabase.push(saveUserInput);

    // save data from saveUserInput to local storage using JSON
    localStorage.setItem("saves", JSON.stringify(saveDatabase));

    viewHighScoresScreen();
}

// save score and initials from localstorage to saveDatabase
function loadUserScores() {
    if (localStorage.length !== 0) {
        saveDatabase = JSON.parse(localStorage.getItem("saves"));
    } else {
        saveDatabase = [];
    }
}

// HIGH SCORES SCREEN
// variable to display saved user-entered detials and their scores to the highscores buttton
var highScores = {
    highScoresHeader: "High Scores",
    scoresInitials: "Initials",
    scoresHeading: "Score",
    // highScoresGoBackButton: "Go to the Start Screen",
    // highScoresClearButton: "Clear High Scores"
}

// Functionality and features of highscores page
function viewHighScoresScreen(){
    if (saveDatabase.length === 0){
        loadUserScores();
    }
    clearScreen();
    highScoresStyle();
}

// style of the highscore page to be displayed on the "High Scores screen"
function highScoresStyle(){
    // display high score header on the "high scores screen"
    var highScoresHeading = document.createElement("h1");
        highScoresHeading.textContent = highScores.highScoresHeader;
        highScoresHeading.setAttribute("class", "highScoresHeading");
        displayScreen.appendChild(highScoresHeading);
    
    // display initials on the "high scores screen"
    var highScoresInitials = document.createElement("h3");
        highScoresInitials.textContent = highScores.scoresInitials;
        highScoresInitials.setAttribute("class", "highScoresInitials");
        displayScreen.appendChild(highScoresInitials);

    // display score on the "high scores screen"
    var highScoresValue = document.createElement("h3");
        highScoresValue.textContent = highScores.scoresHeading;
        highScoresValue.setAttribute("class", "highScoresValue");
        displayScreen.appendChild(highScoresValue);

    for (var i = 0; i < saveDatabase.length; i++) {
    // display initials on the "high scores screen"
    var highScoresInitialsData = document.createElement("h3");
        highScoresInitialsData.textContent = saveDatabase[i].userInitials;
        displayScreen.appendChild(highScoresInitialsData);

    // display score on the "high scores screen"
    var highScoresValueData = document.createElement("h3");
        highScoresValueData.textContent = saveDatabase[i].userScore;
        displayScreen.appendChild(highScoresValueData);
    }
}

highScoresButton.addEventListener("click", viewHighScoresScreen)

// open entry screen
entryScreen();