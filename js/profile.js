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
const bookingList = document.querySelector(".booking-list");

let fetchData = JSON.parse(sessionStorage.getItem("temporaryData"));
hotelName.innerHTML = fetchData.hotelname; //hotel ka name dynamically nikal lyia jo user nai dala hai usi ko show krne k lyie profile page par
user = fetchData.email.split("@")[0]; // split @ k bad wale ko alg kr dega.......
// console.log(user);

//  getting data from local storage..................
const getData = (key) => {
if(user!==null){
  return JSON.parse(localStorage.getItem(key))
}
};

allBookingData = getData(user + "_allBData");
console.log("getData", allBookingData); // yai function khali islyie banaya gaya hai taki jabn bhi page refresh ho ya dubara isppa aye tab data gyab na ho wahi mile local storage sai fetched hokar............

// logout code...............................................
// agar session storage mai data nhi hai tab..................
if (!fetchData) {
  console.log("khali", fetchData);
  window.location = "../index.html";
} // by this else statement nobody can enter in the welcome field by typing url, unless one should have to login first, as because we used session storage which only persist in current tab., baki koi or tab mai (null) aygea.....
else {
  logout.addEventListener("click", () => {
    logout.innerHTML = "please wait...";
    setTimeout(() => {
      logout.innerHTML = "Logout";
      sessionStorage.removeItem("temporaryData");
      window.location = "../index.html";
    }, 2000);
  });
}

//  booking code,;.................
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  let data = { notice: bookingTextArea.value };

  for (let el of allBInput) {
    let key = el.name;
    data[key] = el.value;
  }
  // console.log("onsubmitObject", data); // data object mai ban chuka hai successfully...
  allBookingData.push(data);
  // console.log("submision data",allBookingData); // output [{}] ✔

  localStorage.setItem(user + "_allBData", JSON.stringify(allBookingData));
  swal("Good Job !", "Registration success", "success");
  bookingForm.reset("");
  bCloseBtn.click(); // yai auto button click karke html sai registraion form close kr dega submit hote hi....
  showBookingData();
};

// show booking data in front Ui....................
const showBookingData = () => {
  bookingList.innerHTML = "";
  allBookingData?.forEach((item, index) => {
    console.log("showBookingData", item, index);
    bookingList.innerHTML += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.location}</td>
                  <td>${item.roomNo}</td>
                  <td>${item.fullname}</td>
                  <td>${item.checkInDate}</td>
                  <td>${item.checkOutDate}</td>
                  <td>${item.totalPeople}</td>
                  <td>${item.notice}</td>
                  <td>01-03-25</td>
                <td>
                    <button class="btn btn-primary p-1 px-2"><i class="fa fa-edit"></i></button>
                    <button class="btn text-white  p-1 px-2 btn-info"><i class="fa fa-check"></i></button>
                    <button class="btn btn-danger p-1 px-2"><i class="fa fa-trash"></i></button>
                  </td>
                </tr>`;
  });
};
showBookingData(); // jese hi data upload ho raha hai local storage par to globally current data jo nbhi hoga array object ki form mai muje wo data showBookingData() k lyie bhi milega usae UI updat hogi... local storage k data sai nhi....
