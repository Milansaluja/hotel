let user;
let allBookingData = [];
let allInHouseData = [];
const hotelName = document.querySelector(".navbar-brand");
const logout = document.querySelector(".logout");
const bookingForm = document.querySelector(".booking-form");
// console.log(bookingForm);
const allBInput = document.querySelectorAll(".booking-form input");
// console.log("inputs", allBInput);
const bookingTextArea = bookingForm.querySelector("textarea");
// console.log(bookingTextArea);

const inHouseForm = document.querySelector(".inhouse-form");
const allInHouseInput = document.querySelectorAll(".inhouse-form input");
// console.log(allInHouseInput);
const inHouseTextArea = inHouseForm.querySelector("textarea");
// console.log(inHouseTextArea);
const formCloseBtn = document.querySelectorAll(".btn-close");
const bookingList = document.querySelector(".booking-list");
const inHouseList = document.querySelector(".inhouse-list");
const regOpenForEdit = document.querySelector(".btn-register");

// Fetching data from Browser storage Database.................
let fetchData = JSON.parse(sessionStorage.getItem("temporaryData"));
hotelName.innerHTML = fetchData.hotelname; //hotel ka name dynamically nikal lyia jo user nai dala hai usi ko show krne k lyie profile page par
user = fetchData.email.split("@")[0]; // split @ k bad wale ko alg kr dega.......
// console.log(user);

//  getting data from local storage..................
const getData = (key) => {
  if (user !== null) {
    return JSON.parse(localStorage.getItem(key));
  }
};
allBookingData = getData(user + "_allBData") || []; // this code says that database mai is name ki jo bhi entries hai wo muje lakar dedo.atfirst allNookingData will be empty , yai null result dega ...yai khali tab kam karega jab page refresh hoga ya user page par dubara ayega ,beacuse us time allBookingData empy nhi hoga or kuch data hoga to getData() call hoga and data fetxh kreke empty allBookinData mai data dalega jo UI mai reflect karega , thats the point of this codee.......................❤✔
console.log("getData", allBookingData); // yai function khali islyie banaya gaya hai taki jabn bhi page refresh ho ya dubara isppa aye tab data gyab na ho wahi mile local storage sai fetched hokar............
allInHouseData = getData(user + "_allInHData") || [];

// formate date functionality.............
const formatDate = (data, isTime) => {
  const date = new Date(data);
  const yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  const time = date.toLocaleTimeString();
  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;
  return `${dd}-${mm}-${yy} ${isTime ? time : ""}`;
};
formatDate();

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

// Prevent form submission on Enter key press
bookingForm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
}); // remember event listeners always registered on browser when pages loads and stored it

//  booking code,;.................
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(bookingTextArea,allBInput,allBookingData,user + "_allBData");
  bookingForm.reset("");
  formCloseBtn[0].click(); // yai auto button click karke html sai registraion form close kr dega submit hote hi....
  showData(bookingList,allBookingData);
};

// inHouse booking code,;.................
inHouseForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(inHouseTextArea ,allInHouseInput,allInHouseData,user + "_allInHData");
  inHouseForm .reset("");
  formCloseBtn[1].click(); // yai auto button click karke html sai registraion form close kr dega submit hote hi....
  showData(inHouseList,allInHouseData);
};

function registrationFunc(textarea,inputs,array,key) {
  let data = {
    notice: textarea.value,
    createdAt: new Date(), // yai call hoga to us time ka current time lauch hoga .
  };

  for (let el of inputs) {
    let key = el.name;
    data[key] = el.value;
  }
  // console.log("onsubmitObject", data); // data object mai ban chuka hai successfully...
  array.push(data);
  // console.log("submision data",allBookingData); // output [{}] ✔

  localStorage.setItem(key, JSON.stringify(array));
  swal("Good Job !", "Registration success", "success");
}

// show booking data in front Ui....................
const showData = (element,array) => {
  element.innerHTML = "";
  array?.forEach((item, index) => {
    // console.log("showBookingData", item, index);
    element.innerHTML += `<tr>
                  <td class="text-nowrap">${index + 1}</td>
                  <td class="text-nowrap">${item.fullname}</td>
                  <td class="text-nowrap">${item.location}</td>
                  <td class="text-nowrap">${item.roomNo}</td>
                  <td class="text-nowrap">${item.totalPeople}</td>
                  <td class="text-nowrap">${formatDate(item.checkInDate)}</td>
                  <td class="text-nowrap">${formatDate(item.checkOutDate)}</td>
                  <td class="text-nowrap">${item.price}</td>
                  <td class="text-nowrap">${item.mobileNumber}</td>
                  <td>${item.notice}</td>
                  <td class="text-nowrap">${formatDate(
                    item.createdAt,
                    true
                  )}</td>
                <td class="text-nowrap">
                    <button class="btn btn-primary edit-btn p-1 px-2"><i class="fa fa-edit"></i></button>
                    <button class="btn text-white  p-1 px-2 btn-info"><i class="fa fa-check"></i></button>
                    <button class="btn btn-danger del-btn p-1 px-2"><i class="fa fa-trash"></i></button>
                  </td>
                </tr>`;
  });
  deleteCode(); // this will select the all buttons on every load.
  editCode();
};
showData(bookingList,allBookingData); // jese hi data upload ho raha hai local storage par to globally current data jo nbhi hoga array object ki form mai muje wo data showBookingData() k lyie bhi milega usae UI updat hogi... local storage k data sai nhi....

showData(inHouseList,allInHouseData)
// delete code ...............

function deleteCode() {
  let allDeleteBtn = bookingList.querySelectorAll(".del-btn");
  allDeleteBtn.forEach((btn, index) => {
    btn.onclick = () => {
      let userConfirmed = confirm("confirm delete ?");
      if (userConfirmed) {
        allBookingData.splice(index, 1); //used to remove the data, 1 is used to tell how much data u want to get remove from the index clicked.
      }
      localStorage.setItem(user + "_allBData", JSON.stringify(allBookingData));
      showBookingData();
    };
  });
}

function editCode() {
  let allEditBtn = bookingList.querySelectorAll(".edit-btn");
  let showOnEdit = bookingForm.querySelectorAll("button");
  allEditBtn.forEach((btn, index) => {
    btn.onclick = () => {
      regOpenForEdit.click();
      showOnEdit[0].classList.add("d-none");
      showOnEdit[1].classList.remove("d-none");
      let obj = allBookingData[index];
      console.log(obj);

      allBInput[0].value = obj.fullname;
      allBInput[1].value = obj.location;
      allBInput[2].value = obj.roomNo;
      allBInput[3].value = obj.totalPeople;
      allBInput[4].value = obj.checkInDate;
      allBInput[5].value = obj.checkOutDate;
      allBInput[6].value = obj.price;
      allBInput[7].value = obj.mobileNumber;
      bookingTextArea.value = obj.notice;

      showOnEdit[1].onclick = () => {
        let formData = {
          notice: bookingTextArea.value,
          createdAt: new Date(),
        };
        for (let el of allBInput) {
          let key = el.name;
          formData[key] = el.value;
        }
        allBookingData[index] = formData;
        showOnEdit[0].classList.remove("d-none");
        showOnEdit[1].classList.add("d-none");
        bookingForm.reset("");
        bCloseBtn.click();
        localStorage.setItem(
          user + "_allBData",
          JSON.stringify(allBookingData)
        );
        showBookingData();
      };
    };
  });
}
