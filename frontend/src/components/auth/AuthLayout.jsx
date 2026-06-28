
const AuthLayout = ({ children }) => {
  return (
     <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-cyan-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {children}
      </div>
    </section>
  )
}

export default AuthLayout