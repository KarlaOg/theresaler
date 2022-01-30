<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue';
import { mapState } from 'vuex';
export default {
  components: {
    NotificationBar,
  },
  computed: mapState(['notifications']),
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 71px;
  right: 0;
  padding-right: 40px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 3px 10px rgb(69 67 67 / 32%);
  z-index: 999;
}
</style>
