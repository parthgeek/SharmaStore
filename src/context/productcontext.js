import React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { supabase } from "../supabase";
import reducer from "../reducer/ProductReducer";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: "API_ERROR" });
    }
  };

  // Fetch single product from Supabase
  const getSingleProduct = async (id) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const { data: singleProduct, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      console.error('Error fetching single product:', error);
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getProducts, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };