import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../config.js";
import { ref, onValue, set, remove, database, update } from "../../config.js";
import showAlert from "../../popup_alert/alert.js";

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
        showAlert("Invalid card no.", "#FF6347", "#fff");
    } else if (cvv.length != 3) {
        showAlert("Invalid cvv", "#FF6347", "#fff");
    }
    else if (name == "") {
        showAlert("Enter your name", "#FF6347", "#fff");
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
            showAlert("Wrong OTP", "#FF6347", "#fff");
        } else {
            // setTime("Payment Successfull",2000);
            showAlert("Payment Successfull", "#23d959", "#fff");
            getCartItems(uid);
            document.getElementById("main_container").style.display = "none";
            document.getElementById("paymentSuccess").style.display = "block";
            window.location.href = "../../index.html";
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

        let sss = Object.keys(data);
        sss.forEach(ele => {
            remItems(ele, uid);
        });

    });
}

function remItems(ele, uid) {
    const fetchItem = ref(database, "cartItem/" + uid + "/" + ele);
    onValue(fetchItem, (snapshot) => {
        const data = snapshot.val();

        let uniq = (new Date()).getTime();
        set(ref(database, 'orderHistory/' + uid + "/" + uniq), {
            img1: data.img1,
            title: data.title,
            size: data.size,
            seller: data.seller,
            strPrice: data.strPrice,
            price: data.price,
            discount: data.discount,
            quan: data.quan
        });
        remove(ref(database, "cartItem/" + uid + "/" + ele));
    })
}