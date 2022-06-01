import style from '../styles/App.module.css';
import FooterNav from './FooterNav';
import Quotes from './Quotes';
import { createContext, useState } from 'react';

export const ImageContext = createContext();

function App() {

  const [ image, setImage ] = useState({});

  return (
    <div className={style.App}>
      <ImageContext.Provider value={{ image, setImage }}>
        <Quotes />
        <FooterNav />
      </ImageContext.Provider>
    </div>
  );
}

export default App;
