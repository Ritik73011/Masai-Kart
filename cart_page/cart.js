import { ref, onValue, set, remove, database, update } from "../Firebase/config.js";
import { navBarJavaScript, navBarHtml } from "../main_navbar/navbar.js";
import { footer } from "../footer/footer.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../Masai-Kart/config.js";

document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();

document.getElementById("footer").innerHTML = footer();

document.getElementById("wallet").style.display = "none";
document.querySelector("#quan").style.display = "none";




let isLogin = getAuth();
onAuthStateChanged(isLogin, (user) => {
    if (user) {
        const uid = user.uid;
        const starCountRef = ref(database, "cartItem/" + uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();

            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    let value = data[key];
                    appendProdInCart(value);
                }
            }
        });
    }
    else {
        let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
        appendFromLocalStorage(cartItem);    
    }
});

function appendProdInCart(obj) {
    let cartCard = document.createElement("div");
    cartCard.setAttribute("class", "cartProductCard");

    let leftDiv = document.createElement("div");
    leftDiv.setAttribute("class", "leftDiv");
    let img = document.createElement("img");
    img.src = obj.img1;

    let quantityDiv = document.createElement("div");
    let minus = document.createElement("p");
    minus.id = "minus";
    minus.innerText = "-";
    let quantity = document.createElement("p");
    quantity.id = "qauntity";
    quantity.innerText = obj.quan;
    let plus = document.createElement("p");
    plus.id = "plus";
    plus.innerText = "+";

    quantityDiv.append(minus, quantity, plus);
    leftDiv.append(img, quantityDiv);


    let rightDiv = document.createElement("div");
    rightDiv.setAttribute("class", "rightDiv");

    let titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "titleDD");
    let title = document.createElement("h3");
    title.innerText = obj.title;
    title.id = "title";
    let delivery = document.createElement("p");
    delivery.id = "deliveryDate"
    delivery.innerText = "Delivery by Tue Nov 1 | Free ₹40";

    titleDiv.append(title, delivery);

    let size = document.createElement("p");
    size.id = "size"
    size.innerText = "Size: " + obj.size;
    let seller = document.createElement("p");
    seller.id = "seller";
    seller.innerText = obj.seller;

    let priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "priceDD");

    let sPrice = document.createElement("p");
    sPrice.id = "sPrice";
    sPrice.innerText = "₹" + obj.strPrice;
    let price = document.createElement("p");
    price.id = "price";
    price.innerText = "₹" + obj.price;
    let discount = document.createElement("p");
    discount.id = "discount";
    discount.innerText = obj.discount + "% off";

    priceDiv.append(sPrice, price, discount);

    let remBtn = document.createElement("button");
    remBtn.id = "remove";
    remBtn.innerText = "REMOVE";

    rightDiv.append(titleDiv, size, seller, priceDiv, remBtn);

    cartCard.append(leftDiv, rightDiv);
    document.querySelector(".cartProduct").append(cartCard);




}
function appendFromLocalStorage(arr) {
    document.querySelector(".cartProduct").innerHTML = "";
    arr.map(obj => {


        let cartCard = document.createElement("div");
        cartCard.setAttribute("class", "cartProductCard");

        let leftDiv = document.createElement("div");
        leftDiv.setAttribute("class", "leftDiv");
        let img = document.createElement("img");
        img.src = obj.img1;

        let quantityDiv = document.createElement("div");
        let minus = document.createElement("p");
        minus.id = "minus";
        minus.innerText = "-";
        let quantity = document.createElement("p");
        quantity.id = "qauntity";
        quantity.innerText = obj.quan;
        let plus = document.createElement("p");
        plus.id = "plus";
        plus.innerText = "+";

        quantityDiv.append(minus, quantity, plus);
        leftDiv.append(img, quantityDiv);


        let rightDiv = document.createElement("div");
        rightDiv.setAttribute("class", "rightDiv");

        let titleDiv = document.createElement("div");
        titleDiv.setAttribute("class", "titleDD");
        let title = document.createElement("h3");
        title.innerText = obj.title;
        title.id = "title";
        let delivery = document.createElement("p");
        delivery.id = "deliveryDate"
        delivery.innerText = "Delivery by Tue Nov 1 | Free ₹40";

        titleDiv.append(title, delivery);

        let size = document.createElement("p");
        size.id = "size"
        size.innerText = "Size: " + obj.size;
        let seller = document.createElement("p");
        seller.id = "seller";
        seller.innerText = obj.seller;

        let priceDiv = document.createElement("div");
        priceDiv.setAttribute("class", "priceDD");

        let sPrice = document.createElement("p");
        sPrice.id = "sPrice";
        sPrice.innerText = "₹" + obj.strPrice;
        let price = document.createElement("p");
        price.id = "price";
        price.innerText = "₹" + obj.price;
        let discount = document.createElement("p");
        discount.id = "discount";
        discount.innerText = obj.discount + "% off";

        priceDiv.append(sPrice, price, discount);

        let remBtn = document.createElement("button");
        remBtn.id = "remove";
        remBtn.innerText = "REMOVE";

        rightDiv.append(titleDiv, size, seller, priceDiv, remBtn);

        cartCard.append(leftDiv, rightDiv);
        document.querySelector(".cartProduct").append(cartCard);



    })
}



