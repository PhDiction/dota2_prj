import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeroes } from './heroesSlice';
import { Link } from 'react-router-dom';
import { letters, hackerLetters } from '../../util/hacker';
import './herolist.css'


const HeroList = () => {
  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.heroes.heroes);
  const heroStatus = useSelector((state) => state.heroes.status);
  const error = useSelector((state) => state.heroes.error);
  const [selectedHeroId, setSelectedHeroId] = useState(null);

  useEffect(() => {
    if (heroStatus === 'idle') {
      dispatch(fetchHeroes());
    }
  }, [heroStatus, dispatch]);

  let content;

  if (heroStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (heroStatus === 'succeeded') {
    content = <div className='main'>
    {Object.values(heroes).map((hero) => (
      <div className='hero_img fade_in' key={hero.id}>
        <Link 
          key={hero.id} 
          to={`/heroes/${hero.id}`}
          onClick={() => setSelectedHeroId(hero.id)}>
        <img src={`https://api.opendota.com${hero.img}`} width="180px" alt={hero.localized_name} />
        <div onMouseOver={hackerLetters} data-value={`|${hero.localized_name}|`}>|{hero.localized_name}|</div>
        </Link>
      </div>))};
      </div>
  } else if (heroStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
}

export default HeroList;