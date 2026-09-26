import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [products, setProducts] = useState([
    {
      id: "P001",
      name: "Laptop",
      category: "Electronics",
      price: 35000,
      quantity: 12,
    },
    {
      id: "P002",
      name: "Wireless Mouse",
      category: "Accessories",
      price: 850,
      quantity: 8,
    },
    {
      id: "P003",
      name: "Keyboard",
      category: "Accessories",
      price: 1200,
      quantity: 15,
    },
    {
      id: "P004",
      name: "Monitor",
      category: "Electronics",
      price: 8500,
      quantity: 5,
    },
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [search, setSearch] = useState("");

  // ==========================
  // FORM
  // ==========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (
      !form.id ||
      !form.name ||
      !form.category ||
      !form.price ||
      !form.quantity
    ) {
      alert("Please complete all fields.");
      return;
    }

    const existingProduct = products.find(
      (product) => product.id === form.id
    );

    if (existingProduct) {
      alert("Product ID already exists.");
      return;
    }

    const newProduct = {
      id: form.id,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    setProducts([...products, newProduct]);

    setForm({
      id: "",
      name: "",
      category: "",
      price: "",
      quantity: "",
    });

    alert("Product added successfully!");

    setActivePage("Products");
  };

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // ==========================
  // STATUS
  // ==========================

  const getStatus = (quantity) => {
    if (quantity === 0) {
      return "Out of Stock";
    }

    if (quantity <= 5) {
      return "Low Stock";
    }

    return "In Stock";
  };

  // ==========================
  // SUMMARY
  // ==========================

  const totalProducts = products.length;

  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const lowStock = products.filter(
    (product) => product.quantity > 0 && product.quantity <= 5
  ).length;

  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;

  // ==========================
  // SEARCH
  // ==========================

  const filteredProducts = products.filter((product) =>
    `${product.id} ${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================
  // NAVIGATION
  // ==========================

  const goToPage = (page) => {
    setActivePage(page);
  };

  return (
    <div className="app">

      {/* ==========================
          SIDEBAR
      ========================== */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">📦</div>

          <div className="logo-text">
            <h2>Inventory</h2>
            <span>Management</span>
          </div>
        </div>

        <nav className="navigation">

          <p className="menu-title">MAIN MENU</p>

          <button
            className={`menu ${
              activePage === "Dashboard" ? "active" : ""
            }`}
            onClick={() => goToPage("Dashboard")}
          >
            <span className="menu-icon">▣</span>
            <span>Dashboard</span>
          </button>

          <button
            className={`menu ${
              activePage === "Products" ? "active" : ""
            }`}
            onClick={() => goToPage("Products")}
          >
            <span className="menu-icon">📦</span>
            <span>Products</span>
          </button>

          <button
            className={`menu ${
              activePage === "Add Product" ? "active" : ""
            }`}
            onClick={() => goToPage("Add Product")}
          >
            <span className="menu-icon">➕</span>
            <span>Add Product</span>
          </button>

          <button
            className={`menu ${
              activePage === "Reports" ? "active" : ""
            }`}
            onClick={() => goToPage("Reports")}
          >
            <span className="menu-icon">📊</span>
            <span>Reports</span>
          </button>

          <p className="menu-title">SYSTEM</p>

          <button
            className={`menu ${
              activePage === "Settings" ? "active" : ""
            }`}
            onClick={() => goToPage("Settings")}
          >
            <span className="menu-icon">⚙</span>
            <span>Settings</span>
          </button>

        </nav>

        {/* USER */}

        <div className="sidebar-user">

          <div className="user-avatar">
            A
          </div>

          <div className="user-info">
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>

        </div>

      </aside>

      {/* ==========================
          MAIN
      ========================== */}

      <main className="main">

        {/* TOP HEADER */}

        <header className="topbar">

          <div>
            <h1>{activePage}</h1>

            <p>
              Manage your inventory and products
            </p>
          </div>

          <div className="top-actions">

            <button className="notification">
              🔔
            </button>

            <div className="online">
              <span></span>
              System Online
            </div>

          </div>

        </header>

        {/* ==================================================
            DASHBOARD
        ================================================== */}

        {activePage === "Dashboard" && (
          <>

            {/* SUMMARY */}

            <section className="cards">

              <div className="card blue">

                <div>
                  <p>Total Products</p>

                  <h2>
                    {totalProducts}
                  </h2>

                  <small>
                    Products in inventory
                  </small>
                </div>

                <div className="card-icon">
                  📦
                </div>

              </div>

              <div className="card green">

                <div>
                  <p>Total Quantity</p>

                  <h2>
                    {totalQuantity}
                  </h2>

                  <small>
                    Items available
                  </small>
                </div>

                <div className="card-icon">
                  📈
                </div>

              </div>

              <div className="card orange">

                <div>
                  <p>Low Stock</p>

                  <h2>
                    {lowStock}
                  </h2>

                  <small>
                    Need attention
                  </small>
                </div>

                <div className="card-icon">
                  ⚠️
                </div>

              </div>

              <div className="card red">

                <div>
                  <p>Out of Stock</p>

                  <h2>
                    {outOfStock}
                  </h2>

                  <small>
                    Currently unavailable
                  </small>
                </div>

                <div className="card-icon">
                  ✕
                </div>

              </div>

            </section>

            {/* QUICK ACTIONS */}

            <section className="panel">

              <div className="panel-title">

                <div>
                  <h2>Quick Actions</h2>

                  <p>
                    Quickly manage your inventory
                  </p>
                </div>

              </div>

              <div className="quick-actions">

                <button
                  onClick={() => goToPage("Add Product")}
                  className="quick-button"
                >
                  <span>➕</span>
                  <div>
                    <strong>Add Product</strong>
                    <small>Create a new product</small>
                  </div>
                </button>

                <button
                  onClick={() => goToPage("Products")}
                  className="quick-button"
                >
                  <span>📦</span>
                  <div>
                    <strong>View Products</strong>
                    <small>Manage inventory</small>
                  </div>
                </button>

                <button
                  onClick={() => goToPage("Reports")}
                  className="quick-button"
                >
                  <span>📊</span>
                  <div>
                    <strong>View Reports</strong>
                    <small>Check inventory reports</small>
                  </div>
                </button>

              </div>

            </section>

            {/* RECENT PRODUCTS */}

            <section className="panel">

              <div className="inventory-header">

                <div>
                  <h2>Recent Products</h2>

                  <p>
                    Recently added inventory
                  </p>
                </div>

                <button
                  className="view-button"
                  onClick={() => goToPage("Products")}
                >
                  View All
                </button>

              </div>

              <ProductTable
                products={products.slice(0, 4)}
                getStatus={getStatus}
                deleteProduct={deleteProduct}
              />

            </section>

          </>
        )}

        {/* ==================================================
            PRODUCTS
        ================================================== */}

        {activePage === "Products" && (
          <section className="panel page-panel">

            <div className="inventory-header">

              <div>
                <h2>Inventory Products</h2>

                <p>
                  View and manage all your products
                </p>
              </div>

              <button
                className="add-btn"
                onClick={() => goToPage("Add Product")}
              >
                + Add Product
              </button>

            </div>

            {/* SEARCH */}

            <div className="search-container">

              <div className="search-box">

                <span>🔍</span>

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

            <ProductTable
              products={filteredProducts}
              getStatus={getStatus}
              deleteProduct={deleteProduct}
            />

          </section>
        )}

        {/* ==================================================
            ADD PRODUCT
        ================================================== */}

        {activePage === "Add Product" && (
          <section className="panel page-panel">

            <div className="panel-title">

              <div>
                <h2>Add New Product</h2>

                <p>
                  Enter the information of the new product
                </p>
              </div>

            </div>

            <form
              className="add-product-form"
              onSubmit={addProduct}
            >

              <div className="input-group">

                <label>
                  Product ID
                </label>

                <input
                  type="text"
                  name="id"
                  placeholder="P005"
                  value={form.id}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Electronics">
                    Electronics
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                  <option value="Office">
                    Office
                  </option>

                  <option value="Furniture">
                    Furniture
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              <div className="input-group">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                />

              </div>

              <div className="input-group">

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  placeholder="0"
                  min="0"
                  value={form.quantity}
                  onChange={handleChange}
                />

              </div>

              <div className="form-buttons">

                <button
                  type="button"
                  className="clear-btn"
                  onClick={() =>
                    setForm({
                      id: "",
                      name: "",
                      category: "",
                      price: "",
                      quantity: "",
                    })
                  }
                >
                  Clear
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Save Product
                </button>

              </div>

            </form>

          </section>
        )}

        {/* ==================================================
            REPORTS
        ================================================== */}

        {activePage === "Reports" && (
          <>

            <section className="cards">

              <div className="card blue">
                <div>
                  <p>Total Products</p>
                  <h2>{totalProducts}</h2>
                  <small>All products</small>
                </div>

                <div className="card-icon">
                  📦
                </div>
              </div>

              <div className="card green">
                <div>
                  <p>Total Quantity</p>
                  <h2>{totalQuantity}</h2>
                  <small>Total available items</small>
                </div>

                <div className="card-icon">
                  📈
                </div>
              </div>

              <div className="card orange">
                <div>
                  <p>Low Stock</p>
                  <h2>{lowStock}</h2>
                  <small>Products needing attention</small>
                </div>

                <div className="card-icon">
                  ⚠️
                </div>
              </div>

              <div className="card red">
                <div>
                  <p>Out of Stock</p>
                  <h2>{outOfStock}</h2>
                  <small>Unavailable products</small>
                </div>

                <div className="card-icon">
                  ✕
                </div>
              </div>

            </section>

            <section className="panel">

              <div className="panel-title">

                <div>
                  <h2>Inventory Report</h2>

                  <p>
                    Current inventory information
                  </p>
                </div>

              </div>

              <ProductTable
                products={products}
                getStatus={getStatus}
                deleteProduct={deleteProduct}
              />

            </section>

          </>
        )}

        {/* ==================================================
            SETTINGS
        ================================================== */}

        {activePage === "Settings" && (
          <section className="panel page-panel">

            <div className="panel-title">

              <div>
                <h2>System Settings</h2>

                <p>
                  Manage your inventory system
                </p>
              </div>

            </div>

            <div className="settings">

              <div className="setting-row">

                <div>
                  <strong>System Status</strong>
                  <small>
                    Current system status
                  </small>
                </div>

                <span className="setting-online">
                  ● Online
                </span>

              </div>

              <div className="setting-row">

                <div>
                  <strong>Administrator</strong>
                  <small>
                    Current system user
                  </small>
                </div>

                <span>
                  Admin
                </span>

              </div>

              <div className="setting-row">

                <div>
                  <strong>Total Products</strong>
                  <small>
                    Products currently stored
                  </small>
                </div>

                <span>
                  {totalProducts}
                </span>

              </div>

              <div className="setting-row">

                <div>
                  <strong>System Version</strong>
                  <small>
                    Current application version
                  </small>
                </div>

                <span>
                  v1.0.0
                </span>

              </div>

            </div>

          </section>
        )}

        <footer>
          Inventory Management System © 2026
        </footer>

      </main>

    </div>
  );
}


/* ==========================================================
   PRODUCT TABLE COMPONENT
========================================================== */

function ProductTable({
  products,
  getStatus,
  deleteProduct,
}) {
  return (
    <div className="table-container">

      <table>

        <thead>

          <tr>
            <th>PRODUCT ID</th>
            <th>PRODUCT</th>
            <th>CATEGORY</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td>
                <strong>
                  {product.id}
                </strong>
              </td>

              <td>

                <div className="product-name">

                  <div className="product-image">
                    {product.name.charAt(0).toUpperCase()}
                  </div>

                  <span>
                    {product.name}
                  </span>

                </div>

              </td>

              <td>
                <span className="category">
                  {product.category}
                </span>
              </td>

              <td>
                ₱{product.price.toLocaleString()}
              </td>

              <td>
                <strong>
                  {product.quantity}
                </strong>
              </td>

              <td>

                <span
                  className={`status ${
                    getStatus(product.quantity)
                      .toLowerCase()
                      .replaceAll(" ", "-")
                  }`}
                >
                  {getStatus(product.quantity)}
                </span>

              </td>

              <td>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {products.length === 0 && (
        <div className="empty">
          No products found.
        </div>
      )}

    </div>
  );
}

export default App;