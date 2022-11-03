import { ref, onValue, set, remove, database, update } from "../../config.js";
import { navBarJavaScript, navBarHtml } from "../../main_navbar/navbar.js";
import { footer } from "../../footer/footer.js";
import { productNavbarHtml, productNavbarJS } from "../../navbar_product_page/nav.js";

document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();

document.getElementById("pNav").innerHTML = productNavbarHtml();
productNavbarJS();

document.getElementById("footer").innerHTML = footer();

let str = localStorage.getItem("catClick");
let lower = str.toLocaleLowerCase();

const starCountRef = ref(database, "Products");
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const filtered = data.filter(ele => {
        return ele.mainCat.toLocaleLowerCase() === lower;
    })

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

        mainDiv.addEventListener("click", () => {

            localStorage.setItem("clicked", JSON.stringify(ele));
            window.location.href = "../../Masai-Kart/descriptionPage/desc.html"

        });
        mainDiv.append(imgDiv, brRat, title, pStdis);
        document.getElementById("mainProd").append(mainDiv);

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


export { appendProduct };

