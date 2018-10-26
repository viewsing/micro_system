<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu :active-name="activeMenu.path" theme="dark" width="auto">
               <MenuItem v-for="menuItem in menuItems" :to="menuItem.path" :name="menuItem.path">
                    <span>{{menuItem.name}}</span>
                </MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px', height: '100vh'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}">
                <Button v-if="!isLogin" type="primary" shape="circle" @click="showLogin">登录</Button>
                <Button v-else type="primary" shape="circle" @click="logout">退出</Button>
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>{{ activeMenu.name }}</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <router-view></router-view>
                </Card>
            </Content>
            <Modal
                v-model="loginModal"
                title="登录"
                :loading="loading"
                @on-ok="login({username, password})"
                @on-cancel="hideLogin"
                :mask-closable="false"
            >
                <div style="text-align: center;">
                    <p class="form-row">
                        <Input v-model="username" placeholder="账号" autofocus clearable style="width: 250px" />
                    </p>
                    <p>
                        <Input v-model="password" type="password" @on-enter="login({username, password})" placeholder="密码" clearable style="width: 250px" />
                    </p>
                </div>
            </Modal>
        </Layout>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                username: '',
                password: ''
            }
        },
        computed: {
            ...mapState([
                'menuItems',
                'activeMenu',
                'isLogin',
                'loginModal',
                'loading'
            ])
        },
        beforeCreate () {
          const userInfo = JSON.parse( localStorage.getItem('userInfo') )
          if ( userInfo && userInfo.username) {
            this.$store.commit('updateLogin', true)
          }
        },
        created: function() {
            //根据路由自动生成侧边菜单栏数据
            this.$store.commit('updateMenus', this.$router.options.routes)
            this.$store.commit('updateActiveMenu', this.$route)
        },
        watch: {
            '$route' (to) {
                //根据路由信息更新选中菜单项
                this.$store.commit('updateActiveMenu', to)
            }
        },
        methods: {
            showLogin () {
                this.$store.commit('toggleLoginModal')
            },
            hideLogin () {
                this.$store.commit('toggleLoginModal')
            },
            ...mapActions([
                'login',
                'logout'
            ])
        }
    }
</script>

<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .form-row {
        margin-bottom: 1.5em;
    }
</style>
