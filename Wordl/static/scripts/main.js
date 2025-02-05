addEventListener("DOMContentLoaded", (Event) => {

    document.addEventListener("keydown", function (Event){
        //Evenet Listerner for the jumping to the preovious Input
        if(Event.key === "Backspace"){
            //call the jumping back logic
            moveToPreviousInput();
        }
        if(Event.key === "Enter"){
            //submit the form if possible
            inputValidation();
        }
    })
});

//jumping to the next Input
function moveToNextInput(currentInput, nextInput) {
    if(currentInput.value.length === 1) {
        document.getElementById(nextInput).focus();
    }
}

//jumping back to the previous Input
function moveToPreviousInput() {
    let input = document.activeElement;
    if(input.value === ""){
        let value = input.getAttribute("idOfInput") -1;
        let previousInput = document.getElementById(`input${value}`);
        if (previousInput){
            previousInput.focus();
            previousInput.setSelectionRange(1, 1);
        }
        
    }
}

//cheking of the supmit is a full word and submit
function inputValidation() {
    //push all the values in the array
    let inputs = []
    for (let index = 0; index < 5; index++) {
        inputs.push(document.getElementById(`input${index + 1}`).value);
    }

    //validate the inputs for completeness
    if (inputs.some(value => value === "")) {
        //focus the first not complete input
        //get the first emty index and element
        let index = inputs.findIndex(value => value === "");
        let input = document.getElementById(`input${index + 1}`);
        input.focus();
    
        return
    } 

    submitForm();
}

//submit the form if passed checks
function submitForm() {
    //get active form
    let activeForm = document.getElementById('form1');
    activeForm.submit();
}