
import { useState } from "react";

function TransactionForm({ onAddTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0 || !date) {
      return;
    }

    onAddTransaction({
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate(new Date().toLocaleDateString("en-CA"));
  }

  return (
    <section className="panel form-panel" id="add-transaction">
      <div className="section-heading">
        <div>
          <p className="eyebrow">RECORD YOUR MONEY</p>
          <h2>Add Transaction</h2>
          <p className="section-description">
            Catat pemasukan atau pengeluaran baru.
          </p>
        </div>
        <span className="heading-icon" aria-hidden="true">＋</span>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-field">
          <label htmlFor="title">Transaction name</label>
          <input
            id="title"
            type="text"
            placeholder="Contoh: Makan siang"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="amount">Amount (IDR)</label>
          <input
            id="amount"
            type="number"
            min="1"
            step="1"
            placeholder="Contoh: 25000"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="type">Transaction type</label>
            <select
              id="type"
              value={type}
              onChange={(event) => {
                setType(event.target.value);
                setCategory(event.target.value === "income" ? "Salary" : "Food");
              }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {type === "income" ? (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Allowance">Allowance</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </>
              ) : (
                <>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Education">Education</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="date">Transaction date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <button className="primary-button" type="submit">
          <span aria-hidden="true">＋</span> Add Transaction
        </button>
      </form>
    </section>
  );
}

export default TransactionForm;
