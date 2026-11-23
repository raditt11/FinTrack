
import TransactionItem from "./TransactionItem";

function TransactionList({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}) {
  const sortedTransactions = [...transactions].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <section className="panel transaction-panel" id="transactions">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR MONEY ACTIVITY</p>
          <h2>Recent Transactions</h2>
          <p className="section-description">
            Riwayat pemasukan dan pengeluaranmu.
          </p>
        </div>

        <span className="transaction-count">
          {transactions.length} records
        </span>
      </div>

      {sortedTransactions.length > 0 ? (
        <div className="transaction-list">
          {sortedTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEditTransaction={onEditTransaction}
              onDeleteTransaction={onDeleteTransaction}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">↗</div>
          <h3>Belum ada data transaksi</h3>
          <p>
            Tambahkan transaksi pertamamu melalui formulir di samping.
          </p>
        </div>
      )}
    </section>
  );
}

export default TransactionList;