const siteConfig = {
  title: 'Freemiumpn',
  tagline: 'A VPN you will enjoy',
  url: 'https://freemiumpn.com',
  baseUrl: '/',

  projectName: 'fpn-blog',
  organizationName: 'freemiumpn',

  headerLinks: [
      {blog: true, label: 'Blog'},
  ],

  /* path to images for header/footer */
  headerIcon: 'img/fpn.svg',
  footerIcon: 'img/fpn.svg',
  favicon: 'img/favicon.ico',

  colors: {
    primaryColor: '#22C4D6',
    secondaryColor: '#0B345A',
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Freemiumpn`,
  twitter: true,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,
};

module.exports = siteConfig;
