import React from "react";
import addons from "@storybook/addons";
import { themes } from "@storybook/theming";
import { addDecorator, addParameters } from "@storybook/react";
// @ts-ignore
import { withContexts } from "@storybook/addon-contexts/react";
// @ts-ignore
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { withTests } from "@storybook/addon-jest";
import { useDarkMode } from "storybook-dark-mode";
import { I18nProvider } from "./i18n";
import results from "./jest-test-results.json";
import "./styles-dark.less";
import "./styles-light.less";

addParameters({
  options: {
    showRoots: true
  },
  docs: {
    container: (props: KeyValue) => (
      <DocsContainer
        {...props}
        context={{
          ...props.context,
          parameters: {
            ...props.context.parameters,
            options: { theme: useDarkMode() ? themes.dark : themes.light }
          }
        }}
      />
    )
  }
});
const contexts = [
  {
    icon: "globe",
    title: "Locale",
    components: [I18nProvider],
    params: [
      { name: "English", props: { locale: "en" }, default: true },
      { name: "Arabic", props: { locale: "ar" } }
    ],
    options: {
      deep: true, // pass the `props` deeply into all wrapping components
      disable: false, // disable this contextual environment completely
      cancelable: false // allow this contextual environment to be opt-out optionally in toolbar
    }
  }
];
addDecorator(withContexts(contexts));

const brandTitle = "Ant React Extensions";
// Theme Switcher
addParameters({
  darkMode: {
    light: { ...themes.light, brandTitle },
    dark: { ...themes.dark, brandTitle }
  }
});

const channel = addons.getChannel();
channel.on("DARK_MODE", (isDark) => {
  document.documentElement.classList.remove(!isDark ? "ant-dark" : "ant-light");
  document.documentElement.classList.add(isDark ? "ant-dark" : "ant-light");
});

addDecorator(withTests({ results }));
