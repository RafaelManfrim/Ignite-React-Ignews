import Head from 'next/head'
import styles from './styles.module.scss'

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.postList}>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong>Sobre nós</strong>
                        <p>Criada a partir da demanda de agentes do setor de energia, a Nimbus é uma empresa de prestação de serviços que oferece informações essenciais para auxiliar seus clientes nas tomadas de decisão. O objetivo maior da Nimbus é a confiabilidade, agilidade, qualidade e transparência dos dados disponibilizados em sua plataforma.</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong>Sobre nós</strong>
                        <p>Criada a partir da demanda de agentes do setor de energia, a Nimbus é uma empresa de prestação de serviços que oferece informações essenciais para auxiliar seus clientes nas tomadas de decisão. O objetivo maior da Nimbus é a confiabilidade, agilidade, qualidade e transparência dos dados disponibilizados em sua plataforma.</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong>Sobre nós</strong>
                        <p>Criada a partir da demanda de agentes do setor de energia, a Nimbus é uma empresa de prestação de serviços que oferece informações essenciais para auxiliar seus clientes nas tomadas de decisão. O objetivo maior da Nimbus é a confiabilidade, agilidade, qualidade e transparência dos dados disponibilizados em sua plataforma.</p>
                    </a>
                </div>
            </main>
        </>
    )
}