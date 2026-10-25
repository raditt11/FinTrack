
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function SummaryCards({ income, expense, balance }) {
  const summaries = [
    {
      title: "Total Balance",
      amount: balance,
      icon: "↗",
      className: "balance-card",
      description: "Your current balance",
    },
    {
      title: "Total Income",
      amount: income,
      icon: "↓",
      className: "income-card",
      description: "Money coming in",
    },
    {
      title: "Total Expenses",
      amount: expense,
      icon: "↑",
      className: "expense-card",
      description: "Money going out",
    },
  ];

  return (
    <section className="summary-grid" aria-label="Ringkasan keuangan">
      {summaries.map((item) => (
        <article className={`summary-card ${item.className}`} key={item.title}>
          <div className="summary-top">
            <span className="summary-title">{item.title}</span>
            <span className="summary-icon" aria-hidden="true">
              {item.icon}
            </span>
          </div>

          <p className="summary-amount">{formatCurrency(item.amount)}</p>
          <p className="summary-description">{item.description}</p>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;
