module.exports = {
  title: 'Freemiumpn',
  tagline: 'A Freemium VPN you will enjoy 🚀 ',
  url: 'https://blog.freemiumpn.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'freemiumvpn',
  projectName: 'fpn-blog',

  themeConfig: {
    navbar: {
      title: 'Freemiumpn',
      logo: {
        alt: 'Freemiumpn',
        src: 'img/fpn.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {to: 'posts', label: 'Blog', position: 'right'},
        {
          href: 'https://github.com/freemiumvpn',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'posts',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/freemiumpn',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Freemiumpn. Powered by Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/freemiumvpn/fpn-blog/edit/main/',
        },
        blog: {
            path: './blog',
            routeBasePath: '/posts',
            showReadingTime: true,
            editUrl: 'https://github.com/freemiumvpn/fpn-blog/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
