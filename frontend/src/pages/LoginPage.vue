<template>
    <q-page class="flex flex-center" padding>
    <q-card class="full-width" style="max-width: 450px">
      <q-card-section style="font-size: 1.3em" class="text-center">
        Login
      </q-card-section>
      <q-card-section>
        <q-input
        type="email"
         filled v-model="form.email"
           name="email" label="Email"
            class="q-mb-md" >
             <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
            </q-input>
        <q-input
          filled
          label="Password"
          v-model="form.password"
          class="q-mb-md"
          type="password"
          name="password"
        />

      </q-card-section>
      <q-btn class="full-width"   label="Login" @click="login" color="primary" />
    </q-card>
  </q-page>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AuthentificationServices from '../services/AuthentificationServices';
export default defineComponent({
  name: 'IndexPage',
  setup () {
        const form = ref({
      email: '',
      password: '',
    });
    return { form };   
  },
  methods:{
        // eslint-disable-next-line vue/no-dupe-keys
       async login() {
      // console.log('donia');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const response = await AuthentificationServices.register(
        // // Si je veux declarer la liste donner par form direct on peut
        // this.form
        // )
           const response = await AuthentificationServices.register({  
           email:this.form.email,
           password:this.form.password}
        // Si je veux declarer la liste en  detail  donner par form direct on peut
        )
      // console.log(response.data);
      console.log(response.data);
    }
  }
});
</script>
