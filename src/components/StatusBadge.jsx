function StatusBadge({ quantity }) {
  let status = "In Stock";
  let className = "in-stock";

  if (quantity === 0) {
    status = "Out of Stock";
    className = "out-of-stock";
  } else if (quantity <= 5) {
    status = "Low Stock";
    className = "low-stock";
  }

  return (
    <span className={`status ${className}`}>
      <span className="status-dot"></span>
      {status}
    </span>
  );
}

export default StatusBadge;
