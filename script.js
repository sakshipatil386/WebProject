// ====== Product List ======
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    desc: "Over-ear Bluetooth headphones with deep bass, 30h battery.",
    img: "Headphones.jpg"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3299,
    desc: "Fitness smartwatch with heart-rate monitoring & notifications.",
    img: "smart_Watch.jpg"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 1899,
    desc: "Noise-cancelling earbuds with crystal-clear sound.",
    img: "Earbuds.jpg"
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 999,
    desc: "Aluminium adjustable laptop stand for better posture.",
    img: "laptop stand.jpg"
  },
  {
    id: 5,
    name: "Power Bank",
    price: 1299,
    desc: "10,000mAh fast-charging portable power bank.",
    img: "power bank.jpg"
  },
  {
    id: 6,
    name: "Type-C Charger",
    price: 899,
    desc: "Fast-charging USB-C adapter for all devices.",
    img: "C_type.jpg"
  }
];

let cart = [];
// ====== Display Products ======
function renderProducts(filtered = PRODUCTS) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="price">₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}
renderProducts();

function renderFeatured() {
  const featuredGrid = document.getElementById("featuredGrid");
  const featured = PRODUCTS.slice(0, 3); // first 3 products
  featuredGrid.innerHTML = featured.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p class="price">₹${p.price}</p>
      <button onclick="viewProduct(${p.id})">View Details</button>
    </div>
  `).join("");
}
renderFeatured();

// ====== Product Details ======
function viewProduct(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  // Hide all pages
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  document.getElementById("productdetails").classList.remove("hidden");

  // Show product details
  const detail = document.getElementById("prodDetail");
  detail.innerHTML = `
    <div class="product-card detail-card">
      <img src="${product.img}" alt="${product.name}" class="product-img">
      <h2>${product.name}</h2>
      <p>${product.desc}</p>
      <p class="price">₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="go('home')">Back to Home</button>
</div>
  `;

  const recos = document.getElementById("recos");
  const recommended = PRODUCTS.filter(p => p.id !== id).slice(0, 3);
  recos.innerHTML = recommended.map(p => `
    <div class="product-card small-card">
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <h4>${p.name}</h4>
      <p class="price">₹${p.price}</p>
      <button onclick="viewProduct(${p.id})">View</button>
    </div>
  `).join("");
}

// ====== Search ======
function updateSearch(isSecond = false) {
  const input = isSecond 
    ? document.getElementById("search_tab2").value.toLowerCase() 
    : document.getElementById("search_tab1").value.toLowerCase();

  const filtered = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(input) || 
    p.desc.toLowerCase().includes(input)
  );
  renderProducts(filtered);
}

// ====== Sorting ======
function Updatesort(isSecond = false) {
  const sortVal = isSecond 
    ? document.getElementById("bysort2").value 
    : document.getElementById("bysort1").value;

  let sorted = [...PRODUCTS];
  if (sortVal === "low") sorted.sort((a, b) => a.price - b.price);
  else if (sortVal === "high") sorted.sort((a, b) => b.price - a.price);

  renderProducts(sorted);
}

// ====== Cart ======
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function updateCart() {
  const cartArea = document.getElementById("cartArea");
  const totalPriceEl = document.getElementById("total-price");

  if (cart.length === 0) {
    cartArea.innerHTML = "<p> Your cart is empty 🛒</p>";
    totalPriceEl.textContent = " Total: ₹0";
    return;
  }

  let total = 0;
  cartArea.innerHTML = cart.map(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    return `
      <div class="cart-item">
        ${item.name} (${item.quantity}) - ₹${subtotal}
        <button class="remove-btn" onclick="removeFromCart(${item.id})">❌</button>
      </div>
    `;
  }).join("");

  totalPriceEl.textContent = `Total: ₹${total}`;
}

// ====== Dark Mode ======
function toggledark() {
  document.body.classList.toggle("dark-mode");
}
// ====== Page Navigation ======
function go(sectionId) {
  // Hide all sections
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.add("hidden"));

  // Show the clicked section
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove("hidden");
  }

  // If we clicked on products, refresh products display
  if (sectionId === "products") {
    renderProducts();
  }

  // If we clicked on cart, update cart display
  if (sectionId === "cart") {
    updateCart();
  }
  function go(sectionId) {
  // hide all sections
  document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));

  // show only the selected one
  document.getElementById(sectionId).classList.remove("hidden");
}

}


function submitContact(event) {
  event.preventDefault();

  const name = document.getElementById("cname").value;
  const email = document.getElementById("cemail").value;
  const subject = document.getElementById("csubject").value;
  const address = document.getElementById("caddress").value;

  if (name && email && subject && address) {
    alert("✅ Thank you " + name + "! Your Details has been submitted.");
    event.target.reset(); // clear form after submit
  } else {
    alert("⚠️ Please fill all fields before submitting.");
  }
}


function toggleMenu() {
  document.getElementById("navlinks").classList.toggle("active");
}

