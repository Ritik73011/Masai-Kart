import { navBarJavaScript, navBarHtml } from "../../main_navbar/navbar.js";
import { footer } from "../../footer/footer.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../config.js";
document.getElementById("navbar").innerHTML = navBarHtml();
navBarJavaScript();
document.getElementById("footer").innerHTML = footer();


let local = JSON.parse(localStorage.getItem("clicked"));

document.getElementById("smallImg1").src = local.images.img1;
document.getElementById("smallImg2").src = local.images.img2;
document.getElementById("smallImg3").src = local.images.img3;

document.getElementById("bigImg").src = local.images.img1;

document.getElementById("cimg1").src = local.images.img1;
document.getElementById("cimg2").src = local.images.img2;
document.getElementById("cimg3").src = local.images.img3;

document.getElementById("cat1").innerText = local.cat1;
document.getElementById("cat2").innerText = local.cat2;

document.getElementById("title").innerText = local.title;

document.getElementById("brand").innerText = local.brand;
document.getElementById("rating").innerText = local.rating + "★";
document.getElementById("price").innerText = "₹" + local.price;
document.getElementById("strPrice").innerText = "₹" + local.strPrice;
document.getElementById("disPrice").innerText = local.discount + "% off";

if (local.color.clr1 === "") {
    document.getElementById("cl1").style.display = "none";
}
else {
    let clr1 = document.getElementById("cc1");
    clr1.innerText = local.color.clr1;
}

if (local.color.clr2 === "") {
    document.getElementById("cl2").style.display = "none";
}
else {
    let clr2 = document.getElementById("cc2");
    clr2.innerText = local.color.clr2;
}

if (local.color.clr3 === "") {
    document.getElementById("cl3").style.display = "none";
}
else {
    let clr3 = document.getElementById("cc3");
    clr3.innerText = local.color.clr3;
}

if (local.size.sz1 === "") {
    document.getElementById("sz1").style.display = "none";
}
else {
    let clr1 = document.getElementById("ss1");
    clr1.innerText = local.size.sz1;
}

if (local.size.sz2 === "") {
    document.getElementById("sz2").style.display = "none";
}
else {
    let clr2 = document.getElementById("ss2");
    clr2.innerText = local.size.sz2;
}

if (local.size.sz3 === "") {
    document.getElementById("sz3").style.display = "none";
}
else {
    let clr3 = document.getElementById("ss3");
    clr3.innerText = local.size.sz3;
}

document.getElementById("seller").innerText = local.seller;

document.getElementById("descri").innerText = local.desc;


function changeImg(id, listener) {
    document.getElementById(id).addEventListener(listener, () => {
        let src = document.getElementById(id).src;
        document.getElementById("bigImg").src = src;
    })
}
changeImg("smallImg1", "mouseover")
changeImg("smallImg2", "mouseover")
changeImg("smallImg3", "mouseover")
changeImg("smallImg1", "click")
changeImg("smallImg2", "click")
changeImg("smallImg3", "click")




const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        //const user = auth.currentUser;
        console.log(user.email);
        // ...
    } else {
        // User is signed out
        // ...
        console.log("object");
    }
});