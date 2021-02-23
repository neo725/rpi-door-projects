<template>
  <div class="player">
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
    <div
      ref="videoOverlayer"
      class="video-overlayer"
      @click="onOverlayerClick"
    ></div>
  </div>
</template>
<script>
import "video.js/dist/video-js.css";

import videojs from "video.js";
import { videoPlayer } from "vue-video-player";
import "videojs-youtube";
import "videojs-landscape-fullscreen";

const localVideoUrl =
  //"/home/pi/Videos/4K-UHD-10-hours-Earth-from-Space_Space-Wind-Audio-relaxing_meditation_nature-DASH_V.mp4";
  "/videos/4K-UHD-10-hours-Earth-from-Space_Space-Wind-Audio-relaxing_meditation_nature-DASH_V.mp4";

const onlineVideoUrl = "https://www.youtube.com/watch?v=zomZywCAPTA";
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
      // return;
    }
  },
  components: {
    videoPlayer,
  },
  computed: {
    $player() {
      return this.$refs["videoPlayer"];
    },
    player() {
      return videojs("videoPlayer");
    },
    playerComponent() {
      return this.player.getComponent("Component");
    },
  },
  methods: {
    // methods
    VideoFullScreen() {
      //this.currentPlayer.requestFullscreen();
      if (this.player && this.player.landscapeFullscreen) {
        try {
          this.player.landscapeFullscreen();
        } catch {
          console.log("fullscreen not work !");
        }
      }
    },
    // event
    SleepStart() {
      console.log("Video.vue", "SleepStart !");

      // setTimeout(function() {
      if (this.currentPlayer) {
        // if (this.currentPlayer.pause) {
        //   this.currentPlayer.play();
        // }
        var isPaused = this.currentPlayer.paused();
        console.log("isParsed ? ", isPaused);
        if (isPaused) {
          this.currentPlayer.play();
        }
        if (this.currentPlayer.supportsFullScreen()) {
          //setTimeout(this.VideoFullScreen, 3000);
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
