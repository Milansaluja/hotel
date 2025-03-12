let allUserInfo = [];
let regForm = document.querySelector(".reg-form");
// console.log(regForm);
let allInput = regForm.querySelectorAll("input");
// console.log(allInput);
let regBtn = regForm.querySelector("button");

// Login codes........................................................................
let loginForm = document.querySelector(".login-form");
// // console.log(loginForm);
let loginInputs = loginForm.querySelectorAll("input");
// // console.log(loginInputs);
let loginBtn = loginForm.querySelector("button");

if (localStorage.getItem("data") != null) {
  allUserInfo = JSON.parse(localStorage.getItem("data"));
}
console.log(allUserInfo);

// Sign up regestration code....................
regForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = allUserInfo.find((data) => data.email == allInput[4].value); // find()... method give us rather element or undefined.
  if (checkEmail == undefined) {
    let data = {};

    // this loop will extract out the name dynamially, and values constantly from object.....
    for (let el of allInput) {
      // console.log(el);
      let keys = el.name;
      data[keys] = el.value;
    }
    // console.log(data);

    regBtn.innerText = "processing...";
    setTimeout(() => {
      regBtn.innerText = "Register";
      allUserInfo.push(data);
      console.log(allUserInfo);
      localStorage.setItem("data", JSON.stringify(allUserInfo));
      swal("Good Job !", "Registration success", "success"); // sweet alert
    }, 2000);
  } else {
    swal("Sorry", "Email Already Registered ", "warning");
  }
};

//  login form submission code......................................
loginForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = allUserInfo.find((data) => {
    return data.email == loginInputs[0].value; // agar (return) nhi lagana to ()=>{} replace it with... allUserInfo.find(data=>()) ....
  });
  if (checkEmail) {
    console.log("this is checkemail", checkEmail);
    if (checkEmail.password == loginInputs[1].value) {
      loginBtn.innerText = "Please wait...";
      setTimeout(() => {
        loginBtn.innerText = "Login";
        window.location = "profile/profile.html";
      }, 2000);
      sessionStorage.setItem("temporaryData", JSON.stringify(checkEmail));
    } else {
      swal("Sorry", "Password not match ", "warning");
    }
  } else {
    console.log(undefined);
    swal("Sorry", "Email not found ", "warning");
  }
};
