<template>
  <!-- 搜索条件 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.DisplayName" placeholder="组织名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <!-- 操作按钮 -->
    <div class="filter-container">
      <el-button v-waves class="filter-item" plain type="danger" icon="el-icon-search" @click="dialogFormVisible=true">新增</el-button>
    </div>
    <!-- 列表 -->
    <tree-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;min-height:1000px;">
      <el-table-column prop="DisplayName" align="center" label="组织名称" />
      <el-table-column prop="Type" align="center" label="组织节点类型" />
      <el-table-column prop="SortCode" align="center" label="排序码" />
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.CreationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </tree-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 新增编辑页面 -->
    <el-dialog :visible.sync="dialogFormVisible" title="操作">
      <el-form ref="dataForm" :rules="rules" :model="form" label-width="110px" label-position="left">
        <el-form-item label="名称" prop="DisplayName">
          <el-input v-model="form.DisplayName" />
        </el-form-item>
        <el-form-item label="上级单位" prop="ParentId">
          <!-- 下拉树控件 -->
          <el-tree-select v-model="form.ParentId" :data="form.treeData" :props="form.props" click-parent placeholder="请输入搜索内容"/>
        </el-form-item>
        <el-form-item label="组织节点类型" prop="Type">
          <el-select v-model="form.Type" placeholder="请选择组织节点类型">
            <el-option label="==请选择==" value="0" />
            <el-option label="省级" value="1" />
            <el-option label="分公司级" value="2" />
            <el-option label="其他" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序码">
          <el-input-number v-model="form.SortCode" :min="1" :max="10" label="排序码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" >新增</el-button>
        <el-button v-else type="primary" @click="updateData">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import ElTreeSelect from '@/components/TreeSelect'
import { getOrganizationUnitList } from '@/api/zero/organizationUnit'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'OrganizationUnitTb',
  components: { treeTable, ElTreeSelect },
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      total: null,
      dialogFormVisible: false,
      dialogStatus: 'create',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+Id',
        DisplayName: undefined
      },
      form: {
        DisplayName: '',
        ParentId: '123',
        Type: '0',
        SortCode: 1,
        treeData: [{ flowId: 1, name: '123', children: [{ flowId: 3, name: '333333' }] }, { flowId: 2, name: '456' }],
        props: {
          label: 'name',
          value: 'flowId'
        }
      },
      rules: {
        DisplayName: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ],
        ParentId: [
          { required: true, message: '请选择上级组织', trigger: 'change' }
        ],
        Type: [
          { required: true, message: '请选择节点类型', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getOrganizationUnitList(this.listQuery).then(response => {
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
