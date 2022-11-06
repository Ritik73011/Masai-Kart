import { ref, onValue, set, remove, database, update } from "../Firebase/config.js";
import { navBarJavaScript, navBarHtml } from "../main_navbar/navbar.js";
import { footer } from "../footer/footer.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../Masai-Kart/config.js";
import showAlert from "../popup_alert/alert.js";

document.getElementById("footer").innerHTML = footer();
document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();

function uniqueCategory() {
    const starCountRef = ref(database, "Category");
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        appendCategory(data);
    });
}

function appendCategory(arr) {
    document.getElementById("category").innerHTML = "";
    arr.forEach(element => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = element.img;

        let title = document.createElement("p");
        title.innerText = element.title;

        div.append(img, title);
        div.addEventListener("click", () => {
            localStorage.setItem("catClick", title.innerText);
            window.location.href = "../../Masai-Kart/productPage/product.html";
        });
        document.getElementById("category").append(div);
    });
}

uniqueCategory();

/*Append Products In Slider*/

function getProducts() {
    const starCountRef = ref(database, "Products");
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        appendProducts("Electronics", data, "productContainer");
        appendProducts("Fashion", data, "fashionContainer");
        appendProducts("Mobiles", data, "mobileContainer");
        appendProductsBigSaving("80", data, "bigSavingContainer");
    });
}

function appendProducts(filterKey, arr, id) {
    document.getElementById(id).innerHTML = "";
    const filtered = arr.filter(ele => {
        return ele.mainCat === filterKey;
    });
    filtered.map((element, indx) => {

        if (indx < 12) {
            let div = document.createElement("div");
            div.setAttribute("class", "card")
            let img = document.createElement("img");
            img.src = element.images.img1;

            let flexDiv = document.createElement("div");
            flexDiv.id = "flexDiv";
            let title = document.createElement("p");
            title.id = "title";
            title.innerText = element.title;

            let price = document.createElement("p");
            price.id = "price";
            price.innerText = "₹ " + element.price;

            let discount = document.createElement("p");
            discount.id = "discount";

            flexDiv.append(price, discount);
            if (element.discount != "") {
                discount.innerText = "Up to " + element.discount + "% off";
            }

            clickedProduct(img, title, flexDiv, element);
            let addToCart = document.createElement("button");
            addToCart.innerText = "ADD TO CART";

            addToCart.addEventListener("click", () => {
                addToCartFun(element, indx);
            });

            div.append(img, title, flexDiv, addToCart);
            document.getElementById(id).append(div);
        }

    });
}
getProducts();

function clickedProduct(img, title, flexDiv, element) {
    img.addEventListener("click", () => {
        localStorage.setItem("clicked", JSON.stringify(element));
        window.location.href = "../../Masai-Kart/descriptionPage/desc.html"
    });
    title.addEventListener("click", () => {
        localStorage.setItem("clicked", JSON.stringify(element));
        window.location.href = "../../Masai-Kart/descriptionPage/desc.html"
    });
    flexDiv.addEventListener("click", () => {
        localStorage.setItem("clicked", JSON.stringify(element));
        window.location.href = "../../Masai-Kart/descriptionPage/desc.html"
    });

}

function appendProductsBigSaving(filterKey, arr, id) {
    document.getElementById(id).innerHTML = "";
    const filtered = arr.filter((ele) => {
        return ele.discount > filterKey;
    });

    const temp = filtered.sort((a, b) => {
        return a.price - b.price;
    });

    temp.map((element, indx) => {

        if (indx < 30) {
            let div = document.createElement("div");
            div.setAttribute("class", "card")
            let img = document.createElement("img");
            img.src = element.images.img1;

            let title = document.createElement("p");
            title.id = "title";
            title.innerText = element.title;

            let flexDiv = document.createElement("div");
            flexDiv.id = "flexDiv";

            let price = document.createElement("p");
            price.id = "price";
            price.innerText = "₹ " + element.price;

            let discount = document.createElement("p");
            discount.id = "discount";
            discount.innerText = "Up to " + element.discount + "% off";

            flexDiv.append(price, discount);
            let addToCart = document.createElement("button");
            addToCart.innerText = "ADD TO CART";
            addToCart.addEventListener("click", () => {
                addToCartFun(element, indx);
            });
            div.append(img, title, flexDiv, addToCart);
            clickedProduct(img, title, flexDiv, element);
            document.getElementById(id).append(div);
        }

    });
}

setCrousal();

function setCrousal() {
    document.querySelector(".carousel-indicators").innerHTML = "";
    document.querySelector(".carousel-inner").innerHTML = "";
    const starCountRef = ref(database, "Carousel");
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        data.forEach((element, indx) => {
            let div = document.createElement("div");
            if (indx == 0) {
                div.setAttribute("class", "carousel-item active");
            }
            else {
                div.setAttribute("class", "carousel-item");
            }

            let img = document.createElement("img");
            img.src = element.img;
            img.style.width = "100%";
            img.setAttribute("class", "d-block");

            div.append(img);
            document.querySelector(".carousel-inner").append(div);

            let btn = document.createElement("button");
            btn.type = "button";
            btn.setAttribute("data-bs-target", "#demo");
            btn.setAttribute("data-bs-slide-to", `${indx}`);

            if (indx == 0) {
                btn.setAttribute("class", "active");
            }

            document.querySelector(".carousel-indicators").append(btn);
        });
    });
}

//Auth
let arrCart = JSON.parse(localStorage.getItem("cartItem")) || [];

function addToCartFun(element, idx) {
    let tt = element.title;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            let uid = user.uid;
            let flag = false;
            const starCountRe = ref(database, "cartItem/" + uid);
            onValue(starCountRe, (snapshot) => {
                const data = snapshot.val();
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let value = data[key];
                        if (tt == value.title) {
                            flag = true;
                        }
                    }
                }
            });

            if (flag === true) {
                //alert("already added");
                showAlert("Already added in you cart", "red", "white")
            }
            else {
                let uniq = (new Date()).getTime();
                set(ref(database, 'cartItem/' + uid + "/" + uniq), {
                    img1: element.images.img1,
                    title: element.title,
                    size: element.size.sz1,
                    seller: element.seller,
                    strPrice: element.strPrice,
                    price: element.price,
                    discount: element.discount,
                    quan: 1
                });
                showAlert("Added in cart...", "green", "white");
            }

            const starCountRef = ref(database, "cartItem/" + uid);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                let count = 0;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        //let value = data[key];
                        count++;
                    }
                }
                document.getElementById("quan").innerText = count;
            });

            // ...
        } else {

            let flag = false;

            arrCart.forEach(ele => {
                if (tt == ele.title) {
                    flag = true;
                }
            });

            if (flag === true) {
                //alert("avilable");
                showAlert("Already added in you cart", "red", "white")
            }
            else {
                let obj = {
                    img1: element.images.img1,
                    title: element.title,
                    size: element.size.sz1,
                    seller: element.seller,
                    strPrice: element.strPrice,
                    price: element.price,
                    discount: element.discount,
                    quan: 1
                }

                arrCart.push(obj);

                localStorage.setItem("cartItem", JSON.stringify(arrCart));
                let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
                document.getElementById("quan").innerText = cartItem.length;
                showAlert("Added in cart...", "green", "white");
            }
        }
    });
}


function getIteamCountOnHome() {
    let aa = getAuth();
    onAuthStateChanged(aa, (user) => {
        if (user) {
            const uid = user.uid;
            const starCountRef = ref(database, "cartItem/" + uid);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                let count = 0;

                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        let value = data[key];
                        count++;
                    }
                }
                document.getElementById("quan").innerText = count;
            });
        }
        else {
            let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
            document.getElementById("quan").innerText = cartItem.length;
        }
    });
}

getIteamCountOnHome();