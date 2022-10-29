import { ref, onValue, set, remove, database, update } from "../../config.js";
import { appendProduct } from ".././scripts/product.js";

let str = localStorage.getItem("catClick");
let lower = str.toLocaleLowerCase();

let arrTemp = [];
let brandArr = [];
const starCountRef = ref(database, "Products");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  const filtered = data.filter(ele => {
    return ele.mainCat.toLocaleLowerCase() === lower;
  })

  let searchedArr = [];
  data.map(ele => {
    let lowe = ele.title.toLocaleLowerCase();
    if (lowe.includes(lower)) {
      searchedArr.push(ele);
    }
  });
  if (filtered.length == 0) {
    appendBrand(searchedArr);
    //console.log(searchedArr)
    appendSize(searchedArr)
    addevent("d1", searchedArr)
    addevent("d2", searchedArr)
    addevent("d3", searchedArr)
    addeventRating("r1", searchedArr, 3)
    addeventRating("r2", searchedArr, 4.1)
    addeventcolor("cl1", searchedArr, "Red")
    addeventcolor("cl2", searchedArr, "Black")
    addeventcolor("cl3", searchedArr, "Green")
    addeventcolor("cl4", searchedArr, "Blue")
    priceRangeTracker(searchedArr);
    findMax(searchedArr);
  }
  else {
    appendBrand(filtered);
    appendSize(filtered)
    addevent("d1", filtered)
    addevent("d2", filtered)
    addevent("d3", filtered)
    addeventRating("r1", filtered, 3)
    addeventRating("r2", filtered, 4.1)
    addeventcolor("cl1", filtered, "Red")
    addeventcolor("cl2", filtered, "Black")
    addeventcolor("cl3", filtered, "Green")
    addeventcolor("cl4", filtered, "Blue")
    priceRangeTracker(filtered);
    findMax(filtered);
  }

});

//APPENDING BRAND START
function appendBrand(arr) {
  document.getElementById("brandDiv").innerHTML = "";
  let temp = [];
  arr.forEach(ele => {
    if (ele.mainCat.toLocaleLowerCase() === lower) {
      temp.push(ele.brand)
    }
  })
  if (temp.length == 0) {
    arr.forEach(ele => {
      let lo = ele.title.toLocaleLowerCase();
      if (lo.includes(lower)) {
        temp.push(ele.brand)
      }
    })
  }
  let unique = removeDuplicate(temp);
  unique.map((ele, idx) => {
    if (idx < 5) {
      appendDiv(ele, idx, arr)
    }
    else if (idx >= 5) {
      document.getElementById("see").addEventListener("click", () => {
        //appendDiv(ele, idx, arr);
        let seemore = document.getElementById("see").innerText;
        if (seemore != "") {
          appendDiv(ele, idx, arr);
        }

        if (idx == unique.length - 1) {
          document.getElementById("see").innerText = "";
        }
      })
    }

  })

}

//APPENDING DIV FOR BRAND
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
      brandArr.push(label.innerText)
      filterByBrand(brandArr, arr)
    } else {
      if (brandArr.length != 0) {
        for (let i = 0; i < brandArr.length; i++) {
          if (brandArr[i] == label.innerText) {
            brandArr.splice(i, 1)
          }
        }
        filterByBrand(brandArr, arr);
        if (brandArr == 0) {
          appendProduct(arr, arr);
        }

      }
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


//FILTER BY SIZE
let sizeArr = [];

function filterBySize(text, arr) {
  text.forEach(element => {
    const array = arr.filter(ele => {
      return ele.size.sz1 == element || ele.size.sz2 == element || ele.size.sz3 == element;

    })
    // console.log(array)
    array.forEach(el => {
      sizeArr.push(el);
    })
  })
  let varSize = removeDuplicate(sizeArr)
  appendProduct(varSize, arr);
  sizeArr = [];

}

//FILTER BY BRAND
let tempBrand = [];
function filterByBrand(text, arr) {
  text.forEach(element => {
    const array = arr.filter(ele => {
      return ele.brand == element || ele.brand == element || ele.brand == element;

    })
    // console.log(array)
    array.forEach(el => {
      tempBrand.push(el);
    })
  })
  let varSize = removeDuplicate(tempBrand)
  appendProduct(varSize, arr);
  tempBrand = [];
}

//FILTER BY DISCOUNT
function addevent(id, arr) {
  document.getElementById(id).addEventListener("change", () => {
    let d1 = document.getElementById(id);
    if (d1.checked) {
      // console.log(d1.value);
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


//FILTER BY RATING
function addeventRating(id, arr, text) {
  document.getElementById(id).addEventListener("change", () => {
    let d1 = document.getElementById(id);
    if (d1.checked) {
      const disArr = arr.filter(ele => {
        return ele.rating > text;
      })
      appendProduct(disArr, arr)
    } else {
      appendProduct(arr, arr);
    }
  })
}

//FILTER BY COLOR
function addeventcolor(id, arr, text) {
  document.getElementById(id).addEventListener("change", () => {
    let d1 = document.getElementById(id);
    if (d1.checked) {
      const disArr = arr.filter(ele => {
        return ele.color.clr1 == text || ele.color.clr2 == text || ele.color.clr3 == text;
      })
      appendProduct(disArr, arr)
    } else {
      appendProduct(arr, arr);
    }
  })
}

//FILTER






let executePriceRange = false;
const rangeInput = document.querySelectorAll(".range-input input");
const progress = document.querySelector(".progress");
let mininput = document.getElementById("min-input-val");
let maxinput = document.getElementById("max-input-val");
let minVal = 0;
let maxVal = 3999;
function priceRangeTracker(arr) {
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
        sortByRange(arr);
      }, 1000);
    });
  });
}


function sortByRange(arr) {
  let minP = document.getElementById("min-input-val").innerText;
  let maxP = document.getElementById("max-input-val").innerText;
  // console.log(minP,maxP)
  const rangeSorted = arr.filter(ele => {
    return ele.price >= minP && ele.price <= maxP;
  })
  appendProduct(rangeSorted, arr);
}

function findMax(arr) {
  let max = 0;
  arr.forEach(ele => {
    max = Math.max(ele.price, max);
  })
  document.getElementById("max-input-val").innerText = max;
  let min = document.getElementById("min");
  min.setAttribute("max", max);

  let man = document.getElementById("max");
  man.setAttribute("max", max);
  man.setAttribute("value", max);

}
