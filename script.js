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

  let isPassedChecks = validateForm;

  if (validateForm) {
    const userNameLength = checkInputLength(username, 3, 15);
    const validEmail = checkIsEmailValid(email);
    const passwordLength = checkInputLength(password, 8, 15);
    const passwordMatch = checkPasswordMatch(password, confirmPassword);

    isPassedChecks =
      userNameLength && validEmail && passwordLength && passwordMatch;
  }

  if (isPassedChecks) {
    form.reset();
    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("success", "error");
      group.classList.add("form-group");
    });

    alert("Form Submitted");
  }
}

function checkFormInput(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    if (input.value.trim() == "") {
      showError(input, `${formFormatter(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.classList.remove("success");
  formGroup.classList.add("form-group", "error");

  const small = formGroup.children[2];
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.classList.remove("error");
  formGroup.classList.add("form-group", "success");

  const small = formGroup.children[2];
  small.innerText = "";
}

function checkInputLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${formFormatter(input)} must be more than ${min}`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${formFormatter(input)} must be less than ${max}`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkIsEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email.value.trim())) {
    console.log(emailRegex.test(email));
    showSuccess(email);
    return true;
  } else {
    console.log(emailRegex.test(email));
    showError(email, `${formFormatter(email)} is not valid`);
    return false;
  }
}

function checkPasswordMatch(password1, password2) {
  if (password.value.trim() !== password2.value.trim()) {
    showError(password2, "Password does not match");
    return false;
  }

  return true;
}

function formFormatter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
