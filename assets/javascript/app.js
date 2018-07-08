window.onload = function() {

    $(".answer-choice").click(function(){
        if($(this).attr("id") === "abcd".charAt(game.question.correct)){
            game.endQuestion("That's Right!", true);
        }
        else{
            game.endQuestion("Nope", false);
        }
    });

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

    //  game object.
var game = {

    questions: [
        new Question("What is the deepest point in the Atlantic Ocean?", 
        ["Mariana Trench", "Puerto Rico Trench", 
        "South Sandwich Trench", "Intermontane Trench"], 1),
        new Question("How many 360 degree rotations does the Earth make in one full trip around the sun?", 
        ["364.25", "365.25", "366.25", "367.25"], 2),
        new Question("What animal has the most deadly venom?", 
        ["Geographic Cone Snail", "Blue-ring Octopus", "Inland Taipan Snake", "Box Jellyfish"], 0),
        new Question("What panet's orbit is most nearby to Earth's orbit?", 
        ["Mercury", "Venus", "Mars", "Jupiter"], 1),
        new Question("What is the longest mountain range in the world?", 
        ["Alps", "Himalayas", "Appalachian", "Andes"], 3),
        new Question("What is the radius of the Earth in miles?", 
        ["3,959", "7,233", "2,518", "9,454"], 0),
        new Question("Which animal is the fastest swimmer in the world?", 
        ["Marlin", "Giant Squid", "Sailfish", "Killer Whale"], 2),
        new Question("What is the geographical name for a group of islands?", 
        ["Archipelago", "Atoll", "Peninsula", "Chaparral"], 0),
        new Question("What Continent are Potatoes indigenous to?", 
        ["Europe", "Africa", "Asia", "South America"], 3),
        new Question("Which type of organism is Yeast?", 
        ["Bacteria", "Fungus", "Plant", "Animal"], 1)
        
    ],

    time: 10,
    questionInd: 0,
    question: null,
    wrong: 0,
    right: 0,

    answers: $("#answers"),

    reset: function() {

        console.log("reset");

        game.time = 10;
        game.stopTime();

        $("#display").text("10");

        $("#container").append(game.answers);

        game.start();

    },

    start: function() {
        
        game.question = game.questions[game.questionInd];
        console.log("start");

        $("h1").text(game.question.qtext);
        $("#a").text(game.question.options[0]);
        $("#b").text(game.question.options[1]);
        $("#c").text(game.question.options[2]);
        $("#d").text(game.question.options[3]);

        if (!clockRunning) {
            intervalID = setInterval(game.count, 1000);
            clockRunning = true;
        }
    },

    stopTime: function() {

        console.log("stopTime");
        
        clearInterval(intervalID);
        clockRunning = false;
    },

    endQuestion: function(disp, cval){
        console.log(game.answers);
        $("#display").empty();
        $("h1").text(disp + " The answer was " + game.question.options[game.question.correct]);
        $("#answers").detach();
        game.stopTime();
        cval ? game.right++ : game.wrong++;
        game.questionInd++;
        if(game.questionInd === game.questions.length){
            setTimeout(game.endgame, 1000 * 3);
        }
        else{
            setTimeout(game.reset, 1000 * 3);
        }
    },

    count: function() {

        game.time--;
        if(game.time === 0){
            game.endQuestion("Time's Up!", false);
        }
        else{
        $("#display").text(game.time);
        }
    },
    endgame: function(){
        $("h5").text("Number right: " + game.right + ", Number wrong: "+ game.wrong);
        $("h1").text("Quiz Over!");
        game.questionInd = 0;
        game.right = 0;
        game.wrong = 0;
        setTimeout(game.reset, 1000 * 3);
    }
    
};
