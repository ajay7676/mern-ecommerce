const ProductPagination = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        <button className="join-item btn btn-sm">«</button>
        <button className="join-item btn btn-sm bg-red-50 text-red-500">1</button>
        <button className="join-item btn btn-sm">2</button>
        <button className="join-item btn btn-sm">3</button>
        <button className="join-item btn btn-sm">...</button>
        <button className="join-item btn btn-sm">21</button>
        <button className="join-item btn btn-sm">»</button>
      </div>
    </div>
  );
};

export default ProductPagination;