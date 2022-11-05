import { navBarJavaScript, navBarHtml } from "../main_navbar/navbar.js";
import { footer } from "../footer/footer.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../config.js";
import { ref, onValue, set, remove, database, update } from "../config.js";
import { signOut } from "../config.js";

let auth = getAuth();
onAuthStateChanged(auth, (isLogin) => {
    if (isLogin) {
        let userUid = isLogin.uid;
        onValue(ref(database, "userInfo" + "/" + userUid), (uidObj) => {
            let data = uidObj.val();
            document.getElementById("name").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("phone").value = "11111111";

        })

        document.getElementById("update").addEventListener("click", () => {
            let name1 = document.getElementById("name").value;
            let email1 = document.getElementById("email").value;
            update(ref(database, "userInfo/" + userUid), {
                name: name1,
                email: email1
            })
            document.getElementById("name").setAttribute("readonly", true);
            document.getElementById("email").setAttribute("readonly", true);
        })
        getOrders(userUid);
    }
})

document.getElementById("edit").addEventListener("click", () => {
    document.getElementById("name").removeAttribute("readonly");
    document.getElementById("email").removeAttribute("readonly");

})



document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();
document.getElementById("footer").innerHTML = footer();

// appendWishList();


function appendOrders(ele) {
    //document.getElementById("orders").innerHTML = "";
    console.log(ele.img1)
    let mainD = document.createElement("div");
    mainD.id = "gridDiv";

    let itemDiv = document.createElement("div");
    itemDiv.id = "iDiv";

    let imgD = document.createElement("div");
    let img = document.createElement("img");
    img.src = ele.img1;
    imgD.append(img);

    let title = document.createElement("p");
    title.id = "pTitle";
    title.innerText = ele.title;

    let price = document.createElement("p");
    price.id = "pPrice";
    price.innerText = ele.price;

    itemDiv.append(imgD, title, price);
    mainD.append(itemDiv);

    document.getElementById("orders").append(mainD);

}

function appendWishList(ele) {
    //document.getElementById("orders").innerHTML = "";

    let mainD = document.createElement("div");
    mainD.id = "gridDiv";

    let itemDiv = document.createElement("div");
    itemDiv.id = "iDiv";

    let imgD = document.createElement("div");
    let img = document.createElement("img");
    img.src = ele.img1;
    imgD.append(img);

    let title = document.createElement("p");
    title.id = "pTitle";
    title.innerText = ele.title;

    let price = document.createElement("p");
    price.id = "pPrice";
    price.innerText = ele.price;

    itemDiv.append(imgD, title, price);
    mainD.append(itemDiv);

    document.getElementById("wishlist").append(mainD);

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

function getOrders(uid) {
    const starCountRef = ref(database, "orderHistory/" + uid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        let obj = Object.keys(data);
        fetchOrders(obj, uid)
    })

}

function fetchOrders(arr, uid) {
    arr.map(ele => {
        onValue(ref(database, "orderHistory/" + uid + "/" + ele), (snapshot) => {
            const data = snapshot.val();
            appendOrders(data);
        });
    })
}
function fetchWishlist(arr, uid) {
    arr.map(ele => {
        onValue(ref(database, "wishlist/" + uid + "/" + ele), (snapshot) => {
            const data = snapshot.val();
            appendWishList(data);
        });
    })
}


//LOGOUT


document.getElementById("logout").addEventListener("click", () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        alert("signout successfully");
    }).catch((error) => {
        alert(error);
    });
});