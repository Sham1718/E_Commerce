import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../redux/productSlice";
import Button from "./Button";
import Input from "./Input";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  imageUrl: "",
};

const categories = ["Electronics", "Fashion", "Books", "Sports", "Furniture"];

const validateProduct = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Product name is required.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  }

  if (!values.category) {
    errors.category = "Category is required.";
  }

  if (!values.imageUrl.trim()) {
    errors.imageUrl = "Image URL is required.";
  }

  if (!values.price || Number(values.price) <= 0) {
    errors.price = "Price must be greater than 0.";
  }

  if (values.stock === "" || Number(values.stock) < 0) {
    errors.stock = "Stock cannot be negative.";
  }

  return errors;
};

const ProductForm = ({ mode = "add", initialProduct = emptyProduct, productId }) => {
  const [values, setValues] = useState({ ...emptyProduct, ...initialProduct });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutationLoading = useSelector((state) => state.product.mutationLoading);
  const isEdit = mode === "edit";

  const formTitle = useMemo(() => (isEdit ? "Edit Product" : "Add New Product"), [isEdit]);
  const submitLabel = useMemo(() => (isEdit ? "Update Product" : "Add Product"), [isEdit]);

  const setField = useCallback((field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const validationErrors = validateProduct(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        toast.info("Please fix the highlighted fields.");
        return;
      }

      const product = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        stock: Number(values.stock),
        category: values.category,
        imageUrl: values.imageUrl.trim(),
      };

      try {
        if (isEdit) {
          await dispatch(editProduct({ id: productId, product })).unwrap();
          toast.success("Product Updated");
        } else {
          await dispatch(addProduct(product)).unwrap();
          toast.success("Product Added");
        }
        navigate("/");
      } catch (error) {
        toast.error(error);
      }
    },
    [dispatch, isEdit, navigate, productId, values],
  );

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-lg sm:p-8">
      <h1 className="text-3xl font-bold text-slate-900">{formTitle}</h1>
      <p className="mt-2 text-slate-500">
        Keep product data complete so the storefront looks consistent.
      </p>

      <div className="mt-8 space-y-5">
        <Input
          label="Product Name"
          type="text"
          placeholder="Enter product name"
          value={values.name}
          onChange={(event) => setField("name", event.target.value)}
          error={errors.name}
        />

        <Input
          label="Description"
          textarea
          rows="4"
          placeholder="Enter product description"
          value={values.description}
          onChange={(event) => setField("description", event.target.value)}
          error={errors.description}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter price"
            value={values.price}
            onChange={(event) => setField("price", event.target.value)}
            error={errors.price}
          />

          <Input
            label="Stock"
            type="number"
            min="0"
            placeholder="Enter stock"
            value={values.stock}
            onChange={(event) => setField("stock", event.target.value)}
            error={errors.stock}
          />
        </div>

        <Input label="Category" error={errors.category}>
          <select
            value={values.category}
            onChange={(event) => setField("category", event.target.value)}
            className={`w-full rounded-lg border px-3 py-2.5 text-slate-800 outline-none transition focus:ring-2 ${
              errors.category
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Input>

        <Input
          label="Image URL"
          type="url"
          placeholder="Paste image URL"
          value={values.imageUrl}
          onChange={(event) => setField("imageUrl", event.target.value)}
          error={errors.imageUrl}
        />

        {values.imageUrl && (
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Image Preview</p>
            <img src={values.imageUrl} alt="Preview" className="h-52 w-52 rounded-lg border border-slate-200 object-cover" />
          </div>
        )}

        <div className="flex flex-col gap-3 pt-3 sm:flex-row">
          <Button type="submit" variant={isEdit ? "warning" : "primary"} className="flex-1" isLoading={mutationLoading}>
            {submitLabel}
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => navigate(-1)} disabled={mutationLoading}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(ProductForm);
