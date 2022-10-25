import { ref, onValue, set, remove, database, update } from "../Firebase/config.js";
import { navBarJavaScript, navBarHtml } from "../main_navbar/navbar.js";
import { footer } from "../footer/footer.js";

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

            let title = document.createElement("p");
            title.id = "title";
            title.innerText = element.title;

            let price = document.createElement("p");
            price.id = "price";
            price.innerText = "@ " + element.price;

            let discount = document.createElement("p");
            discount.id = "discount";

            if (element.discount != "") {
                discount.innerText = "Up to " + element.discount + "% off";
            }
            div.append(img, title, price, discount);
            document.getElementById(id).append(div);
        }

    });
}
getProducts();


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

            let price = document.createElement("p");
            price.id = "price";
            price.innerText = "@ " + element.price;

            let discount = document.createElement("p");
            discount.id = "discount";
            discount.innerText = "Up to " + element.discount + "% off";

            div.append(img, title, price, discount);
            document.getElementById(id).append(div);
        }

    });
}