import React from 'react';
import c from './App.module.scss';
import { Elements } from './Components/Elements/Elements';
import { Header } from './Components/Header/Header';
import { Navigation } from './Components/Navigation/Navigation';



function App() {
  return (
    <div className={c.appWrap}>
      <div className={c.headerWrap}>
        <Header />
      </div>
      <div className={c.navigationWrap}>
        <Navigation />
      </div>
      <div className={c.desktopWrap}>
        
        <Elements />
        
      </div>

      
    </div>
  );
}

export default App;
