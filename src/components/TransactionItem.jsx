
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

function TransactionItem({ transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <article className="transaction-item">
      <div className={`transaction-icon ${isIncome ? "icon-income" : "icon-expense"}`}>
        {isIncome ? "↙" : "↗"}
      </div>

      <div className="transaction-details">
        <h3>{transaction.title}</h3>
        <p>
          {transaction.category} <span className="dot-separator">·</span>{" "}
          {formatDate(transaction.date)}
        </p>
      </div>

      <div className="transaction-amount">
        <span className={isIncome ? "amount-income" : "amount-expense"}>
          {isIncome ? "+" : "−"}{formatCurrency(transaction.amount)}
        </span>
        <span className="transaction-status">
          {isIncome ? "Income" : "Expense"}
        </span>
      </div>
    </article>
  );
}

export default TransactionItem;
