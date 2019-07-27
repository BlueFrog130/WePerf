import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme:{
    themes:{
      light:{
        primary: '#9C27B0', // Purple 500
        secondary: '#42A5F5', // Blue 400
        accent: '#5755e9', // Custom Indigo
        error: '#FF6F00', // Amber 900
        warning: '#FFD600', // Yellow A700 
        info: '#01579B', // Light Blue 900 
        success: '#C6FF00', // Lime A400
        background: '#E8EAF6', // Indigo 50
        backgroundDarkened: '#c5cae8', // Background darkened by 10%
      }
    }
  }
});
