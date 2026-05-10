import DefaultTheme from 'vitepress/theme';
import Tabs from './components/Tabs';
import TabItem from './components/TabItem';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    app.component('Tabs', Tabs);
    app.component('TabItem', TabItem);
  },
};
