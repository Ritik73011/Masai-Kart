import { ref, onValue, set, remove, database, update } from "../Firebase/config.js";
import { navBarJavaScript, navBarHtml } from "../main_navbar/navbar.js";
import { footer } from "../footer/footer.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../Masai-Kart/config.js";

document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();

document.getElementById("footer").innerHTML = footer();

document.getElementById("wallet").style.display = "none";
document.querySelector("#quan").style.display = "none";


let amount = 0;
let strAmount = 0;

let isLogin = getAuth();
onAuthStateChanged(isLogin, (user) => {
    if (user) {
        const uid = user.uid;
        const starCountRef = ref(database, "cartItem/" + uid);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            let tempArr = [];
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    let value = data[key];
                    tempArr.push(value);
                }
            }
            if (tempArr.length != 0) {
                document.getElementById("noOfItem").innerText = tempArr.length;
                appendProdInCart(tempArr, uid);

            } else {
                document.querySelector(".cartRight").style.display = "none";
                let img = document.createElement("img");
                img.src = "https://firebasestorage.googleapis.com/v0/b/masai-kart-c9e16.appspot.com/o/empty_cart.gif?alt=media&token=c547173e-c1a4-4e88-80fd-d11ac0ab1a2e";
                img.id = "imgId";
                document.querySelector(".cartProduct").append(img);
            }
        });
        document.getElementById("payBtn").addEventListener("click", () => {
            window.location.href = "../../Masai-Kart/checkoutPage/checkout.html";
        })
    }
    else {
        let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
        if (cartItem.length != 0) {
            document.getElementById("noOfItem").innerText = cartItem.length;
            appendFromLocalStorage(cartItem);

        } else {
            document.querySelector(".cartRight").style.display = "none";
            let img = document.createElement("img");
            img.src = "https://firebasestorage.googleapis.com/v0/b/masai-kart-c9e16.appspot.com/o/empty_cart.gif?alt=media&token=c547173e-c1a4-4e88-80fd-d11ac0ab1a2e";
            img.id = "imgId";
            document.querySelector(".cartProduct").append(img);
        }
        document.getElementById("payBtn").addEventListener("click", () => {
            alert("Please login first");
        })
    }
});

function appendProdInCart(arr, uid) {
    document.querySelector(".cartProduct").innerHTML = "";
    arr.forEach(obj => {

        amount = amount + (obj.price * obj.quan);
        strAmount = strAmount + (obj.strPrice * obj.quan);
        console.log((amount))

        let cartCard = document.createElement("div");
        cartCard.setAttribute("class", "cartProductCard");

        let leftDiv = document.createElement("div");
        leftDiv.setAttribute("class", "leftDiv");
        let img = document.createElement("img");
        img.src = obj.img1;

        let quantityDiv = document.createElement("div");
        quantityDiv.id = "quanDiv";
        let minus = document.createElement("p");
        minus.id = "minus";
        minus.innerText = "−";
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

        minus.addEventListener("click", () => {
            let temp = obj.quan;
            temp--;
            if (temp < 1) {
                alert("Product should be atleast 1 quantity");
            } else {
                updateQuantity(obj, temp, quantity, uid);
                location.reload();
            }
        })

        plus.addEventListener("click", () => {
            let temp = obj.quan;
            temp++;
            if (temp < 6) {
                updateQuantity(obj, temp, quantity, uid);
                location.reload();
            } else {
                alert("product limit exceeded");
            }
        });

        remBtn.addEventListener("click", () => {
            remItems(obj, uid);
        })

        document.getElementById("cartPrice").innerText = "₹" + strAmount;
        document.getElementById("totalDiscount").innerText = "- ₹" + +(strAmount - amount);
        document.getElementById("totalPrice").innerText = "₹" + +(amount);
        document.getElementById("totalSaving").innerText = "₹" + +(strAmount - amount);
    });

}

function remItems(obj, uid) {
    const fetchItem = ref(database, "cartItem/" + uid);
    onValue(fetchItem, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                if (obj.title === value.title) {
                    remove(ref(database, "cartItem/" + uid + "/" + key));
                    location.reload();
                }
            }
        }
    })
}


let localStrPrice = 0;
let localAmount = 0;
function appendFromLocalStorage(arr) {
    document.querySelector(".cartProduct").innerHTML = "";
    arr.map((obj, idx) => {

        localAmount += +(obj.price * obj.quan)
        localStrPrice += +(obj.strPrice * obj.quan)

        let cartCard = document.createElement("div");
        cartCard.setAttribute("class", "cartProductCard");

        let leftDiv = document.createElement("div");
        leftDiv.setAttribute("class", "leftDiv");
        let img = document.createElement("img");
        img.src = obj.img1;

        let quantityDiv = document.createElement("div");
        quantityDiv.id = "quanDiv";
        let minus = document.createElement("p");
        minus.id = "minus";
        minus.innerText = "−";
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

        minus.addEventListener("click", () => {
            alert("Please login first.");
        });
        plus.addEventListener("click", () => {
            alert("Please login first.");
        });

        remBtn.addEventListener("click", () => {
            arr.splice(idx, 1);
            localStorage.setItem("cartItem", JSON.stringify(arr));
            appendFromLocalStorage(arr);
            location.reload();
        })

        document.getElementById("cartPrice").innerText = "₹" + localStrPrice;
        document.getElementById("totalDiscount").innerText = "- ₹" + +(localStrPrice - localAmount);
        document.getElementById("totalPrice").innerText = "₹" + +(localAmount);
        document.getElementById("totalSaving").innerText = "₹" + +(localStrPrice - localAmount);

    })
}

function updateQuantity(obj, temp, quantity, uid) {

    const starCountRef = ref(database, "cartItem/" + uid);
    onValue(starCountRef, (snapshot) => {

        const data = snapshot.val();
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                if (obj.title === value.title) {
                    console.log(key);
                    update(ref(database, "cartItem/" + uid + "/" + key), {
                        quan: temp
                    });
                }
            }
        }

    });
}

function updateData(obj, key, quan, uid) {

    /*let objUpdated = {
        img1: obj.img1,
        title: obj.title,
        size: obj.size,
        seller: obj.seller,
        strPrice: obj.strPrice,
        price: obj.price,
        discount: obj.discount,
        quan: quan
    }*/

    console.log(key);
    update(ref(database, "cartItem/" + uid + "/" + key), {
        quan: quan
    });
}



