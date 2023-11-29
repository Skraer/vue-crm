<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Category_TitleCreate'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input 
            id="name" 
            type="text" 
            v-model="title"
            :class="{invalid: ($v.title.$error)}"
          />
          <label for="name">{{'Category_Name'|localize}}</label>
          <span
            v-if="$v.title.$error"
            class="helper-text invalid">{{'Category_HelperName'|localize}}
          </span>
        </div>

        <div class="input-field">
          <input 
            id="limit" 
            type="number" 
            v-model.number="limit"
            :class="{invalid: ($v.limit.$error)}"
          />
          <label for="limit">{{'Category_Limit'|localize}}</label>
          <span 
            v-if="$v.limit.$error"
            class="helper-text invalid">{{'Category_HelperLimit'|localize}} {{$v.limit.$params.minValue.min}})
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Category_BtnCreate'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    limit: 10,
  }),
  validations: {
    title: {required},
    limit: {required, minValue: minValue(10)}
  },
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const category = await this.$store.dispatch('createCategory', { //eslint-disable-line
          title: this.title,
          limit: this.limit
        });
        this.title = '';
        this.limit = this.$v.limit.$params.minValue.min;
        this.$v.$reset();
        this.$message('Категория создана!');
        this.$emit('created', category);
      } catch (e) {}  //eslint-disable-line
    }
  }
}
</script>