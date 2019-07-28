import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme:{
    themes:{
      light:{
        primary: colors.purple, // Purple 500
        secondary: colors.blue.lighten1, // Blue 400
        accent: colors.indigo.darken1, // Custom Indigo
        error: colors.amber.darken4, // Amber 900
        warning: colors.yellow.accent4, // Yellow A700 
        info: colors.lightBlue.darken4, // Light Blue 900 
        success: colors.lime.accent3, // Lime A400
        background: colors.indigo.lighten5, // Indigo 50
        backgroundDarkened: colors.indigo.lighten4, // Background darkened by 10%
      },
      dark:{
        primary: colors.purple, // Purple 500
        secondary: colors.blue, // Blue 400
        accent: colors.indigo, // Custom Indigo
        error: colors.amber, // Amber 900
        warning: colors.yellow, // Yellow A700 
        info: colors.lightBlue, // Light Blue 900 
        success: colors.lime, // Lime A400
        background: '#424242',
        backgroundDarkened: colors.indigo, // Background darkened by 10%
      }
    }
  }
});
