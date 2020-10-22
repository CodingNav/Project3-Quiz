var quiz_one = [
    {
       question : "Where is the digit 8 in 348?",
       answer : "ones place",
       choices : ["ones place","tens place","hundreds place"]
    }
];

function startQuiz(){
    render_view("#question-template",0);
}

var render_view = (view_id, quiz_index) => {
    console.log("Rendering View");
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
    var html = template(quiz_one[quiz_index]);
  
    document.querySelector("#view-widget").innerHTML = html;
  }

function loadQuiz(){
    render_view("#quiz-starter");
  }