import styles from "./jobForm.module.css";

interface ArrayFieldProps {
  label: string
  name: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
  errors?: string[]
  required?: boolean
}

const generateButtonText = (label: string): string => {
  if (label === "Tags") {
    return "+ Add Tag";
  }
  if (label === "About The Job") {
    return "+ Add Paragraph"
  }
  return "+ Add Bullet";
}

export default function ArrayField({ label, name, items, onChange, placeholder, errors, required = false }: ArrayFieldProps) {
  const addItem = () => {
    onChange([...items, ""]);
  }

  const removeItem = (index: number) => {
    if (required && items.length <= 1) return; // Prevent removing all items for required fields
    onChange(items.filter((_, i) => i !== index));
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  }

  // If no items and field is not required, show an "add first item" state
  if (items.length === 0 && !required) {
    return (
      <div className={styles.array_field}>
        <label className={styles.array_label}>{label} {required && '*'}</label>
        <button type="button" onClick={addItem} className={styles.add_btn}>
          <span>{generateButtonText(label)}</span>
        </button>
        {errors && (
          <span className={styles.error_message}>{errors[0]}</span>
        )}
      </div>
    )
  }

  return (
    <div className={styles.array_field}>
      <label className={styles.array_label}>{label} {required && '*'}</label>

      {items.map((item, index) => (
        <div key={index} className={styles.array_item}>
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className={errors ? "error" : ""}
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className={styles.remove_btn}
            disabled={required && items.length <= 1}
            title="Remove item"
          >
            <span>✕</span>

          </button>
          {/* Hidden inputs for form submission */}
          <input type="hidden" name={`${name}[${index}]`} value={item} />
        </div>
      ))}

      <button type="button" onClick={addItem} className={styles.add_btn}>
        <span>{generateButtonText(label)}</span>
      </button>

      {errors && (
        <span className={styles.error_message}>{errors[0]}</span>
      )}
    </div>
  );
}