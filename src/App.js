import './App.css';
import Background from './componentes/Background/Background';
import Footer from './componentes/Footer/Footer';
import Header from './componentes/Header/Header';

function App() {
  return (
    <div className="App container py-3">
      <Header />
      <Background />
      <Footer/>
    </div>
  );
}
export default App;
