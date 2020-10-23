var questionsUrl = "https://raw.githubusercontent.com/CodingNav/SPA-Quiz/main/assets/db/questions.json";

fetch({
    method : "GET", 
    url : questionsUrl,
    credentials: "include"
}).then(function(response){
    console.log(response);
}).catch(function(err) {
    console.log(err.message);
})


var quizzes = {
    quiz_one : [
        {
           question : "Where is the digit 8 in 348?",
           answer : "ones place",
           choices : ["ones place","tens place","hundreds place"],
           feedback : "Correct answer is ones place."
        },
        {
            question : "Where is the digit 8 in 587?",
            answer : "tens place",
            choices : ["ones place","tens place","hundreds place"],
            feedback : "Correct answer is tens place."
         }
    ],
    quiz_two : [
        {
           question : "What's your name?",
           answer : "ones place",
           choices : ["ones place","tens place","hundreds place"],
           feedback : "Correct answer is ones place."
        },
        {
            question : "Hi",
            answer : "tens place",
            choices : ["ones place","tens place","hundreds place"],
            feedback : "Correct answer is tens place."
         }
    ],
}
var correctMessages = ["Brilliant!", "Awesome!", "Good work!", "Wonderful!"];
var isCorrectMessageShowing = false;
var score = 0;
var elapsedTime = 0;
var stopWatch;

var questionIndex = 0;
var currentQuiz;

function startQuiz(){
    var selectedQuiz = document.querySelector("#pickQuiz");
    var quizName = selectedQuiz.value;
    currentQuiz = quizzes[quizName];
    render_view("#question-template",0);
    scoreboard_view("#scoreboard-template");
    stopWatch = setInterval(function(){
        if (isCorrectMessageShowing) {
            document.querySelector("#scoreboard-widget").innerHTML = "";
        }
        else {
            elapsedTime++;
            scoreboard_view("#scoreboard-template");
        }
    }, 1000);
}

function checkAnswer(event){
    event.preventDefault();
    var currentQuestion = currentQuiz[questionIndex];
    var questionForm = document.getElementById("question");
    var userChoice = questionForm.querySelector("input:checked");
    if (userChoice != null && userChoice.value==currentQuestion.answer) {
        score += 5; //score = score + 5
        var randomIndex = Math.floor(Math.random()*correctMessages.length);
        var message = correctMessages[randomIndex];
        correct_view("#correct-template", message);
        isCorrectMessageShowing = true;
        document.querySelector("#scoreboard-widget").innerHTML = "";
        setTimeout(function(){ 
            isCorrectMessageShowing = false;
            scoreboard_view("#scoreboard-template");
             questionIndex++;
        render_view("#question-template", questionIndex);   
        },1000);

    }
    else {
        render_view("#feedback-template", questionIndex);
    }
}

var render_view = (view_id, quiz_index) => {
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
    var html = "";
    if (currentQuiz != null && currentQuiz[quiz_index]) {
        html = template(currentQuiz[quiz_index]);
    }
    else {
        html = template(); 
    }
    document.querySelector("#view-widget").innerHTML = html;
  }

var correct_view = (view_id, msg) => {
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
  
    var html = template({
        message: msg
    });
  
    document.querySelector("#view-widget").innerHTML = html;
  }

function loadQuiz(){
    render_view("#quiz-starter");
  }

  function nextQuestion(){
    questionIndex++;
    render_view("#question-template", questionIndex);
  }

  var scoreboard_view = (view_id) => {
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
    var scoreInfo = {
        score : score,
        elapsedTime : elapsedTime,
        answeredQuestions : questionIndex
    }
    var html = template(scoreInfo);
  
    document.querySelector("#scoreboard-widget").innerHTML = html;
  }
