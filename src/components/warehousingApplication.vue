 
<template>
<!-- 房源入库申请模块 -->
    <div id="warehousingapplication">
        <div class="content clearfix">
                <!-- 右侧头部tab切换 -->
                <h2  style="display:none">
                    <p :class="classA"> <router-link :to="{path: '/warehousingapplication', query:{}}"><span>房源入库申请</span></router-link><span class="close_tab"></span></p>
                </h2>
            <!-- 右侧头部tab切换结束 -->
            <div class="content_d clearfix">
                <h2>
                    <p><span class="tab_name" @click="fanhui">待办箱</span><span class="close_img"></span></p><p style="display:none;"><span class="tab_name">已办箱</span><span class="close_img"></span></p>
                </h2>
                <div class="changci_content_left" v-if="show">
                    <!-- 搜索框开始 -->
                    <!-- 价格：{{price}}--{{noPop}} -->
                    <div class="search_box">
                        <ul class="search clearfix">
                            <li style="width:33%">
                                <span>批&nbsp;&nbsp;次&nbsp;&nbsp;号</span>
                                <div style="width:70%;">
                                    <el-input v-model="form.code" placeholder="请输入内容" clearable></el-input>
                                </div>
                            </li>
                            <li style="width:33%">
                                <span>报批主题</span>
                                <div style="width:70%;">
                                    <div>
                                        <el-input v-model="form.subject" placeholder="请输入内容" clearable></el-input>
                                    </div>
                                </div>
                            </li>
                            <li style="width:33%">
                                <span>上报责任单位</span>
                                <div style="width:70%;">
                                    <template>
                                        <el-select v-model="form.accountableUnit" clearable>
                                            <el-option v-for="item in options.ascriptionoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:33%">
                                <span>上报单位</span>
                                <div style="width:70%;" id="select">
                                    <template>
                                        <el-select v-model="form.reportUnit" clearable>
                                            <el-option v-for="item in options.companyoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:33%">
                                <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
                                <div style="width:56%;">
                                    <template>
                                        <el-select v-model="form.state" clearable>
                                             <el-option v-for="item in options.statusoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:25%">
                                <el-button type="primary" size="mini" @click = "qureyApplyList">查询 </el-button>
                                <el-button type="primary" size="mini" @click = "exportApply">导出 </el-button>
                               
                            </li>
                        </ul>
                    </div>
                    <!-- 搜索框结束 -->
                    <p> 
                         <el-button type="primary" size="mini" @click="tiaozhuan">新增入库申请批次 </el-button>
                    </p>
                    <div class="quarterMessage_box">
                        <template>
                            <el-table ref="multipleTable" :data="warehousingApplyList" tooltip-effect="dark" style="width: 100%"
                                @selection-change="handleSelectionChange" border
                                @row-dblclick="doubleClick"
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                                <el-table-column type="selection" width="55"> </el-table-column>
                                <el-table-column label="序号" width="60" type="index"></el-table-column>
                                <el-table-column prop="code" label="批次号" width="130"></el-table-column>
                                <el-table-column prop="subject" label="报批主题" width="180"></el-table-column>
                                <el-table-column prop="accountableUnit" label="上报责任单位" width="120" ></el-table-column>
                                <el-table-column prop="houseCount" label="房源数量" width="80"></el-table-column>
                                <el-table-column prop="reportPerson" label="上报人" width="120"></el-table-column>
                                <el-table-column prop="reportDate" label="上报时间" width="120"></el-table-column>
                                <el-table-column prop="state" label="状态" width="100" :formatter="formatState">
                                </el-table-column>
                                <el-table-column prop="" label="操作" show-overflow-tooltip >
                                    <template slot-scope="scope"><span @click="deleteApply(scope.$index, scope.row)" style="color:red;">删除</span></template>
                                    <!-- <template slot-scope="scope"><span @click="deleteApply(scope.row.code)">删除</span></template> -->
                                </el-table-column>
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
        </div>
    </div>
</template>
<script>
import {tool,requset} from '../../static/js/tool'
import http from '@/api/common.js'
export default {
    name:'warehousingapplication',
    data() {
      return {
        multipleSelection: [],
        classA:'active',
        classB:'',
        show:true,
        warehousingApplyList:[],//入库申请列表
        dialogFormVisible: false,
        codes:[],
        pageObj:{
            currentPage4: 1,
            pageSize:10,
            total:40
        },
        form:{
            code:'',//批次号
            subject:'',//报批主题
            accountableUnit:'',//责任单位
            reportUnit:'',//上报单位
            state:''
        },
        options: {
            ascriptionoptions:[],
            companyoptions:[],
            statusoptions:[]
        },
        statusArr:['待修改','待提交','已审批'],
        menus:[
                {
                  menuName:'小区信息',
                  imgSrc:'',
                },
                {
                  menuName:'栋信息',
                  imgSrc:'',
                },
                {
                  menuName:'房源信息',
                  imgSrc:'',
                },
                {
                  menuName:'配套设施信息',
                  imgSrc:'',
                },
                {
                  menuName:'附件',
                  imgSrc:'',
                },
            ]
      };
    },
    mounted:function (){  
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageObj.pageSize = val;
            this.getWarehousingApply(this.pageObj.currentPage4,val);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageObj.currentPage4 = val;
            this.getWarehousingApply(val,this.pageObj.pageSize);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //提示框
         open(title) {
            this.$message(title);
        },
        //双击查看批次详情
        doubleClick(row, column, event){
           console.log(row)
           console.log(column)
           console.log(event)
           this.$router.push({name: 'newwarehousing',query:{'guid':row.guid}});
       },
        //删除入库申请批次
        deleteApply(index,row){
            var that = this;
            let codes = [];
            codes.push(row.code)
             http.deleteApply(codes).then(res => {
                that.open(res)
                that.getWarehousingApply(1,10);
            });
        },
        //按条件导出入库申请
        exportApply(){
            var that = this;
            let params = that.form;
             http.exportApply(params).then(res => {
               if(res.status == "success") {
                    that.open('导出成功！')
                }else{
                    that.open('导出失败！')
                }
            });
        },
        //点击按条件查询列表
        qureyApplyList() {
            this.getWarehousingApply(1,10)
            this.open('查询成功');
        },
        //按条件查询入库申请
        getWarehousingApply(pageIndex,pageSize){
            var that = this;
            let params = {
                code:that.form.code,
                subject:that.form.subject,//报批主题
                accountableUnit:that.form.accountableUnit,//责任单位
                reportUnit:that.form.reportUnit,//上报单位
                state:that.form.state,
                pageIndex : pageIndex,
                pageSize : pageSize,
            }
             http.getWarehousingApply(params).then(res => {
                 console.log(res);
                 that.warehousingApplyList = res.content;
                 that.pageObj.total = res.totalPages;
                 that.pageObj.pageSize = res.size;
                 that.pageObj.currentPage4 = res.number + 1;
                });
        },
        //判断状态
        formatState(row, column){
            var that = this;
            // '待修改','待提交','已审批'
            if(row.state == 0) {
                return that.statusArr[0];
            }else if(row.state == 1){
                return that.statusArr[1];
            }else {
                return that.statusArr[2];
            }
        },
      
         //获取上报责任单位
        getAscriptionoptions(){
            var that = this;
            let params = {
                accountableUnit:1
            };
            http.getAscriptionoptions(params).then(res => {
                 that.options.ascriptionoptions = tool.changeData(res);
            });
        },
        //获取上报单位
        getCompanyoptions(){
            var that = this;
            let params = {
                reportUnit:1
            };
            http.getCompanyoptions(params).then(res => {
                 that.options.companyoptions = tool.changeData(res);
            });
        },
        //获取上报状态
        getStatusoptions(){
            var that = this;
            let params = {
                state:1
            };
            http.getStatusoptions(params).then(res => {
                 that.options.statusoptions = tool.changeData(res);
            });
        },
        add(){
            this.show = false;
        },
        fanhui(){
            this.show = true;
        },
        tiaozhuan() {
           this.$router.push({name: 'newwarehousing'})
       },
       //获取各种下拉框的函数
        getOptions(optionsName,optionsData) {
            var that = this;
            that.options[optionsName] = optionsData;
        },
    },
    created(){
        //按条件查询入库申请
        this.getWarehousingApply(this.pageObj.currentPage4,this.pageObj.pageSize);
        //获取上报责任单位
        this.getAscriptionoptions()
        //获取上报单位
        this.getCompanyoptions()
       //获取上报状态
        this.getStatusoptions();
     },
  };
</script>
<style lang="scss" scoped>
#warehousingapplication{
    width: 100%;
    margin: 0 auto;
    padding:0px 15px;
    .content{
        
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
        h2 {
            width: 100%;
            height: 35px;
            background-color: #f5f7fa;
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
    }
 .changci_content_left {
    width: 100%;
    float: left;
    background: #fff;
    box-sizing: border-box;
    padding: 0px 18px;
    min-height: 500px;
    margin-bottom: 20px;
    p{
        margin:10px 0px;
        &>.button_right{
            float: right;
        }
        &>.add{
            background: yellow;
            color: #000;
        }
        &>.delete{
            background: red;
        }
    }
    // 搜索框样式
    .search_box {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 0 0px;
        border-bottom: 1px solid #eeeeee;
        background: #fff;
        margin-top: 15px;
        .search {
                        width: 100%;
                        height: auto;
                        li {
                            float: left;
                            width: 25%;
                            height: 30px;
                            line-height: 30px;
                            margin-bottom: 15px;
                            span {
                                display: inline-block;
                                float: left;
                                height: 30px;
                                line-height: 30px;
                                text-align: right;
                                margin-right: 5%;
                                width:72px;

                            }
                            div{
                                float: left;
                                /deep/ .el-input .el-input__inner{
                                    height: 30px;
                                    line-height: 30px;
                                }
                               
                               .el-select {
                                    width: 100%;
                                }
                                select {
                                    border: 1px solid #dbdbdb;
                                    height: 26px;
                                    width: 125%;
                                    border-radius: 3px;
                                    font-size: 12px;
                                    color: #999999;
                                }
                                .homePage /deep/ .el-date-picker {
                                    padding: 0;
                                    background: red;
                                }
                                .el-select /deep/ .el-input{
                                        height: 35px;
                                        width: 100%;
                                }
                            }
                            
                            .find,.export{
                                padding: 5px 15px;
                                background: #169bd5;
                                text-align: center;
                                border-radius: 2px;
                                color: #fff;
                                margin-right: 10px;
                            }
                        }
                    }
                }
                //搜索框样式结束
    .quarterMessage_box{
        /deep/ .el-table {
            th{
                padding: 6px 0!important;
            }
            .cell{
                text-align: center;
            }
        }
        .messagetable1{
                        border-top:1px solid #000;
                        border-left:1px solid #000;
                        tbody tr{
                            td.bg{
                                background: #ccc;
                            }
                            td{
                                border-right: 1px solid #000;
                                border-bottom: 1px solid #000;
                                height:30px;
                                line-height: 30px;
                                text-align: center;
                                i{
                                    color:red;
                                    margin-right:15px;
                                }
                                span.shengcheng{
                                    display: inline-block;
                                    width: 48px;
                                    height: 25px;
                                    text-align: center;
                                    line-height: 25px;
                                    float: right;
                                    margin-right: 10px;
                                    background: #057ff8;
                                    color:#fff;
                                    border-radius: 4px;
                                }
                                span.danwei{
                                    float: right;
                                }
                                select{
                                    width:96%;
                                    height: 26px;
                                }
                            }
                        }
                    }
    }
    
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
                        padding:7px 15px;
                        width: 240px;
                    }
                }
            }
            .quarterMessage_box{
                .messagetable{
                    border-top:1px solid #000;
                    border-left:1px solid #000;
                    tbody tr{
                        td{
                            border-right: 1px solid #000;
                            border-bottom: 1px solid #000;
                            height:30px;
                            line-height: 30px;
                            text-align: center;
                        }
                    }
                }
                
            }
        }
        .dialog-footer{
            text-align: center;
        }
    }


}
</style>
