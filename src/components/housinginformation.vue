<template>
<!-- 房源信息录入和新增小区模板 -->
<div id="housinginformation">
    <!-- 房源信息录入模块 -->
    <div class="content">
        <!-- 右侧头部tab切换 -->
        <h2 style="display:none;">
            <p :class="classA"> <router-link :to="{path: '/housinginformation', query:{}}"><span>房源信息录入</span></router-link><span class="close_tab"></span></p>
        </h2>
        <!-- 右侧头部tab切换结束 -->
        <!-- 搜索框开始 -->
        <div class="content_d">
            <div class="search_box">
                <ul class="search clearfix">
                    <li style="width:26%">
                        <span>小&nbsp;区&nbsp;号&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <div  style="width:75%;">
                            <el-input v-model="code" placeholder="请输入内容" clearable></el-input>
                        </div>
                    </li>
                    <li style="width:26%">
                        <span>小区名称&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <div style="width:75%;">
                            <div>
                                <el-input v-model="districtName" placeholder="请输入内容" clearable></el-input>
                            </div>
                        </div>
                    </li>
                    <li style="width:26%">
                        <span>区&nbsp;&nbsp;&nbsp;&nbsp;域&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <div style="width:75%;">
                            <template>
                                <el-select v-model="area" clearable>
                                    <el-option v-for="item in options.area_prepar" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </div>
                    </li>
                    <li style="width:22%">
                        <span>街&nbsp;&nbsp;&nbsp;&nbsp;道&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <div style="width:72%;">
                            <template>
                                <el-select v-model="street" clearable>
                                    <el-option v-for="item in options.street" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </div>
                    </li>
                    <li style="width:26%">
                        <span>是否自建&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <div style="width:75%;">
                            <template>
                                <el-select v-model="selfBuilt" clearable>
                                    <el-option v-for="item in options.isoneself" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </div>
                    </li>
                    <li style="width:26%">
                        <span>维护归属&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <div style="width:75%;">
                            <template>
                                <el-select v-model="belongArea" clearable>
                                    <el-option v-for="item in options.maintain" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </template>
                        </div>
                    </li>
                    <li style="width:16%;margin-top: 4px;">
                        <el-button type="primary" size="mini" @click="queryFunc">查询</el-button>
                        <el-button type="primary" size="mini" @click="exportFunc">导出</el-button>
                    </li>
                </ul>
            </div>
            <!-- 搜索框结束 -->
            <!-- 列表 -->
            <div class="order_list">
                <p> <el-button type="primary" size="mini" @click="tiaozhuan">新增小区</el-button><el-button type="primary" size="mini" @click="dialogFormVisible = true;mappingbool = false;landNo='';">对接测绘数据</el-button></p>
                <div class="list_content">
                    <div class="quarterMessage_box">
                        <template> 
                            <el-table :data="housinginfoList" style="width: 100%"
                                border :header-cell-style="{background:'#eef1f6',color:'#606266'}" 
                                @row-dblclick="doubleClick">
                                <el-table-column label="序号" width="60" type="index"   :index="indexMethod"></el-table-column>
                                <el-table-column prop="code" label="小区号" width="80"></el-table-column>
                                <el-table-column prop="serialNo" label="网络办编码" width="120"></el-table-column>
                                <el-table-column prop="name" label="小区名称" width="120"></el-table-column>
                                <el-table-column prop="address" label="位置" width="120" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="startConstructionTime" label="开工日期" width="120" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="deliveryTime" label="交付使用日期" width="120" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="houseCount" label="总套数" width="120"></el-table-column>
                                <el-table-column prop="selfBuilt" label="自建" width="60" :formatter="formatSelfBuilt"></el-table-column>
                                <el-table-column prop="belongArea" label="维护归属" show-overflow-tooltip> </el-table-column>
                            </el-table>
                        </template>
                        <template>
                            <div class="block page_box">
                                <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageObj.currentPage4"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="pageObj.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="pageObj.total">
                                </el-pagination>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <!-- 列表结束 -->
        </div>
    </div>
    <el-dialog title="对接测绘数据" :visible.sync="dialogFormVisible" width="70%">
        <el-form :model="form">
        <p>请输入宗地号进行查询</p>
        <div class="search_input"><input type="text" v-model="landNo"><el-button type="primary" size="mini" @click="getMappingData">查 询</el-button></div>
        </el-form>
        <div class="quarterMessage_box">
            <template> 
                <el-table :data="mappingData" style="width: 100%" border
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                    <el-table-column prop="code" label="小区号" width="80"></el-table-column>
                    <el-table-column prop="name" label="小区名称" width="120"></el-table-column>
                    <el-table-column prop="landNo" label="宗地号" width="120"></el-table-column>
                    <el-table-column prop="address" label="位置" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="startConstructionTime" label="开工日期" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="finishConstructionTime" label="交付使用日期" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="landArea" label="用地面积" width="120"></el-table-column>
                    <el-table-column prop="totalCoveredArea" label="总建筑面积" show-overflow-tooltip> </el-table-column>
                </el-table>
            </template>
            
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addAuarters">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 房源信息录入模块结束 -->
  
</div>
<!-- 房源信息录入和新增小区模板结束 -->
</template>
 
<script>
import {mapState,mapGetters,mapActions}	from 'vuex'
import {tool,requset} from '../../static/js/tool'
import http from '@/api/common.js'
 export default {
    name:'housinginformation',
    data() {
      return {
        classA:'active',
        classB:'',
        
        landNo:'',//宗地号
        mappingData:[],//测绘列表数据
        mappingDataObj:{},//测绘数据的小区信息
        mappingbool:false,//判断是否显示测绘数据
        restaurants: [],//查询之后的数组
        code:'',//小区号
        districtName:'',//小区名称
        street: '',//街道
        area:'',//区域
        selfBuilt:'',//是否自建
        belongArea:'',//维护归属
        housinginfoList:[],
        pageObj:{
            currentPage4: 1,
            pageSize:10,
            total:40
        },
        options: {
            area_prepar:[],
            maintain:[],
            street:[],
            isoneself:[{
                    value:'1',
                    label:'是'
                },
                {
                    value:'0',
                    label:'否'
                }
            ]
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      };
    },
    computed:{
	},
    methods: { 
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageObj.pageSize = val
            this.getHousingData(this.pageObj.currentPage4,val);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageObj.currentPage4 = val;
            this.getHousingData(val,this.pageObj.pageSize);
        },
        //提示框
         open(title) {
            this.$message(title);
        },
        //查询
        queryFunc(){
            this.getHousingData(1,10);
            this.open('查询成功！')
        },
        //导出
        exportFunc(){
            var that = this;
            var selfBuilt = "";
            if(that.selfBuilt){
                selfBuilt = true;
            }else{
                selfBuilt = false;
            }
            let params = {
                area:that.area,
                belongArea : that.belongArea,
                code : that.code,
                districtName : that.districtName,
                street : that.street,
                selfBuilt:selfBuilt
            };
            http.exportFunc(params).then(res => {
                if(res.status == "success") {
                    that.open('导出成功！')
                }else{
                    that.open('导出失败！')
                }
         
            });
         
        },
        //获取区域请求
        getArea(){
            var that = this;
            let params = {
                area:1
            };
            http.getArea(params).then(res => {
                 that.options.area_prepar = tool.changeData(res);
            });
           
        },
        //维护归属可选项获取
        getMaintain(){
            var that = this;
            let params = {
                belongArea:1
            };
            http.getMaintain(params).then(res => {
                 that.options.maintain = tool.changeData(res);
            });
            
        },
        //小区街道可选项获取
        getStreet(){
            var that = this;
            let params = {
                street:1
            };
            http.getStreet(params).then(res => {
                 that.options.street = tool.changeData(res);
            });
           
        },
        //是否自建
        getIsoneself(){
            var that = this;
            let params = {
                selfBuilt:1
            };
            http.getIsoneself(params).then(res => {
                 that.options.isoneself = tool.changeData(res);
            });
           
        },
        //点击查询对接测绘数据
        getMappingData(){
            var that = this;
            if(that.landNo != ""){
                let params = {
                    landNo:that.landNo
                };
                http.getMappingData(params).then(res => {
                    that.mappingbool = true;
                    that.mappingDataObj = res;
                    that.mappingData = [];
                    that.mappingData.push(res);
                });
                
            }else{
                that.open('请填写宗地号进行查询！！！');
            }
        },
        //建设筹集-小区信息新增对接测绘数据
        addAuarters(){
            var that = this;
            let dto = that.mappingDataObj;
            if(JSON.stringify(dto) == "{}") {
                that.open('请先查询小区');
            }else{
                console.log('新增测绘小区', dto);
                dto.finishConstructionTime = dto.finishConstructionTime.substr(0, 10);
                dto.startConstructionTime = dto.startConstructionTime.substr(0, 10);
                http.addAuarters(dto).then(res => {
                    that.dialogFormVisible = false;
                    console.log(res);
                    that.open('新增小区成功');
                    var guid = res.guid;
                    var guid = res.name;
                    this.$store.commit('add_quartersObj',res);
                    // this.$store.commit('add_guidObj_quartersGuid',guid);
                    //that.dto.address = res[0].address;
                });
            }

        },
        ////房源信息录入查询
        getHousingData(pageIndex,pageSize){
            var that = this;
            var selfBuilt = "";
            if(that.selfBuilt){
                selfBuilt = true;
            }else{
                selfBuilt = false;
            }
            let params = {
                area:that.area,
                belongArea : that.belongArea,
                code : that.code,
                districtName : that.districtName,
                street : that.street,
                pageIndex : pageIndex,
                pageSize : pageSize,
                selfBuilt:selfBuilt
            }
            http.getHousingData(params).then(res => {
                console.log(res);
                that.housinginfoList = res.content;
                that.pageObj.total = res.totalPages;
                that.pageObj.pageSize = res.size;
                that.pageObj.currentPage4 = res.number + 1;

            });
        },
        //序号
        indexMethod(row){
            return row + 1;
        },
        //判断是否自建
        formatSelfBuilt(row) {
            return row.selfBuilt? '是':'否'
        },
        //点击确定
        queding(){
            this.dialogFormVisible = false;
            //调整公共状态
            this.$store.commit('is_pop');
            //重定向页面
           
        },
       //跳转
       tiaozhuan() {
           this.$router.push({name: 'addQuarters'})
       },
       //双击查看详情
       doubleClick(row, column, event){
           console.log(row)
           this.$router.push({name: 'addQuarters',query:{'guid':row.guid}});
       },
      
      //input搜索之后下拉框选中的对象
      handleSelect(item) {
        console.log(item);
        this.batchName = item.name;
        console.log(this.batchName);
      }
    },
    created(){
        ////房源信息录入查询
        this.getHousingData(this.pageObj.currentPage4,this.pageObj.pageSize);
        this.getArea();
        //维护归属可选项获取
        this.getMaintain();
        //小区街道可选项获取
        this.getStreet();
        //是否自建
        this.getIsoneself();
       
    },
    mounted() {
        
    }
    
  };
</script>
 
<style lang="scss" scoped>
#housinginformation{
    width: 100%;
    margin: 0 auto;
    padding:0px 15px;
    .content{
        background: #eeeff5;
    }
    .content_d{
        width: 100%;
        margin: 0 auto;
        margin-top: 20px;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 0 3px #ccc;
        .page_box{
            display: inline-block;
            float: right;
            margin-top: 14px;
        }
    }
    // 搜索框样式
    .search_box {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0 20px;
        border-bottom: 1px solid #eeeeee;
        background: #fff;
        padding-top: 14px;
        .search {
            width: 100%;
            height: auto;
            li {
                float: left;
                width: 25%;
                span {
                    display: inline-block;
                    float: left;
                    height: 30px;
                    line-height: 36px;
                    text-align: right;
                    // margin-right: 5%;
                    width:62px;
                }
                div{
                    float: left;
                    /deep/ .el-input .el-input__inner{
                        height: 30px;
                        line-height: 30px;
                        margin-top: 4px;
                    }
                  
                    .homePage /deep/ .el-date-picker {
                        padding: 0;
                        background: red;
                    }
                    .el-select /deep/ .el-input{
                            height: 40px;
                    }
                }
                .margin{
                    margin-left: 15%;
                }
                
            }
        }
    }
    //搜索框样式结束
    //列表样式
    .order_list{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 22px 20px;
        background: #fff;
        height: 550px;
        /deep/ .el-table {
            .cell{
                text-align: center;
            }
            th{
                padding:6px 0;
            }
        }
        p{
            height: 34px;
            margin-bottom: 15px;
        }
        .list_content {
            width: 100%;
            height: auto;
        }
    }
    //列表样式结束
    .el-form-item__content /deep/ .el-autocomplete{
        width:90%;
    }
    /deep/ .el-dialog__wrapper {
        .el-dialog__header{
            background: #057ff8;
            padding-top:10px;
            .el-dialog__title{
                color:#fff;
            }
        }
        .el-dialog__headerbtn{
            top:13px;
            .el-dialog__close{
                color:#fff;
            }
        }
        .el-dialog__body{
            padding:10px 20px;
            .el-table /deep/ td{
                padding:5px 0;
            }
            .el-table /deep/ th{
                padding:6px 0;
            }
            .el-table__header-wrapper .el-table td{
                padding: 5px 0px;
            }
            .el-table .cell, .el-table th div{
                text-align: center;
            }
            .el-form{
                margin-bottom: 10px;
                p{
                    text-align: center;
                    font-weight: 400;
                    font-style: normal;
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 10px;
                }
                .search_input {
                    display: inline-block;
                    width: 300px;
                    margin-left:32%;
                    input{
                        border: 1px solid #ccc;
                        padding:6px 15px;
                        width: 240px;
                    }
                }
            }
            
        }
        .dialog-footer{
            text-align: center;
        }
    }
}
.el-autocomplete /deep/ .el-autocomplete-suggestion{
    width: 455px;
}

</style>
