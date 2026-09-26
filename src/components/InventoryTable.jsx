import StatusBadge from "./StatusBadge";

function InventoryTable({
  products,
  search,
  setSearch,
  editProduct,
  deleteProduct,
}) {
  const filteredProducts = products.filter((product) => {
    const text = `
      ${product.id}
      ${product.name}
      ${product.category}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <section className="table-card">

      <div className="table-header">

        <div>
          <h2>Products</h2>

          <p className="table-subtitle">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="search-wrapper">
          <span>⌕</span>

          <input
            className="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="no-data"
                >
                  <div className="empty-icon">
                    📦
                  </div>

                  <strong>
                    No products found
                  </strong>

                  <span>
                    Try changing your search.
                  </span>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>

                  <td>
                    <span className="product-id">
                      {product.id}
                    </span>
                  </td>

                  <td>
                    <span className="product-name">
                      {product.name}
                    </span>
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td className="price">
                    ₱
                    {product.price.toLocaleString(
                      "en-PH",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </td>

                  <td>
                    {product.quantity}
                  </td>

                  <td>
                    <StatusBadge
                      quantity={product.quantity}
                    />
                  </td>

                  <td>
                    <div className="actions">

                      <button
                        className="edit-button"
                        onClick={() =>
                          editProduct(product)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default InventoryTable;
