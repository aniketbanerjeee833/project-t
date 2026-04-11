import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import { setLoggedIn } from "../../redux/reducer/userReducer";
import { NavLink, useNavigate } from "react-router-dom";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const { loggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();

  // ── Sticky on scroll ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close on outside click ────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (!e.target.closest("#menu") && !e.target.closest("#toggle")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  const handleClose = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap();
      if (response?.success) {
        dispatch(setLoggedIn(false));
        navigate("/");
        toast.success(response?.message || "Logout successful");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Logout failed");
    }
  };

  return (
    <header className={`custom-header ${sticky ? "sticky" : ""}`}>
      <div className="container">

        {/* Logo */}
        <div className="logo">
          <NavLink to="/" onClick={handleClose}>
            <img src="/assets/img/logo.png" alt="TAGWAY" />
          </NavLink>
        </div>

        {/* Menu — "active" matches your original CSS */}
        <nav className={`menu ${menuOpen ? "active" : ""}`} id="menu">
          <NavLink to="/"        onClick={handleClose}>HOME</NavLink>
          <NavLink to="/about"   onClick={handleClose}>ABOUT US</NavLink>
          <NavLink to="/shop"    onClick={handleClose}>SHOP</NavLink>
          <NavLink to="/faq"     onClick={handleClose}>FAQ</NavLink>
          <NavLink to="/contact" onClick={handleClose}>CONTACT US</NavLink>

          <>
            {loggedIn ? (
              <>
                <NavLink to="/my-profile" className=""  onClick={handleClose}>
                  PROFILE
                </NavLink>
                <NavLink
                  to="#"
                  className="login-btn"
                  onClick={() => { handleClose(); handleLogout(); }}
                >
                  {isLogoutLoading ? "LOGGING OUT..." : "LOGOUT"}
                </NavLink>
              </>
            ) : (
              <div className="auth-buttons">
                <NavLink to="/login"    className="login-btn"    onClick={handleClose}>LOGIN</NavLink>
                <NavLink to="/register" className="register-btn" onClick={handleClose}>REGISTER</NavLink>
              </div>
            )}
          </>
        </nav>

        {/* Mobile Toggle */}
        <div
          className={`toggle ${menuOpen ? "active" : ""}`}
          id="toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "☰" : "☰"}
        </div>

      </div>
    </header>
  );
}