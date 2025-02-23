var countQues = 0;
var score = 0;

// Question sets for each character
const barneyQuestions = [
    {
        question: "What is Barney's signature catchphrase?",
        choices: ["Suit up!", "Legen-wait for it-dary!", "Have you met Ted?", "Challenge accepted!"],
        answer: 2
    },
    {
        question: "What is Barney's job?",
        choices: ["PLEASE", "Insurance Agent", "Bank Manager", "No one knows"],
        answer: 1
    },
    {
        question: "What is Barney's favorite suit color?",
        choices: ["Black", "Navy Blue", "Grey", "All of the above"],
        answer: 4
    },
    {
        question: "What is the name of Barney's blog?",
        choices: ["Barney's Blog", "Suit Up Daily", "Awesome Blog", "The Playbook Online"],
        answer: 1
    },
    {
        question: "Which magic trick does Barney perform regularly?",
        choices: ["Card tricks", "The Disappearing Quarter", "The Flaming Wallet", "The Exploding Fist Bump"],
        answer: 3
    }
];

// ... (keep other character questions as they are)

// Initialize quiz state
document.getElementById("score").textContent = "Score : " + 0;
document.querySelector(".view-results").style.display = "none";
document.querySelector(".quiz").style.display = "none";
document.querySelector(".final-result").style.display = "none";

// Function to get questions based on character selection
function getQuestions(character) {
    switch(character) {
        case 'Barney': return barneyQuestions;
        case 'Ted': return tedQuestions;
        case 'Marshall': return marshallQuestions;
        case 'Lilly': return lillyQuestions;
        case 'Robin': return robinQuestions;
        default: return barneyQuestions;
    }
}

// Function to get character name from value
function getCharacterName(value) {
    switch(value) {
        case 'Barney': return 'Barney';
        case 'Ted': return 'Ted';
        case 'Marshall': return 'Marshall';
        case 'Lilly': return 'Lily';
        case 'Robin': return 'Robin';
        default: return 'Barney';
    }
}

// Start Quiz button click handler
document.querySelector(".choose-lang").addEventListener("click", function() {
    const selectedCharacter = document.getElementById("language").value;
    const questions = getQuestions(selectedCharacter);
    
    document.querySelector("#wrapper").style.display = "none";
    document.querySelector(".quiz").style.display = "block";
    
    document.getElementById("ques-left").textContent = "Question : " + (countQues + 1) + "/" + questions.length;
    document.querySelector(".question").innerHTML = "<h1>" + questions[countQues].question + "</h1>";
    
    for (let i = 0; i <= 3; i++) {
        document.getElementById("opt" + i).value = questions[countQues].choices[i];
        document.getElementById("lb" + i).innerHTML = questions[countQues].choices[i];
    }
});

// Submit answer button click handler
document.querySelector(".submit-answer").addEventListener("click", function() {
    const questions = getQuestions(document.getElementById("language").value);
    
    if (!document.querySelector('input[name="options"]:checked')) {
        alert("Please select an answer!");
        return;
    }

    const selectedAnswer = document.querySelector('input[name="options"]:checked').value;
    const correctAnswer = questions[countQues].choices[questions[countQues].answer - 1];

    if (selectedAnswer === correctAnswer) {
        score += 10;
        document.getElementById("score").textContent = "Score : " + score;
        document.getElementById("ques-view").innerHTML += 
            "<div class='ques-circle correct'>" + (countQues + 1) + "</div>";
    } else {
        score -= 5;
        document.getElementById("score").textContent = "Score : " + score;
        document.getElementById("ques-view").innerHTML += 
            "<div class='ques-circle incorrect'>" + (countQues + 1) + "</div>";
    }

    if (countQues < questions.length - 1) {
        countQues++;
        document.getElementById("ques-left").textContent = 
            "Question : " + (countQues + 1) + "/" + questions.length;
        document.querySelector(".question").innerHTML = 
            "<h1>" + questions[countQues].question + "</h1>";
        
        for (let i = 0; i <= 3; i++) {
            document.getElementById("opt" + i).value = questions[countQues].choices[i];
            document.getElementById("lb" + i).innerHTML = questions[countQues].choices[i];
        }
        
        document.querySelector('input[name="options"]:checked').checked = false;
    } else {
        document.querySelector(".submit-answer").style.display = "none";
        document.querySelector(".view-results").style.display = "unset";
    }
});

// View results button click handler
document.querySelector(".view-results").addEventListener("click", function() {
    document.querySelector(".final-result").style.display = "block";
    document.querySelector(".quiz").style.display = "none";
    
    const correct = document.getElementById("ques-view").getElementsByClassName("correct").length;
    const total = countQues + 1;
    const percentage = (correct / total) * 100;
    const characterName = getCharacterName(document.getElementById("language").value);
    
    document.querySelector(".solved-ques-no").innerHTML = 
        `You Solved ${total} questions about ${characterName}`;
    document.querySelector(".right-wrong").innerHTML = 
        `${correct} were Right and ${(total-correct)} were Wrong`;
    document.getElementById("display-final-score").innerHTML = 
        `Your Final Score is: ${score}`;
    
    updateKnowledgeBar(percentage);
    
    if (percentage > 80) {
        document.querySelector(".remark").innerHTML = "Remark: Outstanding! :)";
    } else if (percentage > 60) {
        document.querySelector(".remark").innerHTML = "Remark: Good, Keep Improving.";
    } else if (percentage > 40) {
        document.querySelector(".remark").innerHTML = "Remark: Satisfactory, Learn More.";
    } else {
        document.querySelector(".remark").innerHTML = "Remark: Unsatisfactory, Try Again.";
    }
});

// Function to update knowledge bar
function updateKnowledgeBar(percentage) {
    const progressBar = document.querySelector('.knowledge-progress');
    const percentageDisplay = document.querySelector('.knowledge-percentage');
    const message = document.querySelector('.knowledge-message');
    
    progressBar.style.width = percentage + '%';
    percentageDisplay.textContent = Math.round(percentage) + '%';
    
    if (percentage >= 80) {
        message.textContent = "You're an expert!";
    } else if (percentage >= 60) {
        message.textContent = "You know quite a bit!";
    } else if (percentage >= 40) {
        message.textContent = "You're getting there!";
    } else {
        message.textContent = "Keep learning!";
    }
}

// Restart button click handler
document.getElementById("restart").addEventListener("click", function() {
    countQues = 0;
    score = 0;
    document.getElementById("score").textContent = "Score : " + score;
    document.getElementById("ques-view").innerHTML = "";
    document.querySelector(".submit-answer").style.display = "block";
    document.querySelector(".view-results").style.display = "none";
    document.querySelector(".final-result").style.display = "none";
    document.querySelector("#wrapper").style.display = "block";
    document.querySelector(".quiz").style.display = "none";
});

// About button click handler
document.getElementById("about").addEventListener("click", function() {
    alert("This quiz tests your knowledge about How I Met Your Mother characters!");
});