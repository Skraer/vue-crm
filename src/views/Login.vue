<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Auth_Title'|localize}}</span>
      <div class="input-field">
        <input 
          id="email" 
          type="text" 
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">{{'Auth_Email'|localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'Auth_HelperEmailEmpty'|localize}}</small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'Auth_HelperEmailIncorrect'|localize}}</small>
      </div>
      <div class="input-field">
        <input 
          id="password" 
          type="password" 
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{'Auth_Password'|localize}}</label>
        <small class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'Auth_HelperPasswordEmpty'|localize}}</small>
        <small class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'Auth_HelperPasswordMin'|localize}} {{$v.password.$params.minLength.min}} {{'Auth_HelperSymbols'|localize}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Auth_BtnLogin'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'Auth_DontHaveAccount'|localize}}?
        <router-link
          to="/register">{{'Auth_RedirectRegister'|localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: {email, required},
    password: {
      required, 
      minLength: minLength(8)
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (e) {}  // eslint-disable-line
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  }
}
</script>