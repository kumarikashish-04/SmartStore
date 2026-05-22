import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
  } from "chart.js";
  
  import { Bar } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  
  const RevenueChart = ({
    products,
  }) => {
  
    const data = {
      labels: products.map(
        (item) => item.title
      ),
  
      datasets: [
        {
          label: "Revenue",
  
          data: products.map(
            (item) =>
              item.price *
              item.sales
          ),
  
          backgroundColor:
            "rgba(59,130,246,0.7)",
        },
      ],
    };
  
    return (
      <div className="bg-slate-800 p-5 rounded-lg">
        <h2 className="text-2xl mb-5">
          Revenue Analytics
        </h2>
  
        <Bar data={data} />
      </div>
    );
  };
  
  export default RevenueChart;