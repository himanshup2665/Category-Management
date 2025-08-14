import type { ITagCategory  } from "../types/Interfaces";
import  StyleCard  from "./CategoryCard.module.scss";
import  editIcon from '../assets/Mask group 8.svg'
import deleteIcon from "../assets/Trash.svg";
import eyeIcon from "../assets/eye-black.svg"

interface Props {
  category: ITagCategory ;
  onDelete: () => void;
  onEdit: (cat: ITagCategory) => void;
  onView: (cat: ITagCategory) => void;
}

export default function CategoryCard({ category, onDelete, onEdit, onView  }: Props) {
  return (
    <div className={StyleCard.categoryCard}>
      <div className={StyleCard.cardIcons}>
        <span><img src={eyeIcon} className={StyleCard.eyeIcon} onClick={() => onView(category)} /> <img src={editIcon} onClick={() => onEdit(category)} /> <img src={deleteIcon} onClick={onDelete} className={StyleCard.deleteIcon} /></span>
      </div>
      <div>
       <span className={StyleCard.categoryName}>{category?.name} <span  className={`${StyleCard.status} ${category?.status === "ACTIVE" ? StyleCard.green : StyleCard.red}`}> {category?.status}</span></span>
      </div>
      <div style={{margin: '10px 0 0 0'}}>
        <span className={StyleCard.categoryPrecisionType}>{category?.precisionType}</span>, <span className={StyleCard.categoryGroup}>{category?.group?.label}</span>, <span className={StyleCard.categoryGroup}>{category?.group?.value}</span>
      </div>
    </div>
  );
}
