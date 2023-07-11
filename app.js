easyBtn = document.getElementById('btn_Easy');
mediumBtn = document.getElementById("btn_Medium");
hardBtn = document.getElementById("btn_Hard");
num1 = document.getElementById("number1");
num2 = document.getElementById("number2");
answer = document.getElementById("answer");
nfBtn = document.getElementById("nf_btn");
text = document.getElementById('text');
tableBody = document.getElementById("tableBody");
startBtn = document.getElementById("start_btn");

mode = "Easy";
firstTime = true;
count = 1;
resultArry = [];



function reset() {
    nfBtn.textContent = "Next"
    tableBody.innerHTML="";
    firstTime = true;
    count = 1;
    num1.value = num2.value = answer.value = "";
    nfBtn.disabled = true;
    resultArry = [];
}


easyBtn.addEventListener("click", () => {
    mediumBtn.checked = false;
    hardBtn.checked = false;
    mode = "Easy";
    reset();
})

mediumBtn.addEventListener("click", () => {
    easyBtn.checked = false;
    hardBtn.checked = false;
    mode = "Medium";
    reset();
})

hardBtn.addEventListener("click", () => {
    mediumBtn.checked = false;
    easyBtn.checked = false;
    mode = "Hard";
    reset();
})

startBtn.addEventListener("click", () => {

    if (firstTime)
        if (mode == "") { alert("Select Mode First") }
        else if (mode == "Easy") {
            easyMode(); firstTime = false; nfBtn.disabled = false;
        }
        else if (mode == "Medium") {
            mediumMode(); firstTime = false; nfBtn.disabled = false;
        }
        else if (mode == "Hard") {
            hardMode(); firstTime = false; nfBtn.disabled = false
        }
})

function update() {

    if (count == 10 && nfBtn.textContent != "Finish") {
        nfBtn.textContent = "Finish";
    }
    
    if (count == 11 && nfBtn.textContent == "Finish") {
        let str = "";
        for(let i=0;i<resultArry.length;++i)
        { 
            j=i++;
            color=color1='green';
            if(resultArry[i].includes("false")) color='red';
            
            if(resultArry[j].includes("false")) color1='red';
            
            str += ` <tr> <td style="color:${color}">${resultArry[i]}</td> <td style="color:${color1}">${resultArry[j]}</td> </tr>`
        }
        tableBody.innerHTML = str;
    }

    if (answer.value != "") {
        if (count <= 10) {
            //count++;
            var n1 = num1.value;
            var n2 = num2.value;
            var ans = answer.value;
            var correct = n1 * n2;
            check = n1 * n2 == ans;
            if(count < 10)
            { answer.value = "";}

            if (check)
                val = n1 + " * " + n2 + " = " + ans + "; Your Answer is " + check;
            else
                val = n1 + " * " + n2 + " = " + ans + "; Your Answer is " + check + "; Correct Answer: " + correct;

                console.log(count + val);
            resultArry.push(val);

            if (!firstTime && count < 10) {
                if (mode == "Easy") {
                    easyMode();
                }
                else if (mode == "Medium") {
                    mediumMode();
                }
                else if (mode == "Hard") {
                    hardMode();
                }
            }
            count++;
        }
    }


}

function easyMode() {
    var n1 = Math.floor(Math.random() * 10) + 1;
    var n2 = Math.floor(Math.random() * 10) + 1;
    num1.value = n1;
    num2.value = n2;
}

function mediumMode() {
    var n1 = Math.floor(Math.random() * 90) + 10;
    var n2 = Math.floor(Math.random() * 90) + 10;
    num1.value = n1;
    num2.value = n2;
}

function hardMode() {
    var n1 = Math.floor(Math.random() * 400) + 100;
    var n2 = Math.floor(Math.random() * 400) + 100;
    num1.value = n1;
    num2.value = n2;
}
try{
answer.addEventListener("keypress", (e) => { if (e.key == 'Enter') update(); });
nfBtn.addEventListener("click", update);
}
catch(err){
    console.log(err);
}
