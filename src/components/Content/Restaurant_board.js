import React from "react";
import styles from "../styles/Content.module.css";
import BigBoard from "./BigBoard";

export default function Restaurant_board(props) {
  return (
    <div className={styles.WrapperStyled}>
      <BigBoard restaurants = { props.restaurants}/>
    </div>
  );
}
