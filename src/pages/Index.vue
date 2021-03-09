<template>
  <q-page class="flex q-pa-md">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->
    <q-card
      flat
      class="row justify-between bg-grey-3 q-pa-xl "
      style="width: 100vw; height: 300px;"
    >
      <div class="col-6 row justify-start items-start q-gutter-lg">
        <q-btn color="teal">
          <q-icon left size="3em" name="map" />
          <div>Certificate</div>
        </q-btn>

        <q-btn
          @click="setNavigationAndPushRoute('student', { name: 'Students' })"
          color="teal"
        >
          <q-icon left size="3em" name="map" />
          <div>Students</div>
        </q-btn>

        <q-btn color="teal">
          <q-icon left size="3em" name="person" />
          <div>Users</div>
        </q-btn>
      </div>
      <div class="col-5 row justify-center bg-grey">
        fdsfj
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PageIndex',

  methods: {
    ...mapActions('app', ['setNavigationType']),
    setNavigationAndPushRoute(type, route) {
      this.setNavigationType(type);
      this.$router.push(route);
    },
  },
};
</script>
