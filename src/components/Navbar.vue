<template>
  <div class="Navbar">
    <!-- Just an image -->
    <b-navbar variant="info" type="dark">
      <b-navbar-brand>
        <img
          alt="Biostart logo"
          src="../assets/Logo-biostart.png"
          class="logo"
        />
      </b-navbar-brand>
      <b-nav-text class="nav-text">Monitoring</b-nav-text>

      <b-navbar-nav class="ml-auto">
        <b-nav-text class="nav-text">{{ timestamp }}</b-nav-text>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  el: "#Navbar",
  data: function() {
    return {
      timestamp: ""
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow: function() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var currentHours = ("0" + today.getHours()).substr(-2);
      var currentMins = ("0" + today.getMinutes()).substr(-2);
      var currentSecs = ("0" + today.getSeconds()).substr(-2);
      var time = currentHours + ":" + currentMins + ":" + currentSecs;
      var dateTime = date + " | " + time;
      this.timestamp = dateTime;
    }
  }
};
</script>

<style scoped>
.logo {
  margin-left: -10%;
  margin-bottom: -5%;
  margin-top: -5%;
  width: 150px;
}

.nav-text {
  color: #000000 !important;
  font-size: 20px;
  font-family: Monaco, monospace !important;
}
</style>
