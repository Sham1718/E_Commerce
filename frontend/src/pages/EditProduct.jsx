import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import ProductForm from "../components/ProductFrom";
import Spinner from "../components/Spinner";
import { clearProductDetails, fetchProductDetails } from "../redux/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, detailsLoading, detailsError } = useSelector((state) => state.product);

  useEffect(() => {
    const request = dispatch(fetchProductDetails(id));
    return () => {
      request.abort();
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {detailsLoading && <Spinner label="Loading product..." className="py-20" />}
        {detailsError && <ErrorMessage error={detailsError} title="Product could not be loaded" />}
        {currentProduct && (
          <ProductForm
            mode="edit"
            productId={id}
            initialProduct={{
              name: currentProduct.name || "",
              description: currentProduct.description || "",
              price: currentProduct.price ?? "",
              stock: currentProduct.stock ?? "",
              category: currentProduct.category || "",
              imageUrl: currentProduct.imageUrl || "",
            }}
          />
        )}
      </div>
    </main>
  );
};

export default React.memo(EditProduct);
