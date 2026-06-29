import HeroSection from "../../../components/home/HeroSection";
import CategoryStrip from "../../../components/home/CategoryStrip";
import FeatureStrip from "../../../components/home/FeatureStrip";
import TrendingProducts from "../../../components/home/TrendingProducts";
import PromoGrid from "../../../components/home/PromoGrid";
const Home = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <HeroSection />
        <CategoryStrip />
        <FeatureStrip />
        <TrendingProducts />
        <PromoGrid />
      </div>
    </div>
  );
};

export default Home;
