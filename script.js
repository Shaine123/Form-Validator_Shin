const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");

form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const validateForm = checkFormInput([
    username,
    email,
    password,
    confirmPassword,
  ]);
}

function checkFormInput(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    if (input.value.trim() == "") {
      showError(input, `${formFormatter(input)} is empty`);
    }
  });

  return isValid;
}

function showError(input, message) {
  console.log(input);
  console.log(message);
}

function formFormatter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
