var bigImages = [
    "assets/product-1.jpg",
    "assets/product-2.jpg",
    "assets/product-3.jpg",
    "assets/product-4.jpg"
];

var currentImg = 0;
var quantity = 1;
var cartQuantity = 0;
var price = 125;

var mainImg = document.getElementById("mainImg");
var modalImg = document.getElementById("modalImg");
var thumbs = document.getElementsByClassName("thumb");
var modalThumbs = document.getElementsByClassName("modal-thumb");

var quantityText = document.getElementById("quantity");
var cartNumber = document.getElementById("cartNumber");
var cartBox = document.getElementById("cartBox");
var cartContent = document.getElementById("cartContent");

function showImage(index) {
    if (index < 0) {
        index = bigImages.length - 1;
    }

    if (index >= bigImages.length) {
        index = 0;
    }

    currentImg = index;
    mainImg.src = bigImages[currentImg];
    modalImg.src = bigImages[currentImg];

    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove("active");
        modalThumbs[i].classList.remove("active");
    }

    thumbs[currentImg].classList.add("active");
    modalThumbs[currentImg].classList.add("active");
}

document.getElementById("nextBtn").onclick = function () {
    showImage(currentImg + 1);
};

document.getElementById("prevBtn").onclick = function () {
    showImage(currentImg - 1);
};

document.getElementById("modalNext").onclick = function () {
    showImage(currentImg + 1);
};

document.getElementById("modalPrev").onclick = function () {
    showImage(currentImg - 1);
};

for (var i = 0; i < thumbs.length; i++) {
    thumbs[i].setAttribute("data-number", i);
    modalThumbs[i].setAttribute("data-number", i);

    thumbs[i].onclick = function () {
        showImage(Number(this.getAttribute("data-number")));
    };

    modalThumbs[i].onclick = function () {
        showImage(Number(this.getAttribute("data-number")));
    };
}

document.getElementById("plusBtn").onclick = function () {
    quantity++;
    quantityText.innerText = quantity;
};

document.getElementById("minusBtn").onclick = function () {
    if (quantity > 1) {
        quantity--;
        quantityText.innerText = quantity;
    }
};
var cartItems = []; 

document.getElementById("addBtn").onclick = function () {
    var amount = Number(document.getElementById("quantity").innerText);
    var cartFooter = document.getElementById("cartFooter");

    var newItem = {
        id: Date.now(),
        name: "Fall Limited Edition Sneakers",
        image: "assets/product-1-thumb.jpg",
        price: price,
        quantity: amount
    };

    cartItems.push(newItem);

    // Amis gamo ra viwvale mere mixvdi ro ase martivad sheidzleba
    document.getElementById("quantity").innerText = "1";

    updateCart();
};



function updateCart() {
    if (cartItems.length === 0) {
        cartNumber.style.display = "none";
        cartContent.innerHTML = "<p>Your cart is empty.</p>";
        cartFooter.innerHTML = "";
        return;     
        } 


    cartNumber.style.display = "inline-block";
    cartNumber.innerText = cartItems.length;

    var itemsHTML = "";
    total = 0;
    cartItems.forEach(function(item) {
        total += item.price * item.quantity;
        itemsHTML +=
            '<div class="cart-item">' +
                '<img id="cartItemImg" src="' + item.image + '" alt="product">' +
                '<div>' +
                    '<p>' + item.name + '</p>' +
                    '<p>$' + item.price + ' X ' + item.quantity + '</p>' +
                '</div>' +

                '<button class="remove-btn" data-id="' + item.id + '">' +
                    '<img src="assets/icon-delete.svg" alt="delete">' +
                '</button>' +
            '</div>';
    });
    // Ase gaketeba mgoni arasworia magram chemi fantazia rasac gawvda...
    cartContent.innerHTML = itemsHTML;
    cartFooter.innerHTML ='<p id="totalText">Total: $' + total.toFixed(2) + '</p>' + '<button class="checkout-btn">Checkout</button>';

    document.querySelectorAll(".remove-btn").forEach(function(btn) {
        btn.onclick = function() {
            var idToRemove = Number(this.dataset.id);
            cartItems = cartItems.filter(function(item) {
                return item.id !== idToRemove;
            });
            updateCart();
        };
    });
}


document.getElementById("cartBtn").onclick = function () {
    if (cartBox.style.display === "block") {
        cartBox.style.display = "none";
    } else {
        cartBox.style.display = "block";
    }
};

document.getElementById("menuBtn").onclick = function () {
    document.getElementById("mobileMenu").style.left = "0";
    document.getElementById("darkBg").style.display = "block";
};

function closeMenu() {
    document.getElementById("mobileMenu").style.left = "-250px";
    document.getElementById("darkBg").style.display = "none";
}

document.getElementById("closeMenu").onclick = closeMenu;
document.getElementById("darkBg").onclick = closeMenu;

mainImg.onclick = function () {
    if (window.innerWidth > 800) {
        document.getElementById("modal").style.display = "block";
    }
};

document.getElementById("closeModal").onclick = function () {
    document.getElementById("modal").style.display = "none";
};

document.getElementById("modal").onclick = function (event) {
    if (event.target.id === "modal") {
        document.getElementById("modal").style.display = "none";
    }
};

var links = document.getElementsByTagName("a");

for (var j = 0; j < links.length; j++) {
    links[j].onclick = function (event) {
        event.preventDefault();
    };
}
