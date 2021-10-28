


const sets = document.querySelector(".sets")
const rest = document.querySelector(".rest")
const work = document.querySelector(".work")
let secondsWork = 0;
let secondsRest = 0;
let setNo = 0;

// updating input
function handleUpdate() {
    this.name.innerHTML = this.value; //the HTML element 'name' that received the event 'value input'
    if (this.name === "sets") {
        sets.innerHTML = this.value;
        setNo = parseInt(this.value); //parses a string argument and returns an integer needed in logic 
    }
    else if (this.name === "rest") {
        rest.innerHTML = this.value;
        secondsRest = parseInt(this.value);
    }
    else {
        work.innerHTML = this.value;
        secondsWork = parseInt(this.value);
    }
}
const inputs = document.querySelectorAll('.control-container input');
inputs.forEach(input => input.addEventListener('change', handleUpdate));



//main logic
const start = document.querySelector(".start");
const second = document.querySelector(".workSeconds");
const restSeconds = document.querySelector(".restSeconds");
const currentSet = document.querySelector(".currentSet");

let currentSets = 0;
let totalTime = 0;

start.addEventListener('click', function () {
    currentSets = setNo;
    totalTime = setNo * (secondsWork + secondsRest + 1) + 2;
    console.log('Total time: ', totalTime);
    getRemaindingTime();
});




let workInterval = 0;
let restInterval = 0;

function getRemaindingTime() {
    let seconds = workInterval % 61; //modulo to get the seconds u want from input ie 3%61 => 3
    const values = seconds;

    if (totalTime >= 0) {
        second.innerHTML = values;

        if (workInterval > 0) {
            workInterval--;
            document.body.style.backgroundColor = "lightgreen";
            console.log('work interval countdown', workInterval);
        }
        else if (workInterval >= 0 && restInterval >= 0) {  //both conditions must be true to be excuted

            restSeconds.innerHTML = restInterval;
            restInterval--;
            document.body.style.backgroundColor = "aliceblue";
            console.log('resting interval countdown', restInterval);
        }

        else {
            currentSets--;
            if (currentSets == -1 && restInterval == -1) {
                alert("Job Done!");
            }
            workInterval = secondsWork;
            restInterval = secondsRest;
            console.log('Current Set:', currentSets, 'Work Interval Sec:', workInterval, 'Rest Interval Sec:', restInterval);
        }
    }
    //outside loop for number of sets countdown

    currentSet.innerHTML = currentSets;
    totalTime--; //1000ms interval 

}

setInterval(getRemaindingTime, 1000);


