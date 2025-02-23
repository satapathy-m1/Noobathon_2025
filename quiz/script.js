var countQues = 0;
var score = 0;

var questions = [
    {
        question: "In the episode 'The Pineapple Incident', who burns Ted's jacket?",
        choices: ["Barney","Marshall","Lily","Robin"],
        answer: 1
    
    },
    
    {
        question: "During the episode 'The Limo', Ted rents a limo on New Year's Eve for the gang to drive around New York City and hop from party to party. At one point, Barney brings back a girl to the limo to party with the rest of the night. What is her name?",
        choices: ["Veronica","Marybeth","Natalya","Lisa"],
        answer: 3
    
    },
    {
        question: " In 'Swarley', Robin subscribes Barney to the Spanish version of a magazine, using the name 'Swarlos'. Which magazine is it?",
        choices: ["People","Time","US Weekly","Harper Bazaar"],
        answer: 1
    
    },
    {
        question: "Season 5, Episode 24: 'Doppelgangers' Lily, Robin, and Marshall jokingly compel Ted not to dye his hair blonde. However, Ted insists he do so. How does Marshall ultimately react, still jokingly?",
        choices: ["No wonder the sky has gone pregnant!","That is not the outcome that we're hoping for!","God, what is really happening now?!","Oh, just sell my soul to the devil!"],
        answer: 2
    
    },
    {/*5*/
        question: "In the episode 'Matchmaker', who plays Ellen Pierce, the owner/operator of the Love Solutions matchmaking service? ",
        choices: ["Rosie O'donnell","Camryn Manheim","Megan Mullally","Ricki Lake"],
        answer: 2
    
    },
    
];

// Hide quiz and results sections initially
document.querySelector(".quiz").style.display = "none";
document.querySelector(".final-result").style.display = "none";

// Add event listener for the start quiz button
document.querySelector(".start-quiz-btn").addEventListener("click", function() {
    document.querySelector("#wrapper").style.display = "none";
    document.querySelector(".quiz").style.display = "block";
    initializeQuiz();
});

function initializeQuiz() {
    // Initialize the quiz
    document.getElementById("score").textContent = "Score : " + 0;
    document.querySelector(".view-results").style.display = "none";
    document.getElementById("ques-left").textContent = "Question : " + (countQues + 1) + "/" + questions.length;
    
    // Set up first question
    document.querySelector(".question").innerHTML = "<h1>" + questions[countQues].question + "</h1>";
    for (i = 0; i <= 3; i++) {
        document.getElementById("opt" + i).value = questions[countQues].choices[i];
        document.getElementById("lb" + i).innerHTML = questions[countQues].choices[i];
    }
}

// Handle answer submission
document.querySelector(".submit-answer").addEventListener("click", function() {
    if (!document.querySelector('input[name="options"]:checked')) {
        alert("Please select an answer!");
        return;
    }

    if (document.querySelector('input[name="options"]:checked').value === questions[countQues].choices[questions[countQues].answer - 1]) {
        score += 10;
        document.getElementById("score").textContent = "Score : " + score;
        document.getElementById("ques-view").innerHTML += "<div class='ques-circle correct'>" + (countQues + 1) + "</div>";
    } else {
        score -= 5;
        document.getElementById("score").textContent = "Score : " + score;
        document.getElementById("ques-view").innerHTML += "<div class='ques-circle incorrect'>" + (countQues + 1) + "</div>";
    }

    if (countQues < questions.length - 1) {
        countQues++;
        document.getElementById("ques-left").textContent = "Question : " + (countQues + 1) + "/" + questions.length;
        document.querySelector(".question").innerHTML = "<h1>" + questions[countQues].question + "</h1>";
        for (i = 0; i <= 3; i++) {
            document.getElementById("opt" + i).value = questions[countQues].choices[i];
            document.getElementById("lb" + i).innerHTML = questions[countQues].choices[i];
        }
        // Clear the radio button selection
        document.querySelector('input[name="options"]:checked').checked = false;
    } else {
        document.querySelector(".submit-answer").style.display = "none";
        document.querySelector(".view-results").style.display = "unset";
    }
});

// Handle viewing results
document.querySelector(".view-results").addEventListener("click", function() {
    document.querySelector(".final-result").style.display = "block";
    document.querySelector(".quiz").style.display = "none";
    document.querySelector(".solved-ques-no").innerHTML = "You Solved " + (countQues + 1) + " questions";
    
    var correct = document.getElementById("ques-view").getElementsByClassName("correct").length;
    document.querySelector(".right-wrong").innerHTML = correct + " were Right and " + ((countQues + 1) - correct) + " were Wrong";
    document.getElementById("display-final-score").innerHTML = "Your Final Score is: " + score;
    
    if (correct / (countQues + 1) > 0.8) {
        document.querySelector(".remark").innerHTML = "Remark: Outstanding! :)";
    } else if (correct / (countQues + 1) > 0.6) {
        document.querySelector(".remark").innerHTML = "Remark: Good, Keep Improving.";
    } else if (correct / (countQues + 1) > 0.4) {
        document.querySelector(".remark").innerHTML = "Remark: Satisfactory, Learn More.";
    } else {
        document.querySelector(".remark").innerHTML = "Remark: Unsatisfactory, Try Again.";
    }
});

// Restart quiz
document.getElementById("restart").addEventListener("click", function() {
    location.reload();
});

// About info
document.getElementById("about").addEventListener("click", function() {
    alert("Quiz Website Project Created By Digvijay Singh");
});

// Smooth scroll functionality
$(document).on('click', 'a[href^="#"]', function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});

// Add navbar toggle functionality
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    document.querySelector('.navbar-menu').classList.toggle('active');
});

// Add dropdown functionality
document.querySelector('.dropdown-toggler').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#' + this.dataset.dropdown).classList.toggle('show');
});