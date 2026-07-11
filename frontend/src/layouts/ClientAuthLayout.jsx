import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
const ClientAuthLayout = () => {
  return (
     <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ClientAuthLayout