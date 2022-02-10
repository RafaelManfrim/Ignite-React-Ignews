import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLinkProps = {
    url: string, 
    title: string,
    active: string,
}

export function NavLink({ url, title, active }: NavLinkProps) {
    const { asPath } = useRouter()
    console.log(url, asPath)

    return (
        <Link href={url}>
            <a className={asPath === url ? active : ''}>{title}</a>
        </Link>
    )
}