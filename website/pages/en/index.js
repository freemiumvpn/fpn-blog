/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="home-section--main">{props.children}</div>
        </div>
      </div>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = (props) => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const Logo = () => (
        <svg viewBox="0 0 300 300" className="home-logo">
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

    return (
      <SplashContainer>
        <div className="inner">
          <a href={"/blog"}><Logo /></a>
          <p className="home-section-tittle">
            Freemium VPN you will enjoy 🔌 
          </p>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = (props) => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
      </div>
    );
  }
}

module.exports = Index;
