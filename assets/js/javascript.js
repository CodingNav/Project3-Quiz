var questionsUrl = "https://my-json-server.typicode.com/";
var quiz_one = [
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
];

var correctMessages = ["Brilliant!", "Awesome!", "Good work!", "Wonderful!"];

var questionIndex = 0;
var currentQuiz = quiz_one;

function startQuiz(){
    render_view("#question-template",0);
}

function checkAnswer(event){
    event.preventDefault();
    var currentQuestion = currentQuiz[questionIndex];
    var questionForm = document.getElementById("question");
    var userChoice = questionForm.querySelector("input:checked");
    if (userChoice != null && userChoice.value==currentQuestion.answer) {
        var randomIndex = Math.floor(Math.random()*correctMessages.length);
        var message = correctMessages[randomIndex];
        correct_view("#correct-template", message);
        setTimeout(function(){
             questionIndex++;
        render_view("#question-template", questionIndex);   
        },1000);

    }
    else {
        alert("Wrong Answer");
        render_view("#feedback-template", questionIndex);
    }
}

var render_view = (view_id, quiz_index) => {
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
    if (quiz_one[quiz_index]) {

    }
    var html = template(quiz_one[quiz_index]);
  
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