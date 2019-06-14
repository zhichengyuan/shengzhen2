<template>
    <!-- 新增小区模板 -->
    <div id="quartsMessage">
        <!-- 右侧头部tab切换 -->
            <h2  style="display:none">
                <p :class="classB"> <router-link :to="{path: '/housinginformation', query:{}}"><span>房源信息录入</span></router-link><span class="close_tab"></span></p>
                <p :class="classA" style=""><span>新增小区</span><router-link :to="{path: '/housinginformation', query:{}}"><span class="close_tab"></span></router-link></p>
            </h2>
        <!-- 右侧头部tab切换结束 -->
        <div class="content_d">
            <h2>
                <p><span class="tab_name">小区信息</span><span class="close_img"></span></p>
            </h2>
            <div class="changci_content_left">
                <div class="quarterMessage_box">
                    <el-form :model="dto" :rules="rules" ref="dto" label-width="100px" class="demo-ruleForm">
                        <el-form-item class="width button" style="float:none">
                            <el-button type="primary" @click="submitForm('dto')" size="mini" class="save">保存</el-button>
                        </el-form-item>
                        <div style="border-top:1px solid rgb(222, 230, 249);border-left:1px solid rgb(222, 230, 249);" class="clearfix">
                        <el-form-item label="大区编号" prop="name" class="readyOnly">
                            <el-input v-model="dto.name" placeholder="选择大区后自动生成"></el-input>
                        </el-form-item>
                        <el-form-item label="大区名称" prop="name">
                            <el-select v-model="dto.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="小区编号" prop="code">
                            <el-input v-model="dto.code" class="shengcheng"></el-input>
                            <el-button type="primary" @click="getDistrictCode" size="mini">生成</el-button>
                        </el-form-item>
                        <el-form-item label="小区名称" prop="name">
                            <el-input v-model="dto.name"></el-input>
                        </el-form-item>
                        <el-form-item label="宗地号" prop="landNo" class="width">
                            <el-input v-model="dto.landNo"></el-input>
                        </el-form-item>
                        <el-form-item label="小区归属" prop="belongArea">
                            <el-select v-model="dto.belongArea" placeholder="请选择小区归属">
                                <el-option v-for="item in options.communityOwner" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在区" prop="area">
                            <el-select v-model="dto.area" placeholder="请选择所在区">
                                 <el-option v-for="item in options.area_prepar" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在街道" prop="street">
                            <el-input v-model="dto.street"></el-input>
                        </el-form-item>
                        <el-form-item label="路" prop="roadName">
                            <el-input v-model="dto.roadName"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" prop="address" class="width">
                            <el-input v-model="dto.address" class="address"></el-input>
                            <el-button type="primary" @click="getAddress" size="mini">生成</el-button>
                        </el-form-item>
                        <el-form-item label="用地面积" prop="landArea">
                            <el-input v-model="dto.landArea" class="danwei"></el-input>
                            <span class="ping">平方米</span>
                        </el-form-item>
                        <el-form-item label="总建筑面积" prop="totalCoveredArea">
                            <el-input v-model="dto.totalCoveredArea" class="danwei"></el-input>
                            <span class="ping">平方米</span>
                        </el-form-item>
                        <el-form-item label="容积率" prop="volumeRatio">
                            <el-input v-model="dto.volumeRatio"></el-input>
                        </el-form-item>
                        <el-form-item label="开工时间" required>
                            <el-form-item prop="startConstructionTime">
                                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker> -->
                                <el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dto.startConstructionTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="竣工时间" required>
                            <el-form-item prop="finishConstructionTime">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dto.finishConstructionTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="交付使用时间" required>
                            <el-form-item prop="deliveryTime">
                                <el-date-picker 
                                                type="date" 
                                                placeholder="选择日期" 
                                                v-model="dto.deliveryTime" 
                                                value-format="yyyy-MM-dd"
                                                style="width: 100%;">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="开发商" prop="developer">
                            <el-input v-model="dto.developer"></el-input>
                        </el-form-item>
                        <el-form-item label="设计单位" prop="designOrgnation">
                            <el-input v-model="dto.designOrgnation"></el-input>
                        </el-form-item>
                        <el-form-item label="是否自管" prop="selfManagement">
                            <el-select v-model="dto.selfManagement" placeholder="请选择是否自管">
                                <el-option v-for="item in options.isselfTube" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否自建" prop="selfBuilt">
                            <el-select v-model="dto.selfBuilt" placeholder="请选择是否自建">
                                <el-option v-for="item in options.isoneself" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="装修标准" prop="decorationStandard">
                            <el-select v-model="dto.decorationStandard" placeholder="请选择装修标准">
                                 <el-option v-for="item in options.standard" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="小区详细说明" prop="remark" class="width xiangqing">
                            <el-input type="textarea" v-model="dto.remark"></el-input>
                        </el-form-item>
                        </div>
                    </el-form>


                </div>
            </div>
        </div>
    </div>
    <!-- 新增小区模板结束 -->
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import {tool} from '../../static/js/tool'
import http from '@/api/common.js'
export default {
    name:'quartsmessage',
    data() {
      return {
        classA:'active',
        classB:'moren',
        guishu:'',//小区归属
        area_prepar:'',//小区区域
        isoneself:'',//是否自建
        isselftube:'',//是否自管
        standard:'',//建房标准
        address:'',//小区地址
        districtCode:'',//小区编号
        rules: tool.rules,
        options:{
            communityOwner:[],
            area_prepar:[],
            isoneself:[],
            isselftube:[],
            standard:[],
            area_prepar:[]
        },
        dto:{
            address: "",//地址
            area: "",//区域
            belongArea: "",//小区归属
            code: '',//小区编号
            community: "1",//社区
            constructorProjectGuid: "string", //  不确定---建设项目标识
            decorationStandard: "",//装饰标准
            deliveryTime: "",//交付时间
            designOrgnation: "",// 设计单位   
            developer: "",//开发商
            fileCode: "string",//文件代码---档案编号
            finishConstructionTime: "",//竣工时间
            guid: "string", //唯一标识
            houseCount: '',//总套数
            landArea: '',//用地面积
            landNo: '',//宗地号
            name: "",//小区名
            parentGuid: "string", //大区标识
            picCode: "string",    //小区图
            remark: "详细说明",//小区详细说明
            reportGuid: "string",   //上报审批标识
            roadName: "",//路
            selfBuilt: '',//是否自建
            selfManagement: '',//是否自管
            selfSale: true,//自销
            serialNo: "string",//网格编码
            startConstructionTime: "",//开始构造开工时间
            state: 0,//状态
            street: "",//街道
            surveyProjectGuid: "string",//测绘项目标识
            totalCoveredArea: '',//总建筑面积
            usedCode: "string",//曾用小区代码
            usedName: "string",//曾用小区名
            volumeRatio: ''//容积率
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
    watch:{
         guishu (val, oldval) {
                 console.log(val);
                console.log(oldval);
         }
    },
    mounted:function (){  
    },
    methods: {
         submitForm(formName) {
              let dto = this.dto;
              console.log(dto)
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.addAuarters()
            } else {
                console.log('error submit!!');
                this.open('请确认填写信息完整！！！');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //提示框
         open(title) {
            this.$message(title);
        },
        //判断是查看小区详情，还是新增小区
        checkOrAdd(guid){
            if(guid) {
                //查看小区详情
                console.log('小区的guid',guid);
                let communityGuid = guid;
                let params = {
                    communityGuid : guid
                }
                http.checkQuery1(params).then(res => {
                    console.log(res);
                    this.$store.commit('add_quartersObj',res);
                    this.dto = res;
                    
                    if(res.selfManagement) {
                        this.dto.selfManagement = '是';

                    }else{
                        this.dto.selfManagement = '否';
                    }
                    if(res.selfBuilt){
                         this.dto.selfBuilt = '是';
                    }else{
                        this.dto.selfBuilt = '否';
                    }
                    // that.options.area_prepar = tool.changeData(res);
                });
            }else{
                //新增小区
            }
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
       
        //建设筹集-小区信息新增
        addAuarters(){
            var that = this;
            let dto = that.dto;
            dto.deliveryTime = dto.deliveryTime.substr(0,10);
            dto.startConstructionTime = dto.startConstructionTime.substr(0,10);
            dto.finishConstructionTime = dto.finishConstructionTime.substr(0,10);
            dto.selfBuilt == "是" ? dto.selfBuilt = "true": dto.selfBuilt = "false";
            dto.selfManagement == "是" ? dto.selfManagement = "true": dto.selfManagement = "false";
            http.addAuarters(dto).then(res => {
                that.open('保存小区成功');
                var guid = res.guid;
                this.$store.commit('add_quartersObj',res);
                //that.dto.address = res[0].address;
            });
        },
        //生成地址
        getAddress() {
            var that = this;
            let params = {};
            that.dto.address = that.dto.street + that.dto.roadName;
          
        },
     
        //建设筹集小区信息新增条件-小区号生成获取
        getDistrictCode(){
            var that = this;
            let params = {};
            http.getDistrictCode(params).then(res => {
                    console.log('小区编号',res)
                    that.dto.code = res[0];
            });
        
        },
        //建房标准
        getStandard(){
            var that = this;
            let params = {
                decorationStandard:1
            };
            http.getStandard(params).then(res => {
                    that.options.standard = tool.changeData(res);
            });
        
        },
        ////是否自管
        getIsselfTube(){
            var that = this;
            let params = {
                selfManagement:1
            };
            http.getIsselfTube(params).then(res => {
                console.log('是否自管',res);
                     that.options.isselfTube = tool.changeData(res);
                     console.log(that.options.isselftube);
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
        //获取小区归属
        getCommunityOwner(){
            var that = this;
            let params = {
                districtBelong:1
            };
            http.getCommunityOwner(params).then(res => {
                that.options.communityOwner = tool.changeData(res);
            });
           
        },
    },
    created(){
        //获取区域
        this.getArea();
        //建房标准
        this.getStandard();
        //获取小区归属
        this.getCommunityOwner();
        //获取区域请求
        this.getArea();
        //是否自建
        this.getIsoneself();
        //是否自管ss
        this.getIsselfTube();
        this.checkOrAdd(this.$router.history.current.query.guid)
         console.log(this.$router.history.current.query.guid);
        //  var params = this.$route.params;
        //  this.form.batchName = params.batchName;
        //  this.form.chooseDate = params.date1;
        //  this.form.endTime = params.date2;
        //  this.form.queueName = params.queueName;
    },
     computed:{
     ...mapState({
        quartersObj: state => state.quartersObj
     })
   },
    
  };
</script>
<style lang="scss" scoped>
#quartsMessage{
    &>h2 {
        width: 100%;
        height: 40px;
        background: #FFF;
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
                font-weight: 400;
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
        background: #fff;
        border: 1px solid #ccc;
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
                     
                        color: #fff;
                        border-radius: 2px;
                        padding: 5px 15px;
                        background: #169bd5;
                    }
                    button:first-child {
                        margin-right: 20px;
                    }
                }
                .quarterMessage_box{
                    width:100%;
                    height: auto;
                    margin-top: 36px;
                    /deep/ .demo-ruleForm{
                        .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:after{
                            content: '*';
                            color: #f56c6c;
                            margin-left: 4px;
                        }
                        .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
                            content: '';
                        }
                        .el-form-item{
                            width: 50%;
                            float: left;
                            margin-bottom: 0px;
                            .el-form-item__content{
                                    // width: 50% !important;
                                    line-height: 30px;
                                    text-align: center;
                                    margin-left: 50%!important;
                                .shengcheng{
                                    // width: 77%;
                                    
                                }
                                /deep/ .el-button{
                                    position: absolute;
                                    top: 5px;
                                    right: 5px;
                                }
                                .save{
                                    top: -40px;
                                 left: 0px;
                                }
                                .danwei{
                                    // width: 83%!important;
                                    
                                }
                                .ping{
                                    position: absolute;
                                    top: 5px;
                                    right: 5px;
                                }
                                .address{
                                    width:100%;
                                }
                                .el-form-item{
                                    width:100%;
                                }
                                .el-select{
                                    width: 100%;
                                }
                                .el-input__icon{
                                        line-height: 30px!important;
                                    }
                                .el-form-item__content{
                                    margin-left:0px !important;
                                    
                                    
                                }
                                /deep/ .el-input{
                                         border-right: 1px solid rgb(222, 230, 249);
                                border-bottom: 1px solid rgb(222, 230, 249);
                                    }
                                .el-input__inner{
                                    height: 38px;
                                    line-height: 38px;
                                    border:none;
                                }
                                .el-textarea{
                                     border-right: 1px solid rgb(222, 230, 249);
                                border-bottom: 1px solid rgb(222, 230, 249);
                                border-top: 1px solid rgb(222, 230, 249);
                                    textarea{
                                        border:none;
                                    }
                                    
                                }
                                .el-form-item__error{
                                    display: none;
                                }
                            }
                            .el-form-item__label{
                                width:50%!important; 
                                line-height: 38px;
                                background: rgb(240, 248, 255);
                                text-align: center;
                                border-right: 1px solid rgb(222, 230, 249);
                                border-bottom: 1px solid rgb(222, 230, 249);
                            }
                        }
                        .readyOnly{
                            .el-input__inner{
                                background: rgb(245, 247, 250);
                            }
                        }
                        .width{
                            width: 100%;
                            .el-form-item__label{
                                width: 25% !important;
                            }
                            .el-form-item__content{
                                width:75% !important;
                                margin-left: 25% !important;
                            }
                        }
                        .xiangqing{
                            .el-form-item__label{
                                line-height: 53px !important;
                            }
                        }
                        .button{
                            .el-form-item__content{
                                margin-left:0px !important;
                                float:none !important;
                            }
                            
                        }
                    }
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
                                input{
                                    border:1px solid #ccc;
                                    height: 24px;
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
                                    background: #169bd5;
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
        }
</style>
