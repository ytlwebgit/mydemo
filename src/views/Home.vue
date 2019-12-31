<template>
  <div class="home">
    <el-container>
      <el-aside>
        <el-row class="tac">
          <div class="logo"></div>
          <el-menu
            :router="true"
            :unique-opened="true"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/user">
                  <i class="el-icon-menu"></i>
                  用户列表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <i class="el-icon-menu"></i>
                  角色列表
                </el-menu-item>
                <el-menu-item index="2-2">
                  <i class="el-icon-menu"></i>
                  权限列表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <i class="el-icon-menu"></i>
                  商品列表
                </el-menu-item>
                <el-menu-item index="3-2">
                  <i class="el-icon-menu"></i>
                  分类参数
                </el-menu-item>
                <el-menu-item index="3-3">
                  <i class="el-icon-menu"></i>
                  商品分类
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">
                  <i class="el-icon-menu"></i>
                  订单列表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1">
                  <i class="el-icon-menu"></i>
                  数据报表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <span>电商后台管理系统</span>
          <div>
            <span>你好，admin</span>
            <router-link to="/login">退出</router-link>
          </div>
        </el-header>
        <el-main>
          <!-- 子页面内容 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {}
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
