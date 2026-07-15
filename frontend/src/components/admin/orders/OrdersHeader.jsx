import { Building2, Search, Truck, Video } from "lucide-react";
import { warehouseOptions } from "./data/orderStatus.data";
import SelectField from "../common/form/SelectField";

const OrdersHeader = () => {
  return (
    <header className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Page Title */}

          <div className="min-w-fit">
            <h1 className="text-2xl font-bold">Forward Orders</h1>

            <p className="text-sm text-base-content/60">
              Manage all customer orders
            </p>
          </div>

          {/* Warehouse */}
          <SelectField
            // label="Warehouse"
            icon={Building2}
            placeholder="Select warehouse"
            options={warehouseOptions}
          />
          {/* <SelectField
            label="Warehouse"
            icon={Building2}
            options={warehouseOptions}
            error={errors.warehouse?.message}
            {...register("warehouse")}
          /> */}
          {/* <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-outline justify-between min-w-55"
            >
              <div className="flex items-center gap-2">
                <Building2 size={18} />

                <span>Warehouse</span>
              </div>
              ▼
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-1 mt-2 w-72 border border-base-300 bg-base-100 p-2 shadow"
            >
              {warehouses.map((warehouse) => (
                <li key={warehouse.id}>
                  <button>{warehouse.name}</button>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Right */}

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Video */}

          <button className="btn btn-outline">
            <Video size={18} />
            Tutorial
          </button>

          {/* FBF */}

          <button className="btn btn-primary">
            <Truck size={18} />
            See FBF Orders
          </button>

          {/* Search */}

          <label className="input input-bordered flex items-center gap-2 w-full sm:w-80">
            <Search size={18} className="text-base-content/50" />

            <input
              type="text"
              placeholder="Search Order ID..."
              className="grow"
            />
          </label>
        </div>
      </div>
    </header>
  );
};

export default OrdersHeader;
