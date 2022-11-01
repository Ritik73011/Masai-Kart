import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "../../config.js";
import { ref, onValue, set, remove, database, update } from "../../config.js";


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        addSubmit(uid);
        appendAddress(uid);
    } else {

    }
});

function appendAddress(uid) {
    const starCountRef = ref(database, "userAddress/" + uid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                createDiv(value);
            }
        }
    });
}

function createDiv(ele) {
    let mainDiv = document.createElement("div");
    mainDiv.id = "mainAddDiv";

    let radioDiv = document.createElement("div");
    radioDiv.setAttribute("class", "radioDiv");

    let radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "radioName";
    radioBtn.id = "radioId";

    radioDiv.append(radioBtn);

    let addDiv = document.createElement("div");
    addDiv.id = "addDiv";

    let pName = document.createElement("p");
    pName.id = "personName";
    pName.innerText = ele.name;

    let pAdd = document.createElement("p");
    pAdd.id = "personAdd";
    pAdd.innerText = ele.address + " (" + ele.landmark + ") " + ele.city + ele.State + " - " + ele.pin;

    let pMob = document.createElement("p");
    pMob.id = "personMobile";
    pMob.innerText = ele.mobile;

    addDiv.append(pName, pAdd, pMob);

    mainDiv.append(radioDiv, addDiv);

    document.querySelector(".cartProduct").append(mainDiv);

}





//popupbox
document.getElementById("checkPin").addEventListener("click", () => {
    let div = document.getElementById("popup_box"); div.style.display = "block";
});

document.getElementById("cancel").addEventListener("click", () => {
    let div = document.getElementById("popup_box"); div.style.display = "none";
});

function addSubmit(uid) {
    document.getElementById("add").addEventListener("click", () => {
        event.preventDefault();
        let form = document.querySelector("form");

        let name = form.firstName.value;
        let number = form.phone.value;
        let address = form.address.value;
        let city = form.city.value;
        let state = form.state.value;
        let pincode = form.pincode.value;
        let landmark = form.landmark.value;

        let uniq = (new Date()).getTime();
        set(ref(database, 'userAddress/' + uid + "/" + uniq), {
            name: name,
            mobile: number,
            city: city,
            State: state,
            pin: pincode,
            landmark: landmark,
            address: address
        });

        let div = document.getElementById("popup_box"); div.style.display = "none";
        location.reload();
    });
}