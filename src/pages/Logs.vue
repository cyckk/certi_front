<template>
  <q-page class="q-ma-md q-pa-xl ">
    <q-timeline color="secondary">
      <q-timeline-entry heading>
        Logs
      </q-timeline-entry>

      <q-timeline-entry
        v-for="(log, index) in logs"
        :key="index"
        :title="`${log.message}`"
        :subtitle="new Date(log.created_at).toLocaleString()"
      >
        <div>
          <!-- {{ log.message }} -->
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="Event Title"
        subtitle="February 21, 1986"
        icon="delete"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry heading>
        November, 2017
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      logs: [],
    };
  },
  methods: {
    async getLogs() {
      const response = await this.$axios.get(
        `${process.env.API_URL}/logs/get-logs`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );

      console.log(response.data.response);

      response.data.response.forEach(res => {
        this.logs.push(res);
        console.log(res);
      });
    },
  },

  mounted() {
    this.getLogs();
  },
};
</script>
