import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

export const SignInButton = () => {
    const { data: session } = useSession()
    console.log(session)

    return session ? (
        <button type="button" className={styles.sighInButton} onClick={() => signOut()}>
            <FaGithub color="#04D361" />
            {session.user.email}
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button type="button" className={styles.sighInButton} onClick={() => signIn('github')}>
            <FaGithub color="#EBA417" />
            Sign in with Github
        </button>
    )
}