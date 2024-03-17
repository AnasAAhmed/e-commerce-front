const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  );
};

export default Loader;

interface SkeletonProps {
  width?: string;
  length?: number;
}

export const Skeleton = ({ width = "unset", length = 3 }: SkeletonProps) => {
  const skeletions = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeleton-shape"></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletions}
    </div>
  );
};
export const ProductLoader = () => {
  return (<>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
  </>)
}
export const SearchProductLoader = () => {
  return (
  <div className="search-product-list">
    
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
    <div className="productCard-skeleton">
      <div></div>
      <p></p>
      <span className="span"></span>
      <br />
    </div>
  </div>)
}