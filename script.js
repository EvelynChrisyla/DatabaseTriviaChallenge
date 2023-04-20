const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn= info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .time_sec");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    queCounter(1);
    startTimer(15);
}


let que_count = 0;
let que_num =1;
let counter;
let timeValue = 15;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");



quit_quiz.onclick = () => {
    window.location.reload();
}

next_btn.onclick = () => {
    if(que_count < question.length - 1){
        que_count ++;
        que_num ++;
        showQuestion(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = "none";
    }
    else {
        console.log("Question Completed");
        showResultBox();
    }
}

function showQuestion(index) {
    const que_text = document.querySelector(".que_text");
    
    let que_tag = '<span>' + question[index].question +'</span>';
    let option_tag =  '<div class="option">'+ question[index].option[0] +' <span></span></div>'
                    + '<div class="option">'+ question[index].option[1] +'<span></span></div>'
                    + '<div class="option">'+ question[index].option[2] +'<span></span></div>'
                    + '<div class="option">'+ question[index].option[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
        
    }
}

let tickIcon =' <div class="icons"><i class="material-icons">check</i></div>'
let crossIcon =' <div class="iconx"><i class="material-icons">close</i></div>'
function optionSelected(answer){
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = question[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Correct");
        answer.insertAdjacentHTML("beforeend",tickIcon );
    }
    else {
        answer.classList.add("incorrect");
        console.log("Wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon );

        for (let i = 0; i <  allOptions; i++) {
           if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
            
        }
    }

    
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
    
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    const scoreText = result_box.querySelector(".score_text");
        let scoreTag = '<span>Correct Answer : '+userScore +'</span>';
        scoreText.innerHTML = scoreTag;

    const scoreTextWrong = result_box.querySelector(".score_text_wrong");
    let scoreTags = '<span>Wrong Answer : ' + (question.length - userScore) + '</span>';
    scoreTextWrong.innerHTML = scoreTags;
}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
        clearInterval(counter);
        timeCount.textContent = "0";

        
        let correctAns = question[que_count].answer;
        let allOptions = option_list.children.length;

        for (let i = 0; i <  allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                 option_list.children[i].setAttribute("class", "option correct");
                 option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
             }
             
        }

        for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
        }
        next_btn.style.display = "block";
        }

    }
}

function queCounter(index) {
    const button_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span></p>'+index+'</p>Of<p>'+ question.length + '</p>Questions</span>';
    button_ques_counter.innerHTML = totalQuesCountTag;
}