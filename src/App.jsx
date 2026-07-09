import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css';
import './style.css';
import Firstpage from './components/Firstpage';
import AppRoutes from "./AppRoutes";
import React, { Suspense, lazy } from "react";
import PageLoader from './components/PageLoader';


function App() {
  const [count, setCount] = useState(0)

  return <AppRoutes />;
}

export default App
