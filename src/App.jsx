
import { useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

const initialTransactions = [
  {
    id: 1,
    title: "Monthly Allowance",
    amount: 1500000,
    type: "income",
    category: "Allowance",
    date: "2026-10-01",
  },
  {
    id: 2,
    title: "Groceries",
    amount: 175000,
    type: "expense",
    category: "Food",
    date: "2026-10-03",
  },
  {
    id: 3,
    title: "Transportation",
    amount: 50000,
    type: "expense",
    category: "Transport",
    date: "2026-10-05",
  },
  {
    id: 4,
    title: "Freelance Project",
    amount: 450000,
    type: "income",
    category: "Business",
    date: "2026-10-08",
  },
  {
    id: 5,
    title: "Study Supplies",
    amount: 85000,
    type: "expense",
    category: "Education",
    date: "2026-10-10",
  },
];

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expense;

  function addTransaction(newTransaction) {
    setTransactions((currentTransactions) => [
      {
        ...newTransaction,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      },
      ...currentTransactions,
    ]);
  }

  return (
    <div className="app-shell" id="dashboard">
      <Navbar />

      <main className="main-content">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">PERSONAL FINANCE DASHBOARD</p>
            <h1>Manage your money <span>with clarity.</span></h1>
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

        <SummaryCards
          income={income}
          expense={expense}
          balance={balance}
        />

        <div className="content-grid">
          <TransactionList transactions={transactions} />
          <TransactionForm onAddTransaction={addTransaction} />
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
