import { ref, onValue, set, remove, database, update } from "../../Masai-Kart/config.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../Masai-Kart/config.js";

function navBarHtml() {
  return ` <nav id="nav">
    <div class="navL">
      <div class="layer">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="navLogo">
        <h1>MasaiKart</h1>
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
    <div id="toCartPage"><span id="quan">0</span>
    <p><i class="fa-solid fa-cart-shopping"></i></p>
    </div>
      
      <p id="wallet">Wallet</p>
      <p id="login">LOGIN</p>
      <img id="profileIcon" src="../../Masai-Kart/Image/profile.svg"/>
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
            alert(prod_name);
          })
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
      window.location.href = "../../Masai-Kart/productPage/product.html";
    }
  });
  document.getElementById("login").addEventListener("click", () => {
    window.location.href = "../login/login.html";
  });

  document.getElementById("toCartPage").addEventListener("click", () => {
    window.location.href = "../../Masai-Kart/cart_page/cart.html";
  })

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