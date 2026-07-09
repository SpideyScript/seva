import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Category from './Category';
import Feature from './Feature';
import Professional from './Professional';
import Review from './Review';
import FooterTop from './Footer-top';
import Footer from './Footer';

const Firstpage = () => {
  return (
    <div>
      <Navbar/>
      <Banner />
      <Category/>
      <Feature/>
      <Professional/>
      <Review/>
      <FooterTop/>
     <Footer/>
    </div>
  )
}

export default Firstpage
