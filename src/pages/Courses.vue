<template>
  <q-page class="q-mt-xl q-pa-lg">
    <!-- Skeleton -->
    <div class="q-pa-md" v-if="!loaded">
      <div class="row justify-between items-center q-mb-lg">
        <q-skeleton class="col-9" type="QInput" />
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
        <q-btn
          color="primary"
          label="Add"
          @click="selectIdAndPrompt('', 'add', {})"
        ></q-btn>
      </div>
      <q-list bordered class=" row-reverse justify-between bg-grey-3">
        <div>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              #
            </q-item-section>

            <q-item-section>Course Name</q-item-section>

            <q-item-section>Course Duration</q-item-section>

            <q-item-section>Students</q-item-section>

            <q-item-section>Actions</q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div>
        <div v-for="(course, index) in filteredCourses" :key="index">
          <q-item>
            <q-item-section avatar>
              {{ index + 1 }}
            </q-item-section>

            <q-item-section>{{ course.course_name }}</q-item-section>

            <q-item-section>{{ course.course_duration }}</q-item-section>

            <q-item-section>{{ course.student_count }}</q-item-section>

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
                      @click="
                        selectIdAndPrompt(course.id, 'update', {
                          name: course.course_name,
                          duration: course.course_duration,
                        })
                      "
                    >
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Delete</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      @click="
                        selectIdAndAskConfirmation(
                          course.id,
                          course.course_name
                        )
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
      </q-list>

      <q-dialog v-model="addCoursePrompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              {{ operation === 'add' ? 'Add new Course' : 'Update Course' }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model.trim="courseName"
              autofocus
              @keyup.enter="prompt = false"
              type="text"
              label="Course Name"
            />

            <q-input
              class="q-mt-lg"
              dense
              v-model.trim="courseDuration"
              autofocus
              @keyup.enter="prompt = false"
              type="text"
              label="Course Duration"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" no-caps v-close-popup />
            <q-btn
              flat
              :label="operation == 'add' ? 'Add' : 'Update'"
              no-caps
              @click="operation == 'add' ? addCourse() : updateCourse()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- confirmation prompt to disable a course -->
      <q-dialog v-model="confirmationPrompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              Disable course?
            </div>
          </q-card-section>

          <!-- <q-card-section class="q-pt-none">
          Disable course?
        </q-card-section> -->

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" no-caps v-close-popup />
            <q-btn flat label="Confirm" no-caps @click="disableCourse" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      loaded: false,
      courses: [],
      filteredCourses: [],
      search: '',

      addCoursePrompt: false,
      courseName: '',
      courseDuration: '',

      //to choose a course and operation
      selectedCourseId: '',
      operation: '',

      //to disable a course
      confirmationPrompt: false,
    };
  },
  methods: {
    ...mapActions('app', ['saveLog']),
    async getCourses() {
      this.loaded = false;
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
          this.courses.push(res);
        });
        console.log(this.courses);

        this.filteredCourses = this.courses;

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

    async addCourse() {
      if (!this.courseName && !this.courseDuration)
        return this.$q.notify({
          type: 'negative',
          message: `Please enter course details`,
        });
      const url = `${process.env.API_URL}/course/create-course`;
      // console.log(url);
      try {
        let response = await this.$axios.post(
          url,
          {
            course_name: this.courseName,
            course_duration: this.courseDuration,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data.response);

        this.courseName = '';
        this.courseDuration = '';
        this.addCoursePrompt = false;

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: response.data.response.insertId,
          type: 'course',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Added course ${this.courseName}`,
        };
        await this.saveLog(log);

        this.$q.notify({
          type: 'positive',
          message: `New course added successfully`,
        });

        this.getCourses();
      } catch (err) {
        console.log(err.message);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },

    selectIdAndPrompt(id, operation, course) {
      // console.log(id);
      this.selectedCourseId = id;
      this.courseName = course.name;
      this.courseDuration = course.duration;
      this.operation = operation;
      this.addCoursePrompt = true;
    },

    async updateCourse() {
      if (!this.courseName && !this.courseDuration)
        return this.$q.notify({
          type: 'negative',
          message: `Please enter course details`,
        });
      const url = `${process.env.API_URL}/course/update-course`;
      // console.log(url);
      try {
        let response = await this.$axios.post(
          url,
          {
            id: this.selectedCourseId,
            course_name: this.courseName,
            course_duration: this.courseDuration,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);

        this.addCoursePrompt = false;

        this.$q.notify({
          type: 'positive',
          message: `Course Updated`,
        });

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: this.selectedCourseId,
          type: 'course',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Edited course ${this.courseName}`,
        };
        await this.saveLog(log);

        this.courseName = '';
        this.courseDuration = '';

        // this.getCourses();

        this.getCourses();
      } catch (err) {
        console.log(err.message);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },

    selectIdAndAskConfirmation(id, name) {
      this.selectedCourseId = id;
      this.courseName = name;
      this.confirmationPrompt = true;
    },

    async disableCourse() {
      const url = `${process.env.API_URL}/course/disabled-course/${this.selectedCourseId}`;
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data);

        // this.courseDuration = '';
        this.confirmationPrompt = false;

        this.$q.notify({
          type: 'positive',
          message: `${this.$store.state.userStore.userProfile.name} Disabled course ${this.courseName}`,
        });

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
          }</a> Disabled Course ${this.courseName}`,
        };
        await this.saveLog(log);

        this.courseName = '';
        this.selectedCourseId = '';

        this.getCourses();
      } catch (err) {
        console.log(err.message);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },
  },

  watch: {
    search() {
      this.filteredCourses = this.courses.filter(course => {
        return course.course_name
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    console.log('courses page');
    this.getCourses();
  },
};
</script>
