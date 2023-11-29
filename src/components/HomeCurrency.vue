<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'Home_TitleCurrency'|localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'Home_TitleColumnCurrency'|localize}}</th>
              <th>{{'Home_TitleColumnRate'|localize}}</th>
              <th>{{'Home_TitleColumnDate'|localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr 
              v-for="cur in currencies"
              :key="cur" >
              <td>{{cur}}</td>
              <td>{{getCurrency(cur) | currency('RUB')}}</td>
              <td>{{date | date('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['USD', 'EUR'],
  }),
  methods: {
    getCurrency(cur) {
      return this.rates['RUB'] / this.rates[cur];
    }
  }
}
</script>