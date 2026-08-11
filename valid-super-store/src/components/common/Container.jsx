
const Container = ({
    as:Component = "div",
    className ="",
    children,
    ...props
}) => {
  return (
    <Component
      className={`site-container ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Container