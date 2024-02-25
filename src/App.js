import React, { useState } from "react";
import SwiperComponent from "./components/SwiperComponent";
import SearchBox from "./components/SearchBox";
import Divider from "./components/Divider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppRouter from "./router/AppRouter";

function App() {
  const [setSearchTerm] = useState('');

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
