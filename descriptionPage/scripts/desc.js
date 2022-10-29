let local=JSON.parse(localStorage.getItem("clicked"));

document.getElementById("smallImg1").src=local.images.img1;
document.getElementById("smallImg2").src=local.images.img2;
document.getElementById("smallImg3").src=local.images.img3;

document.getElementById("bigImg").src=local.images.img1;

document.getElementById("cimg1").src=local.images.img1;
document.getElementById("cimg2").src=local.images.img2;
document.getElementById("cimg3").src=local.images.img3;

document.getElementById("cat1").innerText=local.cat1;
document.getElementById("cat2").innerText=local.cat2;

document.getElementById("title").innerText=local.title;

document.getElementById("brand").innerText=local.brand;
document.getElementById("rating").innerText=local.rating+"★";
document.getElementById("price").innerText="₹"+ local.price;
document.getElementById("strPrice").innerText="₹"+ local.strPrice;
document.getElementById("disPrice").innerText=local.discount +"% off";

document.getElementById("cl1").innerText=local.color.clr1;
document.getElementById("cl2").innerText=local.color.clr2;
document.getElementById("cl3").innerText=local.color.clr3;

document.getElementById("sz1").innerText=local.size.sz1;
document.getElementById("sz2").innerText=local.size.sz2;
document.getElementById("sz3").innerText=local.size.sz3;

document.getElementById("seller").innerText=local.seller;

document.getElementById("descri").innerText=local.desc;


function changeImg(id,listener){
    document.getElementById(id).addEventListener(listener,()=>{
        let src=document.getElementById(id).src;
        document.getElementById("bigImg").src=src;
    })
}
changeImg("smallImg1","mouseover")
changeImg("smallImg2","mouseover")
changeImg("smallImg3","mouseover")
changeImg("smallImg1","click")
changeImg("smallImg2","click")
changeImg("smallImg3","click")




