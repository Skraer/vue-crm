<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'History_TitleColumnSum'|localize}}</th>
        <th>{{'History_TitleColumnDate'|localize}}</th>
        <th>{{'History_TitleColumnCategory'|localize}}</th>
        <th>{{'History_TitleColumnType'|localize}}</th>
        <th>{{'History_TitleColumnAction'|localize}}</th>
      </tr>
    </thead>

    <tbody>
      <tr 
        v-for="(record, ind) in records"
        :key="record.id"
      >
        <td>{{ind + 1}}</td>
        <td>{{record.amount | currency('RUB')}}</td>
        <td>{{record.date | date('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span 
            class="white-text badge"
            :class="[record.typeClass]"
          >{{record.typeText}}</span>
        </td>
        <td>
          <button 
            class="btn-small btn"
            @click="$router.push(`/detail/${record.id}`)"
            v-tooltip="'Просмотреть детали'"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>