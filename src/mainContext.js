import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const mainContext = createContext();

const MainProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (!user) {
      axios.get("/api/profile").then(({ data }) => setUser(data));
    }
  }, []);

  return (
    <mainContext.Provider value={{ user, setUser }}>
      {children}
    </mainContext.Provider>
  );
};

export default MainProvider;
