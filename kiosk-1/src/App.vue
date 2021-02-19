<template>
  <div id="app">
    <Video ref="IdleScreen" v-on:hide="onVideoHide" v-show="SleepMode" />
    <Main v-show="!SleepMode" />
  </div>
</template>

<script>
import Video from "./components/Video";
import Main from "./components/Main";

import $ from "jquery";

const sleepModeTimeout = 10; // wait for n seconds, if device idle, then into sleep mode

var lastHeight = 0;
var currentIdleSeconds = 0;

export default {
  name: "App",
  data() {
    return {
      SleepMode: false,
    };
  },
  mounted() {
    console.log($(document).height());

    setTimeout(this.responsiveAppLayer, 500);
    setTimeout(this.prepareToWaitSleepMode, 1000);
  },
  components: {
    Video,
    Main,
  },
  methods: {
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

<style type="text/scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("./assets/space-denis-degioanni-9wH624ALFQA-unsplash.jpg");
  /* background-color: rgba(255, 255, 255, 0.5); */
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
}
</style>
