//  defining all query selector
var liveTimeValue = document.querySelector(".live-time-value");
var dispalyQuestion = document.querySelector(".question");
var answer = document.querySelector(".answer");
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

//setting the screen that users will see when they launch the quiz 
var startScreen = {
    startTitle: "Coding Quiz Challenge",
    startMessage: "Instructions: Try to answer the following code related questions within the time limit. Keep in mind that every incorrect answers will penalize your scoretime by 10 seconds. Press START key to start the quiz. Good luck!",
    startKey: "Start"
}

// variables for displaying the users if their answer is correct or wrong
var answerDisplay = {
    correctAnswer: "Correct!",
    wrongAnswer: "Wrong!",
}

// variables for displaying the user for input additional information when the quiz is complete
var quizComplete = {
    completionHeading: "Congratulation! You have completed the quiz",
    completionMessage: "Your scored :",
    completionLabel: "Please enter your initials: ",
    completionButton: "Submit to archive"
}

// variables for saving users details as entered above
var savedDetails = {
    userScore: 0,
    userInitials: ""
}

// varaible to display saved user-entered detials and their scores to the highscores buttton
var highScores = {
    highScoresheader: "High Scores",
    highScoresInitials: "Initials",
    highScoresHeading: "Scores",
    highScoresGoBackButton: "Start Screen",
    highScoresClearButton: "Clear High Scores"
}

// https://www.freecodecamp.org/news/multiple-choice-quiz-template/