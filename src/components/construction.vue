<template>
    <div class="distribute clearfix" id="distribute">
       <!-- 左边导航开始 -->
        <div class="left_content">
            <div class="left_content_header">
                <el-col style="width:100%;" class="menu_list" >
                    <el-menu :default-active="currentMenu" class="el-menu-vertical-demo" router unique-opened>
                    <el-submenu :index="(index + '')" v-for="(item,index)  in menus" :key="index" >
                        <template slot="title" class="list">
                        <span class=""></span>
                        <span>{{item.menuName}}</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item  :index="item.url" v-for="(item,index)  in item.menuList" :key="index">
                            <p @click="add_tabs(item.url,item.name)"><span class="dian"></span>{{item.name}}</p>
                        </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    </el-menu>
                </el-col>
            </div>
       </div>
       <!-- 左边导航结束 -->
       <!-- 右边内区域 -->
       <div class="right_content ">
            <!-- 右侧列表模板 -->
            <t-Top></t-Top>
            <router-view/>
            <!-- 右侧列表模板结束 -->
       </div>
       <!-- 右边内容区域结束 -->
       <!-- <Pop></Pop> -->
    </div>
</template>

<script>
 import TTop from '@/components/topTab';
 import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    name:'construction',
    data(){
        return{
            classA:'active',
            classB:'',
            tabs: null,
            currentMenu:'/housinginformation',
            currentMenu1:'/warehousingapplication',
            iframeState:false,
            active:'',
            webAddress:[],
            close:false,
            menus:[
                {
                  menuName:'项目管理',
                  imgSrc:'',
                  url:'',
                  menuList:[
                   
                  ],
                },
                {
                  menuName:'项目房源',
                  imgSrc:'',
                  url:'',
                  menuList:[
                      {
                          name:'房源信息录入',
                          index:'2-1',
                          url:'/housinginformation',
                      },
                      {
                          name:'房源信息入库',
                          index:'2-2',
                          url:'/warehousingapplication',
                      }
                  ],
                },
                {
                  menuName:'查询',
                  imgSrc:'',
                  url:'',
                  menuList:[
                    
                  ],
                },
                
            ]
        }
    },
    created(){
        this.getUrl();
    },
    mounted(){
        this.getUrl();
        // const oIframe = document.getElementById('show-iframe');
        // const deviceWidth = document.documentElement.clientWidth - document.documentElement.clientWidth*0.02;//iframe宽度
        // const deviceHeight = window.innerHeight - 74;//iframe高度
        // oIframe.style.width = deviceWidth + 'px';
        // oIframe.style.height = deviceHeight + 'px';
        // console.log(oIframe)
        // const oHome = document.getElementById('home')
        // const deviceHeight = window.innerHeight - 5;
        // oHome.style.height = deviceHeight + 'px'
    },
    methods:{
        getUrl(){
        let _this = this;
        // let currentUrl = window.location.href;
        _this.currentMenu = `/${this.$route.path.split('/')[1]}`
        console.log(`/${this.$route.path.split('/')[1]}`)
        },
        goBack(){
            this.goBackState = false;
            this.iframeState = false;
        },
        showIframe(name){
            this.goBackState = true;
            this.iframeState = true;
            this.active = name
        },
        //获取子组件的值
        getValue(data) {
            console.log(data);
            // PubSub.subscribe("deleteTodo",(messageName, todosIndex)=>{
            //         console.log(123443);
            //         this.deleteTodo(todosIndex);
            // });
        },
        showMsgFromChild(data){
            // console.log(data);
        },
        count() {
			 this.$store.commit('is_pop');
        },
        //添加tab
        add_tabs (url, name) {
            let flag = false;
            for (let item in this.add_tabssss) {
                if(this.add_tabssss[item].name == name) {
                this.$store.commit('add_active',url);
                //   alert(1);
                  flag = true;
                  break;
                }
            }
            if(!flag) {
                // alert(2)
                let data = {
                    url,
                    name
                }
                this.$store.commit('add_active',url);
                this.$store.commit('add_tabs_fn',data);
            }
        }
    },
    watch:{
        $route(to,from){
        this.getUrl();
        }
    },
    computed:{
     ...mapState({
        add_tabssss: state => state.add_tabs,
     })
   },
   components: {
    TTop
  },
}
</script>

<style lang="scss" scoped>
#distribute{
    width: 100%;
    height: 100%;
    background: #eeeff5;
    .left_content {
        width: 206px;
        height: 720px;
        background: #fff;
        float: left;
        .left_content_header {
            width: 100%;
            height: 182px;
            position: relative;
            box-sizing: border-box;
            background: #fff;
            .hearder_img {
                width: 132px;
                height: 115px;
                margin: auto;
                position: absolute;
                top: 34px;
                left: 50%;
                margin-left: -66px;
                text-align: center;
                border-bottom: 1px solid #c8e7fd;
                p {
                    font-size: 16px;
                    margin-top: 10px;
                }
            }
            .menu_list {

                .el-menu /deep/ .is-opened .el-submenu__title {
                    background: rgba(0,0,0,.3);
                    // background-color: #ecf5ff;
                    color: rgb(49, 193, 248);
                    // i{
                    //     color: #ecf5ff;
                    // }
                }
                .el-menu /deep/ .el-submenu__title:hover{
                    color: rgb(49, 193, 248);
                }
                .el-menu /deep/ .el-submenu__title:hover{
                    background-color:rgba(0,0,0,.3)!important;
                }
                .el-submenu /deep/ .el-menu-item {
                    height: 42px;
                    line-height: 42px;
                    padding: 0 45px;
                    min-width: 200px;
                }
                .el-submenu /deep/ .el-submenu__title{
                    height: 42px;
                    line-height: 42px;
                }
                .el-submenu /deep/ .el-menu-item-group__title{
                    padding:0;
                }
                .el-submenu__title>span:first-child{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    float: left;
                    margin-top: 11px;
                    margin-right: 10px;
                    background: url('../../static/images/fangzi.png') no-repeat left center;
                }
                .el-submenu__title i{
                    color: rgb(49, 193, 248);
                }
                .dian{
                        display: inline-block;
                        float: left;
                        width: 8px;
                        height: 8px;
                        background: #fff;
                        border-radius: 50%;
                        margin-right: 7px;
                        margin-top: 16px;
                }
                .is-active>.dian{
                    background: rgb(49, 193, 248);
                }
            }
            
            .el-submenu__title {
                height: 42px!important;
                line-height: 42px!important;
                position: relative;
                -webkit-box-sizing: border-box;
                white-space: nowrap;
                list-style: none;
            }
            .el-menu-item-group__title{
                padding:0px;
            }
            .el-menu-item:focus, .el-menu-item:hover{
                background-color: #fff;
                color: rgb(49, 193, 248);
            }
        }

    }
    .right_content {
        /* overflow: auto; */
        // background-color:#f7f8f8;
        width: calc(100% - 206px);
        float: left;
        background: #fdfdfd;
        box-shadow: -20px -2px 15px -13px #fdfdfd inset;
        box-shadow: 2px 0 5px 0px #ccc inset, 0  0px 0 blue, 0 0px 0 red, 0 0px 0 yellow inset;
        h2 {
            width: 100%;
            height: 40px;
            background: #e6f0fc;
            p {
                display: inline-block;
                width: auto;
                height: 40px;
                cursor: pointer;
                box-sizing: border-box;
                padding: 0 10px;
                span {
                    float: left;
                    display: inline-block;
                    cursor: pointer;
                    height: 40px;
                    line-height: 40px;
                    font-size: 12px;
                    text-align: center;
                    color: #4b7ff8;
                    width: auto;
                }
                .right_content h2 p span:first-child {
                    width: 60px;
                }
                .close_tab {
                    width: 20px;
                    height: 40px;
                    margin-left:10px;
                    background: url('../../static/images/close2.png') no-repeat center center;
                }
                .close_tab:hover{
                    background: url('../../static/images/close3.png') no-repeat center center;
                }
            }
            p.active {
                background: #d3e4fa;
                border-bottom: 2px solid #0476f2;
            }
        }
        
    
    }
}


</style>
<style lang="scss">
    .clearfix:before,.clearfix:after {
        content: "";
        display: table;
        clear: both;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
    .clearfix:after {
        clear: both;
    }
    .clearfix {
        zoom: 1;
    }
    .el-submenu__title{
        height: 42px;
        line-height: 42px;
    }
    
   
    .el-submenu__icon-arrow{
        // z-index: -2;
    }
    
    .el-menu-item-group__title{
        padding:0;
    }
</style>
