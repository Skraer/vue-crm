<template>
  <div>
    <div class="page-title">
      <h3>{{'Category_Title'|localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit 
          v-if="categories.length"
          :categories="categories"
          @updated="updateData"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">{{'Category_NoCategories'|localize}}</p>
      </div>
    </section>
  </div>
</template>


<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateData(category) {
      const ind = this.categories.findIndex(c => c.id === category.id);
      this.categories[ind].title = category.title;
      this.categories[ind].limit = category.limit;
      this.updateCount++;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  }
}
</script>