const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const dotenv = require('dotenv')
dotenv.config();

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const FoxFavicon = require('fox-favicon');

const path = require('path');
const env = require('./isDev');
const FL = require('./filename');
const paths = require('./paths');

const pagesDir = path.join(__dirname, '../public/');

const pages = fs.readdirSync(pagesDir).map((file) => {
  return file.split('/', 2);
});


// ---- HEAD
const DESCRIPTION = 'Описание страницы (заглушка)';
const KEYWORDS = 'Java Script, Type Script, WebPack, SCSS, PUG';
const TITLE = 'Загаловок проекта';
const SOCIAL_LOGO_URL = 'https://frontendx.ru/social.webp';
const SITE_URL = 'https://frontendx.ru/';

// ---- Favicon
const APP_NAME = 'Полное название проекта';
const APP_SHORT_NAME = 'Короткое название';
const APP_DESCRIPTION = 'Описание проекта';
const DEVELOPER_NAME = 'coder1';
const DEVELOPER_URL = 'https://github.com/coder1x/';

const plugins = [];

if (env.isDev) {
  plugins.push(
    new ESLintPlugin({
      extensions: ['js', 'ts'],
    }));
}

plugins.push(
  new CleanWebpackPlugin()
);

plugins.push(
  ...pages.map((fileName) => new HTMLWebpackPlugin({
    filename: `./index.html`,
    template: `${pagesDir}${fileName}`,
    alwaysWriteToDisk: true,
    inject: 'body',
    hash: true,
    meta: {
      viewport: {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1',
      },
      description: {
        name: 'description',
        content: DESCRIPTION,
      },
      keywords: {
        name: 'keywords',
        content: KEYWORDS,
      },
      'twitter-card': {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      'twitter-title': {
        name: 'twitter:title',
        content: TITLE,
      },
      'twitter-description': {
        name: 'twitter:description',
        content: DESCRIPTION,
      },
      'twitter-site': {
        name: 'twitter:site',
        content: SITE_URL,
      },
      'twitter-image': {
        name: 'twitter:image',
        content: SOCIAL_LOGO_URL,
      },
      'og-type': {
        property: 'og:type',
        content: 'blog',
      },
      'og-title': {
        property: 'og:title',
        content: TITLE,
      },
      'og-description': {
        property: 'og:description',
        content: DESCRIPTION,
      },
      'og-image': {
        property: 'og:image',
        content: SOCIAL_LOGO_URL,
      },
    },
  })),
);

plugins.push(
  new FoxFavicon({
    src: path.join(paths.src, paths.assets, 'images/icon/favicon.png'),
    path: 'assets/favicons/',
    urlIcon: 'assets/favicons/',
    devMode: env.isDev,
    appName: APP_NAME,
    appShortName: APP_SHORT_NAME,
    appDescription: APP_DESCRIPTION,
    developerName: DEVELOPER_NAME,
    developerURL: DEVELOPER_URL,
    icons: {
      android: [
        'android-chrome-36x36.png',
        'android-chrome-48x48.png',
        'android-chrome-144x144.png',
        'android-chrome-192x192.png',
        'android-chrome-256x256.png',
      ],
      appleIcon: [
        'apple-touch-icon-180x180.png',
        'apple-touch-icon-precomposed.png',
        'apple-touch-icon.png',
      ],
      appleStartup: [],
      coast: true, // Create Opera Coast icon. `boolean`
      favicons: true, // Create regular favicons. `boolean`
      firefox: [
        'firefox_app_60x60.png',
        'firefox_app_128x128.png',
      ],
      opengraph: true, // Create Facebook OpenGraph image. `boolean`
      twitter: true, // Create Twitter Summary Card image. `boolean`
      windows: true, // Create Windows 8 tile icons. `boolean`
      yandex: true, // Create Yandex browser icon. `boolean`
    },
  }),
);

plugins.push(
  new MiniCssExtractPlugin({
    filename: FL.filename('css'),
  }),
);

plugins.push(
  new webpack.ProvidePlugin({
    process: 'process/browser',
  })
);

plugins.push(
  new webpack.EnvironmentPlugin(['URL_API'])
);

module.exports = {
  plugins: plugins,
};
