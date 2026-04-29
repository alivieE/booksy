import React, { useEffect, useState } from "react";
import s from "./Books.module.css";
import CategorySelect from "./Select/CategorySelect";

const Books = () => {
  const [booksList, setBooksList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectValue, setSelectValue] = useState("All Categories");

  // useEffect(() => {
  //   fetch("https://books-backend.p.goit.global/books/top-books")
  //     .then((res) => res.json())
  //     .then((dataBooks) => {
  //       setBooksList(dataBooks[0]?.books);
  //       // console.log(dataBooks);
  //     });
  // }, []);

  useEffect(() => {
    fetch("https://books-backend.p.goit.global/books/category-list")
      .then((res) => res.json())
      .then((categoriesData) => {
        setCategoryList(categoriesData);
        console.log(categoriesData);
      });
  }, []);
  console.log(booksList);

  useEffect(() => {
    if (selectValue == "All Categories") { 
      fetch("https://books-backend.p.goit.global/books/top-books")
      .then((res) => res.json())
      .then((dataBooks) => {
        setBooksList(dataBooks[0]?.books);
      });
    return
    }
    fetch(
      `https://books-backend.p.goit.global/books/category?category=${selectValue}`,
    )
      .then((res) => res.json())
      .then((dataBooks) => {
        setBooksList(dataBooks);
      });
  }, [selectValue]);

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
          {booksList.length > 0 &&
            booksList.map((books) => (
              <li key={books._id} className={s.bookItem}>
                <img className={s.image} src={books.book_image} />
                <div className={s.descWrap}>
                  <div className={s.desc}>
                    <p className={s.bookTitle}>{books.title}</p>
                    <p className={s.author}>{books.author}</p>
                  </div>
                  <p className={s.price}>${books.price}</p>
                </div>
                <button className={s.btnLearnMore}>Learn More</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Books;
