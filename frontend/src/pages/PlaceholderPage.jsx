
const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{title}</h1>

      <p className="mt-3 text-base-content/70">
        This page is under development.
      </p>
    </div>
  )
}

export default PlaceholderPage