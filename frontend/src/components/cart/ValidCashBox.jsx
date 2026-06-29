
const ValidCashBox = () => {
  return (
   <div className="border border-red-200 bg-red-50 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-red-500">VAILD SUPER STORE CASH</h3>
        <p className="text-sm text-slate-700">
          You have <span className="font-bold">₹350</span>  Valid Cash
        </p>
      </div>

      <label className="flex items-center gap-2 font-semibold text-slate-900">
        <input type="checkbox" className="checkbox checkbox-xs w-4 h-4 rounded-none" />
        Apply ₹350
      </label>
    </div>
  )
}

export default ValidCashBox