import styles from './timer.module.css';

function Timer({unit,num}){

    return <div className={styles.con}>

    <div className={styles.num}> {num} </div>
    <div className={styles.unit}>{unit}</div>
    </div>

}

export default Timer;