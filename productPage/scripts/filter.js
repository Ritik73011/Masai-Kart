import { ref, onValue, set, remove, database, update } from "../../config.js";

let str = "Fashion";

const starCountRef = ref(database, "Products");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  appendBrand(data);
  appendSize(data)
});


function appendBrand(arr) {
  document.getElementById("brandDiv").innerHTML = "";
  let temp = [];
  arr.forEach(ele => {
    if (ele.mainCat === str) {
      temp.push(ele.brand)
    }
  })

  let unique = removeDuplicate(temp);
  unique.map((ele, idx) => {
    if (idx < 5) {
      appendDiv(ele, idx);
    }
    else if (idx >= 5) {
      document.getElementById("see").addEventListener("click", () => {
        appendDiv(ele, idx)
      })
    }
  })
}

function appendSize(arr) {
  document.getElementById("size").innerHTML = "";
  let temp = [];
  arr.forEach(ele => {
    if (ele.mainCat === str) {
      temp.push(ele.size.sz1)
      temp.push(ele.size.sz2)
      temp.push(ele.size.sz3)
    }
  })

  let unique = removeDuplicate(temp);
  // console.log(temp)
  unique.map((ele, idx) => {
    let inpDiv = document.createElement("div");
    inpDiv.setAttribute("class", "inp");

    let input = document.createElement("input");
    input.type = "checkbox"
    input.setAttribute("id", "s" + idx);

    let label = document.createElement("label");
    label.setAttribute("for", "s" + idx);
    label.innerText = ele;

    inpDiv.append(input, label);
    document.getElementById("size").append(inpDiv);
  })
}


function appendDiv(ele, idx) {
  let inpDiv = document.createElement("div");
  inpDiv.setAttribute("class", "inp");

  let input = document.createElement("input");
  input.type = "checkbox"
  input.setAttribute("id", "b" + idx);

  let label = document.createElement("label");
  label.setAttribute("for", "b" + idx);
  label.innerText = ele;

  inpDiv.append(input, label);
  document.getElementById("brandDiv").append(inpDiv);
}


function removeDuplicate(arr) {
  const onlyUnique = (value, index) => {
    return arr.indexOf(value) === index;
  }
  const unique = arr.filter(onlyUnique);
  return unique;
}







let executePriceRange = false;
const rangeInput = document.querySelectorAll(".range-input input");
const progress = document.querySelector(".progress");
let mininput = document.getElementById("min-input-val");
let maxinput = document.getElementById("max-input-val");
let minVal = 0;
let maxVal = 3999;
function priceRangeTracker() {
  rangeInput.forEach((input) => {
    executePriceRange = true;
    input.addEventListener("input", () => {
      minVal = parseInt(rangeInput[0].value);
      maxVal = parseInt(rangeInput[1].value);
      let percent = (minVal / rangeInput[0].max) * 100;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      maxinput.innerText = maxVal;
      mininput.innerText = minVal;
      setTimeout(function () {
        // getData();
      }, 1000);
    });
  });
}
priceRangeTracker();