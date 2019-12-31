<template>
  <div class="user">
    <!-- 面包屑部分内容 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框部分内容 -->
    <div style="margin-top: 15px">
      <el-input v-model="searchValue" placeholder="请输入内容" class="input-with-select searchBox">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button slot="append" icon="el-icon-search" @click="searchUserList"></el-button>
      </el-input>
      <el-button type="success" plain @click="addDialogFormVisible = true">添加用户</el-button>
    </div>
    <!-- 用户表格部分内容 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              @change="changeState($event,scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑用户" placement="top-start">
              <el-button type="primary" @click="showEditDialog(scope.row)" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
              <el-button type="primary" icon="el-icon-delete" @click="delUser(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="角色授权" placement="top-end">
              <el-button
                type="primary"
                icon="el-icon-s-operation"
                @click="showGrantDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="pagesize"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </template>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="'80px'">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="rules" :label-width="'80px'">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色授权 -->
    <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
      <el-form :model="grantForm" ref="grantForm" :rules="rules" :label-width="'80px'">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="grantForm.username"
            autocomplete="off"
            :disabled="true"
            style="width:80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <template>
            <el-select v-model="grantForm.rid" placeholder="请选择">
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUserList,
  addUser,
  editUser,
  deUser,
  updateUserStateById,
  getRolesList,
  grantUser
} from '@/api/index.js'
export default {
  data () {
    return {
      // 状态按钮的样式
      value: true,
      // 要查询的数据
      searchValue: '',
      // 当前的页码
      pagenum: 1,
      // 每页显示用户数量
      pagesize: 4,
      // 存储用户列表
      tableData: [],
      // 总用户信息条数
      total: 0,
      // 默认用户角色列表
      rolesList: [],
      // 是否显示添加用户框
      addDialogFormVisible: false,
      // 是否显示编辑用户框
      editDialogFormVisible: false,
      // 是否显示分配角色对话框
      grantDialogFormVisible: false,
      // 添加用户框的数据
      addForm: {
        username: '',
        password: '',
        eamil: '',
        mobile: ''
      },
      // 编辑用户框的数据
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 当前用户角色
      grantForm: {
        username: '',
        id: '', // 当前用户id
        rid: '' // 分配角色id
      },
      // 添加用户验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 1.分页事件：当每页显示的记录数设置变化的时候触发
    handleSizeChange (val) {
      this.pagesize = val
      this.init()
    },
    // 2.分页事件：当当前页码发生变化的时候触发
    handleCurrentChange (val) {
      this.pagenum = val
      this.init()
    },
    // 搜索
    searchUserList () {
      this.init()
    },
    // 添加用户
    addSubmit () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 说明用户输入合法
          // 提交添加用户请求
          addUser(this.addForm).then(result => {
            // console.log(result)
            // 提示更新成功
            if (result.meta.status === 201) {
              this.$message({
                type: 'success',
                message: result.meta.msg
              })
              this.addDialogFormVisible = false
              this.init()
            } else {
              this.$message.error(result.meta.msg)
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '输入内容不合法，请重新输入'
          })
        }
      })
    },
    // 编辑用户
    showEditDialog (data) {
      // 显示编辑用户弹窗
      this.editDialogFormVisible = true
      // 因为进行了双向数据绑定，只需要将传入过来的参数进行重新赋值即可
      this.editForm = data
    },
    // 编辑用户 更新
    editSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          editUser(this.editForm).then(result => {
            // 提示更新成功
            if (result.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '数据更新成功'
              })
              // 关闭对话框
              this.editDialogFormVisible = false
            }
          })
        } else {
          this.$message({
            message: '用户输入不合法',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 删除用户
    delUser (data) {
      this.$confirm(`此操作将永久删除用户${data.username}的用户数据`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deUser(data.id).then(result => {
          if (result.meta.status === 200) {
            this.$message({
              type: 'warning',
              message: result.meta.msg
            })
            // 刷新列表
            this.init()
          } else {
            this.$message.error(result.meta.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改用户状态
    changeState (type, data) {
      updateUserStateById({ type, uId: data.id }).then(result => {
        if (result.meta.status === 200) {
          this.$message({
            type: 'success',
            message: result.meta.msg
          })
        }
      })
    },
    // 显示角色授权对话框
    showGrantDialog (row) {
      // 显示分配角色对话框
      // 载入当前用户信息
      this.grantDialogFormVisible = true
      this.grantForm.id = row.id
      this.grantForm.username = row.username
      // 加载角色默认数据--下拉列表的默认数据加载
      getRolesList().then(res => {
        this.rolesList = res.data
      })
    },
    // 提交角色授权
    grantSubmit () {
      if (!this.grantForm.rid) {
        this.$message({
          type: 'warning',
          message: '请先分配角色在提交！'
        })
      }
      grantUser(this.grantForm).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          // 设置角色成功
          // 关闭角色对话框
          this.grantDialogFormVisible = false
          this.grantForm.rid = ''
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    // 加载用户列表
    init () {
      getUserList({
        query: this.searchValue,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        this.tableData = result.data.users
        this.total = result.data.total
      })
    }
  },
  mounted () {
    // 只要页面一加载就会执行的生命周期钩子函数
    // 刷新页面，加载用户列表
    //  this.init()
    this.handleSizeChange(this.pagesize)
  }
}
</script>
<style lang="less" scoped>
.searchBox {
  width: 300px;
  margin-right: 10px;
}
</style>
