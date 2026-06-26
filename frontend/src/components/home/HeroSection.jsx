import OfferCards from "./OfferCards";

const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 ">
      <div className="relative min-h-80 md:min-h-95 rounded-3xl overflow-hidden bg-linear-to-r from-orange-100 via-pink-100 to-purple-200">
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12">
          <div className="inline-block w-fit bg-violet-600 px-5 py-2 -rotate-1deg">
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase leading-tight">
              New Season
              <br />
              New Vibes
            </h1>
          </div>

          <p className="text-lg md:text-xl text-slate-900 mt-6 max-w-sm">
            Fresh styles. Fierce moods. Your look, your way.
          </p>

          <div className="flex flex-wrap gap-4 mt-7">
            <button className="btn bg-slate-900 text-white border-none hover:bg-red-500 rounded-md px-8">
              Shop New In
            </button>

            <button className="btn btn-outline rounded-md px-8">
              Explore Collection
            </button>
          </div>
        </div>

        <div className="hidden md:block absolute right-8 bottom-0 text-[180px] font-black text-white/30 leading-none">
          STYLE
        </div>
      </div>

      <OfferCards />
    </section>
  );
};

export default HeroSection;