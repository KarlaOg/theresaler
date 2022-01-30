<template>
  <div>
    <p class="not-found">PAGE NOT FOUND 👻</p>
    <video
      width="600"
      src="https://img-9gag-fun.9cache.com/photo/aWjPvmx_460svvp9.webm"
      autoplay
      ref="videoRef"
      loop
      muted="true"
      class="video"
    ></video>
    <router-link to="/" class="ml-3">🔙 Back to Home </router-link>
  </div>
</template>

<script>
export default {
  name: 'Error',
  mounted() {
    this.$refs.videoRef.play();
  },
};
</script>
<style lang="scss" scoped>
.video {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.not-found {
  position: absolute;
  color: aliceblue;
  top: 120px;
  text-align: center;
  animation: clignote 2s linear infinite;
  text-shadow: chartreuse;
  text-shadow: #fc0 1px 0 10px;
  font-weight: bold;
  font-size: 54px;
  width: 100%;
}

@keyframes clignote {
  50% {
    opacity: 0;
  }
}
</style>
