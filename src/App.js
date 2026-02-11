import Budget from "./Components/Budget"
import Header from "./Components/Header"
import './App.css';

const App = () =>  (
    <div className='bg-container'>
      <div className="responsive-container">
        <Header/>
        <Budget/>
      </div>
    </div>
)

export default App;
