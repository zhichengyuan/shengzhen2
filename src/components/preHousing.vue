<template>
    <!-- 预房源模板 -->
    <div id="prehousing">
        <!-- 右侧头部tab切换 -->
            <h2  style="display:none">
                <p class="moren"> <router-link :to="{path: '/warehousingapplication', query:{}}"><span>房源信息录入</span></router-link><span class="close_tab"></span></p>
                <p :class="classA" style=""><span>新增入库申请</span><router-link :to="{path: '/housinginformation', query:{}}"><span class="close_tab"></span></router-link></p>
            </h2>
            <p><el-button type="primary" size="mini"  @click="submitPop">提交</el-button></p>
        <!-- 右侧头部tab切换结束 -->
        <div class="content_d">
            <h2>
                <p><span class="tab_name">预房源</span><span class="close_img"></span></p>
            </h2>
            <div class="changci_content_left">
                <p>
                    <el-button type="primary" size="mini"  @click="chooseDistrict">选择预房源</el-button>
                </p>
                <div class="quarterMessage_box">
                    <template>
                        <el-table :data="preHousList" style="width: 100%" border
                        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                         @selection-change="handleSelectionChange2"
                         @row-dblclick="doubleClick">
                         <el-table-column type="selection" width="50"> </el-table-column>
                            <el-table-column label="序号" width="50" type="index"   :index="indexMethod"></el-table-column>
                            <el-table-column prop="code" label="小区名称" width="80"></el-table-column>
                            <el-table-column prop="buildName" label="栋名称" width="70"></el-table-column>
                            <el-table-column prop="houseNo" label="房号" width="60"></el-table-column>
                            <el-table-column prop="sourceName" label="房产来源" width="90" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="typeName" label="户型" width="90" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="orientationName" label="朝向" width="60" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="coveredArea" label="建筑面积" width="80"></el-table-column>
                            <el-table-column prop="function" label="房屋用途" width="80" ></el-table-column>
                            <el-table-column prop="natureName" label="房屋性质" width="120" show-overflow-tooltip> </el-table-column>
                            <el-table-column prop="" label="操作" show-overflow-tooltip  >
                                <template scope="scope"><span @click="deteleYuHousing(scope.$index, scope.row)">移除</span></template>
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
        <!-- 提交确认弹窗 -->
        <el-dialog title="提交" :visible.sync="dialogFormVisible" width="30%" top="35vh" id="delete_box">
            <el-form :model="form">
            <p>小区名称：<span>金领家园</span></p>
            <p>总栋数：<span>{{tungCount}}</span>栋</p>
            <p>总套数：<span>{{houseCount}}</span>套</p>
            <p>请确认上述信息，确认无误再提交本报批！</p>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="submitPreHouse">确 定</el-button>
                <el-button @click="dialogFormVisible = false" type="primary">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 选择预房源弹窗 -->
        <el-dialog title="选择预房源" :visible.sync="prehousingFormVisible" width="85%" class="box" top="4vh">
            <el-form :model="form" class="form">
            <h5>请选择小区:</h5>
            </el-form>
            <div class="quarterMessage_box">
                      
                <template>
                    <el-table :data="districtList" style="width: 100%" border @row-click = "showRow"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                        <el-table-column label="选择" width="50" align="center">
                            <template scope="scope">
                                 
                                <el-radio class="radio"  v-model="radio"  :label="scope.$index" >&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column label="序号" width="120" type="index"   :index="indexMethod"></el-table-column>
                        <el-table-column prop="code" label="小区号" width="120"></el-table-column>
                        <el-table-column prop="name" label="小区名称" width="150"></el-table-column>
                        <el-table-column prop="houseCount" label="总房源数量" width="120"></el-table-column>
                        <el-table-column prop="address" label="位置" show-overflow-tooltip> </el-table-column>
                    </el-table>
                </template>
               
                
            </div>
            <h5 style="margin-top:10px;">请选择预房源:</h5>
            <div class="content">
                <div class="content_left">
                    <!-- 搜索框开始 -->
                    <!-- 价格：{{price}}--{{noPop}} -->
                    <div class="search_box">
                        <ul class="search clearfix">
                            <li style="width:33%">  
                                <span>栋名称</span>
                                <div style="width:65%;">
                                    <div>
                                        <el-input v-model="form.buildingName"></el-input>
                                    </div>
                                </div>
                            </li>
                            <li style="width:33%">
                                <span>房号</span>
                                <div style="width:65%;">
                                    <div>
                                        <el-input v-model="form.danhao"></el-input>
                                    </div>
                                </div>
                            </li>
                            <li style="width:33%">
                                <span>户型</span>
                                <div style="width:65%;">
                                    <template>
                                        <el-select v-model="form.houseType">
                                            <el-option v-for="item in options.apartment" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:80%">
                                <span style="width:60px;">建筑面积</span>
                                <div style="width:30%;">
                                    <div>
                                        <el-input v-model="form.houseCoveredAreaBegin"></el-input>
                                    </div>
                                </div>
                                <div class="xian1">
                                    <span></span>
                                </div>
                                <div style="width:30%;">
                                    <div>
                                        <el-input v-model="form.houseCoveredAreaEnd"></el-input>
                                    </div>
                                </div>
                            </li>
                            <li style="width:20%">
                                <el-button type="primary" @click="checkHousList(1,10)" size="mini">查询</el-button>
                            </li>
                        </ul>
                    </div>
                    <!-- 搜索框结束 -->
                    <h5 style="line-height:25px;">可选择预房源</h5>
                    <div class="quarterMessage_box" style="height:216px;overflow:hidden;overflow-y: auto;">
                        <template>
                            <el-table :data="chooseHouseList" style="width: 100%" border 
                             @selection-change="handleSelectionChange"
                             :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                                <el-table-column type="selection" width="40"> </el-table-column>
                                <el-table-column prop="buildName" label="栋名称" width="80"></el-table-column>
                                <el-table-column prop="houseNo" label="房号" width="60"></el-table-column>
                                <el-table-column prop="typeName" label="户型" width="80"></el-table-column>
                                <el-table-column prop="coveredArea" label="建筑面积" width="80"></el-table-column>
                                <el-table-column prop="natureName" label="房屋性质" show-overflow-tooltip> </el-table-column>
                            </el-table>
                        </template>
                        
                    </div>  
                </div>
                <div class="button-box">
                    <div class="button">
                        <span class="add" @click = "addHouse">添加 >></span>
                        <span @click="deleteHouse">&lt;&lt;  移除</span>
                    </div>
                </div>
                <div class="content_left" style="float:right;">
                    <!-- 搜索框开始 -->
                    <!-- 价格：{{price}}--{{noPop}} -->
                    <div class="search_box">
                        <ul class="search clearfix">
                            <li style="width:33%">
                                <span>栋名称</span>
                                <div style="width:65%;">
                                    <div>
                                        <el-input v-model="form1.buildingName"></el-input>
                                    </div>
                                </div>
                            </li>
                            <li style="width:33%">
                                <span>房号</span>
                                <div style="width:65%;">
                                    <div>
                                        <el-input v-model="form1.danhao"></el-input>
                                    </div>
                                </div>
                            </li>
                            <li style="width:33%">
                                <span>户型</span>
                                <div style="width:65%;">
                                    <template>
                                        <el-select v-model="form.houseType">
                                            <el-option v-for="item in options.apartment" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:80%">
                                <span style="width:60px;">建筑面积</span>
                                <div style="width:30%;">
                                    <div>
                                        <el-input v-model="form1.houseCoveredAreaBegin"></el-input>
                                    </div>
                                </div>
                                <div class="xian1">
                                    <span></span>
                                </div>
                                <div style="width:30%;">
                                    <div>
                                        <el-input v-model="form.houseCoveredAreaEnd"></el-input>
                                    </div>
                                </div>
                            </li>
                            <li style="width:20%">
                               <el-button type="primary"  size="mini">查询</el-button>
                                
                            </li>
                        </ul>
                    </div>
                    <!-- 搜索框结束 -->
                    <h5 style="line-height:25px;">已选中房源  200套</h5>
                    <div class="quarterMessage_box" style="height:216px;overflow:hidden;overflow-y: auto;">
                        <template>
                            <el-table :data="choosedHouseList" style="width: 100%" border 
                             @selection-change="handleSelectionChange1"
                             :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                                <el-table-column type="selection" width="40"> </el-table-column>
                                <el-table-column prop="buildName" label="栋名称" width="80"></el-table-column>
                                <el-table-column prop="houseNo" label="房号" width="60"></el-table-column>
                                <el-table-column prop="typeName" label="户型" width="80"></el-table-column>
                                <el-table-column prop="coveredArea" label="建筑面积" width="80"></el-table-column>
                                <el-table-column prop="natureName" label="房屋性质" show-overflow-tooltip> </el-table-column>
                            </el-table>
                        </template>
                        
                    </div>  
                </div>
            </div>
            <div slot="footer" class="dialog-footer footer">
                <el-button type="primary" @click="savePreHouse">确 定</el-button>
                <el-button type="primary" @click="queding">取消</el-button>
            </div>
        </el-dialog>
    </div>
    <!-- 预房源模板 -->
</template>
<script>
import {tool,requset} from '../../static/js/tool'
import http from '@/api/common.js'
export default {
    name:'prehousing',
    data() {
      return {
        tableData: [],
        multipleSelection1: [],
        multipleSelection: [],
        multipleSelection2:[],//要提交房源的数组
        houseCount:0,//要提交的房源总数
        tungCount:0,//要提交的栋数
		radio: '',
        selected:{},
        classA:'active',
        classB:'',
        pageObj:{
            currentPage4: 1,
            pageSize:10,
            total:40
        },
        choosedHouseList:[],//已添加的房源
        chooseHouseList:[],//可选房源列表
        districtList:[],//可选小区列表
        preHousList:[],//获取预房源列表
        dialogFormVisible:false,
        prehousingFormVisible:false,
        form:{
            typeName:'',//户型
            buildName:'',//栋名称
            communityGuid:'',
            houseNO:'',//房号
            coveredAreaMin:'',//最小面积
            coveredAreaMax:'',//最大面积
        },
        form1:{
            orientation:'',//朝向
            houseCoveredAreaBegin:'',//建筑面积开始
            houseCoveredAreaEnd:'',//建筑面积结束
            houseType:'',//户型
            houseRecource:'',//房屋来源
            buildingName:'',//栋名称
            houseFunction:'',//房屋用途
            districtGuid:'',//小区标识
            tungNumber:'',//栋号
            landNumber:'',//宗地号
            danhao:'',//单号
            floorNumber:'',//楼层数
        },
        options: {
            apartment:[],
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //提示框
         open(title) {
            this.$message(title);
        },
        handleSelectionChange(val) {
            console.log(val);
            var that = this;
            this.multipleSelection = val;
        },
        handleSelectionChange1(val) {
            var that = this;
            this.multipleSelection1 = val;
        },
        //要提交房源的的复选框的操作
        handleSelectionChange2(val) {
            var that = this;
            console.log(val);
            this.multipleSelection2 = val;
        },
        //双击查看房屋详情
        doubleClick(row){
            console.log(row);
            // this.$router.push({name: 'housingmessage',query:{'guid':row.guid}});
        },
        //提交房源入库弹窗
        submitPop(){
            if(this.multipleSelection2.length != 0) {
                 var arr = this.multipleSelection2;
                 this.tungCount = arr.length;
                 var houseNo = 0;
                 for(var i=0;i<arr.length;i++) {
                     houseNo += Number(arr[i].houseNo);
                 }
                 this.houseCount = houseNo;
                 this.dialogFormVisible = true
            }else{
                this.open('请选择房源！')
            }
        },
        //提交房源入库
        submitPreHouse(){
            console.log(this.multipleSelection2);
            let houseInfoPreDTOS = this.multipleSelection2;
            
                 http.submitPreHouse(houseInfoPreDTOS).then(res => {
                    console.log('111',res);
                    this.dialogFormVisible = false;
                    this.open('房源入库申请提交成功！');
                    //that.chooseHouseList = res.content;
                });
           
           
        },
        //查询房源信息列表
        checkHousList(pageIndex,pageSize){
            var that = this;
            that.chooseHouse();
             //that.getHousingMessageList(pageIndex,pageSize);
        },
        //获取房源信息列表
        getHousingMessageList(pageIndex,pageSize){
            var that = this;
            
            let params = {
                Orientation:that.form.Orientation,
                buildingName : that.form.buildingName,
                districtGuid : that.form.districtGuid,
                houseCoveredAreaBegin :that.form.houseCoveredAreaBegin,
                houseCoveredAreaEnd : that.form.houseCoveredAreaEnd,
                houseFunction : that.form.houseFunction,
                houseRecource:that.form.houseRecource,
                houseType:that.form.houseType,
                pageIndex : pageIndex,
                pageSize : pageSize,
            }
             http.getHousingMessageList(params).then(res => {
             
                that.chooseHouseList = res.content;
            });
            
        },
        //点击添加操作
        addHouse(){
            var that = this;
            that.choosedHouseList = [],
            that.choosedHouseList = that.multipleSelection;
            
        },
        //点击移除操作
        deleteHouse() {
            var that = this;
            that.multipleSelection1.forEach(function (ele,index) {
                var houseNo = ele.houseNo;
                that.choosedHouseList.forEach(function (ele,index) {
                    if(ele.houseNo == houseNo) {
                        var arr = that.choosedHouseList.splice(index,1);
                    }
                })
            })
            // that.choosedHouseList = [],
            // that.choosedHouseList = that.multipleSelection;
        },
        //选择预房源-可选房源列表
        chooseHouse(){
            var that = this;
            let params = {}
             http.chooseHouse(params).then(res => {
                 console.log(res);
                 that.preHousList = res;
                //  that.chooseHouseList = res;
            });
            
        },
        //选择预房源-选择小区
        chooseDistrict(){
            var that = this;
            that.prehousingFormVisible = true
            let params = {}
             http.chooseDistrict(params).then(res => {
                 console.log('可选小区',res);
                 that.districtList = res;
                 that.radio = 0;
                 that.form.communityGuid = that.districtList[0].guid;
            });
           that.getPreHousList();
        },
        //获取某个小区下的预房源列表
        getPreHousList(){
            var that = this;
            let params = that.form;
            console.log('存在',params);
             http.getPreHousList(params).then(res => {
                 console.log('某小区的可选房源',res);
                 that.chooseHouseList = res;
            });
        },
         //序号
        indexMethod(row){
            return row + 1;
        },
        //单机选择
        showRow(row){
            //赋值给radio
            console.log(row);
            this.radio = this.districtList.indexOf(row);
            this.selected=row;
            this.form.districtGuid = row.guid;
            this.checkHousList(1,10);
        },
        //查看户型
        getApartment(){
            var that = this;
            let params = {
                houseRecourceName:1
            };
            http.getApartment(params).then(res => {
               that.options.apartment = tool.changeData(res);
            });
        },
        //移除预房源
        deteleYuHousing(index,row){
            var that = this;
            
            const houseNo = row.houseNo;
            let guid = [];
            guid.push(houseNo);
            http.deteleYuHousing(guid).then(res => {
                that.open(res)
                this.chooseHouse();
            });
            
        },
        //点击确定保存预房源
        savePreHouse(){
            var that = this;
            let houseInfoPreDTOS = that.choosedHouseList;
            if(houseInfoPreDTOS.length != 0) {
                http.savePreHouse(houseInfoPreDTOS).then(res => {
                    that.open('提交保存成功！')
                    that.chooseHouse();
                    that.prehousingFormVisible = false;
                });
            }else{
                that.open('请添加预房源')
            }
        },
        queding1(){
            
        },
        queding(){
            this.prehousingFormVisible = false;
        },
        submission(){
            this.dialogFormVisible = true;
        }
    },
    created(){
        //查看户型
        this.getApartment();
        this.chooseHouse();

     },
    
  };
</script>
<style lang="scss" scoped>
#prehousing{
   width: 100%;
    margin: 0 auto;
    padding:0px 15px;
    &>p{
        margin-top:15px;
    }
    
    
    .content_d{
        width: calc(100% - 214px);
        float: left;
        margin: 20px 0px 0 0px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        -webkit-box-shadow: 0 0 3px #ccc;
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
                width:100%;
                float: left;
                background: #fff;
                box-sizing: border-box;
                padding: 20px 18px;
                 min-height: 500px;
                 margin-bottom: 20px;
                 /deep/ .el-table {
                    th{
                        padding: 6px 0!important;
                    }
                    .cell{
                        text-align: center;
                    }
                }
                &>p {
                    margin-bottom: 20px;
                    
                    button:first-child {
                        margin-right: 20px;
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
                        .el-table /deep/ td{
                            padding:5px 0;
                        }
                         /deep/ .el-table {
                            th{
                                padding: 6px 0!important;
                            }
                            .cell{
                                text-align: center;
                            }
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
                                    padding:7px 15px;
                                    width: 240px;
                                }
                            }
                        }
                        .form{
                            margin-bottom: 0px;
                        }
                        
                        .content{
                            width: 100%;
                            height: 336px;
                            .content_left{
                                width: 46%;
                                border: 1px solid black;
                                height: 100%;
                                box-sizing: border-box;
                                padding:5px;
                                float: left;
                                // 搜索框样式
                                .search_box {
                                    width: 100%;
                                    height: auto;
                                    box-sizing: border-box;
                                    padding: 0 0px;
                                    border-bottom: 1px solid #eeeeee;
                                    background: #fff;
                                    .search {
                                        width: 100%;
                                        height: auto;
                                        li {
                                            float: left;
                                            width: 25%;
                                            height: 40px;
                                            line-height: 40px;
                                            span {
                                                // display: inline-block;
                                                float: left;
                                                // height: 40px;
                                                // line-height: 40px;
                                                // text-align: right;
                                                // margin-right: 5%;
                                                // width:48px;

                                            }
                                            div{
                                                float: left;
                                                /deep/ .el-input{
                                                    .el-input__inner{
                                                        height: 26px;
                                                        line-height: 26px;
                                                    }
                                                    .el-input__suffix{
                                                        right: 0px;
                                                        .select__caret {
                                                            margin-top: 2px;
                                                        }
                                                    }
                                                }
                                                
                                                input{
                                                    border: 1px solid #dbdbdb;
                                                    height: 26px;
                                                    border-radius: 3px;
                                                    padding-left: 5px;
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
                                                        height: 50px;
                                                }
                                            }
                                            div.xian1{
                                                width:10%;height:100%;display:flex;
                                                align-items: center;
                                                justify-content: center;
                                                span{
                                                    width:60%;height:1px;background:black;
                                                }
                                            }
                                            
                                        }
                                    }
                                }
                        //搜索框样式结束
                            }
                            .button-box{
                                width: 8%;
                                float: left;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                .button{
                                    display: flex;
                                    flex-flow: column;
                                    width: 100%;
                                    span{
                                        display: inline-block;
                                        width: 100%;
                                        text-align: center;
                                        font-size: 20px;
                                        font-weight: bold;
                                        cursor: pointer;
                                        color: rgba(255, 0, 93, 1);
                                        
                                    }
                                    span.add{
                                        color:rgba(0,204,102,1);
                                        margin-bottom: 30px;
                                    }
                                }
                            }
                        }

                    }
                    .dialog-footer{
                        text-align: center;
                    }
                    .footer{
                        padding:0px 20px 0px;
                    }
                }
            /deep/ .box{
                .el-dialog__footer{
                        padding: 0px 20px 10px;
                }
            } 
            #delete_box{
                .el-button{
                    padding: 6px 20px;
                }
                
            }
        }
</style>
