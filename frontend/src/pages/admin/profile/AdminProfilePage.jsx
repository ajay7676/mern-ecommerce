import DisplayInformationCard from "../../../components/admin/profile/DisplayInformationCard";
import ContactDetailsCard from '../../../components/admin/profile/ContactDetailsCard'
import PickupAddressCard from "../../../components/admin/profile/PickupAddressCard";
import LoginDetailsCard from "../../../components/admin/profile/LoginDetailsCard";
import DeleteAccountCard from "../../../components/admin/profile/DeleteAccountCard";
import { adminProfileData } from "../../../data/admin/profile/adminProfile.data";
import { FiChevronRight } from "react-icons/fi";

const AdminProfilePage = () => {
  const handleEditDisplayInfo = () => {
    console.log("Edit display information");
  };

  const handleEditContact = () => {
    console.log("Edit contact details");
  };

  const handleEditAddress = () => {
    console.log("Edit pickup address");
  };

  const handleChangePassword = () => {
    console.log("Change password");
  };

  const handleEditPhone = () => {
    console.log("Edit phone");
  };

  const handleEditEmail = () => {
    console.log("Edit email");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account");
  };
  return (
    <main className="min-h-screen bg-[#f5f6f7]">
      <div
        className="
          mx-auto
          w-full
          max-w-360
          px-4
          py-5
          sm:px-6
          lg:px-8
          xl:px-15
        "
      >
        {/* Breadcrumb */}

        <nav
          aria-label="Breadcrumb"
          className="
            mb-2
            flex
            items-center
            gap-1
            text-[12px]
            font-medium
            text-[#1976b9]
          "
        >
          <button type="button" className="hover:underline">
            Home
          </button>

          <FiChevronRight size={14} className="text-[#79838c]" />

          <button type="button" className="hover:underline">
            Manage Profile
          </button>

          <FiChevronRight size={14} className="text-[#79838c]" />
        </nav>

        {/* Page title */}

        <h1
          className="
            mb-5
            text-[22px]
            font-medium
            leading-tight
            text-[#343a40]
          "
        >
          Account
        </h1>

        {/* Desktop layout */}

        <section
          className="
            grid
            grid-cols-1
            gap-5
            lg:grid-cols-[1fr_1fr]
            xl:grid-cols-[1fr_1.02fr_1fr]
          "
        >
          {/* LEFT COLUMN */}

          <div className="flex flex-col gap-5">
            <DisplayInformationCard
              profile={adminProfileData}
              onEdit={handleEditDisplayInfo}
            />

            <ContactDetailsCard
              contact={adminProfileData.contact}
              onEdit={handleEditContact}
            />
          </div>

          {/* CENTER COLUMN */}

          <div className="lg:row-span-2">
            <PickupAddressCard
              address={adminProfileData.pickupAddress}
              onEdit={handleEditAddress}
            />
          </div>

          {/* RIGHT COLUMN */}

          <div
            className="
              flex
              flex-col
              gap-5
              lg:col-span-2
              xl:col-span-1
            "
          >
            <LoginDetailsCard
              login={adminProfileData.login}
              onChangePassword={handleChangePassword}
              onEditPhone={handleEditPhone}
              onEditEmail={handleEditEmail}
            />

            <DeleteAccountCard onDelete={handleDeleteAccount} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminProfilePage;
