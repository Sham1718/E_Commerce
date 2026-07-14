import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo & About */}
          <div>
            <h2
              onClick={() => navigate("/")}
              className="text-3xl font-bold text-white cursor-pointer"
            >
              Shop<span className="text-blue-500">Sphere</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              A full-stack E-commerce application built with
              React, Spring Boot, MySQL, Redux Toolkit,
              Tailwind CSS, and Shadcn UI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li
                onClick={() => navigate("/")}
                className="hover:text-white cursor-pointer"
              >
                Home
              </li>

              <li
                onClick={() => navigate("/add")}
                className="hover:text-white cursor-pointer"
              >
                Add Product
              </li>

              <li
                onClick={() => navigate("/cart")}
                className="hover:text-white cursor-pointer"
              >
                Cart
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Tech Stack
            </h3>

            <div className="flex flex-wrap gap-2">

              <span className="bg-slate-800 px-3 py-1 rounded-md text-sm">
                React
              </span>

              <span className="bg-slate-800 px-3 py-1 rounded-md text-sm">
                Spring Boot
              </span>

              <span className="bg-slate-800 px-3 py-1 rounded-md text-sm">
                MySQL
              </span>

              <span className="bg-slate-800 px-3 py-1 rounded-md text-sm">
                Redux
              </span>

              <span className="bg-slate-800 px-3 py-1 rounded-md text-sm">
                Tailwind
              </span>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ShopSphere. All rights reserved.
          </p>

          <p className="text-sm text-gray-500 mt-3 md:mt-0">
            Built with ❤️ using React & Spring Boot
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;