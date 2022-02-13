<template>
  <v-card class="mx-auto">
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Dashbaord </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <router-link to="/dashboard">
          <v-list-item dense nav>
            <v-list-item-content link>
              <v-list-item-title>My info</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/my-purchase">
          <v-list-item dense nav>
            <v-list-item-content link>
              <v-list-item-title>Purchase</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
a {
  color: darkblue;
  text-decoration: none;
}
</style>
