<template>
  <div>
    <!-- Just an image -->
    <b-navbar variant="info" type="dark">
      <b-navbar-brand href="#">
        <img
          alt="Biostart logo"
          src="../assets/Logo-biostart.png"
          width="150px"
          style="margin-left: -10%; margin-bottom: -5%; margin-top: -5%"
        />
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        {{ new Date().toLocaleString() }}
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>
