
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function TransactionItem({
  transaction,
  onEditTransaction,
  onDeleteTransaction,
}) {
  const isIncome = transaction.type === "income";

  function handleDelete() {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus transaksi "${transaction.title}"?`
    );

    if (confirmed) {
      onDeleteTransaction(transaction.id);
    }
  }

  return (
    <article className="transaction-item">
      <div
        className={`transaction-icon ${
          isIncome ? "icon-income" : "icon-expense"
        }`}
      >
        {isIncome ? "↙" : "↗"}
      </div>

      <div className="transaction-details">
        <h3>{transaction.title}</h3>
        <p>
          {transaction.category}
          <span className="dot-separator">·</span>{" "}
          {formatDate(transaction.date)}
        </p>
      </div>

      <div className="transaction-amount">
        <span className={isIncome ? "amount-income" : "amount-expense"}>
          {isIncome ? "+" : "−"}
          {formatCurrency(transaction.amount)}
        </span>

        <span className="transaction-status">
          {isIncome ? "Income" : "Expense"}
        </span>

        <div className="transaction-actions">
          <button
            type="button"
            className="action-button edit-button"
            onClick={() => onEditTransaction(transaction)}
            aria-label={`Edit ${transaction.title}`}
            title="Edit transaction"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
            </svg>
          </button>

          <button
            type="button"
            className="action-button delete-button"
            onClick={handleDelete}
            aria-label={`Delete ${transaction.title}`}
            title="Delete transaction"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="m19 6-1 14H6L5 6" />
              <path d="M10 11v5M14 11v5" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default TransactionItem;