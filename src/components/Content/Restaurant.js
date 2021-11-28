import React from "react";
import { Card } from "antd";
import styles from "../styles/Card.module.css";
import {Link} from "react-router-dom"
const { Meta } = Card;

export default function Restaurant(props) {




  return (
    
    <div className={styles.WrappedStyled}>
      <div className={(styles.Restaurant_card, styles.zoom)}>
      <Link to={ `/restaurant/abc` }>
        <Card
          hoverable
          cover={<img alt="example" src="/images/mcdonal.jpg" height="100%" />}
          bodyStyle={{ padding: "15px" }}
        >
          {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
          <div className={styles.Restaurant_card_content}>
            <h3 className={styles.Restaurant_name}>
              {/* {" "} */}
              {"McDonalds"}
            </h3>

            <div className={styles.Restaurant_type}>Fried Chicken</div>
          </div>
          <div className={styles.Restaurant_card_footer}>
            <span className={styles.Restaurant_card_footer_price_active}>
              € €
              <span className={styles.Restaurant_card_footer_price_inactive}>
                {" "}
                € €{" "}
              </span>
            </span>
          </div>
        </Card>
        </Link>
      </div>
    </div>
  );
}
