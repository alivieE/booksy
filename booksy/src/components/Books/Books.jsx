import React, { useEffect, useState } from "react";
import s from "./Books.module.css";
import CategorySelect from "./Select/CategorySelect";

const Books = () => {
  const [booksList, setBooksList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [booksByCategory, setBooksByCategory] = useState([]);
  const [selectValue, setSelectValue] = useState("All Categories");

  useEffect(() => {
    fetch("https://books-backend.p.goit.global/books/top-books")
      .then((res) => res.json())
      .then((data) => {
        setBooksList(data.books);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://books-backend.p.goit.global/books/category-list")
      .then((res) => res.json())
      .then((categoriesData) => {
        setCategoryList(categoriesData);
        console.log(categoriesData);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://books-backend.p.goit.global/books/category?category=${selectValue}",
    )
      .then((res) => res.json())
      .then((booksByCategoryData) => {
        setBooksByCategory(booksByCategoryData);
        console.log(booksByCategoryData);
      });
  }, []);

  return (
    <div className="container">
      <div className={s.books}>
        <div className={s.titleWrap}>
          <p className={s.title}>Books</p>
          <p className={s.booksCount}>Showing 24 of 100</p>
        </div>
        <CategorySelect
          categoryList={categoryList}
          value={selectValue}
          onChange={setSelectValue}
        ></CategorySelect>
        <ul className={s.booksList}>
          {booksByCategory.map((book) => (
            <li key={book._id} className={s.bookItem}>
              <img
                src={book.book_image}
                alt={book.title}
                className={s.bookImage}
              />
              <p className={s.bookTitle}>{book.title}</p>
              <p className={s.bookAuthor}>{book.author}</p>
              <p className={s.bookPrice}>${book.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Books;
