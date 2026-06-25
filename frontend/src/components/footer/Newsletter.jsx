const Newsletter = () => {
  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900 uppercase mb-4">
        Stay with Valid India
      </h3>

      <p className="text-sm text-slate-600 mb-4 max-w-xs">
        Get updates on new arrivals, exclusive offers and more.
      </p>

      <form className="flex w-full max-w-sm">
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered rounded-r-none w-full text-sm bg-white"
        />

        <button
          type="submit"
          className="btn bg-slate-900 text-white border-none rounded-l-none hover:bg-red-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;