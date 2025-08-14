// CategoryList.tsx
import type { ITagCategory  } from "../types/Interfaces";
import CategoryCard from "./CategoryCard";
import ListStyle from './categoryList.module.scss'

interface Props {
  categories: ITagCategory [];
  setCategories: React.Dispatch<React.SetStateAction<ITagCategory []>>;
  onEdit: (category: ITagCategory) => void;
  onView: (category: ITagCategory) => void;
}

export default function CategoryList({ categories, setCategories, onEdit, onView  }: Props) {
  const handleDelete = (id: string) => {
  setCategories(prev => prev.filter(cat => cat.id !== String(id)));
};


  return (
    <div className={ListStyle.categoryList}>
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          onView={() => onView(cat)}
          onDelete={() => handleDelete(cat.id)}
          onEdit={() => onEdit(cat)}
        />
      ))}
    </div>
  );
}
