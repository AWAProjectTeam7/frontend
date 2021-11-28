import React from "react";
import Restaurant from "./Restaurant";
import styles from "../styles/BigBoard.module.css";
export default function BigBoard(props) {
  return (
    <div className={styles.WrappedStyled}>
      <div className={styles.JunctionComponent__Wrapper}>
        <div className={styles.headerContainer}>
          {" "}
          <h2>Restaurant</h2>
        </div>
        <div className={styles.ProductList}>

          <Restaurant></Restaurant>
          <Restaurant></Restaurant>
          <Restaurant></Restaurant>
          <Restaurant></Restaurant>
          <Restaurant></Restaurant>
          <Restaurant></Restaurant>
          <Restaurant></Restaurant>
          <Restaurant></Restaurant>
        </div>
      </div>
    </div>
  );
}
