import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../api/api";

const Products = () => {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [categoryFilter,
    setCategoryFilter] =
    useState("");

  const [editingProduct,
    setEditingProduct] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      price: "",
      category: "",
      stock: "",
      sales: "",
    });

  // FETCH PRODUCTS
  const fetchProducts =
    async () => {

      try {

        const { data } =
          await API.get(
            "/products"
          );

        setProducts(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // DELETE PRODUCT
  const deleteProduct =
    async (id) => {

      try {

        await API.delete(
          `/products/${id}`
        );

        fetchProducts();

      } catch (error) {

        console.log(error);
      }
    };

  // START EDIT
  const startEdit = (
    product
  ) => {

    setEditingProduct(
      product._id
    );

    setFormData({
      title:
        product.title,

      price:
        product.price,

      category:
        product.category,

      stock:
        product.stock,

      sales:
        product.sales,
    });
  };

  // UPDATE PRODUCT
  const updateProduct =
    async (id) => {

      try {

        await API.put(
          `/products/${id}`,
          formData
        );

        setEditingProduct(
          null
        );

        fetchProducts();

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FILTER PRODUCTS
  const filteredProducts =
    products.filter(
      (product) => {

        const matchesSearch =
          product.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          categoryFilter === "" ||
          product.category ===
            categoryFilter;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="bg-slate-700 p-3 rounded w-full"
        />

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
          className="bg-slate-700 p-3 rounded"
        >
          <option value="">
            All Categories
          </option>

          {[...new Set(
            products.map(
              (p) =>
                p.category
            )
          )].map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full bg-slate-800 rounded-lg overflow-hidden">

            <thead className="bg-slate-700">

              <tr>

                <th className="p-4">
                  Title
                </th>

                <th className="p-4">
                  Price
                </th>

                <th className="p-4">
                  Category
                </th>

                <th className="p-4">
                  Stock
                </th>

                <th className="p-4">
                  Sales
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map(
                (product) => (

                  <tr
                    key={
                      product._id
                    }
                    className="border-t border-slate-700"
                  >

                    <td className="p-4">
                      {
                        product.title
                      }
                    </td>

                    <td className="p-4">
                      $
                      {
                        product.price
                      }
                    </td>

                    <td className="p-4">
                      {
                        product.category
                      }
                    </td>

                    <td className="p-4">
                      {
                        product.stock
                      }
                    </td>

                    <td className="p-4">
                      {
                        product.sales
                      }
                    </td>

                    <td className="p-4 flex gap-2">

                      <button
                        onClick={() =>
                          startEdit(
                            product
                          )
                        }
                        className="bg-blue-500 px-4 py-2 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(
                            product._id
                          )
                        }
                        className="bg-red-500 px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Products;