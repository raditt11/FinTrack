
import { useEffect, useState } from "react";

function TransactionForm({
  onAddTransaction,
  editingTransaction,
  onCancelEdit,
  onStartAdd,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function resetForm() {
    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
    setFormError("");
  }

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(String(editingTransaction.amount));
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
      setFormError("");
    } else {
      resetForm();
    }
  }, [editingTransaction]);

  function handleTypeChange(event) {
    const selectedType = event.target.value;

    setType(selectedType);
    setCategory(selectedType === "income" ? "Salary" : "Food");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0 || !date) {
      setFormError("Lengkapi seluruh data dengan benar.");
      return;
    }

    const transactionData = {
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    };

    try {
      setSubmitting(true);
      setFormError("");

      await onAddTransaction(transactionData);

      if (!editingTransaction) {
        resetForm();
      }
    } catch (error) {
      setFormError(error.message || "Transaksi gagal disimpan.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSwitchMode() {
    if (editingTransaction) {
      onStartAdd();
    } else {
      resetForm();
    }
  }

  return (
    <section className="panel form-panel" id="add-transaction">
      <div className="section-heading">
        <div>
          <p className="eyebrow">RECORD YOUR MONEY</p>
          <h2>
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <p className="section-description">
            {editingTransaction
              ? "Perbarui informasi transaksi."
              : "Catat pemasukan atau pengeluaran baru."}
          </p>
        </div>

        <button
          type="button"
          className="heading-icon"
          onClick={handleSwitchMode}
          aria-label={
            editingTransaction
              ? "Beralih ke tambah transaksi"
              : "Kosongkan formulir"
          }
          title={
            editingTransaction
              ? "Add new transaction"
              : "Clear form"
          }
        >
          ＋
        </button>
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
            minLength="3"
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
              onChange={handleTypeChange}
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
                  <option value="Freelance">Freelance</option>
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

        {formError && (
          <p role="alert" className="api-error">
            {formError}
          </p>
        )}

        <button
          className="primary-button"
          type="submit"
          disabled={submitting}
        >
          <span aria-hidden="true">
            {submitting ? "…" : editingTransaction ? "✓" : "＋"}
          </span>
          {submitting
            ? "Saving..."
            : editingTransaction
              ? "Update Transaction"
              : "Add Transaction"}
        </button>

        {editingTransaction && (
          <button
            className="primary-button"
            type="button"
            onClick={onCancelEdit}
            disabled={submitting}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </section>
  );
}

export default TransactionForm;