import React, { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import BooksInfo from "./pages/BooksInfo";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    const dupeItem = cart.find((item) => +item.id === +books.id);
    if (dupeItem) {
      setCart(
        cart.map((item) => {
          if (item.id === dupeItem.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) => 
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter
  }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={<BooksInfo books={books} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
