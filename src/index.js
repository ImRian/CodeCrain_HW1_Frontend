import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18 방식으로 변경
import './index.css';
import App from './App';
import "slick-carousel/slick/slick.css"; // slick-carousel 기본 스타일
import "slick-carousel/slick/slick-theme.css"; // slick-carousel 테마 스타일

const container = document.getElementById('root');
const root = createRoot(container); // createRoot를 사용하여 초기화
root.render(<App />);
