import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export const SignInButton = () => {
    const isUserLoggedIn = true

    return isUserLoggedIn ? (
        <button type="button" className={styles.sighInButton}>
            <FaGithub color="#04D361" />
            Username
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button type="button" className={styles.sighInButton}>
            <FaGithub color="#EBA417" />
            Sign in with Github
        </button>
    )
}