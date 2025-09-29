import styles from './ConfirmDialog.module.css'

export function ConfirmDialog({message, onConfirm, onCancel}){
    return <div className={styles.Backdrop}>
        <div className={styles.Dialog}>
            <p>{message}</p>
            <div className={styles.Actions}>
                <button onClick={onConfirm}>✅</button>
                <button onClick={onCancel}>❌</button>
            </div>
        </div>
    </div>
}