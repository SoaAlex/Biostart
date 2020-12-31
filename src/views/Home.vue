<template>
  <div class="Home">
    <Navbar />
    <b-container class="bordered">
      <b-row align-v="stretch">
        <b-col class="bordered" cols="8"><PressureChart /></b-col>
        <b-col class="bordered">Total Volume filtered</b-col>
      </b-row>
      <b-row>
        <b-col class="bordered" cols="8"> </b-col>
        <b-col class="bordered">Total something</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import PressureChart from "@/components/PressureChart.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    PressureChart
  }
};
</script>

<style scoped>
.bordered {
  border: solid 1px;
  width: 100%;
}

.fullrow {
  width: 100%;
}
</style>
