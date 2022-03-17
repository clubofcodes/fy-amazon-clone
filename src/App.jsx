import './App.css';
import { CategoryBar } from './Layouts/Category/CategoryBar';
import Navbar from './Layouts/Header/Navbar';
import { HomeMainComp } from './Layouts/Home/HomeMainComp';

function App() {
  return (
    <div>
      <Navbar />
      <CategoryBar />
      <HomeMainComp />
    </div>
  );
}

export default App;
