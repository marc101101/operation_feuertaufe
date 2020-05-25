<template>
  <v-row>
    <div class="container">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="dataVals"
        item-key="name"
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "Home",
  components: {},
  data() {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        { text: "Id", value: "id" },
        { text: "Humidity", value: "humidity" },
        { text: "Noise", value: "noise" },
        { text: "Gas", value: "gas" },
        { text: "Timestamp", value: "timestamp" }
      ],
      dataVals: [
        {
          gas: 23.344,
          humidity: 3.23,
          id: "08bb5650-9906-11ea-87a6-2921f7819316",
          noise: 2.12,
          timestamp: 1589806178357
        },
        {
          gas: 23.344,
          humidity: 3.23,
          id: "07c313a0-9906-11ea-87a6-2921f7819316",
          noise: 2.12,
          timestamp: 1589806176730
        },
        {
          gas: 23.344,
          humidity: 3.23,
          id: "077f7af0-9906-11ea-87a6-2921f7819316",
          noise: 2.12,
          timestamp: 1589806176287
        },
        {
          gas: 23.344,
          humidity: 2.23,
          id: "b1894bc0-9906-11ea-b114-b3f8bb2f6d70",
          noise: 2.12,
          timestamp: 1589806461564
        },
        {
          gas: 23.344,
          humidity: 3.23,
          id: "f9d1bda0-9905-11ea-87a6-2921f7819316",
          noise: 2.12,
          timestamp: 1589806153338
        },
        {
          gas: 23.344,
          humidity: 3.23,
          id: "071b3ae0-9906-11ea-87a6-2921f7819316",
          noise: 2.12,
          timestamp: 1589806175630
        }
      ]
    };
  }
});
</script>
<style>
</style>
