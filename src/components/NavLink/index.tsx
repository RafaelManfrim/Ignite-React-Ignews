import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLinkProps = {
    url: string, 
    title: string,
    active: string,
}

export function NavLink({ url, title, active }: NavLinkProps) {
    const { asPath } = useRouter()

    return (
        <Link href={url}>
            <a className={url === asPath ? active : ''}>{title}</a>
        </Link>
    )
}