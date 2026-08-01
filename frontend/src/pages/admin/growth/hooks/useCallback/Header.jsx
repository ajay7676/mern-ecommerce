import React from "react"

const Header = () => {
     console.log("Header rendering")
  return (
    <div>Header</div>
  )
}

export default React.memo(Header)