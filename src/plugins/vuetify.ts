import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify
({
  icons:
  {
    iconfont: 'mdi',
  },
  theme:
  {
    dark: true,
    themes:
    {
      light:
      {
        primary: colors.purple.base,
        secondary: colors.blue.lighten1,
        accent: colors.indigo.darken1, 
        error: colors.amber.darken4, 
        warning: colors.yellow.accent4,
        info: colors.lightBlue.darken4, 
        success: colors.lime.accent3,
        background: colors.indigo.lighten5,
        sidebar: colors.indigo.lighten4,
      },
      dark:
      {
        primary: colors.pink.darken4,
        secondary: colors.indigo.darken3,
        accent: colors.pink.accent4,
        error: colors.deepOrange.darken2,
        warning: colors.yellow.darken3, 
        info: colors.lightBlue.darken2, 
        success: colors.lime.darken3,
        background: colors.grey.darken3,
        sidebar: colors.grey.darken2,
      }
    }
  }
});
