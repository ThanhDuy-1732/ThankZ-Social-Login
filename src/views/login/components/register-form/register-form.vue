<template>
  <form
    class="register-form"
    @submit.prevent="handleSubmitFormClick"
  >
    <v-text-field
      v-model="username.value.value"
      :prepend-icon="formValidateIcon.username"
      :error-messages="username.errorMessage.value"

      required
      clearable
      variant="solo"
      label="User Name"
      class="register-form__field"
      clear-icon="mdi-close-circle"
    />

    <v-text-field
      v-model="email.value.value"
      :prepend-icon="formValidateIcon.email"
      :error-messages="email.errorMessage.value"

      required
      clearable
      label="Email"
      variant="solo"
      class="register-form__field"
      clear-icon="mdi-close-circle"
    />

    <v-text-field
      v-model="aliasName.value.value"
      :prepend-icon="formValidateIcon.aliasName"
      :error-messages="aliasName.errorMessage.value"

      clearable
      variant="solo"
      class="register-form__field"
      label="Alias Name (Optional)"
      clear-icon="mdi-close-circle"
    />

    <v-text-field
      :type="passwordType"
      v-model="password.value.value"
      :append-inner-icon="innerIconPassword"
      :prepend-icon="formValidateIcon.password"
      :error-messages="password.errorMessage.value"

      required
      clearable
      variant="solo"
      label="Password"
      class="register-form__field"
      clear-icon="mdi-close-circle"

      @click:append-inner="handleVisiblePasswordChange"
    />

    <v-text-field
      :type="confirmPasswordType"
      v-model="confirmPassword.value.value"
      :append-inner-icon="innerIconConfirmPassword"
      :prepend-icon="formValidateIcon.confirmPassword"
      :error-messages="confirmPassword.errorMessage.value"

      required
      clearable
      variant="solo"
      label="Confirm Password"
      class="register-form__field"
      clear-icon="mdi-close-circle"

      @click:append-inner="handleVisibleConfirmPasswordChange"
    />

    <v-text-field
    v-model="dateOfBirth.value.value"
    :prepend-icon="formValidateIcon.dateOfBirth"
    :error-messages="dateOfBirth.errorMessage.value"

    required
    type="date"
    variant="solo"
    label="Date Of Birth"
    class="register-form__field"
  />

    <v-btn
      type="submit"
      color="light-blue"
      class="me-4 register-form__button register-form__button--register"
    >
      Register
    </v-btn>
    <v-btn
      type="button"
      color="yellow-accent-1"
      class="me-4 register-form__button register-form__button--reset"
      
      @click="handleReset"
    >
      Reset
    </v-btn>
    <v-btn
      type="button"
      color="blue-grey"
      class="me-4 register-form__button register-form__button--login"
    
      @click="$emit('change-tab')"
    >
      Login
    </v-btn>
  </form>
</template>

<script lang="ts" setup>
  // Utilities
  import moment, { Moment } from 'moment'
  import { ref, reactive, computed } from 'vue'
  import { useField, useForm } from 'vee-validate'

  // Interface
  interface RegisterForm {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    aliasName: string | null;
    dateOfBirth: Moment | string;
  }

  interface ValidateIcon {
    email: string,
    username: string,
    password: string,
    aliasName: string,
    dateOfBirth: string,
    confirmPassword: string,
  }

 // Type
 import { ValidateSchema } from 'Types/index';

   // Constants
   import {
    REGEX,
    VALID_ICON,
    INVALID_ICON,
  } from 'Constant/index';

  const MIN_DATE: Moment = moment('1960/01/01');
  const MAX_DATE: Moment = moment('2100/12/31');

  // Logic
  // Validate Form
  const { handleSubmit, handleReset } = useForm<RegisterForm>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      aliasName: null,
      confirmPassword: '',
      dateOfBirth: moment().format('YYYY-MM-DD'),
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

      username (value: string): ValidateSchema {
        formValidateIcon.username = VALID_ICON;

        if(!value) {
          return true
        }

        if(value.length < 3) {
          formValidateIcon.username = INVALID_ICON;
          return 'The username has minimum 3 characters'
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

      aliasName (): ValidateSchema {
        return true;
      },

      confirmPassword (value: string): ValidateSchema {
        formValidateIcon.confirmPassword = VALID_ICON;

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

      dateOfBirth (value: Moment | string): ValidateSchema  {
        formValidateIcon.dateOfBirth = VALID_ICON;
        if(!value) {
          formValidateIcon.dateOfBirth = INVALID_ICON;
          return 'Please enter your date of birth';
        }

        const date = moment(value)
        const isValid: boolean = date.isValid()

        if(!isValid) {
          formValidateIcon.dateOfBirth = INVALID_ICON;
          return 'The date is invalid!';
        }

        const exceedDate: boolean = (
          MIN_DATE.diff(date, 'days') > 0 ||
          date.diff(MAX_DATE, 'days') > 0
        );

        if(exceedDate) {
          formValidateIcon.dateOfBirth = INVALID_ICON;
          return 'The date between 01/01/1960 and 31/12/2100';
        }

        return true;
      }
    },
  });

  // Reactive data
  const email = useField('email');
  const username = useField('username');
  const password = useField('password');
  const aliasName = useField('aliasName');
  const dateOfBirth = useField('dateOfBirth');
  const confirmPassword = useField('confirmPassword');

  const passwordVisible = ref<boolean>(false);
  const confirmPasswordVisible = ref<boolean>(false);

  const formValidateIcon: ValidateIcon = reactive({
    email: VALID_ICON,
    username: VALID_ICON,
    password: VALID_ICON,
    aliasName: VALID_ICON,
    dateOfBirth: VALID_ICON,
    confirmPassword: VALID_ICON,
  })

  // Computed
  const passwordType = computed<string>(() => {
    return passwordVisible.value ? 'text' : 'password';
  });

  const innerIconPassword = computed<string>(() => {
    return passwordVisible.value ? 'mdi-eye-off' : 'mdi-eye';
  });

  const confirmPasswordType = computed<string>(() => {
    return confirmPasswordVisible.value ? 'text' : 'password';
  });

  const innerIconConfirmPassword = computed<string>(() => {
    return confirmPasswordVisible.value ? 'mdi-eye-off' : 'mdi-eye';
  });

  // Methods
  const handleVisiblePasswordChange = ():boolean => {
    return passwordVisible.value = !passwordVisible.value
  };

  const handleVisibleConfirmPasswordChange = ():boolean => {
    return confirmPasswordVisible.value = !confirmPasswordVisible.value
  };

  const handleSubmitFormClick = handleSubmit<void>(values => {
    console.log('handleSubmitFormClick', values);
  });

  handleReset();
</script>

<style lang="scss" scoped>
  @import './register-form.scss';
</style>