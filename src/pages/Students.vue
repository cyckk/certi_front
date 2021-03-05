<template>
  <q-page class="flex row">
    <q-list bordered class="col-3 row-reverse justify-between bg-grey-3">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>

        <q-item-section>Students</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" icon="bluetooth" />
        </q-item-section>

        <q-item-section>Avatar-type icon</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar
            rounded
            color="purple"
            text-color="white"
            icon="bluetooth"
          />
        </q-item-section>

        <q-item-section>Rounded avatar-type icon</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            R
          </q-avatar>
        </q-item-section>

        <q-item-section>Letter avatar-type</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image avatar</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image square avatar</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Image rounded avatar</q-item-section>
      </q-item>

      <q-separator />
    </q-list>

    <div class="col-9 bg-grey-6 q-pa-md">
      <q-list bordered class="col-3 row-reverse justify-between bg-grey-3">
        <div v-for="(user, index) in users" :key="index">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="bluetooth" />
            </q-item-section>

            <q-item-section>{{ user.Name }}</q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getStudents() {
      const url = `${process.env.API_URL}/user/get-all-user`;
      // console.log(url);
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data.data);
        this.users = [];
        response.data.data.forEach(res => {
          console.log(res);
          this.users.push(res);
        });
        console.log(this.users);
        // this.permissions = response.data.response.map(res => {
        //   console.log(res.id);
        //   return {
        //     id: res.id,
        //     code: res.code,
        //     group_by: res.group_by,
        //     label: res.string,
        //   };
        // });
      } catch (err) {
        console.log(err.message);
      }
    },
  },

  mounted() {
    this.getStudents();
  },
};
</script>
