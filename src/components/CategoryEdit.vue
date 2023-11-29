<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Category_TitleEdit'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >{{cat.title}}</option>
          </select>
          <label>{{'Category_SelectCategory'|localize}}</label>
        </div>

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
          {{'Category_BtnUpdate'|localize}}
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
    select: null,
    title: '',
    limit: 10,
    current: null
  }),
  props: {
    categories: {
      type: Array,
      required: true,
    }
  },
  validations: {
    title: {required},
    limit: {required, minValue: minValue(10)}
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория обновлена');
        this.$emit('updated', categoryData);
      } catch (e) {} //eslint-disable-line
    }
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => catId === c.id);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    window.M.updateTextFields();
    this.select = window.M.FormSelect.init(this.$refs.select);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>