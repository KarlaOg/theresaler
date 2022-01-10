<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p class="font-weight-bold">{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(
      () => this.removeNotification(this.notification),
      5000
    );
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  computed: {
    notificationTypeClass() {
      return `text-${this.notification.type}`;
    },
  },
  methods: mapActions(['removeNotification']),
};
</script>

<style scoped>
.notification-bar {
  margin: 1em;
}

.text-error {
  color: red;
}
</style>
