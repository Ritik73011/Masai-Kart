let addObj = {
    name: "Zain",
    mobile: "9872929939",
    city: "Bahraich",
    State: "UP",
    pin: "271801",
    landmark: "clock tower",
    address: "House n. 007, near clock tower"
}
let addObj2 = {
    name: "Zain",
    mobile: "9872929939",
    city: "Bahraich",
    State: "UP",
    pin: "271801",
    landmark: "clock tower",
    address: "House n. 007, near clock tower"
}
let addObj3 = {
    name: "Zain",
    mobile: "9872929939",
    city: "Bahraich",
    State: "UP",
    pin: "271801",
    landmark: "clock tower",
    address: "House n. 007, near clock tower"
}
let addArr = [];
addArr.push(addObj);
addArr.push(addObj2);
addArr.push(addObj3);

function appendAddress() {
    document.querySelector(".cartProduct").innerHTML = "";
    addArr.map((ele, idx) => {
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

    })
}
appendAddress();




//popupbox
document.getElementById("checkPin").addEventListener("click", () => { 
    let div = document.getElementById("popup_box"); div.style.display = "block";
 });

document.getElementById("cancel").addEventListener("click", () => { 
    let div = document.getElementById("popup_box"); div.style.display = "none";
 });