import { navBarJavaScript, navBarHtml } from "../main_navbar/navbar.js";
import { footer } from "../footer/footer.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../config.js";
import { ref, onValue, set, remove, database, update } from "../config.js";

document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();
document.getElementById("footer").innerHTML = footer();

appendOrders();
appendWishList();


function appendOrders() {
    //document.getElementById("orders").innerHTML = "";
    for (let i = 0; i < 10; i++) {
        let mainD = document.createElement("div");
        mainD.id = "gridDiv";

        let itemDiv = document.createElement("div");
        itemDiv.id = "iDiv";

        let imgD = document.createElement("div");
        let img = document.createElement("img");
        img.src = "https://ca.slack-edge.com/T036SUFAE1H-U03MYABQE15-5dfb0935c950-72";
        imgD.append(img);

        let title = document.createElement("p");
        title.id = "pTitle";
        title.innerText = "Zain Sheikh";

        let price = document.createElement("p");
        price.id = "pPrice";
        price.innerText = "10cr";

        itemDiv.append(imgD, title, price);
        mainD.append(itemDiv);

        document.getElementById("orders").append(mainD);
    }
}

function appendWishList() {
    //document.getElementById("orders").innerHTML = "";
    for (let i = 0; i < 10; i++) {
        let mainD = document.createElement("div");
        mainD.id = "gridDiv";

        let itemDiv = document.createElement("div");
        itemDiv.id = "iDiv";

        let imgD = document.createElement("div");
        let img = document.createElement("img");
        img.src = "https://ca.slack-edge.com/T036SUFAE1H-U03MYABQE15-5dfb0935c950-72";
        imgD.append(img);

        let title = document.createElement("p");
        title.id = "pTitle";
        title.innerText = "Zain";

        let price = document.createElement("p");
        price.id = "pPrice";
        price.innerText = "10cr";

        itemDiv.append(imgD, title, price);
        mainD.append(itemDiv);

        document.getElementById("wishlist").append(mainD);
    }
}

addEvent("orders1", "orders", "userInfo", "wishlist", "grid", "none", "userInfo1", "wishlist1");
addEvent("userInfo1", "userInfo", "orders", "wishlist", "block", "none", "wishlist1", "orders1");
addEvent("wishlist1", "wishlist", "userInfo", "orders", "grid", "none", "orders1", "userInfo1");


function addEvent(id, idm, id2, id3, str1, str2, bg1, bg2) {
    document.getElementById(id).addEventListener("click", () => {
        document.getElementById(idm).style.display = str1;
        document.getElementById(id2).style.display = str2;
        document.getElementById(id3).style.display = str2;


        document.getElementById(id).style.backgroundColor = "lightgrey";
        document.getElementById(bg1).style.backgroundColor = "rgb(245, 244, 244)";
        document.getElementById(bg2).style.backgroundColor = "rgb(245, 244, 244)";
    })
}