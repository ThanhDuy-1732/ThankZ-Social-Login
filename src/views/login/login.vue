<template>
  <div class="login">
    <v-layout class="rounded rounded-md login__container">
      <v-main class="d-flex align-center justify-center login__content">
        <v-card class="login__card">
          <v-tabs
            v-model="selectedTab"
      
            color="light-blue"
            class="login__tabs"
            align-tabs="center"
          >
            <v-tab :value="loginTabIndex" class="tabs__tab">Login</v-tab>
            <v-tab :value="registerTabIndex" class="tabs__tab">Register</v-tab>
          </v-tabs>
          <v-window
            v-model="selectedTab"
            class="login__tab-content"
          >
            <v-window-item
              v-for="tabIndex in maxTab"
              :key="tabIndex"
              :value="tabIndex"
            >
            <KeepAlive>
              <component
                :is="activatedTab"
                class="login__form-container"

                @change-tab="handleSelectedTabChange"
              />
            </KeepAlive>
            </v-window-item>
          </v-window>
        </v-card>
      </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts" setup>
  // Utilities
  import {
    ref,
    computed,
    onMounted,
    defineAsyncComponent
  } from 'vue'
  import type { Component } from 'vue'

  // Components
  const LoginForm = defineAsyncComponent(() => import('./components/login-form/login-form.vue'))
  const RegisterForm = defineAsyncComponent(() => import('./components/register-form/register-form.vue'))

  // Constant
  const MAX_TAB = 2
  const LOGIN_TAB_INDEX = 1
  const REGISTER_TAB_INDEX = 2

  // Logic
  // Reactive Data
  const selectedTab = ref<number | null>(null)

  // Computed
  const maxTab = computed<number>(() => MAX_TAB)
  const loginTabIndex = computed<number>(() => LOGIN_TAB_INDEX)
  const registerTabIndex = computed<number>(() => REGISTER_TAB_INDEX)

  const activatedTab = computed<Component>(() => {
    const tabIndex = selectedTab.value
    
    if(tabIndex === REGISTER_TAB_INDEX) {
      return RegisterForm
    }

    return LoginForm
  });

  // Lifecycle
  onMounted(():void => {
    const doc = document.documentElement
    doc.style.setProperty('--max-tab', `${100 / maxTab.value}%`)
  });

  // Methods
  const handleSelectedTabChange = ():void => {
    const selectedLoginTab = selectedTab.value === LOGIN_TAB_INDEX

    if(selectedLoginTab) {
      selectedTab.value = REGISTER_TAB_INDEX
      return
    }

    selectedTab.value = LOGIN_TAB_INDEX
  };
</script>

<style lang="scss" scoped>
  @import './login.scss';
</style>