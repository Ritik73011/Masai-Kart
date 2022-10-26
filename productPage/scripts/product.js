import { ref, onValue, set, remove, database, update } from "../../config.js";

let str = "Mobiles";

const starCountRef = ref(database, "Products");
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
  appendProduct(data);
});


function appendProduct(arr){
    const filtered=arr.filter(ele=>{
        return ele.mainCat===str;
    })
    document.getElementById("totalProd").innerText="Total Products: "+filtered.length +" out of "+arr.length;
    document.getElementById("mainProd").innerHTML="";
    filtered.map((ele,idx)=>{
        let mainDiv=document.createElement("div");
        mainDiv.setAttribute("class","card");
        
        let imgDiv=document.createElement("div")
        imgDiv.id="imgDiv";
        let image=document.createElement("img");
        image.src=ele.images.img1;
        imgDiv.append(image);

        let heart=document.createElement("img");
        heart.src= "./styles/heart.svg";
        heart.id="heart";
        
        let brRat=document.createElement("div");
        brRat.setAttribute("class","brRat");
        let h3=document.createElement("h3");
        h3.id="br";
        h3.innerText=ele.brand;
        let rating=document.createElement("h3");
        rating.id="rate";
        rating.innerText="★"+ele.rating;
        brRat.append(h3,rating);
        
        let title=document.createElement("h3");
        title.id="title";
        title.innerText=ele.title;

        let pStdis=document.createElement("div");
        pStdis.setAttribute("class","pStdis");
        let price=document.createElement("p");
        price.id="pri";
        price.innerText="₹"+ele.price;

        let strPrice=document.createElement("p");
        strPrice.id="strP";
        
        let dis=document.createElement("p");
        if(ele.discount!=""){
            strPrice.innerText="₹"+ele.strPrice;
            
            dis.id="dis";
            dis.innerText=ele.discount+"% off";
        }
            pStdis.append(price,strPrice,dis,heart);

        mainDiv.append(imgDiv,brRat,title,pStdis)
        document.getElementById("mainProd").append(mainDiv);





    })
}


