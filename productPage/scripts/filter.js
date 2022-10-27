import { ref, onValue, set, remove, database, update } from "../../config.js";
import { appendProduct } from ".././scripts/product.js";

let str = "Fashion";
let arrTemp = [];
const starCountRef = ref(database, "Products");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  const filtered = data.filter(ele => {
    return ele.mainCat === str;
  })
  appendBrand(filtered);
  appendSize(filtered)
  addevent("d1", filtered)
  addevent("d2", filtered)
  addevent("d3", filtered)
});

//APPENDING BRAND START
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
      appendDiv(ele, idx, arr)
    }
    else if (idx >= 5) {
      document.getElementById("see").addEventListener("click", () => {
        appendDiv(ele, idx, arr);

      })
    }
  })
}

function appendDiv(ele, idx, arr) {
  let inpDiv = document.createElement("div");
  inpDiv.setAttribute("class", "inp");

  let input = document.createElement("input");
  input.type = "checkbox"
  input.setAttribute("id", "b" + idx);

  let label = document.createElement("label");
  label.setAttribute("for", "b" + idx);
  label.innerText = ele;

  input.addEventListener("change", () => {
    if (input.checked) {
      console.log(label.innerText)
      // filterByBS(label.innerText);
      filterByBrand(label.innerText, arr)
    } else {
      appendProduct(arr, arr);
    }
  })

  inpDiv.append(input, label);
  document.getElementById("brandDiv").append(inpDiv);
}
//APPENDING BRAND END


// APPENDING SIZE START
function appendSize(arr) {
  document.getElementById("size").innerHTML = "";
  let temp = [];
  arr.forEach(ele => {
    temp.push(ele.size.sz1)
    temp.push(ele.size.sz2)
    temp.push(ele.size.sz3)
  })

  let unique = removeDuplicate(temp);
  // console.log(temp)
  unique.map((ele, idx) => {
    if (ele != "") {
      let inpDiv = document.createElement("div");
      inpDiv.setAttribute("class", "inp");

      let input = document.createElement("input");
      input.type = "checkbox"
      input.setAttribute("id", "s" + idx);

      let label = document.createElement("label");
      label.setAttribute("for", "s" + idx);
      label.innerText = ele;

      input.addEventListener("change", () => {
        if (input.checked) {
          // console.log(label.innerText)
          arrTemp.push(label.innerText)
          filterBySize(arrTemp, arr);

        } else {

          if (arrTemp.length != 0) {
            for (let i = 0; i < arrTemp.length; i++) {
              if (arrTemp[i] == label.innerText) {
                arrTemp.splice(i, 1)
              }
            }
            filterBySize(arrTemp, arr);
            if (arrTemp == 0) {
              appendProduct(arr, arr);
            }

          }
        }
      })
      inpDiv.append(input, label);
      document.getElementById("size").append(inpDiv);
    }
  })
}
//APPENDING SIZE END


//TO REMOVE DUPLICATE ELEMENT
function removeDuplicate(arr) {
  const onlyUnique = (value, index) => {
    return arr.indexOf(value) === index;
  }
  const unique = arr.filter(onlyUnique);
  return unique;
}



let sizeArr = [];

function filterBySize(text, arr) {
  text.forEach(element => {
    const array = arr.filter(ele => {
      return ele.size.sz1 == element || ele.size.sz2 == element || ele.size.sz3 == element;

    })
    console.log(array)
    array.forEach(el => {
      sizeArr.push(el);
    })
  })
  let varSize = removeDuplicate(sizeArr)
  appendProduct(varSize, arr);
  sizeArr = [];

}

function filterByBrand(text, arr) {
  const array = arr.filter(ele => {
    return ele.brand == text || ele.brand == text || ele.brand == text;

  })
  appendProduct(array, arr);
}

function addevent(id, arr) {
  document.getElementById(id).addEventListener("change", () => {
    let d1 = document.getElementById(id);
    if (d1.checked) {
      console.log(d1.value);
      filterByDiscount(arr, d1.value);
    } else {
      appendProduct(arr, arr);
    }
  })
}

function filterByDiscount(arr, text) {
  const disArr = arr.filter(ele => {
    return ele.discount > text;
  })
  appendProduct(disArr, arr)
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