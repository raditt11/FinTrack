
function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="#dashboard" aria-label="FinTrack Dashboard">
        <span className="brand-icon">F</span>
        <span>FinTrack</span>
      </a>

      <nav className="nav-links" aria-label="Navigasi utama">
        <a className="nav-link active" href="#dashboard">
          Overview
        </a>
        <a className="nav-link" href="#transactions">
          Transactions
        </a>
        <a className="nav-link" href="#add-transaction">
          Add transaction
        </a>
      </nav>

      <div className="profile">
        <div className="profile-avatar">R</div>
        <div className="profile-info">
          <span className="profile-name">My Account</span>
          <span className="profile-role">Personal Finance</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;