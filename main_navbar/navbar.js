import { ref, onValue, set, remove, database, update } from "../config.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../config.js";
import showAlert from "../popup_alert/alert.js";
function navBarHtml() {
  return ` <nav id="nav">
    <div class="navL">
      <div class="layer">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="navLogo">
        <img id="masailogoimg" src="https://firebasestorage.googleapis.com/v0/b/masai-kart-c9e16.appspot.com/o/IMG_20221106_231340.png?alt=media&token=64ad5c75-99cf-46c2-9906-573fb2e080e8" alt="masaikartLogo"> 
      </div>
    </div>
    <div class="nav_search">
      <input
        type="text"
        placeholder="Search"
        autocomplete="off"
        id="searchBox"
      />
      <div id="searchData">
        <ul id="ul"></ul>
      </div>
    </div>

    <div class="nav_p">
    <div id="toCartPage">
    <p id="cartP"><i class="fa-solid fa-cart-shopping"></i><span id="quan">0</span></p>
    </div>
      
      <p id="wallet"><i class="fa-solid fa-wallet"></i></p>
      <p id="login">LOGIN</p>
      <img id="profileIcon" src="../Image/profile.svg"/>
    </div>
  </nav>`
}

function navBarJavaScript() {
  function appendDataInUl(key) {
    document.getElementById("ul").innerHTML = "";
    console.log(key);
    const starCountRef = ref(database, "Products");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      data.forEach(element => {
        let prod_name = element.title;
        let str = prod_name.toLowerCase();
        let search_val = key.toLowerCase();

        if (str.includes(search_val)) {
          let li = document.createElement("li");
          li.innerText = prod_name;

          li.addEventListener("click", () => {
            localStorage.setItem("clicked", JSON.stringify(element));
            window.location.href = "../descriptionPage/desc.html";
          });

          document.getElementById("ul").append(li);
        }
      });
    });

  }


  document.getElementById("searchBox").addEventListener("input", (event) => {

    let key = document.getElementById("searchBox").value;

    if (key === "") {
      document.getElementById("searchData").style.display = "none";
    }
    appendDataInUl(key);
    if (key.length == 0) {
      document.getElementById("searchData").style.display = "none";
    }
    else {
      document.getElementById("searchData").style.display = "block";
    }

  });

  document.getElementById("searchBox").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      let val = document.getElementById("searchBox").value;
      localStorage.setItem("catClick", val);
      window.location.href = "../productPage/product.html";
    }
  });
  document.getElementById("login").addEventListener("click", () => {
    window.location.href = "../login/login.html";
  });

  document.getElementById("toCartPage").addEventListener("click", () => {
    window.location.href = "../cart_page/cart.html";
  });

  document.getElementById("profileIcon").addEventListener("click", () => {
    window.location.href = "../Profile/profile.html";
  });

  document.getElementById("wallet").addEventListener("click", () => {
    showAlert("This feature is comming soon..", "#23d959", "#fff");
  });

  document.getElementById("profileIcon").style.display = "none";
  //check in navbar, if user loggedIn or not
  let aa = getAuth();
  onAuthStateChanged(aa, (user) => {
    if (user) {
      let profile = document.getElementById("login");
      profile.style.display = "none";
      document.getElementById("profileIcon").style.display = "block";
    }
    else {
      let profile = document.getElementById("login");
      profile.style.display = "block";
      document.getElementById("profileIcon").style.display = "none";

    }
  });

}


export { navBarJavaScript, navBarHtml };