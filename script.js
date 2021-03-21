// VARIABLES to set the scene
//  defining all query selector
var liveTimeValue = document.querySelector(".live-time-value");
var displayScreen = document.querySelector(".screen");
var correctOrWrong = document.querySelector(".answer");
var highScores = document.querySelector(".High-scores");

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

//variable for setting the screen that users will see when they launch the quiz 
var startScreen = {
    startTitle: "Coding Quiz Challenge",
    startInstructions: "Instructions: Try to answer the following code related questions within the time limit. Keep in mind that every incorrect answers will penalize your scoretime by 10 seconds. Press START key to start the quiz. Good luck!",
    startKey: "Start"
}

// variable for displaying the users if their answer is correct or wrong
var answerDisplay = {
    correctAnswer: "Correct!",
    wrongAnswer: "Wrong!",
}

// variable for displaying "out of time" when user do not compelte all question in allocated time
var timeOver = {
    timeOverheading: "The quiz is terminated because you run out of time"
}

// variables for displaying the user for input additional information when the quiz is complete
var quizComplete = {
    completionHeading: "Congratulation! You have completed the quiz",
    completionMessage: "Your scored :",
    completionLabel: "Please enter your initials: ",
    completionButton: "Submit to archive"
}

// variable for saving users details as entered above
var savedDetails = {
    userScore: 0,
    userInitials: ""
}

// variable to display saved user-entered detials and their scores to the highscores buttton
var highScores = {
    highScoresheader: "High Scores",
    highScoresInitials: "Initials",
    highScoresHeading: "Scores",
    highScoresGoBackButton: "Start Screen",
    highScoresClearButton: "Clear High Scores"
}

// FUNCTIONS to make the website interactive

    // ENTRY SCREEN - function and variables what user will see on the "entry screen"
        // Entry screen title
    function entryScreen () {
        // entry screen title 
        var startScreenTitle = document.createElement("h1");
            startScreenTitle.textContent = startScreen.startTitle;
            startScreenTitle.setAttribute("class", "startTitle");
            displayScreen.appendChild(startScreenTitle);

        // entry screen instructions
        var startScreenInstructions = document.createElement("p");
            startScreenInstructions.textContent = startScreen.startInstructions;
            startScreenInstructions.setAttribute("class", "startInstructions");
            displayScreen.appendChild(startScreenInstructions);

        // entry screen start button
        var startScreenButton = document.createElement("button");
            startScreenButton.textContent = startScreen.startkey;
            startScreenButton.setAttribute("class", "startkey");
            displayScreen.appendChild(startScreenButton);

        // defining the time on the live timer on the entry screen
        var totalSeconds = 50
        liveTimeValue.textContent = totalSeconds;

        // eventListner to start the even, in this case, start the quiz on the entry screen
        startScreenButton.addEventListener("click", startCodeQuiz);
    }


    // TRANSITION ENTRY TO QUESTION SCREEN - clear the content on the entry screen for the next screen i.e., questions for the quiz
    function clearScreen() {
        displayScreen.innerHTML = "";
    } 

    // QUESTION SCREEN - function and variables what user will see (on the "question screen") after pressing the start key on the "entry screen"
    function startCodeQuiz() {
        // live timer to start at the launch of the quiz on the "question screen"
        var interval;
        var secondsLeft = 0;

        function startLiveTimer(){
            interval = setInterval
            (function() {
                secondsLeft++;
                updateTimerDisplay();
            if (secondsLeft > totalSeconds) {
                finishTimer();
                }
            }, 1000);
        }
        
        // setting question numner at the start of the quiz on the "question screen"  
        var questionNumber = 0;
        // style of the question to be displayed on the "question screen"
        function questionStyle(){
            // display question statement and its format on the "question screen"
            var questionStatement = document.createElement("p");
            questionStatement.textContent = questions[questionNumber].question;
            questionStatement.setAttribute("class", "question");
            displayScreen.appendChild(questionStatement);

            // display answer choice (unordered list element) on the "question screen" for each question
            var questionUl = document.createElement("ul");
            questionUl.setAttribute("class", "questionUl");
            displayScreen.appendChild(questionUl);
            
            //question list element
            for (var i = 0; i < questions[questionNumber].option.length; i++){
            var questionLi = document.createElement("li");
            questionLi.setAttribute("class", "questionLi");
            questionUl.appendChild(questionLi);

            // allocating button key to answers options
            var answerOptionsButton = document.createElement("button");
            answerOptionsButton.textContent = questions[questionNumber].option[i];
            answerOptionsButton.setAttribute("class", "answerOptionsButton");
            questionLi.appendChild(answerOptionsButton);

            //checking the answer on the "question screen"
            answerOptionsButton.addEventListener("click", validateAnswer);
            }
        }
        
        // validating (correct or wrong) the user input on the "question screen"
        // variable for displaying the correct or wrong message 
        var correctWrongMessage = {
            correctMessage = "Congratulations! Your answer in CORRECT",
            wrongMessage = "Your answer in Wrong",
            displayTime: 1500,
        }

        // score variable for baseline score
        var score = 0;
        var penaltyWrongAnswer = 10;
        
        function validateAnswer(event) {
                // when an answer option is clicked - two components, as below:
            // a) for correct answer 
            if (event.target.textContent == questions[questionNumber].answer){
            // b) for wrong answer 
                correctOrWrong.textContent = correctWrongMessage.correctMessage
                score++;
            } else {
                correctOrWrong.textContent = correctWrongMessage.wrongMessage
                secondsLeft += penaltyWrongAnswer;
            }

        
        }
        
        // display each question on one "question screen"
        function clearScreen();
        if (questionNumber === questions.length - 1) {
            // will be defined subsequently
            stopTimer();
            // display allDone screen (this will be defined subsequently)
            displayAllDone();
        } else {
            // move to next question
            questionNumber++;
            // displays the next question on the "question screen"
            questionStyle();
        }
    }

    




    }
       
    
    


// Reference website: https://www.freecodecamp.org/news/multiple-choice-quiz-template/