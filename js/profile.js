const hotelName = document.querySelector(".navbar-brand");
const logout = document.querySelector(".logout");

let fetchData = JSON.parse(sessionStorage.getItem("temporaryData"));
// console.log("milan", fetchData);

// agar session storage mai data nhi hai tab..................

if (fetchData) {
  logout.addEventListener("click", () => {
    logout.innerHTML = "please wait...";
    setTimeout(() => {
      logout.innerHTML = "Logout";
      sessionStorage.removeItem("temporaryData");
      window.location = "../index.html";
    }, 2000);
  });
} else if (fetchData == null) {
  window.location = "../index.html";
} // by this else statement nobody can enter in the welcome field by typing url, unless one should have to login first, as because we used session storage which only persist in current tab., baki koi or tab mai (null) aygea.....
