import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../api/api";

const CreateProduct = () => {

  const [loading, setLoading] =
    useState(false);

  const [aiLoading, setAiLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      price: "",
      category: "",
      description: "",
      tags: "",
      stock: "",
      sales: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // CREATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,

        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim()),
      };

      await API.post(
        "/products",
        payload
      );

      alert("Product Created");

      setFormData({
        title: "",
        price: "",
        category: "",
        description: "",
        tags: "",
        stock: "",
        sales: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        "Error creating product"
      );

    } finally {
      setLoading(false);
    }
  };

  // AI GENERATE
  const handleGenerateAI =
    async () => {

      if (
        !formData.title ||
        !formData.category ||
        !formData.price
      ) {
        return alert(
          "Please fill Title, Category and Price first"
        );
      }

      try {

        setAiLoading(true);

        const { data } =
          await API.post(
            "/ai/generate",
            {
              title:
                formData.title,

              category:
                formData.category,

              price:
                formData.price,
            }
          );

        setFormData((prev) => ({
          ...prev,

          description:
            data.description,

          tags:
            data.tags.join(", "),
        }));

      } catch (error) {

        console.log(error);

        alert(
          "AI generation failed"
        );

      } finally {

        setAiLoading(false);
      }
    };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">
          Create Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 outline-none"
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 outline-none"
          />

          {/* CATEGORY */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 outline-none"
          />

          {/* DESCRIPTION */}
          <textarea
            rows="5"
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 outline-none"
          />

          {/* TAGS */}
          <input
            type="text"
            name="tags"
            placeholder="Tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 outline-none"
          />

          {/* STOCK */}
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 outline-none"
          />

          {/* SALES */}
          <input
            type="number"
            name="sales"
            placeholder="Total Sales"
            value={formData.sales}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700 outline-none"
          />

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              type="button"
              onClick={
                handleGenerateAI
              }
              className="bg-purple-500 px-5 py-3 rounded"
            >
              {aiLoading
                ? "Generating..."
                : "Generate AI Content"}
            </button>

            <button className="bg-blue-500 px-5 py-3 rounded">
              {loading
                ? "Saving..."
                : "Create Product"}
            </button>

          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateProduct;