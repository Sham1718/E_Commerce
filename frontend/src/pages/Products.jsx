import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { fetchByCategory, fetchByName, fetchProducts, setPage } from "../redux/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, page, totalPages, search, category } = useSelector((state) => state.product);

  const emptyContent = useMemo(() => {
    if (search.trim()) {
      return {
        icon: "⌕",
        title: "No Search Result",
        message: `No products matched "${search.trim()}". Try a different keyword.`,
      };
    }

    if (category) {
      return {
        icon: "□",
        title: "No Products in Category",
        message: `There are no products listed under ${category} yet.`,
      };
    }

    return {
      icon: "+",
      title: "No Products Found",
      message: "Add your first product to start building the catalog.",
      actionLabel: "Add Product",
      onAction: () => navigate("/add"),
    };
  }, [category, navigate, search]);

  const handlePageChange = useCallback(
    (nextPage) => {
      dispatch(setPage(nextPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch],
  );

  const retry = useCallback(() => {
    const searchText = search.trim();
    if (searchText) {
      dispatch(fetchByName({ search: searchText, page }));
    } else if (category) {
      dispatch(fetchByCategory({ category, page }));
    } else {
      dispatch(fetchProducts(page));
    }
  }, [category, dispatch, page, search]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Latest Products</h2>
          <p className="mt-2 text-slate-500">
            {search.trim() ? `Searching for "${search.trim()}"` : category ? `Showing ${category}` : "Browse our collection of products."}
          </p>
        </div>
        {loading && <p className="text-sm font-semibold text-blue-600">Updating products...</p>}
      </div>

      {error && <ErrorMessage error={error} onRetry={retry} />}

      {loading ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length === 0 && !error ? (
        <EmptyState {...emptyContent} />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} loading={loading} />
        </>
      )}
    </section>
  );
};

export default React.memo(Products);
