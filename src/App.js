import React, { useState } from 'react';
import SwiperComponent from './components/SwiperComponent';
import NoticeList from './components/NoticeList';
import SearchBox from './components/SearchBox';
import Divider from './components/Divider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <SwiperComponent />
      <Divider/>
      <SearchBox onSearch={setSearchTerm} />
      <NoticeList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
