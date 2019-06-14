<template>
<div id="games">
    <!-- 场次号开始 -->
            <div class="order_list changci" id="changci" style="">

                <div class="changci_content">
                    <!-- 右侧列表模板 -->
                    <router-view/>
                    <!-- 右侧列表模板结束 -->
                    <div class="changci_content_right">
                        <h1>导航</h1>
                        <el-col style="width:100%;" class="menu_list">
                            <el-menu :default-active="currentMenu" class="el-menu-vertical-demo" unique-opened>
                            <el-menu-item :index="item.url" v-for="(item,index)  in menus" :key="index" @click="tiaozhuan(item.menuName,item.url)">
                                <span slot="title" >{{item.menuName}}</span>
                            </el-menu-item>           
                            </el-menu>
                        </el-col>
                    </div>
                </div>

            </div>
            <!-- 场次号结束 -->
</div>
</template>
 
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
 export default {
    name:'addQuarters',
    data() {
      return {
        currentMenu:'/addquarters',
        isCollapse: true,
        form:{
            batchCode:'',
            batchName:'',
            chooseDate:'',
            drawSort:'',
            endTime:'',
            maxChoosen:'',
            pcCount:'',
            queueName:'',
            sceneNo:'',
            signFrom:'',
            signTo:'',
            startTime:'',
            status:'',
        },
        menus:[
                {
                  menuName:'小区信息',
                  imgSrc:'',
                  url:'/addquarters'
                },
                {
                  menuName:'栋信息',
                  imgSrc:'',
                  url:'/tungmessage'
                },
                {
                  menuName:'房源信息',
                  imgSrc:'',
                  url:'/housingmessage'
                },
                {
                  menuName:'配套设施信息',
                  imgSrc:'',
                  url:'/tungmessage4'
                },
                {
                  menuName:'附件',
                  imgSrc:'',
                  url:'/tungmessage5'
                },
            ]
      };
    },
     created(){
        this.getUrl();
    },
    mounted:function (){  
         this.getUrl();
    },
    methods: {
        //提示框
         open(title) {
            this.$message(title);
        },
       
        getUrl(){
        let _this = this;
        // let currentUrl = window.location.href;
        _this.currentMenu = `/${this.$route.path.split('/')[1]}`
        console.log(`/${this.$route.path.split('/')[1]}`)
        },
        tiaozhuan(name,url){
            if(name == "栋信息") {
                console.log(this.quartersObj.guid);
                if(this.quartersObj.guid){
                    this.$router.push({ path:url});
                }else{
                    this.open('请先选择小区，或者填写小区信息');
                }
            }else if(name == "房源信息") {
                console.log(this.tungObj);
                if(this.tungObj.guid) {
                    this.$router.push({ path:url});
                }else{
                    this.open('请先选择栋，或者填写栋信息');
                }
            }else{
                this.$router.push({ path:url});
            }
        }
    },
    watch:{
        $route(to,from){
        console.log(to.path);
        this.getUrl();
        }
    },
    created(){
        
         var params = this.$route.params;
         this.form.batchName = params.batchName;
         this.form.chooseDate = params.date1;
         this.form.endTime = params.date2;
         this.form.queueName = params.queueName;
        
     },
     computed:{
     ...mapState({
        quartersObj: state => state.quartersObj,
        tungObj: state => state.tungObj,
     })
   },
    
  };
</script>
 
<style lang="scss" scoped>
#games{
    width: 100%;
    margin: 0 auto;
    margin-top: 0px;
    .changci{
        h2 {
            width: 100%;
            height: 35px;
            background: transparent;
            p {
                display: inline-block;
                width: auto;
                padding: 0;
                border-top: 2px solid #0471dd;
                background: #fff;
                height: 35px;
                .tab_name {
                    display: inline-block;
                    box-sizing: border-box;
                    float: left;
                    height: 35px;
                    line-height: 35px;
                    padding: 0 20px;
                    color: #0471dd;
                    font-weight: 400;
                    font-size: 13px;
                    width: auto;
                }
                .close_img {
                    width: 20px;
                    height: 35px;
                    line-height: 35px;
                    display: inline-block;
                    float: left;
                    box-sizing: border-box;
                    background: url('../../static/images/close3.png') no-repeat left center;
                }
            }
        }
        .changci_content {
            width: 100%;
            height: 528px;          
            .changci_content_right {
                float: right;
                width: 214px;
                height: 242px;
                margin-top: 20px;
                background: #fff;
                border-bottom: 1px solid #ccc;
                box-shadow: 0 0 3px #ccc;
                h1 {
                    height: 42px;
                    background: #057ff8;
                    line-height: 42px;
                    box-sizing: border-box;
                    padding: 0 22px;
                    font-size: 14px;
                    color: #fff;
                    font-weight: 700;
                    margin-bottom: 10px;
                }
                ul {
                    width: 100%;
                    box-sizing: border-box;
                }
                /deep/ .menu_list .el-menu-item{
                    height:30px;
                    line-height: 30px;
                }
            }
        }
    }
    
    
}

</style>
