import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchHeroById } from "./heroSlice";
import { letters, hackerLetters } from '../../util/hacker';
import Lore from "../lore/Lore";
import './hero.css'



const Hero = () => {
  const heroId = useParams();
  const realId = Object.values(heroId)
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.hero.hero);
  const heroStatus = useSelector((state) => state.hero.status);
  const error = useSelector((state) => state.hero.error);
  const [loreName, setLoreName] = useState('');

  useEffect(() => {
    if (heroStatus === 'idle') {
      dispatch(fetchHeroById());
    }
    if (heroStatus === 'succeeded') {
      setLoreName(hero[realId].name.replace('npc_dota_hero_', ''));
    }
  }, [loreName, heroStatus, dispatch]);

  const newHero = hero[realId];;
  let attribute;
  let attributeStyle;

  if (heroStatus === 'succeeded' && newHero.primary_attr === 'agi') {
    attribute = "Agility";
    attributeStyle = {color: "green"}
  } else if (heroStatus === 'succeeded' && newHero.primary_attr === 'str') {
    attribute = "Strength";
    attributeStyle = {color: "red"}
  } else if (heroStatus === 'succeeded' && newHero.primary_attr === 'int') {
    attribute = "Intelligence"
    attributeStyle = {color: "blue"}
  }

  let content;

  if (heroStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (heroStatus === 'succeeded') {
  content =
    <div>
      <h1 onMouseOver={hackerLetters} data-value={newHero.localized_name}>{newHero.localized_name}</h1>
      <img src={`https://api.opendota.com${newHero.img}`} width="180px" alt={hero.localized_name} />
      <h3 onMouseOver={hackerLetters} data-value="Roles:">Roles:</h3>
      <ul>
      {newHero.roles.map((role) => 
      <li onMouseOver={hackerLetters} data-value={role}>{role}</li>)}
      </ul>
      <h3 style={attributeStyle}>Primary Attribute: {attribute}</h3>
      <h3>Attack Type: {newHero.attack_type}</h3>
      <Lore loreName={loreName}></Lore>
    </div>
    } else if (heroStatus === 'failed') {
      content = <div>{error}</div>;
    }
  
    return <div>{content}</div>;
}

export default Hero;