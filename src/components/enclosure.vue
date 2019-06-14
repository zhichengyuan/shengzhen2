<template>
    <!-- 附件模板 -->
    <div id="enclosure">
        <!-- 右侧头部tab切换 -->
            <h2  style="display:none">
                <p class="moren"> <router-link :to="{path: '/warehousingapplication', query:{}}"><span>房源入库申请</span></router-link><span class="close_tab"></span></p>
                <p :class="classA" style=""><span>新增入库申请</span><router-link :to="{path: '/housinginformation', query:{}}"><span class="close_tab"></span></router-link></p>
            </h2>
            <p><button @click="dialogFormVisible = true">提交</button></p>
        <!-- 右侧头部tab切换结束 -->
        <div class="content_d">
            <h2>
                <p><span class="tab_name">附件</span><span class="close_img"></span></p>
            </h2>
            <div class="changci_content_left">
                <div class="quarterMessage_box">
                    <table class="messagetable" cellspacing="0px" style="width:100%;">
                        <colgroup>
                        <col width="30%">
                        <col width="10%">
                        <col width="10%">
                        <col width="20%">
                        <col width="20%">
                        </colgroup>
                        <thead>
                        </thead>
                        <tbody>
                        <tr>
                            <td>文件名称</td>
                            <td>附件大小</td>
                            <td>上传人</td>
                            <td>上传时间</td>
                            <td >操作</td>
                        </tr>
                        <tr>
                            <td>项目材料</td>
                            <td >10</td>
                            <td >10</td>
                            <td >2019-1-12</td>
                            <td class="peration"><span class="upload">上传</span></td>
                        </tr>
                        <tr>
                            <td>单位材料</td>
                            <td >10</td>
                            <td >10</td>
                            <td >2019-1-12</td>
                            <td class="peration"><span class="upload">上传</span></td>
                        </tr>
                        <tr>
                            <td>其他材料</td>
                            <td >10</td>
                            <td >10</td>
                            <td >2019-1-12</td>
                            <td class="peration"><span class="see">查看</span><span class="download">下载</span><span class="delete">删除</span></td>
                        </tr>
                     
                       
                    
                        
                        </tbody>
                    </table>
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
                <el-button @click="queding1">确 定</el-button>
                <el-button @click="dialogFormVisible = false" type="primary">取 消</el-button>
            </div>
        </el-dialog>
    </div>
    <!-- 附件模板 -->
</template>
<script>
export default {
    name:'enclosure',
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
        queding1(){
            this.dialogFormVisible = false;
        },
        submission(){
            this.dialogFormVisible = true;
        }
    },
    created(){
         var params = this.$route.params;
         this.form.batchName = params.batchName;
         this.form.chooseDate = params.date1;
         this.form.endTime = params.date2;
         this.form.queueName = params.queueName;
     },
    
  };
</script>
<style lang="scss" scoped>
#enclosure{
    &>p button{
        background: rgba(22, 155, 213,1);
        color: #fff;
        margin-left: 15px;
        display: inline-block;
        box-sizing: border-box;
        padding:5px 15px;
        margin-top: 10px;
    }
    &>h2 {
        width: 100%;
        height: 40px;
        background: #fff;
        p {
            display: inline-block;
            float:left;
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
    .content_d{
        width: calc(100% - 239px);
        float: left;
        margin: 20px 0px 0 15px;
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
    }
    
    
    
 .changci_content_left {
                width:100%;
                float: left;
                background: #fff;
                box-sizing: border-box;
                padding: 20px 18px;
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
                            td.peration span{
                                display: inline-block;
                                padding-left: 20px;
                                background: url('../../static/images/arrow-to-bottom.png') no-repeat left center;
                                background-size: 15px 15px;
                                margin-left: 5px;
                                &.delete{
                                    background: url('../../static/images/delete.png') no-repeat left center;
                                       background-size: 15px 15px;
                                }
                                &.upload{
                                    background: url('../../static/images/arrow-to-top.png') no-repeat left center;
                                       background-size: 15px 15px;
                                }
                                &.download{
                                    background: url('../../static/images/arrow-to-bottom.png') no-repeat left center;
                                       background-size: 15px 15px;
                                }
                                &.see{
                                    background: url('../../static/images/display.png') no-repeat left center;
                                       background-size: 15px 15px;
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
