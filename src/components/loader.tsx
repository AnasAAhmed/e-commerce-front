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
export const ProductDetailsSkeleton = () => {
  return (
    <>
      <section className="sec1skeleton">
        <div></div>
      </section>
      <article className="sec2skeleton">
        <p>{''}</p>
  <span></span>
        
        <br />
        <h3>Description</h3>
        <p>{''}</p>
        <br />
        <h3>{''}</h3>
        <button
          className="cart-button"
         
        >
         
        </button>
      </article>
    </>
  )
}