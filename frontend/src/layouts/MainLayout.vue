<template>
  <q-layout view="hhh LpR fff">
    <q-header
      reveal
      elevated
      class="text-white"
      height-hint="98"
      style="background: linear-gradient(#19d2c9, #19d2c9)"
    >
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="../../public/account-manager-job-description.webp" />
          </q-avatar>
          Personal Account
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <!-- <q-route-tab to="/login" label="Login" /> -->
        <!-- <q-route-tab to="/two" label="Page Two" />
        <q-route-tab to="/three" label="Page Three" /> -->
      </q-tabs>
    </q-header>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <main-layout-menu-list></main-layout-menu-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayoutMenuList from './MainLayoutMenuList.vue';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
