import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../config.js";
import { ref, onValue, set, remove, database, update } from "../../config.js";

document.getElementById("toPay").addEventListener("click", () => {
    window.location.href = "../../paymentPage/paymentDetail.html"
})

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        fetchTotalAmount(uid);
    } else {

    }
});


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

