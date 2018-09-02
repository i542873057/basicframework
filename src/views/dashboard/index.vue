<template>
  <div class="dashboard-container">
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    
  },
  computed: {
    
  },
  created() {
    
  }
}
</script>
