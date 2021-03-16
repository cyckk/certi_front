<template>
  <q-page class="q-ma-md q-pa-xl ">
    <div class="row justify-end">
      <div class="col-6 row justify-end items-center text-right">
        <!-- <q-select
          :disable="!fetched"
          outlined
          multiple
          class="col-6 q-mt-lg"
          v-model="logType"
          :options="logTypes"
          label="Log Type"
          @input="getLogs(logType.label)"
        /> -->

        <q-select
          :disable="!fetched"
          outlined
          multiple
          class="col-7 q-mt-lg"
          v-model="logType"
          :options="logTypes"
          label="Log Type"
        />

        <q-btn
          class="col-3 q-mt-lg q-ml-lg"
          color="primary"
          label="Filter"
          @click="filter"
        ></q-btn>
      </div>
    </div>
    <!-- Skeleton -->
    <div v-if="!loaded">
      <div class="q-pa-lg">
        <q-skeleton type="text" height="60px" width="150px"></q-skeleton>
        <q-skeleton square height="300px"></q-skeleton>
      </div>
    </div>
    <!-- End -->

    <div v-else>
      <q-timeline color="secondary">
        <q-timeline-entry heading>
          Logs
        </q-timeline-entry>

        <q-timeline-entry
          v-for="(log, index) in logs"
          :key="index"
          :subtitle="new Date(log.created_at).toLocaleString()"
        >
          {{ log.id }}
          <div v-html="log.message" class="log"></div>
        </q-timeline-entry>

        <!-- <q-timeline-entry
          title="Event Title"
          subtitle="February 21, 1986"
          icon="delete"
        >
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </q-timeline-entry> -->

        <!-- <q-timeline-entry heading>
          November, 2017
        </q-timeline-entry> -->
      </q-timeline>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      logs: [],
      fetched: false,

      logTypes: [],
      logType: [],

      options: [{ label: 'g', value: 1 }],
      option: [],
    };
  },
  methods: {
    async filter() {
      this.logs = [];
      this.logType.forEach(async type => {
        await this.getLogs(type.label);
      });
    },
    async getLogsTypes() {
      try {
        const response = await this.$axios.get(
          `${process.env.API_URL}/logs/get-logs-types`,

          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        console.log(response.data.response);

        if (response.data.response.length) {
          response.data.response.forEach(res => {
            this.logTypes.push({
              label: res.type,
              value: res.id,
            });
            console.log(res);
          });

          this.logType.push(this.logTypes[0]);
          console.log(this.logType);
          this.getLogs(this.logType[0].label);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getLogs(type) {
      console.log('get logs', type);
      // this.logs = [];
      this.fetched = false;
      this.loaded = false;
      try {
        const response = await this.$axios.post(
          `${process.env.API_URL}/logs/get-logs`,
          {
            permission: '6',
            type: type,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        console.log(response.data.response);

        response.data.response.forEach(res => {
          this.logs.push(res);
          console.log(res.type);
        });

        this.logs.sort((a, b) => (parseInt(a.id) - parseInt(b.id) ? -1 : 1));

        this.fetched = true;
        this.loaded = true;
      } catch (err) {
        console.log(err);
        this.loaded = true;
      }
    },
  },

  mounted() {
    // this.getLogs('user');
    this.getLogsTypes();
  },
};
</script>

<style lang="scss" scoped>
.message-from {
  text-decoration: none;
}
</style>
