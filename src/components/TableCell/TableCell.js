import React, { useState, useRef } from 'react';
import styles from './TableCell.module.css'

export default function TableCell({ price, onChangePrice }) {
  const [value, setValue] = useState(price);
  const [isHovering, setHovering] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isSaving, setSaving] = useState(true);

  const inputRef = useRef();

  const minPrice = price * 0.9;
  const maxPrice = price * 1.1;

  const handleClose = (isClose) => {
    setHovering(isClose)
    setEditing(false)
    setValue(price);
  }

  const handleEdit = () => {
    setHovering(false);
    setEditing(true);
    inputRef.current.focus();
  }

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue < minPrice || inputValue > maxPrice) {
      setSaving(false);
    } else {
      setSaving(true);
    }
    setValue(inputValue);
  }

  const handleSave = () => {
    onChangePrice(value);
    setEditing(false);
    setHovering(true);
  }

  return (
    <td
      className={styles.cell}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => handleClose(false)}
    >
      <input
        className={styles.input}
        type="number"
        value={value}
        disabled={!isEditing}
        onChange={handleChange}
        ref={inputRef}
        step="0.1"
      />
      {isHovering &&
        <button
          className={['material-icons', styles.button].join(' ')}
          onClick={handleEdit}
        >create</button>}
      {isEditing && isSaving &&
        <button
          className={["material-icons", styles.button, styles.check].join(' ')}
          contentEditable={false}
          onClick={handleSave}
        >check</button>
      }
      {isEditing &&
        <button
          className={["material-icons", styles.button].join(' ')}
          contentEditable={false}
          onClick={() => handleClose(true)}
        > close</button >
      }
    </td >
  )
}