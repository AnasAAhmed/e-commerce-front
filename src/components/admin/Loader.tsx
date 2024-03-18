// import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import {  FaRegBell } from "react-icons/fa";
// import { BarChart, DoughnutChart } from "../../components/admin/Charts";
// import Table from "../../components/admin/DashboardTable";
// import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
// import { Link } from "react-router-dom";





const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  );
};

export default Loader;

export const DashboardSkeleton = () => {
  return (
    <div className="admin-conftainer">
      <main className="dashboard-skeleton">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <div className="user-img-skeleton"></div> {/* Placeholder for user image */}
        </div>

        <section className="widget-container">
          {Array.from({ length: 4 }).map((_, index) => (
            <WidgetSkeleton key={index} />
          ))}
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <div className="chart-skeleton"></div> {/* Placeholder for chart */}
          </div>

          <div className="dashboard-categories">
            <div className="categories-skeleton"></div> {/* Placeholder for categories */}
          </div>
        </section>

        <section className="transaction-container">
          <div className="gender-chart">
            <div className="gender-chart-skeleton"></div> {/* Placeholder for gender chart */}
          </div>
          <div className="transaction-box">
            <div className="transaction-skeleton"></div> {/* Placeholder for transaction table */}
          </div>
        </section>
      </main>
    </div>
  );
};

const WidgetSkeleton = () => {
  return (
    <article className="widget widget-skeleton">
      <div className="widget-info-skeleton"></div> {/* Placeholder for widget info */}
      <div className="widget-circle-skeleton"></div> {/* Placeholder for widget circle */}
    </article>
  );
};

export const TransactionSkekelton = () => {
  return (
    <main className="product-management-skeleton">

      <section
        style={{
          padding: "2rem",
        }}
      >

        <div className="transaction-product-card-skeleton">
    <div></div>
   
    <span>
    
    </span>
  </div>
      </section>

      <article className="shipping-info-card-skeleton">
        
      </article>


    </main>
  )
}

