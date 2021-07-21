import { useState } from 'react'
import styles from './index.module.scss'

export default function RatingComponent({ value, valueChange = null}) {
    const positions = [1, 2, 3, 4, 5]
    const setValue = (v) => {  console.log(`Set value: ${v}`); if(valueChange) valueChange(v) }
    return <div className={styles.rating}>
        <ul>{positions.map( p => <li key={`${p}`} onClick={() => setValue(p)}>
            { p <= value? <i className="fa fa-star" >
            </i> : <i className="far fa-star"></i> }
        </li>)}</ul>
    </div>
}