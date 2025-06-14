import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import VerifyEmail from "./pages/verify";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./components/Cart/Cart";
import SingleProduct from "./pages/SingleProduct";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Headers/Header";
import HeroSection from "./components/Middle/HeroSection";
import ErrorPage from "./pages/ErrorPage";
import Footer  from "./components/Footers/Footer";
import { AppProvider } from "./context/productcontext";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignupPage";
import AdminUpload from "./components/others/AdminUpload";
const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: "rgba(33, 37, 41, 0.32)",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <AppProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        
        <Routes>
        
           <Route path="/" element={<LoginPage/>}/>
          <Route path="/singup" element={<SignPage/>}/>
          <Route path="/Home" element={<Home />} />
           <Route path="/admin-upload" element={<AdminUpload/>}/>
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />          
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/herosection" element={<HeroSection/>}/>
          <Route path="*" element={<ErrorPage />} />
        
        
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
    </AppProvider>
  );
};

export default App;