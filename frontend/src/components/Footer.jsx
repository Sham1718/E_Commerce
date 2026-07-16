import React from "react";
import { useNavigate } from "react-router-dom";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Add Product", path: "/add" },
  { label: "Cart", path: "/cart" },
];

const categories = ["Electronics", "Fashion", "Books", "Furniture", "Sports"];
const techStack = ["React", "Redux Toolkit", "Spring Boot", "MySQL", "Tailwind CSS"];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-left text-3xl font-extrabold text-slate-900 transition hover:text-blue-700"
            >
              Shop<span className="text-blue-600">Sphere</span>
            </button>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
              A full-stack ecommerce application for managing products,
              browsing categories, searching inventory, and handling cart
              workflows with a clean shopping experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Browse Products
              </button>
              <button
                type="button"
                onClick={() => navigate("/add")}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Product
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <button
                    type="button"
                    onClick={() => navigate(link.path)}
                    className="text-sm font-medium text-slate-600 transition hover:text-blue-700 focus:outline-none focus:text-blue-700"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Categories
            </h3>
            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category} className="text-sm font-medium text-slate-600">
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {techStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:items-center sm:gap-3">
              <p>&copy; {new Date().getFullYear()} ShopSphere.</p>
              <span className="hidden text-slate-300 sm:inline">|</span>
              <p>Built with React and Spring Boot.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
