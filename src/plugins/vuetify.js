import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/es5/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#2068c1',
        secondary: '#FF6D00',
        accent: '#151515',
        error: '#246079',
        info: '#E65100',
        success: '#4CAF50',
        warning: '#d1711b',
        one: '#F9A825',
        two: '#A3A599',
        three: '#282623',
        four: '#88A550',
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'fa',
  },
});
