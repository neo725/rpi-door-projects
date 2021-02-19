import Vue from 'vue'
import App from './App.vue'

// Video.js for vue
/*
import VueVideoPlayer from 'vue-video-player'

import 'video.js/dist/video-js.css'

Vue.config.productionTip = false

Vue.use(VueVideoPlayer, {
  // options: global default options,
  // events: global videojs events,
})
*/
// end of Video.js for vue

// vue-fullscreen
import fullscreen from 'vue-fullscreen'
Vue.use(fullscreen)

new Vue({
  render: h => h(App),
}).$mount('#app')
