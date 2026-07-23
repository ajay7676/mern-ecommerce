import { useEffect, useRef, useState } from "react";
import { FiHeart, FiUser } from "react-icons/fi";
import ProfileDropdown from "./ProfileDropdown";
import { useSelector } from "react-redux";
import NavbarCartIcon from "./NavbarCartIcon";

const UserMenu = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const profileRef = useRef(null);
  const closeTimerRef = useRef(null);

  const openProfile = () => {
    clearTimeout(closeTimerRef.current);
    setShowProfile(true);
  };

  const closeProfileWithDelay = () => {
    closeTimerRef.current = setTimeout(() => {
      setShowProfile(false);
    }, 150);
  };

  const closeProfile = () => {
    clearTimeout(closeTimerRef.current);
    setShowProfile(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        closeProfile();
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeProfile();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      clearTimeout(closeTimerRef.current);
    };
  }, []);
   

  return (
    <div className="hidden md:flex items-center gap-6">
      <div
        ref={profileRef}
        className="relative"
        onMouseEnter={openProfile}
        onMouseLeave={closeProfileWithDelay}
      >
        <button
          type="button"
          className="flex flex-col items-center cursor-pointer text-xs font-semibold text-slate-800 hover:text-red-500 transition"
          aria-haspopup="menu"
          aria-expanded={showProfile}
        >
          <FiUser className="text-2xl" />
          <span >{isAuthenticated ? `${user?.name?.split(" ")[0]}` : "Sign In"}</span>
        </button>

        <div
          className={`absolute -right-15 top-full mt-3 z-50 transition-all duration-200 ease-out ${
            showProfile
              ? "opacity-100 visible translate-y-0 scale-100"
              : "opacity-0 invisible -translate-y-2 scale-95"
          }`}
        >
          <ProfileDropdown
            isAuthenticated={isAuthenticated}
            user={user}
            onClose={closeProfile}
          />
        </div>
      </div>

      <button
        type="button"
        className="flex flex-col items-center text-xs font-semibold text-slate-800 hover:text-red-500 transition"
      >
        <FiHeart className="text-2xl" />
        <span>Wishlist</span>
      </button>
      <NavbarCartIcon />
    </div>
  );
};

export default UserMenu;