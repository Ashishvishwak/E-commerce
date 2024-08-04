function swiper() {
  var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 16000,
      disableOnInteraction: false,
    },
  });
}

// search bar
function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

// it is for menu
function menu() {
  let menu = document.querySelector(".menu");
  let menuIcon = document.querySelector(".menu-icon");
  let menuInner = document.querySelector(".menuInner");

  menu.addEventListener("click", () => {
    menuInner.classList.toggle("hidden");
    menuIcon.classList.toggle("ri-close-fill");
    menuIcon.classList.toggle("ri-menu-fill");
  });
}

menu();
// addToCard();
swiper();
const product = [
  {
    id: 1,
    name: "Ingco power tools",
    price: 1245.0,
    discount: 1420.0,
    image: "/image/product-image-01-p-500.jpg",
  },
  {
    id: 2,
    name: "7-in-1 magnetized wrench",
    price: 248.0,
    discount: 420.0,
    image: "/image/product-image-02-p-500.jpg",
  },
  {
    id: 3,
    name: "Industrial pneumatic nailer with duo glide roller",
    price: 1865.0,
    discount: 2300.0,
    image: "/image/product-image-03-p-500.jpg",
  },
  {
    id: 4,
    name: "Adjustable wrenches",
    price: 750.0,
    discount: 920.0,
    image: "/image/product-image-04-p-500.jpg",
  },
  {
    id: 5,
    name: "Truflex steel tape",
    price: 102.0,
    discount: 220.0,
    image: "/image/product-image-05-p-500.jpg",
  },
  {
    id: 6,
    name: "Electric rotary drill machine",
    price: 750.0,
    discount: 900.0,
    image: "/image/product-image-13-p-500.jpg",
  },
  {
    id: 7,
    name: "Gearo 15-inch plastic tool bag",
    price: 1865.0,
    discount: "2,220.00",
    image: "/image/product-image-14-p-500.jpg",
  },
  {
    id: 8,
    name: "New tools wood cutter",
    price: 345.5,
    discount: 499.0,
    image: "/image/product-image-15-p-500.jpg",
  },
];

const iconAddToCard = document.querySelector(".card");
const closeIcon = document.querySelector(".card-close");
const cardTap = document.querySelector(".cardTab");
const CartCount = document.querySelector(".Card-count");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

iconAddToCard.addEventListener("click", function () {
  cardTap.style.display = "block";
});

closeIcon.addEventListener("click", function () {
  cardTap.style.display = "none";
});

const categories = [
  ...new Set(
    product.map((item) => {
      return item;
    })
  ),
];
let i = 0;
document.querySelector(".contentTab").innerHTML = categories.map((item) => {
    var { image, name, price, discount } = item;
    return `<div class="item-box md:w-[289px] md:h-[289px] flex mb-12 flex-col relative group">
            <div class="absolute inset-0 bg-slate-100 bg-opacity-0 opacity-0 group-hover:bg-opacity-75 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <button class="px-[15px] w-36 py-[12px] text-center text-lg font-medium hover:bg-black hover:text-white transition bg-[#FFB700] text-black">
                <a class="addCart" onclick='addtocart(${i++})' href="#">Add to cart</a>
              </button>
            </div>
            <img class="h-full w-full object-cover object-center" src="${image}" alt="">
            <h3 class="text-xl font-semibold text-left">${name}</h3>
            <h4 class="text-lg font-medium text-left">$ ${price} USD
       
              <samp class="line-through md:inline block text-base font-normal text-[#6a6a6a]">$ ${discount} USD</samp>
            </h4>
          </div>`;
  })
  .join("");

function addtocart(a) {
  const product = { ...categories[a], quantity: 1 };
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
  } else {
    cart.push(product);
  }
  updateLocalStorage();
  displaycart();
}

function displaycart() {
  CartCount.innerHTML = cart.length;
  if (cart.length === 0) {
    document.querySelector(".list-cart").innerHTML = `
    <div class="cart-empty">
    <img class="h-72 w-72 mx-auto" src="/Image/empty-cart-image.svg" alt="">
   </div>
    `;
  } else {
    document.querySelector(".list-cart").innerHTML = cart
      .map((item, index) => {
        var { image, name, price, quantity } = item;
        return `
             <div class="items items-center text-center text-black w-full">
            <div class="img w-14 h-14 object-cover object-center">
              <img src="${image}" class="w-14 h-14 object-cover object-center" alt="">
            </div>
            <div class="info flex">
              <span class="text-left">  ${name}</span>
            </div>
            <div class="quantity text-center cursor-pointer">
              <span class="inline-block bg-black w-[25px] h-[25px] rounded-full text-white text-center" onclick="changeQuantity(${index}, -1)"> < </span>
              <span class="text-black font-normal">${quantity}</span>
              <span class="inline-block bg-black w-[25px] h-[25px] rounded-full text-white text-center" onclick="changeQuantity(${index}, 1)"> > </span>
            </div>
            <div class=""></div>
            <div class="remove-price">
              <h4 class="text-left font-normal">$ ${price * quantity} USD</h4>
              <h3 class="text-left font-normal hover:text-[#FFB700] underline" onclick="removeFromCart(${index})">Remove</h3>
            </div>
          </div>
            `;
      })
      .join("");
  }
}

function changeQuantity(index, delta) {
  if (cart[index].quantity + delta > 0) {
    cart[index].quantity += delta;
  } else {
    cart.splice(index, 1);
  }
  updateLocalStorage();
  displaycart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateLocalStorage();
  displaycart();
}

function updateLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from local storage on page load
window.onload = function () {
  displaycart();
};



