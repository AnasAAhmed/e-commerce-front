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
        <section className="widget-container">
          {Array.from({ length: 4 }).map((_, index) => (
            <WidgetSkeleton key={index} />
          ))}
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <div className="chart-skeleton"></div> 
          </div>

          <div className="dashboard-categories">
            <div className="categories-skeleton"></div> 
          </div>
        </section>

        <section className="transaction-container">
          <div className="gender-chart">
            <div className="gender-chart-skeleton"></div> 
          </div>
          <div className="transaction-box">
            <div className="transaction-skeleton"></div> 
          </div>
        </section>
      </main>
    </div>
  );
};

const WidgetSkeleton = () => {
  return (
    <article className="widget widget-skeleton">
      <div className="widget-info-skeleton"></div> 
      <div className="widget-circle-skeleton"></div>
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