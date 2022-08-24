<template>
  <q-page padding>
    <q-table :columns="columns" :rows="user">
      <template #body-cell-email="props">
        <q-td :props="props">
          <q-chip class="text-white" color="primary"
            >{{ props.row.email }}
          </q-chip></q-td
        >
      </template>
      <template #body-cell-name="props">
        <q-td :props="props">
          <q-input
            :loading="false"
            color="primary"
            v-model="props.row.name"
            borderless
            dense
          >
          </q-input
        ></q-td>
      </template>
      <template #top>
        <q-btn
          color="primary"
          round
          unelevated
          icon="add"
          @click="showDialog = true"
        >
        </q-btn>
      </template>
    </q-table>
    <q-dialog v-model="showDialog">
      <q-card class="full-width" style="max-width: 600 px">
        <q-form autofocus @submit="submitForm">
          <q-card-section>
            <div class="text-h6">Create New Account</div>
            <div class="text-subtitle1">
              Fill out the following form to create your new account.
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section class="column q-gutter-md">
            <q-input
              label="Name *"
              v-model="formState.name"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Le nom doit être complété.',
              ]"
            ></q-input>
            <q-input
              label="Email *"
              v-model="formState.email"
              :rules="[(val) => validateEmail(val) || 'Email doit etre valid.']"
            ></q-input>
            <q-input
              label="Phone"
              v-model="formState.phone"
              :rules="[
                (val) =>
                  phoneNumberValidated(val) || 'Numero de telephone invalid',
              ]"
            ></q-input>
            <q-input
              label="Password *"
              v-model="formState.password.value"
              type="password"
              :rules="[
                (val) =>
                  validatePassword(val) || 'Mot de passe doit etre correspond.',
              ]"
            >
            </q-input>
            <div class="password-criteria q-pa-sm">
              <div class="text-subtitle2 q-mb-sm">Password Criteria:</div>
              <div>
                <q-icon
                  :name="validPassword.length ? 'check_circle' : 'cancel'"
                  :color="validPassword.length ? 'positive' : 'negative'"
                ></q-icon>
                Must be at least 12 characters long.
              </div>
              <div>
                <q-icon
                  :name="validPassword.capital ? 'check_circle' : 'cancel'"
                  :color="validPassword.capital ? 'positive' : 'negative'"
                ></q-icon>
                Must contain at least one capital letter.
              </div>
              <div>
                <q-icon
                  :name="validPassword.number ? 'check_circle' : 'cancel'"
                  :color="validPassword.number ? 'positive' : 'negative'"
                ></q-icon>
                Must contain at least one number.
              </div>
              <div>
                <q-icon
                  :name="validPassword.symbol ? 'check_circle' : 'cancel'"
                  :color="validPassword.symbol ? 'positive' : 'negative'"
                ></q-icon>
                Must contain at least one special character: !@#$%^&*()-_+=
              </div>
            </div>
            <q-input
              label="Confirm Password *"
              v-model="formState.password.confirm"
              :disable="!validatePassword(formState.password.value)"
              type="password"
              :rules="[
                (val) =>
                  (val && val === formState.password.value) ||
                  'Must match password.',
              ]"
            >
            </q-input>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat>Cancel</q-btn>
            <q-btn color="primary" type="submit">Create Account</q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import _ from 'lodash';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { PhoneNumber, PhoneNumberUtil } from 'google-libphonenumber';
import { defineComponent, onMounted, reactive, ref } from 'vue';
type AccountFormState = {
  name: string;
  email: string;
  phone: string;
  password: {
    value: string;
    confirm: string;
  };
};
type PasswordValidator = {
  length: boolean;
  capital: boolean;
  number: boolean;
  symbol: boolean;
};
export default defineComponent({
  setup() {
    const $q = useQuasar();
    const formState = reactive(<AccountFormState>{
      name: '',
      email: '',
      phone: '',
      password: {
        value: '',
        confirm: '',
      },
    });
    const validPassword = reactive(<PasswordValidator>{
      length: false,
      capital: false,
      number: false,
      symbol: false,
    });

    // Function send Request  to server and get code
    const phoneUtil = PhoneNumberUtil.getInstance();
    // It's a function that is used to validate the phone number.
    function phoneNumberValidated(phone: string): boolean {
      try {
        const phoneNumber: PhoneNumber = phoneUtil.parse(phone, 'MG');
        formState.phone = _.toString(phoneNumber.getNationalNumber());
        const response = phoneUtil.isValidNumberForRegion(phoneNumber, 'MG');
        return response;
      } catch (err) {
        return false;
      }
    }
    function validateEmail(email: string): boolean {
      return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    }
    function validatePassword(password: string): boolean {
      // Test length
      validPassword.length = formState.password.value.length >= 12;
      // Test capital
      validPassword.capital = /^(?=.*[A-Z]).*$/.test(password);
      // Test number
      validPassword.number = /^(?=.*[0-9]).*$/.test(password);
      // Test symbol
      validPassword.symbol = /^(?=.*[!@#$%^&*()\-_+=]).*$/.test(password);
      return (
        validPassword.length &&
        validPassword.capital &&
        validPassword.number &&
        validPassword.symbol
      );
    }

    const createUserForm = ref({
      name: '',
      email: '',
    });
    const user = ref([]);

    function createUser() {
      showDialog.value = false;
    }
    const showDialog = ref(false);
    onMounted(() => {
      getUser();
    });

    function submitForm(): void {
      console.log('formState', formState);
    }
    const getUser = async () => {
      try {
        const { data } = await api.get('user');
        console.log(data);
        user.value = data;
      } catch (error) {}
    };
    const columns = [
      { field: 'id', name: 'id', align: 'left', label: 'ID' },
      { field: 'name', name: 'name', align: 'left', label: 'Name' },
      { field: 'email', name: 'email', align: 'left', label: 'Email' },
    ];

    return {
      columns,
      user,
      showDialog,
      createUser,
      createUserForm,
      validateEmail,
      validatePassword,
      validPassword,
      formState,
      submitForm,
      phoneNumberValidated,
    };
  },
});
</script>
