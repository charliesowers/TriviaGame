
window.onload = function() {

    game.start();

};

function Question(qtext, options, correct) {
    this.qtext = qtext;
    this.options = options;
    this.correct = correct;
}

    //  Variable that will hold our setInterval that runs the game
var intervalId;

    // prevents the clock from being sped up unnecessarily
var clockRunning = false;

    //  Our game object.
var game = {

    questions: [
        new Question("Which letter?", ["A", "B", "C", "D"], 1),
        new Question("Which letter?", ["A", "B", "C", "D"], 0),
        new Question("Which letter?", ["A", "B", "C", "D"], 2),
    ],

    time: 10,
    questionInd: 0,
    question: null,
    wrong: 0,
    right: 0,

    reset: function() {

        game.time = 10;
        game.stopTime();
        game.questionInd++;

        //  TODO: Change the "display" div to "00:00."
        $("#display").text("10");
        $("#laps").empty();

        game.start();

    },

    start: function() {
        game.question = game.questions[game.questionInd];
        //console.log(game.question);

        //  TODO: Use setInterval to start the count here and set the clock to running.

        $("h1").text(game.question.qtext);
        $("#a").text(game.question.options[0]);
        $("#b").text(game.question.options[1]);
        $("#c").text(game.question.options[2]);
        $("#d").text(game.question.options[3]);

        if (!clockRunning) {
        intervalID = setInterval(game.count, 1000);
        clockRunning = true;
        }
        $(".answer-choice").click(function(){
            if($(this).attr("id") === "abcd".charAt(game.question.correct)){
                game.correctGuess();
            }
            else{
                game.incorrectGuess();
            }
        });

    },
    stopTime: function() {

        //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalID);
        clockRunning = false;
    },

    correctGuess: function() {
        $("h1").text("That's Right!");
        $(".answer-choice").empty();
        game.stopTime()
        setTimeout(game.reset, 1000 * 5);
        game.right++;
        
    },

    incorrectGuess: function() {
        $("h1").text("Nope");
        $(".answer-choice").empty();
        game.stopTime()
        game.wrong++;
        setTimeout(game.reset, 1000 * 5);
    },
    count: function() {

        //  TODO: increment time by 1, remember we cant use "this" here.

        //  TODO: Get the current time, pass that into the game.timeConverter function,
        //        and save the result in a variable.

        //  TODO: Use the variable you just created to show the converted time in the "display" div.

        game.time--;
        if(game.time === 0){
            $("h1").text("Time's Up!");
            $(".answer-choice").empty();
            game.stopTime();
            game.wrong++;
            setTimeout(game.reset, 1000 * 5);
        }
        $("#display").text(game.time);

    },
    endgame: function(){
        //reset logic here
    }
    
};
