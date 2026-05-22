import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../api/api";

import RevenueChart from "../components/RevenueChart";

import MonthlyRevenueChart from "../components/MonthlyRevenueChart";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

const Dashboard = () => {

  const [analytics, setAnalytics] =
    useState(null);

  const [products, setProducts] =
    useState([]);

  const fetchAnalytics =
    async () => {

      try {

        const { data } =
          await API.get(
            "/analytics"
          );

        setAnalytics(data);

      } catch (error) {

        console.log(error);
      }
    };

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
      }
    };

  // EXPORT PDF
  const exportPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "SmartStore AI Report",
      20,
      20
    );

    autoTable(doc, {

      head: [[
        "Title",
        "Price",
        "Sales",
        "Revenue",
      ]],

      body: products.map(
        (product) => [
          product.title,

          product.price,

          product.sales,

          product.price *
            product.sales,
        ]
      ),
    });

    doc.save(
      "smartstore-report.pdf"
    );
  };

  useEffect(() => {

    fetchAnalytics();

    fetchProducts();

  }, []);

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={exportPDF}
          className="bg-green-500 px-5 py-3 rounded"
        >
          Export PDF
        </button>

      </div>

      {!analytics ? (
        <p>Loading...</p>
      ) : (
        <>

          {/* CARDS */}
          <div className="grid grid-cols-3 gap-5">

            <div className="bg-slate-800 p-5 rounded-lg">

              <h2 className="text-gray-400">
                Revenue
              </h2>

              <p className="text-3xl mt-3">
                $
                {
                  analytics.totalRevenue
                }
              </p>

            </div>

            <div className="bg-slate-800 p-5 rounded-lg">

              <h2 className="text-gray-400">
                Products
              </h2>

              <p className="text-3xl mt-3">
                {
                  analytics.totalProducts
                }
              </p>

            </div>

            <div className="bg-slate-800 p-5 rounded-lg">

              <h2 className="text-gray-400">
                Stock
              </h2>

              <p className="text-3xl mt-3">
                {
                  analytics.totalStock
                }
              </p>

            </div>

          </div>

          {/* REVENUE CHART */}
          <div className="mt-10">
            <RevenueChart
              products={products}
            />
          </div>

          {/* MONTHLY CHART */}
          <div className="mt-10">
            <MonthlyRevenueChart
              products={products}
            />
          </div>

          {/* INVENTORY ALERT */}
          <div className="mt-10 bg-slate-800 p-5 rounded-lg">

            <h2 className="text-2xl mb-5">
              Inventory Alerts
            </h2>

            <div className="space-y-3">

              {products
                .filter(
                  (item) =>
                    item.stock < 10
                )
                .map((product) => (
                  <div
                    key={
                      product._id
                    }
                    className="bg-red-500/20 border border-red-500 p-4 rounded"
                  >
                    ⚠ Low stock:
                    {" "}
                    {
                      product.title
                    }
                    {" "}
                    (
                    {
                      product.stock
                    }
                    {" "}
                    left)
                  </div>
                ))}

            </div>
          </div>

          {/* TOP PRODUCTS */}
          <div className="mt-10 bg-slate-800 p-5 rounded-lg">

            <h2 className="text-2xl mb-5">
              Top Products
            </h2>

            <div className="space-y-3">

              {analytics.topProducts.map(
                (product) => (

                  <div
                    key={
                      product._id
                    }
                    className="flex justify-between bg-slate-700 p-4 rounded"
                  >
                    <p>
                      {
                        product.title
                      }
                    </p>

                    <p>
                      Sales:
                      {
                        product.sales
                      }
                    </p>
                  </div>
                )
              )}

            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;