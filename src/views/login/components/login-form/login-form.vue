<template>
  <form class="login-form" @submit.prevent="handleSubmitFormClick">
    <v-text-field
      :hint="emailHint"
      v-model="email.value.value"
      :prepend-icon="formValidateIcon.email"
      :error-messages="email.errorMessage.value"

      required
      clearable
      label="Email"
      variant="solo"
      class="login-form__field"
      clear-icon="mdi-close-circle"
      prepend-inner-icon="mdi-email-outline"
    ></v-text-field>

    <v-text-field
      :hint="passwordHint"
      :type="passwordType"
      v-model="password.value.value"
      :append-inner-icon="innerIconPassword"
      :prepend-icon="formValidateIcon.password"
      :error-messages="password.errorMessage.value"
      
      required
      clearable
      variant="solo"
      label="Password"
      class="login-form__field"
      clear-icon="mdi-close-circle"

      @click:append-inner="handleVisiblePasswordChange"
    ></v-text-field>

    <v-checkbox
      v-model="rememberAccount.value.value"

      label="Remember me?"
    ></v-checkbox>

    <v-btn
      type="submit"
      color="light-blue"
      class="me-4 login-form__button login-form__button--login"
    >
      Login
    </v-btn>
    <v-btn
      type="button"
      color="yellow-accent-1"
      class="me-4 login-form__button login-form__button--reset"
      
      @click="handleReset"
    >
      Reset
    </v-btn>
    <v-btn
      type="button"
      color="blue-grey"
      class="me-4 login-form__button login-form__button--register"
     
      @click="$emit('change-tab')"
    >
      Register
    </v-btn>
  </form>
</template>

<script lang="ts" setup>
  // Utilities
  import { ref, reactive, computed } from 'vue'
  import { useField, useForm } from 'vee-validate'

  // Type
  import { ValidateSchema } from 'Types/index';

  // Interface
  interface LoginForm {
    email: string;
    password: string;
    rememberAccount: boolean;
  }

  interface ValidateIcon {
    email: string;
    password: string;
  }

  // Constants
  import {
    REGEX,
    VALID_ICON,
    INVALID_ICON,
  } from 'Constant/index';

  // Logic
  // Validate Form
  const { handleSubmit, handleReset } = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: '',
      rememberAccount: false,
    },
    
    validationSchema: {
      email (value: string): ValidateSchema {
        formValidateIcon.email = VALID_ICON;

        if(!value) {
          return true;
        }

        const rule = REGEX.EMAIL;
        const isValid = rule.test(value);
        if(!isValid && value.length) {
          formValidateIcon.email = INVALID_ICON;

          return 'The email is invalid';
        }

        return true
      },

      password (value: string): ValidateSchema {
        formValidateIcon.password = VALID_ICON;

        if(!value) {
          return true;
        }

        const rule = REGEX.PASSWORD;
        const isValid = rule.test(value)
        
        if(!isValid && value.length) {
          formValidateIcon.password = INVALID_ICON;

          return 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character';
        }
        
        return true
      },

      rememberAccount (): ValidateSchema {
        return true
      }
    },
  });

  // Reactive data
  const email = useField('email');
  const password = useField('password');
  const rememberAccount = useField('rememberAccount');

  const formValidateIcon: ValidateIcon = reactive({
    email: VALID_ICON,
    password: VALID_ICON,
  })

  const passwordVisible = ref<boolean>(false);

  // Computed
  const passwordType = computed<string>(() => {
    return passwordVisible.value ? 'text' : 'password';
  });

  const innerIconPassword = computed<string>(() => {
    return passwordVisible.value ? 'mdi-eye-off' : 'mdi-eye';
  });

  const emailHint = computed<string>(() => {
    return email.value.value ? "" : "Example: thankz@gmail.com";
  });

  const passwordHint = computed<string>(() => {
    return password.value.value ? "" : "Example: thankZ@1703";
  });

  // Methods
  const handleVisiblePasswordChange = ():boolean => {
    return passwordVisible.value = !passwordVisible.value
  };

  const handleSubmitFormClick = handleSubmit<void>(values => {
    console.log('handleSubmitFormClick', values, JSON.stringify(values, null, 2))
  });

  handleReset();
</script>

<style lang="scss" scoped>
  @import './login-form.scss';
</style>