import { useState, useEffect } from "react";
import { type ITagCategory, EPrecisionType, ETagCategoryStatus, type IOption } from "../types/Interfaces";
import CategoryFormStyle from "./categoryFrom.module.scss";

interface Props {
  onClose: () => void;
  onSave: (cat: ITagCategory) => void;
   initialData?: ITagCategory;
   isViewMode?: boolean;
}

export default function CategoryForm({ onClose, onSave, initialData, isViewMode  }: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [name, setName] = useState(initialData?.name || "");
  const [gameId, setGameId] = useState(initialData?.gameId || "");
  const [group, setGroup] = useState<IOption>(initialData?.group || { label: "", value: "" });
  const [precisionType, setPrecisionType] = useState<EPrecisionType>(initialData?.precisionType || EPrecisionType.LONG);
  const [status, setStatus] = useState<ETagCategoryStatus>(initialData?.status || ETagCategoryStatus.ACTIVE);
  const [isParentTag, setIsParentTag] = useState(initialData?.isParentTag ?? true);
  const [isReplay, setIsReplay] = useState(initialData?.isReplay ?? false);

  const validate = () => {
  const newErrors: { [key: string]: string } = {};

  if (!name.trim()) newErrors.name = "Category name is required";
  if (!group.label.trim()) newErrors.groupLabel = "Group label is required";
  if (!group.value) newErrors.groupValue = "Group value is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

   useEffect(() => {
  if (initialData) {
    setName(initialData.name || "");
    setGameId(initialData.gameId || "");
    setGroup(initialData.group || { label: "", value: "" });
    setPrecisionType(initialData.precisionType || EPrecisionType.LONG);
    setStatus(initialData.status || ETagCategoryStatus.ACTIVE);
    setIsParentTag(initialData.isParentTag ?? true);
    setIsReplay(initialData.isReplay ?? false);
  } else {
    setName("");
    setGameId("");
    setGroup({ label: "", value: "" });
    setPrecisionType(EPrecisionType.LONG);
    setStatus(ETagCategoryStatus.ACTIVE);
    setIsParentTag(true);
    setIsReplay(false);
  }
}, [initialData]);


   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return; 
    const updatedCategory: ITagCategory = {
      ...(initialData || { id: Date.now().toString(), createdAt: Date.now() }),
      name,
      gameId,
      group,
      precisionType,
      status,
      metadataConfig: initialData?.metadataConfig || [],
      subCategories: initialData?.subCategories || {},
      isParentTag,
      isReplay,
      nameStructure: initialData?.nameStructure || [],
      lastUpdatedAt: Date.now(),
      deleted: false,
    };
    if (!isViewMode) {
      onSave(updatedCategory);
    }
    onClose();
  };
  return (
    <div className={CategoryFormStyle.modal}>
      <form onSubmit={handleSubmit} className={CategoryFormStyle.formContainer}>
        <h2 className={CategoryFormStyle.headingFromModal}>{isViewMode ? "View Category": initialData? "Edit Category" : "Add Category"}</h2>
        <div className={CategoryFormStyle.formFeilds}>
        <label>Category Name</label>
        <input
          disabled={isViewMode}
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className={CategoryFormStyle.errorMsg}>{errors.name}</p>}

        <label>Group Label</label>
        <input
          type="text"
          disabled={isViewMode}
          placeholder="Group Label"
          value={group.label}
          onChange={(e) => setGroup({ ...group, label: e.target.value })}
        />
        {errors.groupLabel && <p className={CategoryFormStyle.errorMsg}>{errors.groupLabel}</p>}

        <label>Group Value</label>

        <input
          type="text"
          disabled={isViewMode}
          placeholder="Group Value"
          value={group.value}
          onChange={(e) => setGroup({ ...group, value: e.target.value })}
        />
        {errors.groupValue && <p className={CategoryFormStyle.errorMsg}>{errors.groupValue}</p>}

        <label>Precision Type</label>
        <select
          value={precisionType}
          disabled={isViewMode}
          onChange={(e) => setPrecisionType(e.target.value as EPrecisionType)}
        >
          <option value={EPrecisionType.LONG}>LONG</option>
          <option value={EPrecisionType.SHORT}>SHORT</option>
        </select>

        <label>Status</label>
        <select
          value={status}
          disabled={isViewMode}
          onChange={(e) => setStatus(e.target.value as ETagCategoryStatus)}
        >
          <option value={ETagCategoryStatus.ACTIVE}>ACTIVE</option>
          <option value={ETagCategoryStatus.INACTIVE}>INACTIVE</option>
        </select>

        <label style={{margin: '0'}}>
          <input
          disabled={isViewMode}
            type="checkbox"
            checked={isParentTag}
            style={{width: '5%', marginTop: '13px'}}
            onChange={(e) => setIsParentTag(e.target.checked)}
          />
          Is Parent Tag
        </label>

        <label style={{margin: '0'}}>
          <input
          disabled={isViewMode}
            type="checkbox"
            checked={isReplay}
            style={{width: '5%', marginTop: '13px'}}
            onChange={(e) => setIsReplay(e.target.checked)}
          />
          Is Replay
        </label>

         <div className={CategoryFormStyle.actions}>
          <button type="submit" disabled={isViewMode}>Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
        </div>

      </form>
    </div>
  );
  }
