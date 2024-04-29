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
    <div className="bg-gray-300 h-[43vh] w-[35vh]  rounded-md animate-pulse"></div>
    <div className="bg-gray-300 h-[43vh] w-[35vh]  rounded-md animate-pulse"></div>
    <div className="bg-gray-300 h-[43vh] w-[35vh]  rounded-md animate-pulse"></div>
    <div className="bg-gray-300 h-[43vh] w-[35vh]  rounded-md animate-pulse"></div>
  </>)
}
export const CollectionLoader = () => {
  return (<>
    <div className="bg-gray-300 h-[43vh] w-[35vh]  rounded-md animate-pulse"></div>
    <div className="bg-gray-300 h-[43vh] w-[35vh]  rounded-md animate-pulse"></div>
    <div className="bg-gray-300 h-[43vh] w-[35vh]  rounded-md animate-pulse"></div>
    <div className="bg-gray-300 h-[43vh] w-[35vh]  rounded-md animate-pulse"></div>
  </>)
}
export const SearchProductLoader = () => {
  return (
    <>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
      <div className="bg-gray-300 h-[25vh] md:h-[43vh]  w-full md:w-[35vh]  rounded-md animate-pulse"></div>
    </>
  );
};
export const ProductDetailsSkeleton = () => {
  return (
    <>
  {/* <div className="product-details-skeleton flex flex-wrap justify-center mt-8"> */}
    <section className="sec1 flex-1 flex-shrink-0 w-full md:w-72 mr-10 mb-10">
      <div className="animate-pulse w-full md:h-[400px] h-[320px] bg-gray-300"></div>
    </section>
    <article className="sec2 flex-1 w-full md:w-96">
      <div className="animate-pulse mb-2 h-6 w-4/4 bg-gray-300"></div>
      <div className="animate-pulse mb-4 h-6 w-4/4 bg-gray-300"></div>
      <div className="animate-pulse flex mb-4">
        <div className="h-8 w-10 bg-gray-300 rounded-md mr-2"></div>
        <div className="h-8 w-10 bg-gray-300 rounded-md mr-2"></div>
        <div className="h-8 w-10 bg-gray-300 rounded-md mr-2"></div>
        <div className="h-8 w-10 bg-gray-300 rounded-md"></div>
      </div>
      <div className="animate-pulse flex mb-4"> 
        <div className="h-6 w-6 bg-gray-300 rounded-full mx-1"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full mx-1"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full mx-1"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full mx-1"></div>
      </div>
      <div className="animate-pulse flex mb-4">
        <div className="h-8 w-16 bg-gray-300 rounded-md mr-2"></div>
        <div className="h-8 w-16 bg-gray-300 rounded-md mr-2"></div>
        <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
      </div>
      <div className="animate-pulse mb-1 h-6 w-40 bg-gray-300"></div>
      <div className="animate-pulse mb-4 h-6 w-20 bg-gray-300"></div>
      <div className="animate-pulse mb-4 h-12 w-4/4 bg-gray-300"></div>
      <div className="animate-pulse mb-4 h-6 w-20 bg-gray-300"></div>
      <div className="animate-pulse h-12 w-full bg-gray-300 rounded-md"></div>
    </article>
    </>
  )
}