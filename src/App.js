import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Budget from "./Components/Budget"
import Header from "./Components/Header"
import './App.css';

const STORAGE_KEY = 'expensesTrackerData';

const App = () =>  {
  const [categories, setCategories] = useState(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

  return (
    <div className='bg-container'>
      <div className="responsive-container">
        <Header categoryName={selectedCategory ? selectedCategory.name : "Budget"}/>
        <Budget
          categories={categories}
          setCategories={setCategories}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>
    </div>
  )
}

export default App;
