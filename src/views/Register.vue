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
      <div class="input-field">
        <input 
          id="name" 
          type="text" 
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}" />
        <label for="name">{{'Auth_Name'|localize}}</label>
        <small class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'Auth_HelperName'|localize}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox"
          v-model="agree" />
          <span>{{'Auth_Agree'|localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Auth_BtnRegister'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'Auth_HaveAccount'|localize}}?
        <router-link
          to="/login">{{'Auth_RedirectLogin'|localize}}!</router-link>
      </p>
    </div>
  </form>
</template>


<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
    data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: {email, required},
    password: {
      required, 
      minLength: minLength(8)
    },
    name: {required},
    agree: {
      checked: v => v
    }
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
        name: this.name
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {}  // eslint-disable-line
      // console.log(formData);
      // this.$router.push('/');
      // return formData;
    },
  }
}
</script>