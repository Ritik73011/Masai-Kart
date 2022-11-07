import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../config.js";
import { ref, onValue, set, remove, database, update } from "../../config.js";
import { navBarJavaScript, navBarHtml } from "../../main_navbar/navbar.js";
import { footer } from "../../footer/footer.js";
import showAlert from "../../popup_alert/alert.js";

document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();

document.getElementById("footer").innerHTML = footer();

document.getElementById("wallet").style.display = "none";
document.querySelector("#quan").style.display = "none";

let strPrice = 0;
let prices = 0;


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        addSubmit(uid);
        appendAddress(uid);
        fetchOrderSummary(uid)
    } else {

    }
});

function appendAddress(uid) {
    const starCountRef = ref(database, "userAddress/" + uid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                createDiv(value);
            }
        }
    });
}

function createDiv(ele) {
    let mainDiv = document.createElement("div");
    mainDiv.id = "mainAddDiv";

    let radioDiv = document.createElement("div");
    radioDiv.setAttribute("class", "radioDiv");

    let radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "radioName";
    radioBtn.id = "radioId";

    radioDiv.append(radioBtn);

    let addDiv = document.createElement("div");
    addDiv.id = "addDiv";

    let pName = document.createElement("p");
    pName.id = "personName";
    pName.innerText = ele.name;

    let pAdd = document.createElement("p");
    pAdd.id = "personAdd";
    pAdd.innerText = ele.address + " (" + ele.landmark + ") " + ele.city + ele.State + " - " + ele.pin;

    let pMob = document.createElement("p");
    pMob.id = "personMobile";
    pMob.innerText = ele.mobile;

    addDiv.append(pName, pAdd, pMob);

    mainDiv.append(radioDiv, addDiv);

    document.querySelector(".cartProduct").append(mainDiv);

    radioBtn.addEventListener("click", () => {
        document.getElementById("payBtn").style.display = "block";
    });
}





//popupbox
document.getElementById("checkPin").addEventListener("click", () => {
    let div = document.getElementById("popup_box"); div.style.display = "block";
});

document.getElementById("payBtn").addEventListener("click", () => {
    window.location.href = "../../paymentPage/payment.html";
});

document.getElementById("cancel").addEventListener("click", () => {
    let div = document.getElementById("popup_box"); div.style.display = "none";
});

function addSubmit(uid) {
    document.querySelector("form").addEventListener("submit", () => {
        event.preventDefault();
        let form = document.querySelector("form");

        let name = form.firstName.value;
        let number = form.phone.value;
        let address = form.address.value;
        let city = form.city.value;
        let state = form.state.value;
        let pincode = form.pincode.value;
        let landmark = form.landmark.value;

        let uniq = (new Date()).getTime();
        set(ref(database, 'userAddress/' + uid + "/" + uniq), {
            name: name,
            mobile: number,
            city: city,
            State: state,
            pin: pincode,
            landmark: landmark,
            address: address
        });
        showAlert("Added Successfull.", "#23d959", "#fff");
        let div = document.getElementById("popup_box"); div.style.display = "none";
        location.reload();
    });
}


function fetchOrderSummary(uid) {

    const starCountRef = ref(database, "cartItem/" + uid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                appendOrderSummary(value)
            }
        }
    });
}

let count = 0;
function appendOrderSummary(ele) {
    count++;
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "cartProductCard");

    let leftDiv = document.createElement("div");
    leftDiv.setAttribute("class", "leftDiv");
    let img = document.createElement("img");
    img.src = ele.img1;
    leftDiv.append(img);


    let rightDiv = document.createElement("div");
    rightDiv.setAttribute("class", "rightDiv");

    let titleDD = document.createElement("div");
    titleDD.setAttribute("class", "titleDD");

    let titleH3 = document.createElement("h3");
    titleH3.id = "title";
    titleH3.innerText = ele.title;

    let deliveryP = document.createElement("p");
    deliveryP.id = "deliveryDate"
    deliveryP.innerText = "Delivery by Tue Nov 1 | Free₹40";

    titleDD.append(titleH3, deliveryP);

    let size = document.createElement("p");
    size.id = "size";
    size.innerText = ele.size;

    let seller = document.createElement("p");
    seller.id = "seller";
    seller.innerText = ele.seller;

    let quan = document.createElement("p");
    quan.id = "itemQuan";
    quan.innerText = "QTY:" + ele.quan;

    let priceDD = document.createElement("div");
    priceDD.setAttribute("class", "priceDD");

    let sPrice = document.createElement("p");
    sPrice.id = "sPrice";
    sPrice.innerText = "₹" + ele.strPrice;

    let price = document.createElement("p");
    price.id = "price";
    price.innerText = "₹" + ele.price;

    let discount = document.createElement("p");
    discount.id = "discount";
    discount.innerText = ele.discount + "% off";

    priceDD.append(sPrice, price, discount);

    rightDiv.append(titleDD, size, seller, quan, priceDD);

    mainDiv.append(leftDiv, rightDiv);

    document.querySelector(".cartProductSum").append(mainDiv);
    strPrice += +(ele.quan * ele.strPrice);
    prices = prices + +(ele.quan * ele.price);

    document.getElementById("itemCount").innerText = count;
    document.getElementById("cartPrice").innerText = "₹" + strPrice;
    document.getElementById("totalDiscount").innerText = "- ₹" + +(strPrice - prices);
    document.getElementById("totalPrice").innerText = "₹" + prices;
    document.getElementById("totalSaving").innerText = "₹" + +(strPrice - prices);

}

document.getElementById("masailogoimg").addEventListener("click", () => {
    window.location.href = "../index.html"
})