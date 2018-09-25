<template>
  <!-- 搜索条件 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.UserName" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!-- 列表 -->
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;min-height:1000px;">
      <el-table-column prop="Id" align="center" label="查看详情">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleSearch(scope.$index, scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column prop="Exception" align="center" label="状态" width="180">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Exception | statusFilter">{{ !scope.row.Exception?'成功':'失败' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.ExecutionTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="UserName" align="center" label="用户名" />
      <el-table-column prop="ServiceName" align="center" label="服务" />
      <el-table-column prop="MethodName" align="center" label="操作" />
      <el-table-column prop="ExecutionDuration" align="center" label="持续时间(ms)" width="180" />
      <el-table-column prop="ClientIpAddress" align="center" label="IP地址" width="180" />
      <el-table-column prop="ClientName" align="center" label="客户端" width="180" />
      <el-table-column prop="BrowserInfo" align="center" label="浏览器" width="180" />
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" title="日志详情">
      <el-form :model="detailData" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名">
          <span>{{ detailData.UserName }}</span>
        </el-form-item>
        <el-form-item label="IP地址">
          <span>{{ detailData.ClientIpAddress }}</span>
        </el-form-item>
        <el-form-item label="客户端">
          <span>{{ detailData.ClientName }}</span>
        </el-form-item>
        <el-form-item label="浏览器">
          <span>{{ detailData.BrowserInfo }}</span>
        </el-form-item>
        <el-form-item label="服务">
          <span>{{ detailData.ServiceName }}</span>
        </el-form-item>
        <el-form-item label="操作">
          <span>{{ detailData.MethodName }}</span>
        </el-form-item>
        <el-form-item label="时间">
          <span>{{ detailData.ExecutionTime }}</span>
        </el-form-item>
        <el-form-item label="持续时间(ms)">
          <span>{{ detailData.ExecutionDuration }}</span>
        </el-form-item>
        <el-form-item label="参数">
          <span>{{ detailData.Parameters }}</span>
        </el-form-item>
        <el-form-item label="错误状态">
          <el-tag :type="detailData.Exception | statusFilter">{{ !detailData.Exception?'成功':'失败' }}</el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAuditLogList } from '@/api/zero/auditLog'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'AuditLogTb',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      return !status ? 'success' : 'danger'
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+Id',
        UserName: undefined
      },
      detailData: {
        // UserName: '',
        // ClientIpAddress: '',
        // ClientName: '',
        // BrowserInfo: '',
        // ServiceName: '',
        // MethodName: '',
        // ExecutionTime: new Date(),
        // ExecutionDuration: 1,
        // Parameters: '',
        // Exception: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAuditLogList(this.listQuery).then(response => {
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
    },
    handleSearch($index, row) {
      this.detailData = Object.assign({}, row)
      this.dialogFormVisible = true
    }
  }
}
</script>
