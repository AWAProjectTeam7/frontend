import React from "react";
import BigBoard from "./BigBoard";
import Categories from "./Categories";
import styles from "../styles/Content.module.css";

export default function Discovery_board() {
  return (
    <div className={styles.WrapperStyled}>
      <BigBoard></BigBoard>
      <Categories></Categories>
    </div>
  );
}
