import AppContext from "./AppContext";

const ContextProvider = ({ children }) => {
  const value = "+1 123456789";
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default ContextProvider;
