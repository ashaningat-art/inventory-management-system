function Summary({ products }) {
  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const lowStock = products.filter(
    (product) =>
      product.quantity > 0 && product.quantity <= 5
  ).length;

  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;

  return (
    <section className="summary">

      <div className="summary-card">
        <div className="summary-title">
          Total Products
        </div>

        <div className="summary-number">
          {products.length}
        </div>

        <div className="summary-label">
          Products in inventory
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-title">
          Total Quantity
        </div>

        <div className="summary-number">
          {totalQuantity}
        </div>

        <div className="summary-label">
          Items available
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-title">
          Low Stock
        </div>

        <div className="summary-number">
          {lowStock}
        </div>

        <div className="summary-label">
          Need attention
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-title">
          Out of Stock
        </div>

        <div className="summary-number">
          {outOfStock}
        </div>

        <div className="summary-label">
          Currently unavailable
        </div>
      </div>

    </section>
  );
}

export default Summary;
