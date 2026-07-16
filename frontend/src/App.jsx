import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoute from "./routes/AppRoute";
import { fetchCart } from "./redux/cartSlice";
import { fetchByCategory, fetchByName, fetchProducts } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { search, category, page } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const searchText = search.trim();
    let request;

    const timer = setTimeout(() => {
      if (searchText) {
        request = dispatch(fetchByName({ search: searchText, page }));
        return;
      }

      if (category) {
        request = dispatch(fetchByCategory({ category, page }));
        return;
      }

      request = dispatch(fetchProducts(page));
    }, searchText ? 500 : 0);

    return () => {
      clearTimeout(timer);
      if (request?.abort) {
        request.abort();
      }
    };
  }, [page, search, category, dispatch]);

  return (
    <>
      <Navbar />
      <AppRoute />
      <Footer />
      <ToastContainer position="top-right" autoClose={2500} newestOnTop pauseOnHover />
    </>
  );
}

export default App;
