<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title'|localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!records.length">{{'History_NoRecords'|localize}}. <router-link to="/record">{{'History_AddRecord'|localize}}</router-link></p>
    <section v-else>
      <HistoryTable 
        :records="items"
      />
      <Paginate 
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'History_PagPrev'|localize"
        :next-text="'History_PagNext'|localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import localizeFilter from '@/filters/localize.filter'
import HistoryTable from '@/components/HistoryTable'
import {Pie} from 'vue-chartjs'

export default {
  name: 'history',
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  components: {
    HistoryTable
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(r => {
        return {
          ...r,
          categoryName: categories.find(c => c.id === r.categoryId).title,
          typeClass: r.type === 'income' ? 'green' : 'red',
          typeText: r.type === 'income' ? localizeFilter('History_Income') : localizeFilter('History_Outcome'),
        };
      }));

      this.renderChart({
          labels: categories.map(c => c.title),
          datasets: [{
              label: 'Расходы по категориям',
              data: categories.map(c => {
                return this.records.reduce((total, r) => {
                  if (r.categoryId === c.id && r.type == 'outcome') {
                    total += +r.amount;
                  }
                  return total;
                }, 0);
              }),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      });
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    // const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.setup(categories);
    this.loading = false;
  }
}
</script>