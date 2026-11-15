import { createContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../api";
export const Mycontext = createContext();

const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState(1);
  const [searchdata, setSearchdata] = useState("");
  const [maindata, setMaindata] = useState([]);
  const [fedata, setFedata] = useState([]);
  const [bedata, setBedata] = useState([]);
  const [cfedata, setCfedata] = useState(false);
  const [cbedata, setCbedata] = useState(false);
  const [checkfoot, setCheckfoot] = useState(false);
  const [Dealdata, setDealdata] = useState(false);
  const [lth, setlth] = useState(false);
  const [htl, sethtl] = useState(false);

  const [Wishlistdata, setWishlistdata] = useState([]);
  const [Cartdata, setCartdata] = useState([]);
  const [totalcartitems,setTotalcartitems]=useState(0);

  // Load cart from db.json when application starts
  useEffect(() => {
    async function loadCart() {
      try {
        const response = await axios.get(
          `${API}/cart`
        );

        // console.log("Cart loaded from db.json:", response.data);
        setTotalcartitems(response.data.length)
        const products = response.data
          .map((item) => item.cart)
          .filter(Boolean);

        setCartdata(products);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }

    loadCart();
  }, []);

  return (
    <Mycontext.Provider
      value={{
        Dealdata,
        setDealdata,

        cart,
        setCart,

        searchdata,
        setSearchdata,

        maindata,
        setMaindata,

        fedata,
        setFedata,

        bedata,
        setBedata,

        cfedata,
        setCfedata,

        cbedata,
        setCbedata,

        checkfoot,
        setCheckfoot,

        lth,
        setlth,

        htl,
        sethtl,

        Wishlistdata,
        setWishlistdata,

        Cartdata,
        setCartdata,

        totalcartitems,
        setTotalcartitems,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export default ContextProvider;