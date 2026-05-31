const bigImages = [
    "assets/product-1.jpg",
    "assets/product-2.jpg",
    "assets/product-3.jpg",
    "assets/product-4.jpg"
];

let currentImg = 0;
let quantity = 1;
let price = 125;

let mainImg = document.getElementById("mainImg");
let modalImg = document.getElementById("modalImg");
let thumbs = document.getElementsByClassName("thumb");
let modalThumbs = document.getElementsByClassName("modal-thumb");

let quantityText = document.getElementById("quantity");
let cartNumber = document.getElementById("cartNumber");
let cartBox = document.getElementById("cartBox");
let cartContent = document.getElementById("cartContent");
let cartFooter = document.getElementById("cartFooter");

function showImage(index) {
    if (index < 0) index = bigImages.length - 1;
    if (index >= bigImages.length) index = 0;

    currentImg = index;
    mainImg.src = bigImages[currentImg];
    modalImg.src = bigImages[currentImg];

    for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove("active");
        modalThumbs[i].classList.remove("active");
    }

    thumbs[currentImg].classList.add("active");
    modalThumbs[currentImg].classList.add("active");
}

document.getElementById("nextBtn").addEventListener("click", function () {
    showImage(currentImg + 1);
});

document.getElementById("prevBtn").addEventListener("click", function () {
    showImage(currentImg - 1);
});

document.getElementById("modalNext").addEventListener("click", function () {
    showImage(currentImg + 1);
});

document.getElementById("modalPrev").addEventListener("click", function () {
    showImage(currentImg - 1);
});

for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].setAttribute("data-number", i);
    modalThumbs[i].setAttribute("data-number", i);

    thumbs[i].addEventListener("click", function () {
        showImage(parseInt(this.getAttribute("data-number")));
    });

    modalThumbs[i].addEventListener("click", function () {
        showImage(parseInt(this.getAttribute("data-number")));
    });
}

document.getElementById("plusBtn").addEventListener("click", function () {
    quantity++;
    quantityText.innerText = quantity;
});

document.getElementById("minusBtn").addEventListener("click", function () {
    if (quantity > 1) {
        quantity--;
        quantityText.innerText = quantity;
    }
});

let cartItems = [];

document.getElementById("addBtn").addEventListener("click", function () {
    let amount = parseInt(document.getElementById("quantity").innerText);

    let newItem = {
        id: Date.now(),
        name: "Fall Limited Edition Sneakers",
        image: "assets/product-1-thumb.jpg",
        price: price,
        quantity: amount
    };

    cartItems.push(newItem);
    document.getElementById("quantity").innerText = "1";
    quantity = 1;  // ← reset the JS variable too, not just the display
    updateCart();
});

function updateCart() {
    if (cartItems.length === 0) {
        cartNumber.style.display = "none";
        cartContent.innerHTML = "<p>Your cart is empty.</p>";
        cartFooter.innerHTML = "";
        return;
    }

    cartNumber.style.display = "inline-block";
    cartNumber.innerText = cartItems.length;

    let itemsHTML = "";
    let total = 0;  // ← added let, was an accidental global before

    cartItems.forEach(function (item) {
        total += item.price * item.quantity;
        itemsHTML +=
            '<div class="cart-item">' +
                '<img class="cart-item-img" src="' + item.image + '" alt="product">' +
                '<div>' +
                    '<p>' + item.name + '</p>' +
                    '<p>$' + item.price + ' X ' + item.quantity + '</p>' +
                '</div>' +
                '<button class="remove-btn" data-id="' + item.id + '">' +
                    '<img src="assets/icon-delete.svg" alt="delete">' +
                '</button>' +
            '</div>';
    });

    cartContent.innerHTML = itemsHTML;
    cartFooter.innerHTML =
        '<p id="totalText">Total: $' + total.toFixed(2) + '</p>' +
        '<button class="checkout-btn">Checkout</button>';

    document.querySelectorAll(".remove-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            let idToRemove = parseInt(this.dataset.id);
            cartItems = cartItems.filter(function (item) {
                return item.id !== idToRemove;
            });
            updateCart();
        });
    });
}

document.getElementById("cartBtn").addEventListener("click", function () {
    if (cartBox.style.display === "flex") {
        cartBox.style.display = "none";
    } else {
        cartBox.style.display = "flex";
    }
});

document.getElementById("menuBtn").addEventListener("click", function () {
    document.getElementById("mobileMenu").style.left = "0";
    document.getElementById("darkBg").style.display = "block";
});

function closeMenu() {
    document.getElementById("mobileMenu").style.left = "-250px";
    document.getElementById("darkBg").style.display = "none";
}

document.getElementById("closeMenu").addEventListener("click", closeMenu);
document.getElementById("darkBg").addEventListener("click", closeMenu);

mainImg.addEventListener("click", function () {
    if (window.innerWidth > 800) {
        document.getElementById("modal").style.display = "block";
    }
});

document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

document.getElementById("modal").addEventListener("click", function (event) {
    if (event.target.id === "modal") {
        document.getElementById("modal").style.display = "none";
    }
});

let links = document.getElementsByTagName("a");

for (let j = 0; j < links.length; j++) {
    links[j].addEventListener("click", function (event) {
        event.preventDefault();
    });
}