import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../config.js";
import { ref, onValue, set, remove, database, update } from "../../config.js";


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        fetchTotalAmount(uid);
        payAmount(uid);
    } else {

    }
});

let givenOtp = Math.floor(Math.random() * 10000);

document.getElementById("proceedBtn").addEventListener("click", () => {

    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let exp = document.getElementById("exp").value
    let cvv = document.getElementById("cvv").value;

    if (number.length != 16) {
        alert("Invalid Card Number!");
    } else if (cvv.length != 3) {
        alert("Invalid CVV");
    }
    else if (name == "") {
        alert("enter name");
    }
    else {
        document.getElementById("main_container").style.display = "block"
        document.getElementById("bankMain").style.display = "none"
        document.getElementById("payFrom").style.display = "none"
        setTime("Your OTP is " + givenOtp * 1, 1000);
    }
})

//otp

function payAmount(uid) {
    document.getElementById("otpBtn").addEventListener("click", () => {

        let myOtp = document.getElementById("otp").value;
        if (myOtp != givenOtp) {
            alert("Wrong OTP!");
        } else {
            // setTime("Payment Successfull",2000);
            alert("Payment Successfull");
            getCartItems(uid);
            document.getElementById("main_container").style.display = "none";
            document.getElementById("paymentSuccess").style.display = "block";

        }
    })
}

function setTime(msg, delay) {
    setTimeout(() => {
        document.getElementById("otpGenerate").innerText = msg;
    }, delay);
}
// location.href="../index.html";

function fetchTotalAmount(uid) {
    let totalPrice = 0;
    const starCountRef = ref(database, "cartItem/" + uid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                totalPrice += +(value.quan * value.price);
            }
        }
        document.getElementById("netP").innerText = totalPrice;
    });

}

function getCartItems(uid) {
    const starCountRef = ref(database, "cartItem/" + uid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                let uniq = (new Date()).getTime();
                set(ref(database, 'orderHistory/' + uid + "/" + givenOtp), {
                    img1: value.img1,
                    title: value.title,
                    size: value.size,
                    seller: value.seller,
                    strPrice: value.strPrice,
                    price: value.price,
                    discount: value.discount,
                    quan: value.quan
                });
                remove(ref(database, "cartItem/" + uid + "/" + key));
            }
        }

    });
}