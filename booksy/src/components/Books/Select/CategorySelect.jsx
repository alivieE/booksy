import { useEffect, useRef, useState } from "react";
import s from "./CategorySelect.module.css";

const ALL_CATEGORIES_LABEL = "All Categories";

// const VALUES = {
//   "All Categories": "All Categories",
//   "Paperback Nonfiction": "Paperback%20Nonfiction",
//   "Trade Fiction Paperback": "Trade%20Fiction%20Paperback",
//   "Series Books": "Series%20Books",
//   "Picture Books": "Picture%20Books",
//   "Hardcover Fiction": "Hardcover%20Fiction",
//   "Hardcover Nonfiction": "Hardcover%20Nonfiction",
//   "Paperback Nonfiction": "Paperback%20Nonfiction",
//   "Childrens Middle Grade Hardcover": "Childrens%20Middle%20Grade%20Hardcover",
//   "Young Adult Hardcover": "Young%20Adult%20Hardcover",
//   "Combined Print and E-Book Nonfiction":
//     "Combined%20Print%20and%20E-Book%20Nonfiction",
//   "Combined Print and E-Book Fiction":
//     "Combined%20Print%20and%20E-Book%20Fiction",
// };

const CategorySelect = ({
  categoryList = [],
  value,
  onChange,
  placeholder = "Виберіть категорію",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  // Закриття при кліку поза компонентом
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (listName) => {
    onChange(listName);
    setIsOpen(false);
  };

  // Якщо value порожнє — показуємо "Всі категорії", інакше сам value
  const displayValue = value || ALL_CATEGORIES_LABEL;

  return (
    <div className={s.select} ref={rootRef}>
      <button
        type="button"
        className={`${s.trigger} ${isOpen ? s.open : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={s.value}>{displayValue}</span>
        <span className={s.arrow} aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <ul className={s.list} role="listbox">
          {/* Опція "Всі категорії" — значення "" */}
          <li
            className={`${s.option} ${value === "" ? s.selected : ""}`}
            role="option"
            aria-selected={value === ""}
            onClick={() => handleSelect("All Categories")}
          >
            {ALL_CATEGORIES_LABEL}
          </li>

          {categoryList
            .filter(
              (category) =>
                category.list_name && category.list_name.trim() !== ""
            )
            .map((category) => {
              const isSelected = category.list_name === value;

              if (
                category.list_name == "Advice, How-To & Miscellaneous" ||
                category.list_name == "Combined Print & E-Book Fiction" ||
                category.list_name == "Combined Print & E-Book Nonfiction" ||
                category.list_name == "Children's & Young Adult Series"
              )
                return;

              return (
                <li
                  key={category.list_name}
                  className={`${s.option} ${isSelected ? s.selected : ""}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(category.list_name)}
                >
                  {category.list_name}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default CategorySelect;
