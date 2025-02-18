addEventListener("DOMContentLoaded", (Event) => {
  document.addEventListener("keydown", function (Event) {
    //Evenet Listerner for the jumping to the preovious Input
    if (Event.key === "Backspace") {
      //let form1 = document.getElementById('form1')
      //form1.classList.toggle('active')
      //call the jumping back logic
      moveToPreviousInput();
    }
    if (Event.key === "Enter") {
      //submit the form if possible
      inputValidation();
    }
  });
  //at the beginning do the api call for the random word
  apiCall();
  //defing the input index
});

let formIndex = 0;
//jumping to the next Input
function moveToNextInput(currentInput, nextInput) {
  let activeForm = document.querySelector(".active");
  if (currentInput.value.length === 1) {
    activeForm[nextInput - 1].focus();
  }
}

//jumping back to the previous Input
function moveToPreviousInput() {
  let input = document.activeElement;
  if (input.value === "") {
    //get active form
    let activeForm = document.querySelector(".active");
    let value = input.getAttribute("idOfInput") - 1;
    let previousInput = activeForm[value - 1];
    if (previousInput) {
      previousInput.focus();
      previousInput.setSelectionRange(1, 1);
    }
  }
}

//cheking of the supmit is a full word and submit
function inputValidation() {
  //push all the values in the array
  let inputs = [];
  for (let index = 0; index < 5; index++) {
    inputs.push(document.getElementById(`input${index + 1}`).value);
  }

  //validate the inputs for completeness
  if (inputs.some((value) => value === "")) {
    //focus the first not complete input
    //get the first emty index and element
    let index = inputs.findIndex((value) => value === "");
    let input = document.getElementById(`input${index + 1}`);
    input.focus();

    return;
  }

  processForm();
}

//declare api Values globally
let apiValues = [];

//api call for the random word
async function apiCall() {
  try {
    let response = await fetch("http://127.0.0.1:5000/api/randomWord");
    var data = await response.json();

    apiValues = data.word.split("");
    //map to uppercase
    apiValues = apiValues.map((value) => value.toUpperCase());
    console.log("apivalues: " + apiValues);
  } catch (error) {
    console.log(error);
  }
}

//submit the form if passed checks
function processForm() {
  //get active form
  let activeForm = document.querySelector(".active");
  let formData = new FormData(activeForm);
  //crate an array with the inputs
  let inputValues = [];
  formData.forEach((inputValue) => {
    inputValues.push(inputValue);
  });

  console.log("input: " + inputValues);
  //get the intersections
  let intersections = inputValues.filter((value) => apiValues.includes(value));
  console.log("interactions: " + intersections);

  //sort the list with indexes
  let valueListWithIndex = [];
  apiValues.forEach((apiValue) => {
    if (intersections.includes(apiValue)) {
      valueListWithIndex.push(apiValue);
    } else {
      valueListWithIndex.push("null");
    }
  });

  //console.log("positionen: " + valueListWithIndex)

  for (i = 0; i < 5; i++) {
    //store the two index values
    value1 = inputValues[i];
    value2 = valueListWithIndex[i];
    //compare the two values and if true the value is correct
    if (value1 === value2) {
      console.log("index " + i + " is correct");
      //select the corressponding field
      var selectetInputField = activeForm[i];
      selectetInputField.classList.add("correct");
      //update the index list so the correct answers are also null
      valueListWithIndex[i] = "null";
    }
  }
  //console.log(valueListWithIndex)

  for (i = 0; i < 5; i++) {
    //store the value
    value1 = inputValues[i];
    //compare the value and if true the value is partiallycorrect
    if (valueListWithIndex.includes(value1)) {
      console.log("index " + i + " is partiallycorrect");
      //select the corressponding field
      var selectetInputField = activeForm[i];
      if (!selectetInputField.classList.contains("correct")) {
        selectetInputField.classList.add("partiallyCorrect");
      }
    }
  }
  selectNextForm();
}

function selectNextForm() {
  //get the active Form
  let activeForm = document.getElementById(`form${formIndex + 1}`);
  //deactive the form
  activeForm.classList.remove("active");
  activeForm.classList.add("deactive");

  //get the next form
  let nextForm = document.getElementById(`form${formIndex + 2}`);
  //console.log(formIndex);
  //activate the next form
  nextForm.classList.remove("deactive");
  nextForm.classList.add("active");
  formIndex++;
  toggleInput();
}

function toggleInput() {
  //get active Form
  let activeForm = document.querySelector(".active");

  //activate active Form
  for (let i = 0; i < 5; i++) {
    activeForm[i].disabled = false;
  }

  //get deactive Forms
  let deactiveForms = document.querySelectorAll(".deactive");

  //deactivate all deactiv Forms
  for (let i = 0; i < 5; i++) {
    deactiveForms[0][i].disabled = true;
  }
}
