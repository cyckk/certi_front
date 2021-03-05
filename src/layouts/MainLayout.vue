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

        <q-btn-dropdown flat :label="getUserDetails.name">
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <!-- <q-toggle v-model="mobileData" label="Use Mobile Data" />
          <q-toggle v-model="bluetooth" label="Bluetooth" /> -->

              <q-btn
                @click="showPasswordUpdate = true"
                flat
                style="color: #108940"
                label="Update Password?"
                class="q-pl-0"
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

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
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
      if (this.password !== this.cnfPassword)
        return this.$q.notify({
          type: 'negative',
          message: `Password doesn't match`,
        });

      const response = await this.updatePasswordAction({
        oldPassword: this.oldPassword,
        newPassword: this.password,
      });

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
    signedIn() {
      return this.getUserDetails ? true : false;
    },

    // userDetails() {
    //   return this.getUserDeatils;
    // },
  },

  mounted() {
    this.getUser();
  },
};
</script>
