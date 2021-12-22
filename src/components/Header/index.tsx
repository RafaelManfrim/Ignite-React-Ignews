import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { NavLink } from '../NavLink'

export const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="Logo Ignews" />
                <nav>
                    <NavLink url='/' title="Home" active={styles.active}/>
                    <NavLink url='/posts' title="Posts" active={styles.active}/>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}