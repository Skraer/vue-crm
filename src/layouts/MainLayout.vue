<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">

      <Navbar @clickBurger="sidebarIsOpen = !sidebarIsOpen" />
      <Sidebar v-model="sidebarIsOpen" :key="locale"/>

      <main class="app-content" :class="{full: !sidebarIsOpen}">
        <div class="app-page">
            <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import Loader from '../components/app/Loader.vue'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  components: {
    Navbar, Sidebar, Loader,
  },
  data: () => ({
    sidebarIsOpen: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Неизвестная ошибка');
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  }
}
</script>