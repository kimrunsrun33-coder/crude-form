// Array to store products
let products = [];
let editIndex = -1;

// Add or Update Product
function addProduct() {
    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const qty = document.getElementById("qty").value.trim();
    const category = document.getElementById("category").value.trim();
    const desc = document.getElementById("desc").value.trim();

    if (!name || !price || !qty || isNaN(price) || isNaN(qty)) {
        alert("Please fill required fields with valid numbers!");
        return;
    }

    const productData = { name, price, qty, category, desc };

    if (editIndex === -1) {
        products.push(productData);
    } else {
        products[editIndex] = productData;
        editIndex = -1;
        document.querySelector(".desc-btn-group button").innerText = "Save Product";
    }

    clearForm();
    displayProducts();      // Refresh product list
    updateDashboard();      // Refresh dashboard counts
}

function editProduct(index) {
    showSection("addProduct");
    const product = products[index];

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("qty").value = product.qty;
    document.getElementById("category").value = product.category;
    document.getElementById("desc").value = product.desc;

    editIndex = index;
    document.querySelector(".desc-btn-group button").innerText = "Update Product";
}


// Display products in table
function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    document.getElementById("products-amount").innerText = products.length;
    const totalOrders = products.reduce((sum, p) => sum + Number(p.qty), 0);
    document.getElementById("orders-amount").innerText = totalOrders;
    const uniqueCategories = [...new Set(products.map(p => p.category))].length;
    document.getElementById("categories-amount").innerText = uniqueCategories;

    products.forEach((product, index) => {
        productList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.qty}</td>
                <td>${product.category}</td>
                <td>${product.desc}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editProduct(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}



function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);
        clearForm();
        displayProducts();
    }
}

// Clear form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("category").value = "";
    document.getElementById("desc").value = "";
    editIndex = -1;
    document.querySelector(".desc-btn-group button").innerText = "Save Product";
}

// Show section (Dashboard / Add Product / List Product)
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
    document.getElementById(sectionId).style.display = "block";

    // Sidebar highlight
    document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));

    // Highlight parent menu if necessary
    let parentLi;
    if (sectionId === "addProduct" || sectionId === "listProduct") parentLi = document.querySelector(".fa-box").parentElement;
    else if (sectionId === "addOrder" || sectionId === "listOrder") parentLi = document.querySelector(".fa-shopping-cart").parentElement;
    else if (sectionId === "addUser" || sectionId === "listUser") parentLi = document.querySelector(".fa-users").parentElement;
    else if (sectionId === "dashboard") parentLi = document.querySelector(".fa-chart-line").parentElement;

    if (parentLi) parentLi.classList.add("active");

    // Show submenu if exists
    const submenu = parentLi?.querySelector(".nav-treeview");
    if(submenu) submenu.classList.add("active-menu");

    // Highlight clicked sub-link
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-link[onclick="showSection('${sectionId}')"]`);
    if(activeLink) activeLink.classList.add("active");

    // Refresh lists
    if(sectionId === "listProduct") displayProducts();
    if(sectionId === "listOrder") displayOrders();
    if(sectionId === "listUser") displayUsers();

    

    // Always update dashboard
    updateDashboard();
}
document.querySelector(".desc-btn-group button").innerText = "Save Product";
function setActive(el){
    document.querySelectorAll(".sidebar ul li").forEach(li=>{
        li.classList.remove("active");
    });
    el.classList.add("active");
}
// sidebar active highlight
document.querySelectorAll(".sidebar ul li").forEach(item => {

    item.addEventListener("click", function(){

        document.querySelectorAll(".sidebar ul li").forEach(li=>{
            li.classList.remove("active");
        });

        this.classList.add("active");

    });

});


//section
document.addEventListener('DOMContentLoaded', () => {
    const menuParents = document.querySelectorAll('.sidebar > ul > li');

    menuParents.forEach(item => {
        item.style.cursor = 'pointer';

        item.onclick = function(e) {
            // 1. If you click 'Add' or 'List', don't do anything (don't close the menu)
            if (e.target.closest('.nav-treeview')) {
                return;
            }

            // 2. Find the submenu inside the item you clicked
            const submenu = this.querySelector('.nav-treeview');

            if (submenu) {
                // Check if this specific menu is ALREADY open
                const isOpen = submenu.classList.contains('active-menu');

                // 3. CLOSE ALL other submenus first
                document.querySelectorAll('.nav-treeview').forEach(nav => {
                    nav.classList.remove('active-menu');
                });

                // 4. If the one you clicked wasn't open, open it now
                // (This allows you to click 'Products' again to close it)
                if (!isOpen) {
                    submenu.classList.add('active-menu');
                }
            }
        };
    });
});
// Arrays
let orders = [];
let users = [];
let editOrderIndex = -1;
let editUserIndex = -1;

// ------------------ ORDERS ------------------

// Add / Update Order
function addOrder() {
    const name = document.getElementById("orderName").value.trim();
    const qty = document.getElementById("orderQty").value.trim();
    const customer = document.getElementById("orderUser").value.trim();

    if (!name || !qty || isNaN(qty)) {
        alert("Please fill required fields!");
        return;
    }

    const orderData = { name, qty, customer };

    if (editOrderIndex === -1) {
        orders.push(orderData);
    } else {
        orders[editOrderIndex] = orderData;
        editOrderIndex = -1;
        document.querySelector("#addOrder .desc-btn-group button").innerText = "Save Order";
    }

    clearOrderForm();
    displayOrders();
    updateDashboard();
}

function editOrder(index){
    showSection("addOrder");
    const order = orders[index];
    document.getElementById("orderName").value = order.name;
    document.getElementById("orderQty").value = order.qty;
    document.getElementById("orderUser").value = order.customer;

    editOrderIndex = index;
    document.querySelector("#addOrder .desc-btn-group button").innerText = "Update Order";
}

function deleteOrder(index){
    if(confirm("Delete this order?")){
        orders.splice(index,1);
        clearOrderForm();
        displayOrders();
        updateDashboard();
    }
}

function clearOrderForm(){
    document.getElementById("orderName").value = "";
    document.getElementById("orderQty").value = "";
    document.getElementById("orderUser").value = "";
    editOrderIndex = -1;
    document.querySelector("#addOrder .desc-btn-group button").innerText = "Save Order";
}

// Display Orders
function displayOrders() {
    const tbody = document.getElementById("orderList");
    tbody.innerHTML = "";
    orders.forEach((o,i)=>{
        tbody.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${o.name}</td>
                <td>${o.qty}</td>
                <td>${o.customer}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editOrder(${i})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteOrder(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
    updateDashboard();
}


// ------------------ USERS ------------------

// Add / Update User
function addUser() {
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const role = document.getElementById("userRole").value.trim();

    if(!name || !email){ alert("Fill all fields!"); return; }

    const userData = { name, email, role };

    if(editUserIndex===-1){
        users.push(userData);
    } else {
        users[editUserIndex] = userData;
        editUserIndex = -1;
        document.querySelector("#addUser .desc-btn-group button").innerText = "Save User";
    }

    clearUserForm();
    displayUsers();
    updateDashboard();
}

function editUser(index){
    showSection("addUser");
    const u = users[index];
    document.getElementById("userName").value = u.name;
    document.getElementById("userEmail").value = u.email;
    document.getElementById("userRole").value = u.role;

    editUserIndex = index;
    document.querySelector("#addUser .desc-btn-group button").innerText = "Update User";
}

function deleteUser(index){
    if(confirm("Delete this user?")){
        users.splice(index,1);
        clearUserForm();
        displayUsers();
        updateDashboard();
    }
}

function clearUserForm(){
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userRole").value = "";
    editUserIndex = -1;
    document.querySelector("#addUser .desc-btn-group button").innerText = "Save User";
}

// Display Users
function displayUsers() {
    const tbody = document.getElementById("userList");
    tbody.innerHTML = "";
    users.forEach((u,i)=>{
        tbody.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editUser(${i})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
    updateDashboard();
}

// dashboard
function updateDashboard() {
    document.getElementById("products-amount").innerText = products.length;
    const totalOrders = orders.reduce((sum,o)=> sum + Number(o.qty), 0);
    document.getElementById("orders-amount").innerText = totalOrders;
    const uniqueCategories = [...new Set(products.map(p => p.category))].length;
    document.getElementById("categories-amount").innerText = uniqueCategories;
    document.getElementById("users-amount").innerText = users.length;
}
document.addEventListener('DOMContentLoaded', () => {

    // All sidebar parent li
    const menuParents = document.querySelectorAll('.sidebar > ul > li');

    menuParents.forEach(item => {
        item.style.cursor = 'pointer';

        item.addEventListener('click', function(e) {
            const submenu = this.querySelector('.nav-treeview');
            const isParent = submenu !== null;

            // Clear all highlights and active-menu
            document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
            document.querySelectorAll('.nav-treeview').forEach(nav => nav.classList.remove('active-menu'));

            // Set current li as active
            this.classList.add('active');

            // Toggle submenu if parent
            if(isParent){
                const isOpen = submenu.classList.contains('active-menu');
                if(!isOpen){
                    submenu.classList.add('active-menu');
                }
            }

            // If clicked a submenu link
            const link = e.target.closest('.nav-link');
            if(link){
                e.preventDefault();
                const sectionId = link.getAttribute('onclick').match(/'(.+?)'/)[1];
                showSection(sectionId);
                link.classList.add('active'); // highlight submenu
                return;
            }

            // If clicked parent like dashboard
            const sectionId = this.querySelector('.nav-link') ? null : this.textContent.trim().toLowerCase();
            if(this.textContent.includes('Dashboard')){
                showSection('dashboard');
            }
        });
    });

});


function displayOrders() {
    const tbody = document.getElementById("orderList");
    tbody.innerHTML = "";
    orders.forEach((o, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${o.name}</td>
                <td>${o.qty}</td>
                <td>${o.customer}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editOrder(${i})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteOrder(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
    updateDashboard();
}

function displayUsers() {
    const tbody = document.getElementById("userList");
    tbody.innerHTML = "";
    users.forEach((u, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editUser(${i})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
    updateDashboard();
}
function updateDashboardTables() {
    // Products
    const pBody = document.querySelector("#dashboardProducts tbody");
    pBody.innerHTML = products.map((p, i) => `
        <tr>
            <td>${i+1}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.qty}</td>
            <td>${p.category}</td>
            <td>${p.desc}</td>
        </tr>
    `).join('');

    // Orders
    const oBody = document.querySelector("#dashboardOrders tbody");
    oBody.innerHTML = orders.map((o, i) => `
        <tr>
            <td>${i+1}</td>
            <td>${o.name}</td>
            <td>${o.qty}</td>
            <td>${o.customer}</td>
        </tr>
    `).join('');

    // Users
    const uBody = document.querySelector("#dashboardUsers tbody");
    uBody.innerHTML = users.map((u, i) => `
        <tr>
            <td>${i+1}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
        </tr>
    `).join('');
}


// Always update dashboard only
function updateDashboard() {
    // Update dashboard counts
    document.getElementById("products-amount").innerText = products.length;
    document.getElementById("orders-amount").innerText = orders.reduce((sum,o)=> sum + Number(o.qty), 0);
    document.getElementById("categories-amount").innerText = [...new Set(products.map(p => p.category))].length;
    document.getElementById("users-amount").innerText = users.length;

    // Only update tables if dashboard section is visible
    if(document.getElementById("dashboard").style.display === "block") {
        updateDashboardTables();
    }
}