import React from "react";
import Products from "./Products";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">ShopSphere</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Discover products, manage inventory, and keep the cart experience fast and clear.
          </p>
        </div>
      </section>

      <Products />
    </main>
  );
};

export default React.memo(Home);
