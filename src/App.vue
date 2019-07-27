<template>
  <v-app>
    <application-bar style="max-height: 48px"/>
    <v-content>
      Content!
    </v-content>
  </v-app>
</template>

<script>
import ApplicationBar from './components/ApplicationBar'
export default {
  name: 'App',
  components: {
    ApplicationBar
  },
};
</script>
