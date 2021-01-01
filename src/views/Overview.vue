<template>
  <div class="Monitoring">
    <Navbar />
    <b-container fluid="xl">
      <b-row>
        <b-col>
          Overview diagram here
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Monitoring",
  components: {
    Navbar
  }
};
</script>

<style scoped>
</style>
