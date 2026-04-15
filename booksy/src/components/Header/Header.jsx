import { React, useState } from "react";
import s from "./Header.module.css";
import images from "../../assets/index.js";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <header
      className={isOpenMenu ? `${s.header} ${s.overflow}` : s.header}
      id="header"
    >
      <div className="container">
        <div className={s.wrap}>
            <a className={s.logo} href="#header">
              <img src={images.logo} alt="logo" />
              <p className={s.logoName}>Booksy</p>
            </a>

          <nav class="nav">
            <button
              className={s.menuAndClose}
              onClick={() => {
                setIsOpenMenu(true);
              }}
            >
              <img src={images.menu} />
            </button>

            <div className={s.desktopMenu}>
              <ul className={s.menuItems}>
                <li>
                  <a href="#header" className={s.links}>
                    Home
                  </a>
                </li>

                <li>
                  <a href="#aboutUs" className={s.links}>
                    Books
                  </a>
                </li>

                <li>
                  <a href="#popular" className={s.links}>
                    Feedbacks
                  </a>
                </li>

                <li>
                  <a href="#questions" className={s.links}>
                    Events
                  </a>
                </li>

                <li>
                  <a href="#feedbacks" className={s.links}>
                    Location
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {isOpenMenu && (
        <div
          className={isOpenMenu ? `${s.burgerMenu} ${s.open}` : s.burgerMenu}
        >
          <div className={s.wrapBurger}>
            <div className={s.logoOpenMenu}>
              <img src={images.logo} alt="logo" />
              <p className={s.logoName}>Booksy</p>
            </div>
            <button
              className={s.menuAndClose}
              onClick={() => {
                setIsOpenMenu(false);
              }}
            >
              <img src={images.close} />
            </button>
          </div>

          <ul className={s.menuItems}>
            <li>
              <a
                href="#header"
                className={s.links}
                onClick={() => {
                  setIsOpenMenu(false);
                }}
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#aboutUs"
                className={s.links}
                onClick={() => {
                  setIsOpenMenu(false);
                }}
              >
                Books
              </a>
            </li>
            <li>
              <a
                href="#popular"
                className={s.links}
                onClick={() => {
                  setIsOpenMenu(false);
                }}
              >
                Feedbacks
              </a>
            </li>
            <li>
              <a
                href="#questions"
                className={s.links}
                onClick={() => {
                  setIsOpenMenu(false);
                }}
              >
                Events
              </a>
            </li>

            <li>
              <a
                href="#feedbacks"
                className={s.links}
                onClick={() => {
                  setIsOpenMenu(false);
                }}
              >
                Location
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
