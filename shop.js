const swiper = new Swiper(".mySwiper", {
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// =================Input search=========
const searchIcon = document.querySelector(".search");
const inputBoxEl = document.querySelector(".input-box");


searchIcon.addEventListener("click", ()=>{
inputBoxEl.classList.toggle("active");
});



//============= User popup window ===============
const userPopup = document.querySelector(".user-popup");
const userIcon = document.querySelector(".user");
const closeUserPopup = userPopup.querySelector(".close-x");


userIcon.addEventListener("click", ()=>{
  userPopup.classList.add("show");
});
closeUserPopup.addEventListener("click", ()=>{
  userPopup.classList.remove("show");
});

//cart window//

const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");
const cartIcon = document.querySelector(".bag");

cartIcon.addEventListener("click", ()=>{
  cart.classList.add("active");
});
closeCart.addEventListener("click", ()=>{
  cart.classList.remove("active");
});

// Start when the document is ready//

if(document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded", start);
}else{
  start();
}

//=============== Start =================

function start(){
  addEvents();
}

//============= Update & Rerender =================

function update(){
  addEvents();
  updateTotal();
}

//========= Add Events ===========

function addEvents(){
  // Renove items from card//
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  cartRemove_btns.forEach((btn)=>{
    btn.addEventListener("click", handle_removeCartItem);
  });

  // change Item Quantity

  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

// Add item to cart//
  let addCartBtns = document.querySelectorAll(".add-cart");
  addCartBtns.forEach((addCart) => {
    addCart.addEventListener("click", handle_addCartItem);
  });
  // buy order
  const buy_btn = document.querySelector(".buy-btn");
  buy_btn.addEventListener("click", handle_buyOrder);
}

//============ Handle Events Function ============
let itemsAdded = [];

function handle_addCartItem(){
  let product = this.parentElement;
  let title = product.querySelector(".product-name").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  
  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  //handle item is already exist
  if(itemsAdded.find((el) => el.title == newToAdd.title)){
    alert("This Item Is Already Exist!");
    return;
  }else{
    itemsAdded.push(newToAdd);
  }

// Add product to cart//

let cartBoxElement = CartBoxComponent(title, price, imgSrc);
let newNode = document.createElement("div");
newNode.innerHTML = cartBoxElement;
const cartContent = cart.querySelector(".cart-content");
cartContent.appendChild(newNode);

update();
}

function handle_removeCartItem(){
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el)=>el.price != this.parentElement.querySelector(".cart-product-title").innerHTML
    );
  update();
}

function handle_changeItemQuantity(){
  if(isNaN(this.value) || this.value < 1){
    this.value = 1;
  }
  this.value = Math.floor(this.value);

  update();
}

function handle_buyOrder(){
  if(itemsAdded.length <= 0){
    alert("There is No Order to Place Yet! \nPlease Make An Order first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your order is Placed Successfully :)");
  itemsAdded = [];
  update();
}

//=========== Update & Rerender Functions ========

function updateTotal(){
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;

}

//====== Html Components ======= //
function CartBoxComponent(title, price, imgSrc){
  return `<div class="cart-box">
  <img src=${imgSrc} alt="" class="cart-img">
  <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input class="cart-quantity" type="number" value="1">
  </div>
<i class='bx bxs-trash-alt cart-remove'></i>
</div>`;
}

// =============== menu ==========//
const barIcon = document.querySelector(".bar");
const navMenu = document.querySelector(".navlist");

barIcon.addEventListener("click", ()=>{
  navMenu.classList.toggle("open");
});

window.addEventListener("scroll", ()=>{
  navMenu.classList.remove("open");
});










