module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-addon-mdx-embed',
    'storybook-dark-mode/register',
    '@storybook/addon-controls',
    '@storybook/preset-scss',
    'storybook-addon-themes',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
          {
            loader: require.resolve('react-docgen-typescript-loader'),
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-loader',
          },
        ],
      }
    );
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
