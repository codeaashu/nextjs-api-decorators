/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Next.js API Decorators',
  tagline:
    'A collection of decorators for building clean, typed API routes in Next.js with built-in validation and request transformation.',
  url: 'https://nextjs-api-decorators.vercel.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/public/logo.png',
  organizationName: 'DevDisplay',
  projectName: 'next-api-decorators',
  themeConfig: {
    navbar: {
      title: 'Next.js API Decorators',
      logo: {
        alt: 'Next.js API Decorators Logo',
        src: '/public/logo.png',
        srcDark: '/public/logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: '/docs',
          label: 'Getting Started',
          position: 'right',
        },
        {
          href: '/docs/api/decorators',
          label: 'API',
          position: 'right',
        },
        {
          href: 'https://github.com/codeaashu/nextjs-api-decorators',
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
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/codeaashu/nextjs-api-decorators',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://www.ashutoshkumar.me" target="_blank" rel="noopener">Ashutosh Kumar<a/>.`,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/codeaashu/nextjs-api-decorators/edit/master/website/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
