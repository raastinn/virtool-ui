import { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-webpack5-compiler-babel",
        "@chromatic-com/storybook",
    ],

    babel: async options => {
        return {
            ...options,
            presets: ["@babel/preset-react"],
        };
    },

    framework: {
        name: "@storybook/react-vite",
        options: {},
    },

    docs: {},
};

export default config;