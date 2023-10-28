if (process.env.NODE_ENV === "production") {
    module.exports = {
        plugins: [
            require("tailwindcss")("tailwind.config.js"),
            require("postcss-preset-env")({
                stage: 3,
                features: {
                    "nesting-rules": true,
                },
                env: "development",
                browsers: "last 4 versions",
            }),
            require("cssnano"),
        ],
    };
} else {
    module.exports = {
        plugins: [
            require("tailwindcss")("tailwind.config.js"),
            require("postcss-preset-env")({
                stage: 3,
                features: {
                    "nesting-rules": true,
                },
                env: "development",
                browsers: "last 4 versions",
            }),
            require("cssnano"),
        ],
    };
}

// "postcss-preset-env":{
//     stage: 3,
//     features: {
//       'nesting-rules': true
//     },
//     env : "development",
//     browsers : "last 4 versions",
// },
// cssnano: {},
// 'rucksack-css': {},
