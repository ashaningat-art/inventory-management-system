function ProductForm({
  form,
  editingId,
  handleChange,
  handleSubmit,
  clearForm,
}) {
  return (
    <section className="form-card">

      <div className="form-heading">

        <div>
          <span className="form-icon">
            {editingId ? "✎" : "+"}
          </span>

          <div>
            <h2>
              {editingId
                ? "Edit Product"
                : "Add New Product"}
            </h2>

            <p>
              {editingId
                ? "Update product information"
                : "Enter product information below"}
            </p>
          </div>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="input-group">
            <label>Product ID</label>

            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="P001"
              disabled={editingId !== null}
            />
          </div>

          <div className="input-group">
            <label>Product Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="input-group">
            <label>Category</label>

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

              <option value="Clothing">
                Clothing
              </option>

              <option value="Food">
                Food
              </option>

              <option value="School Supplies">
                School Supplies
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
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="input-group">
            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
            />
          </div>

        </div>

        <div className="form-buttons">

          <button
            type="button"
            className="clear-button"
            onClick={clearForm}
          >
            Clear
          </button>

          <button
            type="submit"
            className="add-button"
          >
            {editingId
              ? "Update Product"
              : "Save Product"}
          </button>

        </div>

      </form>

    </section>
  );
}

export default ProductForm;
