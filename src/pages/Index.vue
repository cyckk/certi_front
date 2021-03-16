<template>
  <q-page class="row justify-center q-pa-lg">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->
    <q-card
      flat
      class="col-12 col-md-9 row justify-between bg-grey-3 q-pa-xl "
      style=" height: 300px;"
    >
      <div class="col-6 row justify-start items-start q-gutter-lg">
        <q-btn :to="{ name: 'Certificate' }" color="teal">
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

        <q-btn :to="{ name: 'Users' }" color="teal">
          <q-icon left size="3em" name="person" />
          <div>Users</div>
        </q-btn>

        <q-btn :to="{ name: 'Logs' }" color="teal">
          <q-icon left size="3em" name="chat" />
          <div>Logs</div>
        </q-btn>
      </div>
      <div class="col-5 row justify-center bg-grey">
        Notice
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
