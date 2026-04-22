import { useEffect, useRef, useState } from "react";
import s from "./CategorySelect.module.css";

const ALL_CATEGORIES_LABEL = "All Categories";

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
            onClick={() => handleSelect("")}
          >
            {ALL_CATEGORIES_LABEL}
          </li>

          {categoryList
            .filter(
              (category) =>
                category.list_name && category.list_name.trim() !== "",
            )
            .map((category) => {
              const isSelected = category.list_name === value;
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
