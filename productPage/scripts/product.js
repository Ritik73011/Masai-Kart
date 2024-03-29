import { ref, onValue, set, remove, database, update } from "../../config.js";
import { navBarJavaScript, navBarHtml } from "../../main_navbar/navbar.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../config.js";
import { footer } from "../../footer/footer.js";
import { productNavbarHtml, productNavbarJS } from "../../navbar_product_page/nav.js";
import showAlert from "../../popup_alert/alert.js";
document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();

document.getElementById("pNav").innerHTML = productNavbarHtml();
productNavbarJS();

document.getElementById("footer").innerHTML = footer();

let str = localStorage.getItem("catClick");
let lower = str.toLocaleLowerCase();

let str2 = localStorage.getItem("catClick2");
let lower2 = str2.toLocaleLowerCase();


const starCountRef = ref(database, "Products");
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const filtered = data.filter(ele => {
        return ele.mainCat.toLocaleLowerCase() === lower;
    })

    const megaArr = data.filter(ele => {
        return ele.cat1.toLocaleLowerCase() === lower;
    });

    let searchedArr = [];
    data.map(ele => {
        let lowe = ele.title.toLocaleLowerCase();
        if (lowe.includes(lower)) {
            searchedArr.push(ele);
        }
    });
    //console.log(searchedArr);
    if (filtered.length == 0) {
        appendProduct(searchedArr, searchedArr);
        sortFun(searchedArr);
    }
    else {
        appendProduct(filtered, filtered);
        sortFun(filtered);
    }

    if (filtered.length == 0 && searchedArr.length == 0) {

        if (lower2 != "") {
            let subName = [];
            megaArr.map(ele => {
                let lowe = ele.title.toLocaleLowerCase();
                if (lowe.includes(lower2)) {
                    subName.push(ele);
                }
            });
            localStorage.setItem("catClick2", "");
            appendProduct(subName, subName);
        }
        else {
            appendProduct(megaArr, megaArr);
        }
    }
});


function appendProduct(arr, data) {

    document.getElementById("totalProd").innerText = "Total Products: " + arr.length + " out of " + data.length;
    document.getElementById("mainProd").innerHTML = "";
    arr.map((ele, idx) => {
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "card");

        let imgDiv = document.createElement("div")
        imgDiv.id = "imgDiv";
        let image = document.createElement("img");
        image.src = ele.images.img1;
        imgDiv.append(image);

        let heart = document.createElement("img");
        heart.src = "./styles/heart.svg";
        heart.id = "heart";

        let brRat = document.createElement("div");
        brRat.setAttribute("class", "brRat");
        let h3 = document.createElement("h3");
        h3.id = "br";
        h3.innerText = ele.brand;
        let rating = document.createElement("h3");
        rating.id = "rate";
        rating.innerText = "★" + ele.rating;
        brRat.append(h3, rating);

        let title = document.createElement("h3");
        title.id = "title";
        title.innerText = ele.title;

        let pStdis = document.createElement("div");
        pStdis.setAttribute("class", "pStdis");
        let price = document.createElement("p");
        price.id = "pri";
        price.innerText = "₹" + ele.price;

        let strPrice = document.createElement("p");
        strPrice.id = "strP";

        let dis = document.createElement("p");
        if (ele.discount != "") {
            strPrice.innerText = "₹" + ele.strPrice;

            dis.id = "dis";
            dis.innerText = ele.discount + "% off";
        }
        pStdis.append(price, strPrice, dis, heart);

        imgDiv.addEventListener("click", () => {
            localStorage.setItem("clicked", JSON.stringify(ele));
            window.location.href = "../../descriptionPage/desc.html";
        });
        brRat.addEventListener("click", () => {
            localStorage.setItem("clicked", JSON.stringify(ele));
            window.location.href = "../../descriptionPage/desc.html";
        });
        title.addEventListener("click", () => {
            localStorage.setItem("clicked", JSON.stringify(ele));
            window.location.href = "../../descriptionPage/desc.html";
        });

        heart.addEventListener("click", () => {
            addToWishList(ele, heart);
        });
        mainDiv.append(imgDiv, brRat, title, pStdis);
        document.getElementById("mainProd").append(mainDiv);
        checkWishList(ele, heart);
    })
}


function sortFun(arr) {
    document.querySelector("#sorting").addEventListener("change", function () {
        var category = document.querySelector("#sorting").value;
        if (category != "") {
            if (category === "lth") {
                const lth = arr.sort((a, b) => {
                    return a.price - b.price;
                })
                appendProduct(lth, arr)
            } else if (category === "htl") {
                const htl = arr.sort((a, b) => {
                    return b.price - a.price;
                })
                appendProduct(htl, arr)

            }
        }
        if (category == "sbp") {
            appendProduct(arr, arr);
        }
    })
}

function addToWishList(ele, heart) {
    let auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            let flag = false;
            let uid = user.uid;
            onValue(ref(database, "wishList/" + uid), (snapshot) => {
                let data = snapshot.val();
                let arr = Object.keys(data);

                //console.log(arr);
                arr.map(eles => {
                    onValue(ref(database, "wishList/" + uid + "/" + eles), (snapshot) => {
                        let data1 = snapshot.val();
                        if (data1.title === ele.title) {
                            flag = true;
                        }
                    });
                });
            });

            if (flag === true) {
                showAlert("Already added in wishlist.", "#FF6347", "#fff");
            }
            else {
                let uniq = (new Date()).getTime();
                set(ref(database, "wishList/" + uid + "/" + uniq), {
                    img1: ele.images.img1,
                    title: ele.title,
                    price: ele.price,
                    flag: "true"
                });
                heart.src = "./styles/brokenHeart.svg";
            }
        }
        else {
            showAlert("You need to login first.", "#FF6347", "#fff");
        }
    });
}


function checkWishList(ele, heart) {
    let auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            let uid = user.uid;
            let flag = false;
            onValue(ref(database, "wishList/" + uid), (snapshot) => {
                let data = snapshot.val();
                let arr = Object.keys(data);
                //console.log(arr);
                arr.map(eles => {
                    onValue(ref(database, "wishList/" + uid + "/" + eles), (snapshot) => {
                        let data1 = snapshot.val();
                        if (data1.title === ele.title) {
                            flag = true;
                            heart.src = "./styles/brokenHeart.svg";
                        }
                    });
                });
            });

        }

    });
}
document.getElementById("masailogoimg").addEventListener("click", () => {
    window.location.href = "../index.html"
})

let nxtBtns = [...document.querySelectorAll(".mens")];
nxtBtns.forEach((ele, idx) => {
    nxtBtns[idx].addEventListener("click", () => {
        if (ele.name === "") {
            localStorage.setItem("catClick", ele.id);
            window.location.href = "../../productPage/product.html";
        }
        else {
            localStorage.setItem("catClick", ele.id);
            localStorage.setItem("catClick2", ele.name);
            window.location.href = "../../productPage/product.html";
        }
    })
});
export { appendProduct };

