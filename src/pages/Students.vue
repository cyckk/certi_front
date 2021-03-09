<template>
  <q-page class="q-mt-xl q-pa-lg">
    <!-- Skeleton -->
    <div class="q-pa-md" v-if="!loaded">
      <!-- <q-card style="max-width: 300px">
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-skeleton height="200px" square />

        <q-card-actions align="right" class="q-gutter-md">
          <q-skeleton type="QBtn" />
          <q-skeleton type="QBtn" />
        </q-card-actions>
      </q-card> -->

      <div class="row justify-between items-center q-mb-lg">
        <q-skeleton class="col-9" type="input" />
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </div>
      <q-list bordered class=" row-reverse justify-between">
        <q-skeleton height="200px" square />
      </q-list>
    </div>

    <!-- end -->

    <!-- Real page -->
    <div v-else>
      <div class="row justify-between items-center q-mb-lg">
        <q-input
          dense
          class="col-9"
          v-model="search"
          debounce="500"
          outlined
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn color="primary" label="Filter"></q-btn>
        <q-btn color="primary" label="Add"></q-btn>
      </div>
      <q-list bordered class=" row-reverse justify-between bg-grey-3">
        <div>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              #
            </q-item-section>

            <q-item-section>Student Name</q-item-section>

            <q-item-section>Course Duration</q-item-section>

            <q-item-section>Students</q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div>
        <div v-for="(user, index) in users" :key="index">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              {{ index + 1 }}
            </q-item-section>

            <q-item-section>{{ user.Name }}</q-item-section>

            <q-item-section>{{ user.course_duration }}</q-item-section>

            <q-item-section>{{ user.student_count }}</q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div>
      </q-list>
    </div>

    <!-- end -->
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      loaded: false,

      users: [],
      search: '',
    };
  },
  methods: {
    async getStudents() {
      this.loaded = false;
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

        this.loaded = true;
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
        this.loaded = true;
      }
    },
  },
  mounted() {
    this.getStudents();
  },
};
</script>
