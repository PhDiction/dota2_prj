import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchHeroLore } from "./loreSlice";



const Lore = ({loreName}) => {
  const dispatch = useDispatch();
  const lore = useSelector((state) => state.lore.lore);
  const loreStatus = useSelector((state) => state.lore.status);
  const error = useSelector((state) => state.hero.error);
  

  useEffect(() => {
    if (loreStatus === 'idle') {
      dispatch(fetchHeroLore());
    }
  }, [loreStatus, dispatch]);
  
  let content;
  
  if (loreStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (loreStatus === 'succeeded') {
    content = 
      <div>
        <h2>Lore:</h2>
        <p>{lore[loreName]}</p>
      </div>
  } else if (loreStatus === 'failed') {
    content = <div>{error}</div>;
  }
  return <div>{content}</div>;
}

export default Lore;