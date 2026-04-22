import React, { useEffect, useState } from "react";

const Books = () => {
  const [booksList, setBooksList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

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

  return (
    <div>
      <ul>
        {categoryList > 0 &&
          categoryList.map((categories) => {
            return <li key={categories.list_name}>{categories.list_name}</li>;
          })}
      </ul>
      asjdhgasdhjkg
    </div>
  );
};

export default Books;
