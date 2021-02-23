<template>
  <v-app>
    <!-- <div class="fullscreen"> -->
    <v-container class="no-top-bottom" ref="MainScreen" v-show="!SleepMode">
      <v-app-bar app color="primary" dark v-if="false">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </div>

        <v-spacer></v-spacer>

        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="mr-2">Latest Release</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main v-if="false">
        <HelloWorld v-if="false" />
      </v-main>
      <Main />
    </v-container>
    <Video ref="IdleScreen" v-on:hide="onVideoHide" v-show="SleepMode" />
    <!-- </div> -->
  </v-app>
</template>

<script>
import Video from "./components/Video";
import Main from "./components/Main";

import $ from "jquery";
import screenfull from "screenfull";

const sleepModeTimeout = 10; // wait for n seconds, if device idle, then into sleep mode

var lastHeight = 0;
var currentIdleSeconds = 0;

export default {
  name: "App",
  data() {
    return {
      SleepMode: false,
      // fullscreen: false,
    };
  },
  mounted() {
    console.log($(document).height());

    setTimeout(this.responsiveAppLayer, 500);
    setTimeout(this.prepareToWaitSleepMode, 1000);
    setTimeout(this.goFullscreen, 1000);
  },
  components: {
    Video,
    Main,
  },
  methods: {
    triggerFullscreen() {
      //this.$refs["fullscreen"].click();
      if (this.$refs.FullScreen && this.$refs.FullScreen.click) {
        this.$refs.FullScreen.click();
      }
    },
    goFullscreen() {
      if (screenfull.isEnabled) {
        console.log("App.vue go fullscreen mode.");

        screenfull.request();
      }
    },
    responsiveAppLayer(nextTimeout = 500) {
      var documentHeight = $(document).height();

      if (documentHeight !== lastHeight) {
        $("#app").css("height", documentHeight);
        lastHeight = documentHeight;
      }

      setTimeout(this.responsiveAppLayer, nextTimeout);
    },
    // before into sleep mode,
    // there will still has a buffer time to get into sleep mode.
    prepareToWaitSleepMode() {
      currentIdleSeconds = 0;
      setTimeout(this.waitSleepMode, 3000);
    },
    waitSleepMode(nextTimeout = 1000) {
      if (currentIdleSeconds >= sleepModeTimeout) {
        currentIdleSeconds = 0;
        this.SleepMode = true;
        this.$refs["IdleScreen"].SleepStart();

        return;
      }

      currentIdleSeconds += 1;
      setTimeout(this.waitSleepMode, nextTimeout);
    },
    wakeUpDevice() {
      this.SleepMode = false;

      setTimeout(this.prepareToWaitSleepMode, 1000);
    },
    onVideoHide() {
      console.log("App.vue", "onVideoHide");

      this.wakeUpDevice();
    },
  },
};
</script>
