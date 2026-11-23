
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

const API_URL = "http://localhost:3000/transactions";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Gagal mengambil data transaksi.");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message || "Tidak dapat terhubung ke backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = income - expense;

  async function addTransaction(newTransaction) {
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message || "Gagal menambahkan transaksi."
        );
      }

      setTransactions((currentTransactions) => [
        data,
        ...currentTransactions,
      ]);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  function startEditTransaction(transaction) {
    setEditingTransaction(transaction);
  }

  async function updateTransaction(updatedTransaction) {
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/${editingTransaction.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTransaction),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message || "Gagal memperbarui transaksi."
        );
      }

      setTransactions((currentTransactions) =>
        currentTransactions.map((transaction) =>
          transaction.id === data.id ? data : transaction
        )
      );

      setEditingTransaction(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function deleteTransaction(id) {
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus transaksi.");
      }

      setTransactions((currentTransactions) =>
        currentTransactions.filter((transaction) => transaction.id !== id)
      );

      if (editingTransaction?.id === id) {
        setEditingTransaction(null);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmitTransaction(transactionData) {
    if (editingTransaction) {
      await updateTransaction(transactionData);
    } else {
      await addTransaction(transactionData);
    }
  }

  return (
    <div className="app-shell" id="dashboard">
      <Navbar />

      <main className="main-content">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">PERSONAL FINANCE DASHBOARD</p>
            <h1>
              Manage your money <span>with clarity.</span>
            </h1>
            <p className="welcome-description">
              Pantau pemasukan, kendalikan pengeluaran, dan bangun kebiasaan
              finansial yang lebih baik.
            </p>
          </div>

          <div className="date-badge">
            <span className="date-badge-icon" aria-hidden="true">◷</span>
            <div>
              <span className="date-label">TODAY</span>
              <strong>
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
            </div>
          </div>
        </section>

        {loading && <p role="status">Memuat data transaksi...</p>}

        {error && (
          <p role="alert" className="api-error">
            {error}
          </p>
        )}

        <SummaryCards
          income={income}
          expense={expense}
          balance={balance}
        />

        <div className="content-grid">
          <TransactionList
            transactions={transactions}
            onEditTransaction={startEditTransaction}
            onDeleteTransaction={deleteTransaction}
          />

          <TransactionForm
            onAddTransaction={handleSubmitTransaction}
            editingTransaction={editingTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
            onStartAdd={() => setEditingTransaction(null)}
          />
        </div>

        <footer className="app-footer">
          <span className="footer-brand">FinTrack</span>
          <span>Personal finance, made clearer.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;