<template>
    <!-- 批次基本信息模板 -->
    <div id="newwarehousing">
        <div class="content">
             <!-- 右侧头部tab切换 -->
            <h2  style="display:none">
                <p class="moren"> <router-link :to="{path: '/warehousingapplication', query:{}}"><span>房源入库申请</span></router-link><span class="close_tab"></span></p>
                <p :class="classA" style=""><span>新增入库申请</span><router-link :to="{path: '/housinginformation', query:{}}"><span class="close_tab"></span></router-link></p>
            </h2>
            <p>
                <el-button type="primary" size="mini"  @click="dialogFormVisible = true">提交</el-button>
               
            <!-- 右侧头部tab切换结束 -->
            <div class="content_d">
                <h2>
                    <p><span class="tab_name">批次基本信息</span><span class="close_img"></span></p>
                </h2>
                <div class="changci_content_left">
                    <div class="quarterMessage_box clearfix">
                        <el-form :model="houseReportInfoDTO"  ref="houseReportInfoDTO" label-width="100px" class="demo-ruleForm">
                            <el-form-item class="width button">
                                <el-button type="primary" @click="onSubmit" size="mini">保存</el-button>
                            </el-form-item>
                            <el-form-item label="批次号" prop="code">
                                <el-input v-model="houseReportInfoDTO.code" placeholder="请输入批次号编号"></el-input>
                            </el-form-item>
                            <el-form-item label="批次主题" prop="subject">
                                <el-input v-model="houseReportInfoDTO.subject" placeholder="请输入批次主题"></el-input>
                            </el-form-item>
                            <el-form-item label="申请依据" prop="examineNote">
                                <el-input v-model="houseReportInfoDTO.examineNote" placeholder="请输入申请依据"></el-input>
                            </el-form-item>
                        
                            <el-form-item label="上报责任单位" prop="accountableUnit">
                                <el-select v-model="houseReportInfoDTO.accountableUnit" placeholder="请选择栋用途">
                                    <el-option v-for="item in options.ascriptionoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="房源数量" prop="houseCount">
                                <el-input v-model="houseReportInfoDTO.houseCount" placeholder="请输入房源数量"></el-input>
                            </el-form-item>
                            
                            <el-form-item label="申请意见" prop="suggest" class="width">
                                <el-input type="textarea" v-model="houseReportInfoDTO.suggest" placeholder="请输入申请意见"></el-input>
                            </el-form-item>
                        </el-form>
                     
                    </div>
                    <div class="housing_statistics">
                        <div class="title">
                            <span>房源统计</span>
                            <div class="xian"></div>
                        </div>
                        <div class="statistics_content">
                            <div class="content">
                                <table class="" cellspacing="0px" style="width:100%;">
                                    <colgroup>
                                    <col width="50%">
                                    <col width="50%">
                                    </colgroup>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    <tr class="frist">
                                        <td>房源性质</td>
                                        <td>数量</td>
                                    </tr>
                                    <tr>
                                        <td>公共租赁住房</td>
                                        <td >0套</td>
                                    </tr>
                                    <tr>
                                        <td>安居型商品房</td>
                                        <td >0套</td>
                                    </tr>
                                    <tr>
                                        <td>人才住房房</td>
                                        <td >0套</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="content">
                                <table class="" cellspacing="0px" style="width:100%;">
                                    <colgroup>
                                    <col width="50%">
                                    <col width="50%">
                                    </colgroup>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    <tr class="two">
                                        <td>房型</td>
                                        <td>数量</td>
                                    </tr>
                                    <tr>
                                        <td>1房</td>
                                        <td>210套</td>
                                    </tr>
                                    <tr>
                                        <td>2房</td>
                                        <td >100套</td>
                                    </tr>
                                    <tr>
                                        <td>3房</td>
                                        <td >100套</td>
                                    </tr>
                                    <tr>
                                        <td>4房</td>
                                        <td >316套</td>
                                    </tr>
                                    <tr>
                                        <td>5房</td>
                                        <td >0套</td>
                                    </tr>
                                    <tr>
                                        <td>6房</td>
                                        <td >0套</td>
                                    </tr>
                                    <tr>
                                        <td>总计</td>
                                        <td >726套</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="content">
                                <table class="" cellspacing="0px" style="width:100%;">
                                    <colgroup>
                                    <col width="50%">
                                    <col width="50%">
                                    </colgroup>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    <tr class="two">
                                        <td>面积（平方米）</td>
                                        <td>数量</td>
                                    </tr>
                                    <tr>
                                        <td>50以下</td>
                                        <td >416套</td>
                                    </tr>
                                    <tr>
                                        <td>50-60</td>
                                        <td >310套</td>
                                    </tr>
                                    <tr>
                                        <td>60-70</td>
                                        <td >726套</td>
                                    </tr>
                                    <tr>
                                        <td>80以上</td>
                                        <td >0套</td>
                                    </tr>
                                    <tr>
                                        <td>总计</td>
                                        <td >1336套</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        <!-- 提交确认弹窗 -->
        <el-dialog title="提交" :visible.sync="dialogFormVisible" width="30%" top="35vh" id="delete_box">
            <el-form :model="form">
            <p>小区名称：<span>金领家园</span></p>
            <p>总栋数：<span>2</span>栋</p>
            <p>总套数：<span>300</span>套</p>
            <p>请确认上述信息，确认无误再提交本报批！</p>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="queding1" size="mini">确 定</el-button>
                <el-button @click="dialogFormVisible = false" type="primary" size="mini">取 消</el-button>
            </div>
        </el-dialog>
    </div>
    <!-- 批次基本信息模板 -->
</template>
<script>
import {tool,requset} from '../../static/js/tool'
import http from '@/api/common.js'
export default {
    name:'quartsmessage',
    data() {
      return {
        classA:'active',
        classB:'',
        dialogFormVisible:false,
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
        options:{
            ascriptionoptions:[]
        },
        houseReportInfoDTO:{
            accordance: "string",
            accountableUnit: "上报单位",
            afterFieldwork: true,
            code: "",
            examineNote: "",
            examinePass: true,
            fileldworkNote: "string",
            guid: "string",
            houseCount: '',
            reportDate: "",
            reportUnit: "string",
            state: 0,
            subject: "",
            suggest: ""
        },
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
        onSubmit() {
            this.saveApplyBatch();
        },
         //提示框
         open(title) {
            this.$message(title);
        },
        //判断是查看批次详情，还是新增批次
        checkOrAdd(guid){
            if(guid) {
                //查看批次详情
                let params = {
                    guid:guid
                }
                http.checkBach(params).then(res => {
                    this.houseReportInfoDTO = res;
                    //  that.options.ascriptionoptions = tool.changeData(res);
                });
            }else{
                //新增批次
            }
        },
        //保存申请批次
        saveApplyBatch(){
            var that = this;
            let houseReportInfoDTO = that.houseReportInfoDTO;
            houseReportInfoDTO.reportDate = tool.getNowFormatDate();
            http.saveApplyBatch(houseReportInfoDTO).then(res => {
                that.open('保存成功！')
            });
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
        
        queding1(){
            this.dialogFormVisible = false;
        },
        submission(){
            this.dialogFormVisible = true;
        }
    },
    created(){
        //获取上报责任单位
        this.getAscriptionoptions();
        this.checkOrAdd(this.$router.history.current.query.guid)
     },
    
  };
</script>
<style lang="scss" scoped>
#newwarehousing{
    width: 100%;
    margin: 0 auto;
    padding:0px 15px;
    .content{
        &>p button{
            
            margin-top: 10px;
        }
        &>h2 {
            width: 100%;
            height: 40px;
            background: #fff;
            p {
                display: inline-block;
                float: left;
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
            p.moren{
                    background:rgba(247, 247, 247, 1);
                    span{
                        color:rgba(153, 153, 153, 1);
                        font-weight: 400;
                    }
                    .close_tab {
                        background: url('../../static/images/close3.png') no-repeat center center;
                    }
                }
        }
    }
    
    .content_d{
        width: calc(100% - 214px);
        float: left;
        margin: 20px 0px 0 0px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        -webkit-box-shadow: 0 0 3px #ccc;
        box-shadow: 0 0 3px #ccc;
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
                width:100%;
                float: left;
                background: #fff;
                box-sizing: border-box;
                padding: 20px 18px;
                
                &>p {
                    margin-bottom: 20px;
                    button {
                        
                        background: #057ff8;
                        color: #fff;
                        border-radius: 2px;
                        padding:5px 15px;
                        background: #169bd5;
                    }
                    button:first-child {
                        margin-right: 20px;
                    }
                }
                .quarterMessage_box{
                    width:100%;
                    height: auto;
                    /deep/ .demo-ruleForm{
                        .el-form-item{
                            width: 50%;
                            float: left;
                            margin-bottom: 10px;
                            .el-form-item__content{
                                margin-left:110px !important;
                                .el-input__inner{
                                    height: 30px;
                                    line-height: 30px;
                                }
                                .shengcheng{
                                    width: 77%;
                                }
                                .address{
                                    width:90%;
                                }
                                .el-form-item{
                                    width:100%;
                                }
                                .el-select{
                                    width: 100%;
                                }
                                .el-form-item__content{
                                    margin-left:0px !important;
                                }
                            }
                            .el-form-item__label{
                                width:110px!important; 
                            }
                            
                            
                        }
                        .width{
                            width: 100%;
                        }
                        .button{
                            .el-form-item__content{
                                margin-left:0px !important;
                            }
                            
                        }
                    }
                    .messagetable{
                        tbody tr.apply td{
                            height: 95px;
                            line-height: 100px;
                        }
                        tbody tr{
                            
                            td{
                                height:30px;
                                margin-bottom: 10px;
                                line-height: 40px;
                                text-align: right;
                                input{
                                    border:1px solid #000;
                                    width: 100%;
                                    padding:5px 10px;
                                }

                                span{
                                    margin-right: 20px;
                                }
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
                                    width:100%;
                                    height: 26px;
                                }
                            }
                        }
                    }
                }
                .housing_statistics{
                    margin-top: 20px;
                    .title {
                        width: 100%;
                        height: 20px;
                        box-sizing: border-box;
                        border-left: 4px solid #f5a623;
                        position: relative;
                        margin-bottom: 28px;
                        span {
                            position: absolute;
                            display: inline-block;
                            box-sizing: border-box;
                            padding-left: 10px;
                            padding: 0 20px 0 10px;
                            height: 20px;
                            line-height: 20px;
                            font-size: 20px;
                            z-index: 2;
                            background: #fff;
                        }
                        .xian {
                            position: absolute;
                            top: 18px;
                            width: 100%;
                            height: 1px;
                            background: #ccc;
                        }
                    }
                    .statistics_content{
                        width: 100%;
                        box-sizing: border-box;
                        padding: 0 30px;
                        display: flex;
                        justify-content:space-between;
                        .content{
                            width: 31%;
                            background: #fff;
                            box-sizing: border-box;
                            padding: 20px;
                            height: 288px;
                            box-shadow:5px 5px 5px rgba(221, 229, 249, 1),2px -2px 2px rgba(221, 229, 249, 1),-2px 2px 2px rgba(221, 229, 249, 1),-2px -2px 2px rgba(221, 229, 249, 1);
                            table{
                                border-top:1px solid rgba(221, 229, 249, 1);
                                border-left:1px solid rgba(221, 229, 249, 1);
                            }
                            tbody{
                                tr.frist{
                                    background: rgba(254,246,232,1);
                                }
                                tr.two{
                                    background: rgba(237,249,244,1);
                                }
                                td{
                                    line-height: 30px;
                                    text-align: center;
                                    border-bottom:1px solid rgba(221, 229, 249, 1);
                                    border-right:1px solid rgba(221, 229, 249, 1);
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
        
            #delete_box{
                .el-button{
                    padding: 6px 20px;
                }
            }
        }
</style>
