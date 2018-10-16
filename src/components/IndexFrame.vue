<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu :active-name="activeItem.path" theme="dark" width="auto">
               <MenuItem v-for="menuItem in menuItems" :to="menuItem.path" :name="menuItem.path">
                    <span>{{menuItem.name}}</span>
                </MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px', height: '100vh'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>{{ activeItem.name }}</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <router-view></router-view>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                menuItems: [],
                activeItem: {}
            }
        },
        created: function() {
            //根据路由自动生成侧边菜单栏数据
            this.menuItems = this.$router.options.routes.map( route => ({ path: route.path, name: route.name }))
            this.activeItem = Object.assign({}, this.$route)
        },
        watch: {
            '$route' (to, from) {
                //根据路由信息更新选中菜单项
                this.activeItem = Object.assign({}, to)
            }
        },
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
</style>
