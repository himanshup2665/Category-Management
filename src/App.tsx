// App.tsx
import { useState } from "react";
import type { ITagCategory } from "../src/types/Interfaces";

import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import AppStyle from "./App.module.scss";
import { sampleData } from "./data/sampleData";


export default function App() {
const [categories, setCategories] = useState<ITagCategory[]>(sampleData);
const [editingCategory, setEditingCategory] = useState<ITagCategory | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const handleAddClick = () => {
    setEditingCategory(undefined);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (category: ITagCategory) => {
    setEditingCategory(category);
    setIsViewMode(false);
    setIsModalOpen(true);
  };
  const handleViewClick = (category: ITagCategory) => {
  setEditingCategory(category);
  setIsViewMode(true);
  setIsModalOpen(true);
};

  const handleSave = (category: ITagCategory) => {
    if (editingCategory) {
      setCategories(prev =>
        prev.map(cat => cat.id === category.id ? category : cat)
      );
    } else {
      setCategories(prev => [...prev, category]);
    }
    setIsModalOpen(false);
  };
  
  return (
    <div className={AppStyle.app}>
      <header className={AppStyle.header_Manager}>
        <h1 >Category Manager</h1>
      <button onClick={handleAddClick}>+ Add Category</button>
      </header>
      <CategoryList categories={categories} setCategories={setCategories} onEdit={handleEditClick} onView={handleViewClick}  />

      {isModalOpen && (
        <CategoryForm
        initialData={editingCategory}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          isViewMode={isViewMode}
        />
      )}
    </div>
  );
}
