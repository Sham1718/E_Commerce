import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoute from "./routes/AppRoute";

import {
    searchProducts,
    getProductsByCategory
} from "./service/productService";

import {
    fetchProducts,
    setPage,
    fetchByName
} from "./redux/productSlice";

import { useDispatch, useSelector } from "react-redux";

function App() {

    const dispatch = useDispatch();
    const {
        search,
        category,
        page,
        totalPages
    } = useSelector(state => state.product);

    const setPrev = () => {
        if (page > 0) {
            dispatch(setPage(page - 1));
        }
    };

    const setNext = () => {
        if (page < totalPages - 1) {
            dispatch(setPage(page + 1));
        }
    };

    const handleSearch =  () => {
       dispatch(fetchByName(search,page))
    };

    const handleCategory = async (value) => {

        try {

            if (value === "") {

                dispatch(fetchProducts(page));

            } else {

                const res = await getProductsByCategory(value, page);

                // Temporary until category thunk
                console.log(res.data);

            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        if (search.trim() !== "") {

            handleSearch();

        }
        else if (category !== "") {

            handleCategory(category);

        }
        else {

            dispatch(fetchProducts(page));

        }

    }, [page, search, category, dispatch]);

    return (
        <>
            <Navbar
                handleSearch={handleSearch}
                handleCategory={handleCategory}
            />

            <AppRoute
                setPrev={setPrev}
                setNext={setNext}
            />

            <Footer />
        </>
    );
}

export default App;