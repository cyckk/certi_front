<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="signedIn">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Certificate Generator
          <!-- {{ getUserDetails }} -->
        </q-toolbar-title>

        <q-btn-dropdown flat :label="getUserDetails.name" auto-close>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>

              <q-btn
                @click="showPasswordUpdate = true"
                flat
                style="color: #108940"
                label="Update Password?"
                class="q-pl-0"
                no-caps
                padding="0 0"
              />

              <q-btn
                :to="{ name: 'Profile' }"
                flat
                style="color: #879902"
                color="primary"
                label="Profile"
                class="q-pl-0 q-mt-sm"
                no-caps
                padding="0 0"
              />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">
                {{ getUserDetails.name }}
              </div>

              <q-btn
                @click="logout"
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="signedIn"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- {{ getUserDetails }}
      {{ signedIn }} -->
      <router-view />
    </q-page-container>

    <q-dialog v-model="showPasswordUpdate" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Update Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            v-model.trim="oldPassword"
            autofocus
            @keyup.enter="prompt = false"
            type="text"
            label="Current Password"
          />
          <q-input
            class="q-mt-lg"
            outlined
            v-model.trim="password"
            autofocus
            @keyup.enter="prompt = false"
            :type="isPwd ? 'password' : 'text'"
            label="New Password"
            ><template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              /> </template
          ></q-input>
          <q-input
            class="q-mt-lg"
            outlined
            v-model.trim="cnfPassword"
            autofocus
            @keyup.enter="prompt = false"
            :type="isPwd ? 'password' : 'text'"
            label="Confirm Password"
            ><template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              /> </template
          ></q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" no-caps v-close-popup />
          <q-btn @click="updatePassword" flat label="Update" no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EssentialLink from 'components/EssentialLink.vue';

const courseLinks = [
  {
    title: 'Dashboard',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'DashBoard',
  },
];

//Navigation links for student
const studentsLinks = [
  {
    title: 'DashBoard',
    caption: 'quasar.dev',
    icon: 'dashboard',
    link: 'DashBoard',
  },
  {
    title: 'Students',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'Students',
  },
  {
    title: 'Batches',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Courses',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'Courses',
  },
];
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      // essentialLinks: studentsLinks,
      user: null,

      showPasswordUpdate: false,

      oldPassword: '',
      password: '',
      cnfPassword: '',
      isPwd: true,
    };
  },
  methods: {
    ...mapActions('userStore', [
      'getUser',
      'destroySessionAction',
      'updatePasswordAction',
    ]),

    logout() {
      this.destroySessionAction();
    },

    async updatePassword() {
      if (!this.oldPassword && !this.password && !this.cnfPassword)
        return this.$q.notify({
          type: 'negative',
          message: `Please enter your password`,
        });
      if (this.password !== this.cnfPassword)
        return this.$q.notify({
          type: 'negative',
          message: `Password doesn't match`,
        });

      const response = await this.updatePasswordAction({
        oldPassword: this.oldPassword,
        newPassword: this.password,
      });

      const id = jwt_decode(localStorage.getItem('token')).id;
      console.log('userid ', id);

      const log = {
        to: id,
        from: id,
        type: 'user',
        message: `<a class="message-from" href="${
          window.location.href.split(window.location.pathname)[0]
        }/profile/${this.$store.state.userStore.userProfile.id}">${
          this.$store.state.userStore.userProfile.name
        }</a> Updated password`,
      };

      this.saveLog(log);

      if (response !== '')
        this.$q.notify({
          type: 'negative',
          message: `${response}`,
        });
      else {
        this.showPasswordUpdate = false;
        this.oldPassword = '';
        this.newPassword = '';
        this.cnfPassword = '';

        this.$q.notify({
          type: 'positive',
          message: `Password Updated`,
        });
      }
    },
  },
  computed: {
    ...mapGetters('userStore', ['getUserDetails']),
    ...mapGetters('app', ['navigationType']),

    signedIn() {
      return this.getUserDetails ? true : false;
    },

    essentialLinks() {
      return this.navigationType == 'student' ? studentsLinks : courseLinks;
    },

    // userDetails() {
    //   return this.getUserDeatils;
    // },
  },

  async mounted() {
    await this.getUser();
  },
};
</script>
