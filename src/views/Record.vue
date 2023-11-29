<template>
  <div>
    <div class="page-title">
      <h3>{{'Record_Title'|localize}}</h3>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">{{'Record_NoCategories'|localize}}. <router-link to="/categories">{{'Record_AddCategory'|localize}}</router-link></p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select 
          ref="select"
          v-model="category"
        >
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >{{cat.title}}</option>
        </select>
        <label>{{'Record_SelectCategory'|localize}}</label>
      </div>

      <p>
        <label>
          <input 
            v-model="type" 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="income" 
          />
          <span>{{'Record_Income'|localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input 
            v-model="type" 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="outcome" 
          />
          <span>{{'Record_Outcome'|localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input 
          v-model.number="amount"
          id="amount" 
          type="number" 
          :class="{invalid: ($v.amount.$error)}"
        />
        <label for="amount">{{'Record_Sum'|localize}}</label>
        <span 
          v-if="$v.amount.$error"
          class="helper-text invalid">{{'Record_HelperSum'|localize}} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          v-model="description"
          id="description" 
          type="text"
          :class="{invalid: ($v.description.$error)}"
        />
        <label for="description">{{'Record_Desc'|localize}}</label>
        <span 
          v-if="$v.description.$error"
          class="helper-text invalid"
        >{{'Record_HelperDesc'|localize}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Record_BtnCreate'|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  name: 'record',
  data: () => ({
    select: null,
    loading: true,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    description: {required},
    amount: {required, minValue: minValue(1)}
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          // console.log(true);
          const currentBill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;
          
          await this.$store.dispatch('updateInfo', {bill: currentBill});
          this.$message('Запись успешно создана');
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch (e) {}  //eslint-disable-line
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>