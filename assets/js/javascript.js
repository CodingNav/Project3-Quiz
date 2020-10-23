var questionUrl = "https://json-loader.herokuapp.com/api/codingnav/SPA-Quiz/assets/db/questions.json";
var quizzes;

fetch(questionUrl).then(function(res) {
    res.json().then(function(data) {
        quizzes=data;
    }).catch(function(err) {
        console.log(err);
    });
})
.catch(function(err) {
    console.log(err);
});



var correctMessages = ["Brilliant!", "Awesome!", "Good work!", "Wonderful!"];
var isCorrectMessageShowing = false;
var score = 0;
var elapsedTime = 0;
var stopWatch;
var firstName;
var lastName;

var questionIndex = 0;
var currentQuiz;

function startQuiz(isRetake){
    if (isRetake == false) {
    var firstNameInput = document.querySelector("#firstName");
    firstName = firstNameInput.value;
    var lastNameInput = document.querySelector("#lastName"); 
    lastName = lastNameInput.value;
    var selectedQuiz = document.querySelector("#pickQuiz");
    var quizName = selectedQuiz.value;

    if (firstName == "" || lastName == "" || quizName == "none") {
        return alert("Please fill out form completely.")
    }
    currentQuiz = quizzes[quizName];
    }
    score = 0;
    elapsedTime = 0;
    questionIndex = 0;
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
             nextQuestion(event); 
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
   document.querySelector("#scoreboard-widget").innerHTML = "";
  }

  function nextQuestion(event){
      event.preventDefault();
    questionIndex++;
    if (questionIndex >= currentQuiz.length){
        clearInterval(stopWatch);
        result_view("#result-template");
    }
    else {
        render_view("#question-template", questionIndex); 
    }
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


  var result_view = (view_id) => {
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
    var resultInfo = {
        totalScore : score/(currentQuiz.length*5)*100, 
        name : firstName + " " + lastName,
    }

    resultInfo.passed = (resultInfo.totalScore>=80);
    var html = template(resultInfo);
  
    document.querySelector("#view-widget").innerHTML = html;
  }
