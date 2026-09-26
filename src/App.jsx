import { useState } from "react";

import "./App.css";

import Header from "./components/Header";
import Summary from "./components/Summary";
import ProductForm from "./components/ProductForm";
import InventoryTable from "./components/InventoryTable";

function App() {
  const [products, setProducts] = useState([
    {
      id: "P001",
      name: "Wireless Mouse",
      category: "Electronics",
      price: 599,
      quantity: 25,
    },
    {
      id: "P002",
      name: "USB Keyboard",
      category: "Electronics",
      price: 850,
      quantity: 8,
    },
    {
      id: "P003",
      name: "Notebook",
      category: "School Supplies",
      price: 75,
      quantity: 3,
    },
  ]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setForm({
      id: "",
      name: "",
      category: "",
      price: "",
      quantity: "",
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.id ||
      !form.name ||
      !form.category ||
      !form.price ||
      form.quantity === ""
    ) {
      alert("Please complete all fields.");
      return;
    }

    const product = {
      id: form.id.trim(),
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    if (editingId) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingId ? product : item
        )
      );
    } else {
      if (products.some((item) => item.id === product.id)) {
        alert("Product ID already exists.");
        return;
      }

      setProducts((prev) => [...prev, product]);
    }

    clearForm();
  };

  const editProduct = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });

    setEditingId(product.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="app">

      <Header />

      <main>

        <section className="page-heading">
          <div>
            <h2>Inventory Overview</h2>
            <p>Monitor and manage your products</p>
          </div>
        </section>

        <Summary products={products} />

        <ProductForm
          form={form}
          editingId={editingId}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          clearForm={clearForm}
        />

        <InventoryTable
          products={products}
          search={search}
          setSearch={setSearch}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
        />

      </main>

    </div>
  );
}

export default App;
