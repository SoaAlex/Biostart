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
      <b-navbar-nav>
        <router-link to="/monitoring" class="nav-text">Monitoring</router-link>
        <router-link to="/overview" class="nav-text" style="margin-left: 20px"
          >Overview</router-link
        >
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-text class="clock">{{ timestamp }}</b-nav-text>
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
    setInterval(this.getNow, 0);
  },
  methods: {
    getNow: function() {
      var today = new Date();
      var year = today.getFullYear();
      var month = ("0" + today.getMonth() + 1).substr(-2);
      var day = ("0" + today.getDate()).substr(-2);
      var date = day + "-" + month + "-" + year;
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
  border: 2px solid;
  padding: 3px;
  background-color: rgba(0, 0, 0, 0.3);
  font-family: Monaco, monospace !important;
}

.clock {
  color: #000000 !important;
  font-size: 20px;
  font-family: Monaco, monospace !important;
}

.navbar-dark .navbar-nav .nav-link {
  color: #000000 !important;
  font-size: 20px;
  font-family: Monaco, monospace !important;
}
</style>
