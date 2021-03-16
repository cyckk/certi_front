<template>
  <q-page class="q-mt-xl q-pa-lg row justify-center">
    <!-- Skeleton -->
    <div class="col-12 col-md-9 q-pa-md" v-if="!loaded">
      <div class="row justify-between items-center q-mb-lg">
        <q-skeleton class="col-7" type="QInput" height="35px" />
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </div>
      <q-list bordered class=" row-reverse justify-between">
        <q-skeleton height="200px" square />
      </q-list>
    </div>

    <!-- end -->

    <!-- Real page -->
    <div v-else class="col-12 col-md-9">
      <div class="row justify-between items-center q-mb-md">
        <q-input
          dense
          class="col-7"
          v-model="search"
          debounce="500"
          outlined
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          @click="showDisabledBatches = !showDisabledBatches"
          color="secondary"
          :label="
            showDisabledBatches
              ? 'Show Active Batches'
              : 'Show Disabled Batches'
          "
          no-caps
        ></q-btn>
        <q-btn
          v-if="currentUserPermissions.includes('12')"
          color="primary"
          label="Add Batch"
          @click="selectIdAndPrompt('', 'add', {})"
          no-caps
        ></q-btn>
      </div>
      <q-list bordered class=" row-reverse justify-between bg-grey-3">
        <div>
          <q-item clickable v-ripple class="text-bold">
            <q-item-section avatar>
              #
            </q-item-section>

            <q-item-section>Batch</q-item-section>

            <q-item-section>Course Name</q-item-section>

            <q-item-section>Status</q-item-section>

            <q-item-section class="text-center">Students</q-item-section>

            <q-item-section class="text-center">Actions</q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div>
        <div v-if="!filteredBatches.length" class="text-center q-mt-lg">
          No Batches Available
        </div>
        <div v-else-if="!showDisabledBatches">
          <div v-for="(batch, index) in filteredBatches" :key="index">
            <q-item>
              <q-item-section avatar>
                {{ index + 1 }}
              </q-item-section>

              <q-item-section>{{ batch.batch_name }}</q-item-section>

              <q-item-section>{{ batch.course_specialization }}</q-item-section>

              <q-item-section>{{ batch.status }}</q-item-section>

              <q-item-section class="text-center">{{
                batch.student_count
              }}</q-item-section>

              <q-item-section class="text-center">
                <q-btn flat color="primary" icon="settings">
                  <q-menu
                    transition-show="scale"
                    transition-hide="scale"
                    auto-close
                  >
                    <q-list style="min-width: 100px">
                      <q-item
                        clickable
                        :to="{ name: 'BatchDetails', params: { id: batch.id } }"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        v-if="currentUserPermissions.includes('13')"
                        clickable
                        @click="selectIdAndPrompt(batch.id, 'update', batch)"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <!-- <q-item clickable>
                      <q-item-section>Delete</q-item-section>
                    </q-item> -->
                      <q-separator />
                      <q-item
                        v-if="currentUserPermissions.includes('14')"
                        clickable
                        @click="
                          selectIdAndAskConfirmation(batch.id, batch.batch_name)
                        "
                      >
                        <q-item-section>Disable</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
            <q-separator></q-separator>
          </div>
        </div>

        <div v-else-if="!filteredDBatches.length" class="text-center q-mt-lg">
          No Courses Available
        </div>

        <div v-else>
          <div v-for="(batch, index) in filteredDBatches" :key="index">
            <q-item>
              <q-item-section avatar>
                {{ index + 1 }}
              </q-item-section>

              <q-item-section>{{ batch.batch_name }}</q-item-section>

              <q-item-section>{{ batch.course_specialization }}</q-item-section>

              <q-item-section>{{ batch.status }}</q-item-section>

              <q-item-section class="text-center">{{
                batch.batch_name
              }}</q-item-section>

              <q-item-section class="text-center">
                <q-btn flat color="primary" icon="settings">
                  <q-menu
                    transition-show="scale"
                    transition-hide="scale"
                    auto-close
                  >
                    <q-list style="min-width: 100px">
                      <q-item
                        clickable
                        :to="{ name: 'BatchDetails', params: { id: batch.id } }"
                      >
                        <q-item-section>View</q-item-section>
                      </q-item>
                      <q-item
                        v-if="currentUserPermissions.includes('13')"
                        clickable
                        @click="selectIdAndPrompt(batch.id, 'update', batch)"
                      >
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <!-- <q-item clickable>
                      <q-item-section>Delete</q-item-section>
                    </q-item> -->
                      <q-separator />
                      <q-item
                        v-if="currentUserPermissions.includes('14')"
                        clickable
                        @click="
                          selectIdAndAskConfirmation(batch.id, batch.batch_name)
                        "
                      >
                        <q-item-section>Enable</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
            <q-separator></q-separator>
          </div>
        </div>
      </q-list>

      <q-dialog v-model="addBatchPrompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              {{ operation === 'add' ? 'Add new Batch' : 'Update Batch' }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model.trim="batchName"
              autofocus
              type="text"
              label="Batch Name"
            />

            <q-select
              class="q-mt-lg"
              v-model="course"
              :options="courses"
              label="Course"
            />

            <q-select
              class="q-mt-lg"
              v-model.trim="status"
              :options="statusOptions"
              label="Status"
            />

            <q-input
              class="q-mt-lg"
              dense
              v-model.trim="batchStartDate"
              type="date"
              hint="Start Date"
            />

            <q-input
              class="q-mt-lg"
              dense
              v-model.trim="batchEndDate"
              type="date"
              hint="End Date"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" no-caps v-close-popup />
            <q-btn
              flat
              :label="operation == 'add' ? 'Add' : 'Update'"
              no-caps
              @click="operation == 'add' ? addBatch() : updateBatch()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- confirmation prompt to disable a course -->
      <q-dialog v-model="confirmationPrompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              {{ showDisabledBatches ? 'Enable Batch?' : 'Disable Batch?' }}
            </div>
          </q-card-section>

          <!-- <q-card-section class="q-pt-none">
          Disable course?
        </q-card-section> -->

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" no-caps v-close-popup />
            <q-btn
              flat
              label="Confirm"
              no-caps
              @click="disableBatch(!showDisabledBatches)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import jwt_decode from 'jwt-decode';
import { QSpinnerClock } from 'quasar';

export default {
  data() {
    return {
      loaded: false,

      currentUserPermissions: [],

      batches: [],
      courses: [],
      filteredBatches: [],

      dBatches: [],
      filteredDBatches: [],

      showDisabledBatches: false,
      search: '',

      addBatchPrompt: false,
      batchName: '',
      course: '',
      statusOptions: ['Ongoing', 'Not started'],
      status: '',
      batchStartDate: '',
      batchEndDate: '',

      //to choose a course and operation
      selectedBatchId: '',
      operation: '',

      //to disable a course
      confirmationPrompt: false,
    };
  },
  methods: {
    ...mapActions('app', ['saveLog']),
    async getBatches() {
      this.loaded = false;
      this.filteredBatches = [];
      const url = `${process.env.API_URL}/batch/get-batch`;
      // console.log(url);
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        // console.log(response.data);
        this.batches = [];
        response.data.response.forEach(res => {
          // console.log(res);
          this.batches.push(res);
        });

        this.filteredBatches = this.batches;

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

    async getDBatches() {
      this.loaded = false;
      this.filteredDBatches = [];
      const url = `${process.env.API_URL}/batch/get-disabled-batch`;
      // console.log(url);
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        // console.log(response.data);
        this.dBatches = [];
        response.data.response.forEach(res => {
          // console.log(res);
          this.dBatches.push(res);
        });

        this.filteredDBatches = this.dBatches;

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

    async getCourses() {
      // this.loaded = false;
      const url = `${process.env.API_URL}/course/get-course`;
      // console.log(url);
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        this.courses = [];
        response.data.response.forEach(res => {
          console.log(res);
          this.courses.push({
            label: res.specialization,
            value: res.id,
          });
        });
        // console.log(this.courses);

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
        // this.loaded = true;
      }
    },

    async addBatch() {
      if (
        !this.batchName &&
        !this.courseId &&
        !this.status &&
        !this.batchStartDate &&
        !this.batchEndDate
      )
        return this.$q.notify({
          type: 'negative',
          message: `Please enter course details`,
        });

      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        message: 'Adding Batch',
        spinnerColor: 'teal-1',
      });

      const url = `${process.env.API_URL}/batch/create-batch`;
      console.log(this.course.value);
      try {
        let response = await this.$axios.post(
          url,
          {
            batch_name: this.batchName,
            course_id: this.course.value,
            status: this.status,
            start_date: this.batchStartDate,
            end_date: this.batchEndDate,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data.response);

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: response.data.response.insertId,
          type: 'batch',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Added Batch ${this.batchName}`,
        };
        await this.saveLog(log);

        this.batchName = '';
        this.courseId = '';
        this.status = '';
        this.batchStartDate = '';
        this.batchEndDate = '';

        this.addBatchPrompt = false;

        this.$q.loading.hide();

        this.$q.notify({
          type: 'positive',
          message: `New batch added successfully`,
        });

        this.getBatches();
      } catch (err) {
        console.log(err.message);
        this.$q.loading.hide();
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },

    selectIdAndPrompt(id, operation, batch) {
      // console.log(id);
      this.selectedBatchId = id;
      this.batchName = batch ? batch.batch_name : '';
      this.course = batch
        ? { label: batch.course_specialization, value: batch.course_id }
        : '';
      this.status = batch ? batch.status : '';
      this.batchStartDate = batch ? batch.start_date : '';
      this.batchEndDate = batch ? batch.end_date : '';

      this.operation = operation;
      this.addBatchPrompt = true;

      // this.getCourses();
    },

    async updateBatch() {
      if (
        !this.batchName &&
        !this.course &&
        !this.status &&
        !this.batchStartDate &&
        !this.batchEndDate
      )
        return this.$q.notify({
          type: 'negative',
          message: `Please enter course details`,
        });

      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        message: 'Updating Batch',
        spinnerColor: 'teal-1',
      });

      const url = `${process.env.API_URL}/batch/update-batch`;
      // console.log(url);
      try {
        let response = await this.$axios.post(
          url,
          {
            id: this.selectedBatchId,
            batch_name: this.batchName,
            course_id: this.course.value,
            status: this.status,
            start_date: this.batchStartDate,
            end_date: this.batchEndDate,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: this.selectedCourseId,
          type: 'batch',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Updated batch ${this.batchName}`,
        };
        await this.saveLog(log);

        this.batchName = '';
        this.course = '';
        this.status = '';
        this.batchStartDate = '';
        this.batchEndDate = '';

        this.addBatchPrompt = false;

        this.$q.loading.hide();

        this.$q.notify({
          type: 'positive',
          message: `Batch Updated`,
        });

        this.getBatches();
      } catch (err) {
        console.log(err.message);
        this.$q.loading.hide();
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },

    selectIdAndAskConfirmation(id, name) {
      this.selectedBatchId = id;
      this.batchName = name;
      this.confirmationPrompt = true;
    },

    async disableBatch(disabled) {
      console.log(disabled, this.selectedBatchId);
      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        // message: 'Disabling Course',
        spinnerColor: 'teal-1',
      });
      const url = `${process.env.API_URL}/batch/disabled-batch`;
      try {
        let response = await this.$axios.post(
          url,
          {
            id: this.selectedBatchId,
            disabled: disabled,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);

        // this.courseDuration = '';
        this.confirmationPrompt = false;

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: id,
          type: 'course',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Disabled Batch ${this.batchName}`,
        };
        await this.saveLog(log);

        this.batchName = '';
        this.selectedBatchId = '';

        this.$q.loading.hide();

        this.$q.notify({
          type: 'positive',
          message: `Success`,
        });

        await this.getBatches();
        await this.getDBatches();
      } catch (err) {
        console.log(err.message);
        this.$q.loading.hide();
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },
  },

  watch: {
    search() {
      if (!this.showDisabledBatches)
        this.filteredBatches = this.batches.filter(batch => {
          return batch.batch_name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      else
        this.filteredDBatches = this.dBatches.filter(batch => {
          return batch.batch_name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
    },
  },
  async mounted() {
    console.log('batches page');
    this.currentUserPermissions = this.$store.getters[
      'userStore/getUserDetails'
    ].permission;
    console.log(this.currentUserPermissions);
    await this.getBatches();
    await this.getDBatches();
    await this.getCourses();
  },
};
</script>
