import {
    LineElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from "chart.js";
  
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );
  
  const MonthlyRevenueChart = ({
    products,
  }) => {
  
    const monthlyRevenue =
      Array(12).fill(0);
  
    products.forEach((product) => {
  
      const month =
        new Date(
          product.createdAt
        ).getMonth();
  
      monthlyRevenue[month] +=
        product.price *
        product.sales;
    });
  
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
  
      datasets: [
        {
          label:
            "Monthly Revenue",
  
          data:
            monthlyRevenue,
  
          borderColor:
            "rgb(59,130,246)",
  
          backgroundColor:
            "rgba(59,130,246,0.5)",
        },
      ],
    };
    
  
    return (
      <div className="bg-slate-800 p-5 rounded-lg">
        <h2 className="text-2xl mb-5">
          Monthly Revenue
        </h2>
  
        <Line data={data} />
      </div>
    );
  };
  
  export default MonthlyRevenueChart;