import React, { useState, useRef } from 'react';
import styles from './TableCell.module.css';
import MuiTableCell from '@material-ui/core/TableCell';

export default function TableCell({ price, onChangePrice }) {
  const [value, setValue] = useState(price);
  const [isHovering, setHovering] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isSaving, setSaving] = useState(true);
  const inputRef = useRef();

  const minPrice = Math.round(price * 90) / 100;
  const maxPrice = Math.round(price * 110) / 100;

  const handleClose = (isClose) => {
    setHovering(isClose)
    setEditing(false)
    setValue(price);
    inputRef.current.blur();
  }

  const handleEdit = (event) => {
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
    <MuiTableCell
      className={styles.cell}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => handleClose(false)}
    >
      <input
        className={styles.input}
        type="number"
        min={minPrice}
        max={maxPrice}
        value={value}
        step="0.1"
        readOnly={!isEditing}
        onChange={handleChange}
        ref={inputRef}
      />
      {isHovering &&
        <button
          className={['material-icons', styles.button].join(' ')}
          onClick={handleEdit}
        >create</button>}
      {isEditing && isSaving &&
        <button
          className={["material-icons", styles.button, styles.check].join(' ')}
          onClick={handleSave}
        >check</button>
      }
      {isEditing &&
        <button
          className={["material-icons", styles.button].join(' ')}
          onClick={() => handleClose(true)}
        > close</button >
      }
    </MuiTableCell >
  )
}