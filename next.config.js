const withSass = require('@zeit/next-sass')
module.exports = withSass({
  postcssLoaderOptions: {
    parser: true,
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME)
      }
    }
  }
})

// const getConfigToAcceptSassFilesWithoutModuleSuffix = (config) => {
//   return {
//     ...config,
//     module: {
//       ...config.module,
//       rules: config.module.rules.map((rule) => {
//         if (rule.oneOf) {
//           return {
//             ...rule,
//             oneOf: rule.oneOf.map((loaderSettings) => {
//               if (
//                 (!Array.isArray(loaderSettings.test) &&
//                   isTwoRegexEqual(
//                     loaderSettings.test,
//                     /\.module\.(scss|sass)$/
//                   )) ||
//                 (Array.isArray(loaderSettings.test) &&
//                   loaderSettings.test.filter((test) =>
//                     isTwoRegexEqual(test, /(?<!\.module)\.(scss|sass)$/)
//                   ).length > 0)
//               ) {
//                 return {
//                   ...loaderSettings,
//                   test: /\.(scss|sass)$/,
//                 };
//               }
//               return loaderSettings;
//             }),
//           };
//         }
//         return rule;
//       }),
//     },
//   };
// };
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    formats: ["image/avif", "image/webp"],
  },
};
