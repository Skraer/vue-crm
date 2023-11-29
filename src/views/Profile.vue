<template>
  <div>
    <div class="page-title">
      <h3>{{'Title_Profile' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input 
          id="description" 
          type="text" 
          v-model.trim="name"
          :class="{invalid: ($v.name.$error)}"
        />
        <label for="description">{{'Placeholder_Name' | localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$error"
        >{{'Helper_Name'|localize}}</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Btn_Update'|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    name: '',
    isRuLocale: true,
  }),
  computed: {
    ...mapGetters(['info']),
  },
  validations: {
    name: {required},
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
        this.$message('Данные обновлены!');
      } catch (e) {}  // eslint-disable-line
    },
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    setTimeout(() => {
      window.M.updateTextFields();
    });
  }
}
</script>

<style scoped lang="scss">
  .switch {
    margin-bottom: 2em;
  }
</style>