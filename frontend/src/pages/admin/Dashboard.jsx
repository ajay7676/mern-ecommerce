const stats = [
  {
    title: "Total Revenue",
    value: "₹4,85,240",
    desc: "+12% from last month",
    icon: "💰",
  },
  {
    title: "Total Orders",
    value: "1,248",
    desc: "+8% from last week",
    icon: "📦",
  },
  {
    title: "Customers",
    value: "3,920",
    desc: "+18 new today",
    icon: "👥",
  },
  {
    title: "Products",
    value: "486",
    desc: "24 low stock",
    icon: "🛒",
  },
];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "Rahul Sharma",
    product: "Men T-Shirt",
    amount: "₹899",
    status: "Delivered",
  },
  {
    id: "#ORD-1002",
    customer: "Priya Singh",
    product: "Smart Watch",
    amount: "₹2,499",
    status: "Pending",
  },
  {
    id: "#ORD-1003",
    customer: "Amit Kumar",
    product: "Running Shoes",
    amount: "₹1,799",
    status: "Cancelled",
  },
  {
    id: "#ORD-1004",
    customer: "Neha Verma",
    product: "Laptop Bag",
    amount: "₹1,199",
    status: "Processing",
  },
];

function getStatusClass(status) {
  if (status === "Delivered") return "badge-success";
  if (status === "Pending") return "badge-warning";
  if (status === "Cancelled") return "badge-error";
  return "badge-info";
}


const Dashboard = () => {
  return (
     <div className="space-y-6">
      <section>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Welcome back, Admin 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here is your eCommerce store overview.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="card bg-white shadow-sm border border-gray-200"
          >
            <div className="card-body p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {item.value}
                  </h3>
                  <p className="text-xs text-green-600 mt-2">{item.desc}</p>
                </div>

                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-2xl grid place-items-center">
                  {item.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card bg-white shadow-sm border border-gray-200 xl:col-span-2">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="card-title text-gray-800">Sales Overview</h2>
                <p className="text-sm text-gray-500">
                  Monthly revenue performance
                </p>
              </div>

              <button className="btn btn-sm bg-blue-600 text-white border-none hover:bg-blue-700">
                View Report
              </button>
            </div>

            <div className="mt-6 h-72 flex items-end gap-2 sm:gap-3">
              {[40, 70, 55, 90, 65, 80, 45, 95, 75, 60, 85, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-100 rounded-t-xl relative overflow-hidden"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-600 rounded-t-xl"></div>
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-6 md:grid-cols-12 gap-2 text-xs text-center text-gray-500 mt-2">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-sm border border-gray-200">
          <div className="card-body">
            <h2 className="card-title text-gray-800">Top Products</h2>

            <div className="space-y-4 mt-4">
              {["Smart Watch", "Men T-Shirt", "Running Shoes", "Laptop Bag"].map(
                (product, index) => (
                  <div key={product} className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-gray-100 text-gray-700 rounded-xl w-12">
                        <span>{index + 1}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-gray-700">{product}</p>
                      <progress
                        className="progress progress-primary w-full"
                        value={90 - index * 15}
                        max="100"
                      ></progress>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="card bg-white shadow-sm border border-gray-200">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="card-title text-gray-800">Recent Orders</h2>
              <p className="text-sm text-gray-500">Latest customer orders</p>
            </div>

            <button className="btn btn-outline btn-sm">See All Orders</button>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span className={`badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-xs btn-outline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard