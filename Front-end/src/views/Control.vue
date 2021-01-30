<template>
  <div class="Overview">
    <p class="title_cp">Control Pannel</p>

    <div>
      <p class="title_cp2">Filter 1</p>
      <hr style="padding: 0;" />
      <!-- <b-form-select v-model="selected" :options="options" class="mb-3">
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- Please select an option --</b-form-select-option
          >
        </template>
      </b-form-select> -->

      <b-form-group
        label="Select flow"
        v-slot="{ ariaDescribedby }"
        class="left"
      >
        <b-form-checkbox-group
          v-model="selected_F1"
          :options="options_F1"
          :aria-describedby="ariaDescribedby"
          buttons
          button-variant="primary"
          size="lg"
          name="buttons-2"
          class="center"
        ></b-form-checkbox-group>
      </b-form-group>

      <p class="title_cp2">Filter 2</p>
      <hr style="padding: 0;" />
      <b-form-group
        label="Select flow"
        v-slot="{ ariaDescribedby }"
        class="left"
      >
        <b-form-checkbox-group
          v-model="selected_F2"
          :options="options_F2"
          :aria-describedby="ariaDescribedby"
          buttons
          button-variant="primary"
          size="lg"
          name="buttons-2"
          class="center"
          @click.native="toWatch()"
        ></b-form-checkbox-group>
      </b-form-group>

      <hr style="padding: 0;" />
      <b-button disabled variant="danger" style="text-align: right" size="lg"
        >Reboot system (WIP)</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Control",
  data() {
    return {
      selected_F1: "WATER",
      options_F1: [
        { value: "WATER", text: "Water" },
        { value: "CLEANING", text: "Cleaning solution" },
        { value: "INACTIVE", text: "None" }
      ],
      selected_F2: "WATER",
      options_F2: [
        { value: "WATER", text: "Water" },
        { value: "CLEANING", text: "Cleaning solution" },
        { value: "INACTIVE", text: "None" }
      ]
    };
  },
  methods: {
    updateState() {
      this.axios.post(this.$store.state.serverIP + "/set-state", [
        this.selected_F1,
        this.selected_F2
      ]);
    }
  }
};
</script>

<style>
.title_cp {
  font-family: Monaco, monospace !important;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: -2%;
}

.title_cp2 {
  font-family: Monaco, monospace !important;
  font-size: 25px;
  text-align: left;
  margin: 2%;
  margin-bottom: -2%;
}

.active {
  background: rgb(5, 42, 77) !important;
}

.left {
  position: left;
  text-align: left;
  margin: 2%;
  margin-top: -1%;
}
</style>
