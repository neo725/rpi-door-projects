<template>
  <div class="player">
    <fullscreen ref="fullscreen">
      <video-player
        id="videoPlayer"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        @ready="oPlayerReadey"
        @play="onPlayerPlay"
        @playing="onPlayerPlaying"
        @ended="onPlayerEnded"
      >
      </video-player>
    </fullscreen>
    <div
      ref="videoOverlayer"
      class="video-overlayer"
      @click="onOverlayerClick"
    ></div>
  </div>
</template>
<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
require("videojs-youtube");

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require("videojs-landscape-fullscreen");

// https://www.youtube.com/embed/X8dz_PjWtAk?rel=0&amp;autoplay=1;fs=0;autohide=0;hd=0;mute=1 --incognito --disable-translate
const localVideoUrl =
  //"/home/pi/Videos/4K-UHD-10-hours-Earth-from-Space_Space-Wind-Audio-relaxing_meditation_nature-DASH_V.mp4";
  "/videos/4K-UHD-10-hours-Earth-from-Space_Space-Wind-Audio-relaxing_meditation_nature-DASH_V.mp4";

const onlineVideoUrl =
  "https://www.youtube.com/watch?v=X8dz_PjWtAk&feature=emb_title";
// "https://www.youtube.com/embed/X8dz_PjWtAk?rel=0&amp;autoplay=1;fs=0;autohide=0;hd=0;mute=1";

export default {
  data() {
    return {
      currentPlayer: null,
      playerOptions: {
        fluid: true,
        autoplay: true,
        muted: true,
        preload: true,
        responsive: true,
        loop: true,
        height: 500,
        techOrder: ["html5"],
        sources: [
          {
            type: "video/mp4",
            src: localVideoUrl,
          },
        ],
      },
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "development") {
      this.playerOptions.techOrder = ["youtube"];
      this.playerOptions.sources = [
        {
          type: "video/youtube",
          src: onlineVideoUrl,
        },
      ];
    }
  },
  components: {
    videoPlayer,
  },
  computed: {
    player() {
      return videojs("videoPlayer");
    },
    playerComponent() {
      return this.player.getComponent("Component");
    },
  },
  methods: {
    // event
    SleepStart() {
      console.log("Video.vue", "SleepStart !");

      // setTimeout(function() {
      if (this.currentPlayer) {
        if (this.currentPlayer.pause) {
          this.currentPlayer.play();
        }
        if (this.currentPlayer.supportsFullScreen()) {
          // recommended
          this.$refs["fullscreen"].enter();

          this.currentPlayer.requestFullscreen();
          // console.log("enter FullScreen.");
        }
      }

      // recommended
      // _this.$refs["fullscreen"].enter();

      // _this.currentPlayer.landscapeFullscreen();

      // });
    },
    // listen event
    onOverlayerClick() {
      var _this = this;

      setTimeout(function() {
        if (_this.currentPlayer) {
          _this.currentPlayer.pause();
        }
      });
      this.$emit("hide");
    },
    onPlayerPlay(player) {
      // var _this = this;

      console.log("player play !", player);
      console.log("supportsFullScreen ?", player.supportsFullScreen());
      // player.setLoop(true);

      //player.requestFullScreen();

      //this.player.dimension("width", "100%");

      // var videoPlayer = videojs("videoPlayer");
      // videoPlayer.landscapeFullscreen();
      // if (process.env.NODE_ENV !== "development") {

      // }

      this.currentPlayer = player;
    },
    oPlayerReadey(player) {
      console.log("player ready !", player);
    },
    onPlayerPlaying() {
      console.log("player playing...");
    },
    onPlayerEnded() {
      // var _this = this;
      // setTimeout(function() {
      //   if (_this.currentPlayer && _this.currentPlayer.pause) {
      //     _this.currentPlayer.play();
      //   }
      // });
    },
  },
};
</script>
<style>
body,
.video-player {
  padding: 0;
  margin: 0;
}
.video-player {
  width: 100%;
  height: 100%;
}
.video-overlayer {
  position: fixed;
  z-index: 99999;
  width: 100%;
  height: 100%;
  /* background-color: #ff0000; */
  top: 0;
  left: 0;
  cursor: default;
}
</style>
