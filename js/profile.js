let user;
let allBookingData=[];
const hotelName = document.querySelector(".navbar-brand");
const logout = document.querySelector(".logout");
const bookingForm = document.querySelector(".booking-form");
// console.log(bookingForm);
const allBInput = document.querySelectorAll(".booking-form input");
// console.log(allBInput);
const bookingTextArea = bookingForm.querySelector("textarea");
// console.log(bookingTextArea);

let fetchData = JSON.parse(sessionStorage.getItem("temporaryData"));
hotelName.innerHTML=fetchData.hotelname

if (fetchData) {
  logout.addEventListener("click", () => {
    logout.innerHTML = "please wait...";
    setTimeout(() => {
      logout.innerHTML = "Logout";
      sessionStorage.removeItem("temporaryData");
      window.location = "../index.html";
    }, 2000);
  });
}

// agar session storage mai data nhi hai tab..................
else if (fetchData == null) {
  window.location = "../index.html";
} // by this else statement nobody can enter in the welcome field by typing url, unless one should have to login first, as because we used session storage which only persist in current tab., baki koi or tab mai (null) aygea.....

//  booking code,;.................

bookingForm.onsubmit = (e) => {
  e.preventDefault();
  let data = { notice: bookingTextArea.value };
  console.log(data);

  for (let el of allBInput) {
    let key = el.name;
    data[key] = el.value;
  }
  console.log(data);
};
