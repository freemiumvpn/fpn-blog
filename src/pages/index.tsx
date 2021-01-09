import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const Logo = () => (
    <svg viewBox="0 0 300 300" className={styles.logo}>
    <defs />
    <path fill="none" d="M-1-1h802v602H-1z" />
    <g>
        <path fill="#0B345A" stroke="null" d="M0 0h300v300H0z" />
        <g fill="#22C4D6" transform="matrix(9.45842 0 0 9.55037 .063 49.618)">
        <circle cx="15.852" cy="10.2" r="8.066" />
        <path d="M31.852-5.82h-32v32h32v-32zm-16 26.085c-5.55 0-10.066-4.516-10.066-10.065C5.786 4.65 10.302.134 15.852.134c5.55 0 10.065 4.516 10.065 10.066.001 5.55-4.515 10.065-10.065 10.065z" />
        </g>
    </g>
    </svg>
)


function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Freemiumpn Blog">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Link to='https://freemiumpn.com/'>
              <Logo />
          </Link>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('posts/')}>
              Read the Blog
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}

export default Home;
