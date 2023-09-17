// pages/Home.js (or your component file)
import HomeScreenButton from '../components/HomeScreenButton';
import Tagline from '../components/Tagline';
import SpellBoundTitle from '../components/SpellBoundTitle';
import styles from './page.module.css';
import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
      <NavBar/>
        {/* <div className={styles.content}>
          <SpellBoundTitle />
          <Tagline />
          <HomeScreenButton />
        </div> */}
      </main>
    </div>
  );
}
