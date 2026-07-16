import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { addCartItem } from "../redux/cartSlice";
import { clearProductDetails, fetchProductDetails, removeProduct } from "../redux/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct: product, detailsLoading, detailsError, mutationLoading } = useSelector((state) => state.product);
  const cartLoading = useSelector((state) => state.cart.actionLoading);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const request = dispatch(fetchProductDetails(id));
    return () => {
      request.abort();
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  const handleAddToCart = useCallback(async () => {
    try {
      await dispatch(addCartItem(Number(id))).unwrap();
      toast.success("Added to Cart");
    } catch (error) {
      toast.error(error);
    }
  }, [dispatch, id]);

  const handleDelete = useCallback(async () => {
    try {
      await dispatch(removeProduct(id)).unwrap();
      toast.success("Product Deleted");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  }, [dispatch, id, navigate]);

  if (detailsLoading) {
    return (
      <main className="min-h-screen bg-slate-100">
        <Spinner label="Loading product..." className="py-28" />
      </main>
    );
  }

  if (detailsError) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <ErrorMessage error={detailsError} title="Product details unavailable" onRetry={() => dispatch(fetchProductDetails(id))} />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <EmptyState title="Product Not Found" message="The product may have been removed." actionLabel="Back to Products" onAction={() => navigate("/")} />
        </div>
      </main>
    );
  }

  const inStock = Number(product.stock) > 0;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 text-sm font-medium text-slate-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>

        <section className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="grid lg:grid-cols-2">
            <div className="bg-slate-50 p-6 sm:p-10">
              <div className="flex min-h-96 items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
                <img src={product.imageUrl} alt={product.name} className="max-h-96 w-full object-contain" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="aspect-square rounded-lg border border-slate-200 bg-white p-2">
                    <img src={product.imageUrl} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700">{product.category}</span>
                <span className={`rounded-full px-4 py-1 text-sm font-bold ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {inStock ? "Available" : "Out of Stock"}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-bold text-slate-900">{product.name}</h1>
              <p className="mt-4 text-3xl font-bold text-green-700">₹{product.price}</p>
              <p className="mt-6 leading-8 text-slate-600">{product.description}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Stock</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{inStock ? `${product.stock} available` : "Out of stock"}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Product ID</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">#{product.id}</p>
                </div>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <Button variant="dark" onClick={handleAddToCart} disabled={!inStock} isLoading={cartLoading}>
                  Add To Cart
                </Button>
                <Button variant="warning" onClick={() => navigate(`/edit/${product.id}`)}>
                  Edit Product
                </Button>
                <Button variant="danger" onClick={() => setConfirmDelete(true)} isLoading={mutationLoading}>
                  Delete Product
                </Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ConfirmationModal
        open={confirmDelete}
        title="Are you sure?"
        message="This product will be permanently deleted."
        confirmLabel="Delete"
        isLoading={mutationLoading}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </main>
  );
};

export default React.memo(ProductDetails);
