<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input v-model="listQuery.UserNameOrEmailAddress" placeholder="登录账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;min-height:1000px;">
      <el-table-column prop="Id" align="center" label="ID" width="180" />
      <el-table-column prop="UserNameOrEmailAddress" align="center" label="登录账号" width="180" />
      <el-table-column prop="ClientIpAddress" align="center" label="登录IP" width="180" />
      <el-table-column prop="ClientName" align="center" label="客户端名称" />
      <el-table-column prop="BrowserInfo" align="center" label="浏览器信息" />
      <el-table-column align="center" label="登录状态" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.Result | statusFilter">{{ scope.row.Result }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录时间">
        <template slot-scope="scope">
          <span>{{ scope.row.CreationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { getLoginLogList } from '@/api/zero/loginLog'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'LoginLogTb',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+Id',
        UserNameOrEmailAddress: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getLoginLogList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
