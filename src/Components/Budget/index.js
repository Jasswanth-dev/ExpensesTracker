import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Footer from "../Footer";
import BudgetItem from "../BudgetItem";
import { IoMdArrowBack } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmationPopup from "../ConfirmationPopup";

import "./index.css";

const STORAGE_KEY = 'expensesTrackerData';

const Budget = ({ categories, setCategories, selectedCategoryId, setSelectedCategoryId }) => {
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [balance, setBalance] = useState(0);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showCategoryDeletePopup, setShowCategoryDeletePopup] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showCategoryMenu, setShowCategoryMenu] = useState(null);

    const toggleCategoryMenu = (categoryId) => {
        setShowCategoryMenu(prev => (prev === categoryId ? null : categoryId));
    };




    // Initial calculation when component mounts or categories are loaded
    useEffect(() => {
        calculateFinancialSummary();
    }, [selectedCategoryId]); // Also recalculate if selectedCategory changes to update totals for current view

    const calculateFinancialSummary = () => {
        let totalIncome = 0;
        let totalExpenses = 0;

        const itemsToCalculate = selectedCategoryId
            ? categories.find(cat => cat.id === selectedCategoryId)?.items || []
            : categories.flatMap(cat => cat.items);

        itemsToCalculate.forEach(item => {
            if (item.type === "expense") {
                totalExpenses += item.amount;
            } else {
                totalIncome += item.amount;
            }
        });

        const totalBalance = totalIncome - totalExpenses;
        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setBalance(totalBalance);
    };

    const findItem = (categoryId, itemId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.items.find(item => item.id === itemId) : null;
    };

    const updateItemProperty = (categoryId, itemId, property, value) => {
        setCategories(prevCategories => {
            return prevCategories.map(cat => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        items: cat.items.map(item =>
                            item.id === itemId ? { ...item, [property]: value } : item
                        )
                    };
                }
                return cat;
            });
        });
    };

    const updateText = (value, categoryId, itemId) => {
        updateItemProperty(categoryId, itemId, 'text', value);
    };

    const updateAmount = (value, categoryId, itemId) => {
        updateItemProperty(categoryId, itemId, 'amount', parseInt(value));
    };

    const updateDate = (value, categoryId, itemId) => {
        updateItemProperty(categoryId, itemId, 'date', value);
    };

    const handleAddItem = (type, categoryId) => {
        setCategories(prevCategories => {
            return prevCategories.map(cat => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        items: [...cat.items, { id: uuidv4(), text: "", amount: 0, type: type, date: "" }]
                    };
                }
                return cat;
            });
        });
    };

    const deleteItem = (categoryId, itemId) => {
        setItemToDelete({ categoryId, itemId });
        setShowDeletePopup(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            setCategories(prevCategories => {
                return prevCategories.map(cat => {
                    if (cat.id === itemToDelete.categoryId) {
                        return {
                            ...cat,
                            items: cat.items.filter(item => item.id !== itemToDelete.itemId)
                        };
                    }
                    return cat;
                });
            });
            setShowDeletePopup(false);
            setItemToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeletePopup(false);
        setItemToDelete(null);
    };

    const handleAddCategory = (name) => {
        setCategories(prevCategories => [
            ...prevCategories,
            { id: uuidv4(), name: name, items: [] }
        ]);
    };

    const handleDeleteCategory = (categoryId) => {
        setCategoryToDelete(categoryId);
        setShowCategoryDeletePopup(true);
    };

    const confirmCategoryDelete = () => {
        if (categoryToDelete) {
            setCategories(prevCategories =>
                prevCategories.filter(cat => cat.id !== categoryToDelete)
            );
            if (selectedCategoryId === categoryToDelete) {
                setSelectedCategoryId(null); // Deselect if the current category is deleted
            }
            setShowCategoryDeletePopup(false);
            setCategoryToDelete(null);
        }
    };

    const cancelCategoryDelete = () => {
        setShowCategoryDeletePopup(false);
        setCategoryToDelete(null);
    };



    const renderCategoriesView = () => (
        <div>
            <div className="categories-header">
                <button className="custom-btn-style" onClick={() => handleAddCategory(prompt("Enter category name:"))}>Add New Category</button>
            </div>
            <ul className="categories-list">
                {categories.map(cat => (
                    <li key={cat.id} onClick={() => setSelectedCategoryId(cat.id)}>
                        <span>{cat.name} ({cat.items.length})</span>
                        <div className="menu-container">
                            <button type="button" className="menu-btn" onClick={(e) => { e.stopPropagation(); toggleCategoryMenu(cat.id); }}><FiMoreVertical /></button>
                            {showCategoryMenu === cat.id && (
                                <div className="menu">
                                    <button type="button" className="menu-item" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }}>
                                        <MdOutlineDelete /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderCategoryDetailView = () => {
        const currentCategory = categories.find(cat => cat.id === selectedCategoryId);
        if (!currentCategory) {
            return (
                <div>
                    <p>Category not found.</p>
                    <button className="custom-btn-style back-btn" onClick={() => setSelectedCategoryId(null)}><IoMdArrowBack /></button>
                </div>
            );
        }

        return (
            <div>
                <div className="category-detail-header">
                    <button className="custom-btn-style back-btn" onClick={() => setSelectedCategoryId(null)}><IoMdArrowBack /></button>
                    <div className="add-buttons">
                        <button className="custom-btn-style" onClick={() => handleAddItem("income", selectedCategoryId)}>Add Income</button>
                        <button className="custom-btn-style" onClick={() => handleAddItem("expense", selectedCategoryId)}>Add Expense</button>
                    </div>
                </div>
                <ul className="budgets-unordered-list">
                    {currentCategory.items.map(each => (
                        <BudgetItem
                            key={each.id}
                            details={each}
                            deleteItem={(itemId) => deleteItem(selectedCategoryId, itemId)}
                            updateText={(value, itemId) => updateText(value, selectedCategoryId, itemId)}
                            updateAmount={(value, itemId) => updateAmount(value, selectedCategoryId, itemId)}
                            updateDate={(value, itemId) => updateDate(value, selectedCategoryId, itemId)}
                        />
                    ))}
                </ul>
                <Footer
                    totalIncome={income}
                    totalExpenses={expenses}
                    balance={balance}
                />
            </div>
        );
    };

    return (
        <div>
            {selectedCategoryId ? renderCategoryDetailView() : renderCategoriesView()}
            {showDeletePopup && (
                <ConfirmationPopup
                    message="Are you sure you want to delete this item?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
            {showCategoryDeletePopup && (
                <ConfirmationPopup
                    message="Are you sure you want to delete this category?"
                    onConfirm={confirmCategoryDelete}
                    onCancel={cancelCategoryDelete}
                />
            )}
        </div>
    );
};

export default Budget;