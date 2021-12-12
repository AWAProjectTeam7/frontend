import React from 'react'
import styles from './orderReceipt.module.css'
import ReceiptItem from './receiptItem';

export default function OrderReceipt(props) {

    function convertDate (_unixDate) {
        let _parsedDate = new Date(_unixDate);
        return _parsedDate.toLocaleString();
    }

    return (
        <div className={styles.container}>
            <div className={styles.receiptArea}>
                <div className={styles.receiptEntry}>
                    <div className={styles.orderKey}>
                        Order key:  {props.data.ID}
                    </div>
                </div>
                <div className={styles.receiptEntry}>
                    <div>
                        Submitted: {convertDate(props.data.details.receivedDate)}
                    </div>
                    <div>
                        {(props.data.details.estimatedDate) ? "Estimated time: " + convertDate(props.data.details.estimatedDate) : "" }
                    </div>
                    <div>
                        {(props.data.details.completedDate) ? "Completed: " + convertDate(props.data.details.completedDate) : "" }
                    </div>
                </div>
                <div className={styles.receiptEntry}>
                    Venue Name: {props.data.venue.name}
                    <br></br>
                    Venue Address: {props.data.venue.address + ", " + props.data.venue.city}
                </div>
                <div className={styles.receiptEntry}>
                    Contents:
                    {
                        props.data.contents.map(element => <ReceiptItem data={element}/>)
                    }
                </div>
                <div className={styles.receiptEntry}>
                    <div className={styles.total}>
                        <div>
                            TOTAL: 
                        </div>
                        <div>
                            {props.data.details.total} €
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
