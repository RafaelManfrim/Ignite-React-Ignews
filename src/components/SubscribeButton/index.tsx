import styles from './styles.module.scss'

type SubscribeButtonProps = {
    priceId: string
}

export const SubscribeButton = (props: SubscribeButtonProps) => {
    return (
        <button type="button" className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}