<template>
  <div class="dashboard-container" />
</template>

<script>
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {}
  },
  computed: {},
  created() {}
}
</script>
