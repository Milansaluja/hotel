let user;
let allBookingData = [];
const hotelName = document.querySelector(".navbar-brand");
const logout = document.querySelector(".logout");
const bookingForm = document.querySelector(".booking-form");
// console.log(bookingForm);
const allBInput = document.querySelectorAll(".booking-form input");
// console.log(allBInput);
const bookingTextArea = bookingForm.querySelector("textarea");
// console.log(bookingTextArea);
const bCloseBtn = document.querySelector(".b-modal-close-btn");

let fetchData = JSON.parse(sessionStorage.getItem("temporaryData"));
hotelName.innerHTML = fetchData.hotelname; //hotel ka name dynamically nikal lyia jo user nai dala hai usi ko show krne k lyie profile page par
user = fetchData.email.split("@")[0]; // split @ k bad wale ko alg kr dega.......
// console.log(user);

//  getting data from local storage..................
const getData=(key)=>{
  if(localStorage.getItem(key)!=null){
    const data= JSON.parse(localStorage.getItem(key));
    return data;
  }
}

allBookingData= getData(user+"_allBData")// booking wale k andar ho updae kr dyia kyunki data to same hi hai,chao to other variable bana lo.
console.log("getData",allBookingData);

// logout code...............................................
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

  for (let el of allBInput) {
    let key = el.name;
    data[key] = el.value;
  }
  // // console.log(data);
  // if(data.fullname){
  //   swal("Good Job !", "Registration success", "success"); // sweet alert
  // }else{
  //   swal("Sorry", "Enter the full details", "warning"); // sweet alert
  // }

  allBookingData.push(data);
  localStorage.setItem(user + "_allBData", JSON.stringify(allBookingData)); 
  swal("Good Job !", "Registration success", "success"); // sweet alert
  bookingForm.reset("");
  bCloseBtn.click() // yai auto button click karke html sai registraion form close kr dega submit hote hi....
};

// show booking data in front Ui....................
const showBookingData=()=>{

 allBookingData.forEach((item,index)=>{
console.log("fresh",item,index);


 })
   
}
showBookingData()