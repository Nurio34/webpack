
if (process.env.NODE_ENV === 'production') {

    module.exports = {

      plugins: {
        "postcss-preset-env":{
            stage: 3,
            features: {
              'nesting-rules': true
            },
            env : "development",
        },
        autoprefixer: {},
        cssnano: {},
        'rucksack-css': {},
      },
    };

  } else {

    module.exports = {

      plugins: {
        "postcss-preset-env":{
            stage: 3,
            features: {
              'nesting-rules': true
            },
            env : "development",
        },
        autoprefixer: {},
        'rucksack-css': {},
      },
    };
  }

// //   if (process.env.NODE_ENV === 'production') {
// //     module.exports = {
// //       plugins: {
// //         autoprefixer: {},
// //         cssnano: {},
// //         'rucksack-css': {},
// //       },
// //     };
// //   } else {
// //     module.exports = {
// //       plugins: {
// //         autoprefixer: {},
// //         'rucksack-css': {},
// //       },
// //     };
// //   }