import React, { useState } from 'react';
import styles from './TableCell.module.css'

export default function TableCell({ price }) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  }

  const handleMouseLeave = (event) => {
    setHover(false)
    event.target.contentEditable = false;
  }

  const handleEdit = (event) => {
    const cell = event.target.parentElement;
    cell.contentEditable = true;
    cell.focus();
    setHover(false);
  }

  return (
    <td
      className={styles.cell}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={(event) => handleMouseLeave(event)}
    >
      {price}
      {hover &&
        <button
          className={['material-icons', styles.button].join(' ')}
          onClick={handleEdit}
        >create</button>}
    </td >
  )
}