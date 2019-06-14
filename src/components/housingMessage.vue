<template>
    <div id="housingMessage">
        <!-- 右侧头部tab切换 -->
            <h2  style="display:none">
                <p :class="classB"> <router-link :to="{path: '/housinginformation', query:{}}"><span>房源信息录入</span></router-link><span class="close_tab"></span></p>
                <p :class="classA" style=""><span>{{nameTitle}}</span><router-link :to="{path: '/housinginformation', query:{}}"><span class="close_tab"></span></router-link></p>
            </h2>
        <!-- 右侧头部tab切换结束 -->
        <div class="content clearfix">
           
            <div class="content_d clearfix">
                <h2>
                    <p :class="(show? '':'noactive')"><span class="tab_name" @click="fanhui">房源信息</span><span class="close_img"></span></p>
                    <p v-if="!show"><span class="tab_name">{{nameTitle}}</span><span class="close_img"></span></p>
                </h2>
                <div class="changci_content_left" v-if="show">
                    <!-- 搜索框开始 -->
                    <!-- 价格：{{price}}--{{noPop}} -->
                    <div class="search_box">
                        <ul class="search clearfix">
                            <li style="width:25%">
                                <span>栋&nbsp;&nbsp;名&nbsp;&nbsp;称</span>
                                <div style="width:65%;">
                                    <el-input v-model="form.buildingName" placeholder="请输入内容" clearable></el-input>
                                </div>
                            </li>
                            <li style="width:25%">
                                <span>房产来源</span>
                                <div style="width:65%;">
                                    <template>
                                        <el-select v-model="form.houseRecource" clearable>
                                            <el-option v-for="item in options.source" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:25%">
                                <span>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>
                                <div style="width:65%;">
                                <template>
                                        <el-select v-model="form.houseType" clearable>
                                            <el-option v-for="item in options.apartment" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:25%">
                                <span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</span>
                                <div style="width:65%;">
                                <template>
                                        <el-select v-model="form.orientation" clearable>
                                            <el-option v-for="item in options.orientation" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:25%">
                                <span>建筑面积</span>
                                <div style="width:65%;">
                                    <div>
                                        <el-input v-model="form.floorNumber" placeholder="请输入内容" clearable></el-input>
                                    </div>
                                </div>
                            </li>
                            <li style="width:26%">
                                <span>房屋用途</span>
                                <div style="width:63%;">
                                    <template>
                                        <el-select v-model="form.houseFunction" clearable>
                                            <el-option v-for="item in options.houesUser" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </div>
                            </li>
                            <li style="width:25%">
                                <el-button type="primary" size="mini" @click="queryHousList">查询</el-button>
                                <el-button type="primary" size="mini" >导出</el-button>
                            </li>
                        </ul>
                    </div>
                    <!-- 搜索框结束 -->
                    <p>
                        <el-button type="primary" size="mini" @click="dialogFormVisible2 = true">对接测绘数据</el-button>
                        <el-button type="primary" size="mini" @click="dialogFormVisible = true">房源批量导入</el-button>
                        <el-button type="primary" size="mini" @click="dialogFormVisible1 = true" class="button_right delete">删除</el-button>
                        <el-button type="primary" size="mini" @click="add" class="button_right add">新增</el-button>
                       
                    <div class="quarterMessage_box ">
                        <template>
                           
                            <el-table ref="multipleTable" :data="houseList" tooltip-effect="dark" style="width: 100%"
                                @selection-change="handleSelectionChange" border 
                                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                                @row-dblclick="doubleClick">
                                <el-table-column type="selection" width="40"> </el-table-column>
                                <el-table-column label="序号" width="50" type="index"></el-table-column>
                                <el-table-column prop="buildName" label="栋名称" width="80"></el-table-column>
                                <el-table-column prop="houseNo" label="房号" width="60"></el-table-column>
                                <el-table-column prop="sourceName" label="房屋来源" width="120"></el-table-column>
                                <el-table-column prop="typeName" label="户型" width="120"></el-table-column>
                                <el-table-column prop="orientationName" label="朝向" width="60"></el-table-column>
                                <el-table-column prop="coveredArea" label="建筑面积" width="80"></el-table-column>
                                <el-table-column prop="function" label="房屋用途" width="120"></el-table-column>
                                <el-table-column prop="" label="操作" show-overflow-tooltip>
                                    <template><span @click="copyFormVisible = false" style="color:#409eff;">复制</span></template>
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
                <div class="changci_content_left" v-else>
                    <div class="quarterMessage_box margin_box">
                        <el-form :model="houseInfoPreDTO" :rules="rules" ref="houseInfoPreDTO" label-width="100px" class="demo-ruleForm">
                        <el-form-item class="width button">
                            <el-button type="primary" @click="submitForm('houseInfoPreDTO')" size="mini">保存</el-button>
                        </el-form-item>
                        <div style="border-top:1px solid rgb(222, 230, 249);border-left:1px solid rgb(222, 230, 249);" class="clearfix">
                        <el-form-item label="小区名称" prop="districtName">
                            <el-input v-model="houseInfoPreDTO.districtName" placeholder="请输入小区名称"></el-input>
                        </el-form-item>
                        <el-form-item label="栋名称" prop="buildName">
                            <el-select v-model="houseInfoPreDTO.buildName" placeholder="请选择栋">
                                <el-option label="A栋" value="shanghai"></el-option>
                                <el-option label="B栋" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="房号" prop="houseNo">
                            <el-input v-model="houseInfoPreDTO.houseNo"></el-input>
                        </el-form-item>
                        <el-form-item label="不动产权号" prop="rightOverImmovablesId">
                            <el-input v-model="houseInfoPreDTO.rightOverImmovablesId"></el-input>
                        </el-form-item>
                        <el-form-item label="所在单元" prop="unit">
                            <el-input v-model="houseInfoPreDTO.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="所在楼层" prop="floorNo">
                            <el-select v-model="houseInfoPreDTO.floorNo" placeholder="请选择所在楼层">
                                <el-option label="1" value="shanghai"></el-option>
                                <el-option label="2" value="beijing"></el-option>
                                <el-option label="3" value="beijing1"></el-option>
                                <el-option label="4" value="beijing2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="产权单位" prop="propertyRight">
                            <el-input v-model="houseInfoPreDTO.propertyRight"></el-input>
                        </el-form-item>
                        <el-form-item label="房屋用途" prop="function">
                            <el-select v-model="houseInfoPreDTO.function" placeholder="请选择房屋用途">
                                <el-option v-for="item in options.houesUser" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="房屋性质" prop="natureName">
                            <el-select v-model="houseInfoPreDTO.natureName" placeholder="请选择房屋性质">
                                <el-option label="公共租赁住房" value="公共租赁住房"></el-option>
                                <el-option label="安居型商品房" value="安居型商品房"></el-option>
                                <el-option label="人才住房" value="人才住房"></el-option>
                                <el-option label="存量安居房" value="存量安居房"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="户型" prop="typeName">
                            <el-select v-model="houseInfoPreDTO.typeName" placeholder="请选择房屋户型">
                                <el-option v-for="(item , index) in options.apartment" :key="item.value" :label="item.label" :value="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="朝向" prop="orientation">
                            <el-select v-model="houseInfoPreDTO.orientationName" placeholder="请选择房屋朝向">
                                <el-option v-for="item in options.orientation" :key="item.value" :label="item.label" :value="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="平台" prop="terrace">
                            <el-select v-model="houseInfoPreDTO.terrace" placeholder="请选择房屋平台">
                                <el-option v-for="item in options.queryTerrace" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否有架空层" prop="innerFloor">
                            
                            <el-select v-model="houseInfoPreDTO.innerFloor" placeholder="请选择是否有架空层">
                                <el-option label="是" value="true"></el-option>
                                <el-option label="否" value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="建筑面积" prop="coveredArea">
                            <el-input v-model="houseInfoPreDTO.coveredArea" ></el-input>
                        </el-form-item>
                        <el-form-item label="分摊面积" prop="completionShareArea">
                            <el-input v-model="houseInfoPreDTO.completionShareArea"></el-input>
                        </el-form-item>
                        <el-form-item label="套内面积" prop="completionIndoorArea">
                            <el-input v-model="houseInfoPreDTO.completionIndoorArea"></el-input>
                        </el-form-item>
                        <el-form-item label="竣工面积" prop="completionArea">
                            <el-input v-model="houseInfoPreDTO.completionArea"></el-input>
                        </el-form-item>
                        <el-form-item label="装修类型" prop="decorationType">
                            <el-select v-model="houseInfoPreDTO.decorationType" placeholder="请选择装修类型">
                                <el-option label="是" value="是"></el-option>
                                <el-option label="否" value="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="房屋来源" prop="sourceName">
                            <el-select v-model="houseInfoPreDTO.sourceName" placeholder="请选择房屋来源">
                                <el-option v-for="item in options.source" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="房屋归属" prop="houseBelong">
                            <el-select v-model="houseInfoPreDTO.houseBelong" placeholder="请选择房屋来源">
                                <el-option v-for="item in options.houseBelong" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="房屋详细说明" prop="specification" class="width xiangqing">
                            <el-input type="textarea" v-model="houseInfoPreDTO.specification"></el-input>
                        </el-form-item>
                        </div>
                    </el-form>

                    </div>
                </div>
            </div>
        </div>
        <!-- 对接测绘数据弹窗 -->
        <el-dialog title="对接测绘数据" :visible.sync="dialogFormVisible" width="50%">
            <el-form :model="form">
            <p>请选择需要上传的文件</p>
            <!-- <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList"
            @on-success="chenggong(response, file, fileList)">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                
                @on-success="chenggong(response, file, fileList)">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            </el-form>
            <div class="quarterMessage_box">
                <table class="messagetable" cellspacing="0px" style="width:100%;">
                    <colgroup>
                    <col width="33%">
                    <col width="33%">
                    <col width="33%">
                    </colgroup>
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <td>文件名</td>
                        <td>文件大小</td>
                        <td>上传时间</td>
                    </tr>
                    <tr>
                        <td >1</td>
                        <td>A栋</td>
                        <td>1101</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="queding">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 复制弹窗 -->
        <el-dialog title="复制栋" :visible.sync="copyFormVisible" width="50%" top="15vh" id="copyFormVisible">
            <div class="quarterMessage_box">
                <table class="messagetable" cellspacing="0px" style="width:100%;">
                    <colgroup>
                        <col width="15%">
                        <col width="85%">
                    </colgroup>
                    <thead>
                    </thead>
                    <tbody>
                    <tr>
                        <td>复制来源</td>
                        <td class="bg">金领家园A栋</td>
                    </tr>
                    <tr>
                        <td rowspan="2">复制到</td>
                        <td>
                            <div>
                                <div class="left">栋号</div>
                                <div class="right">
                                    <input type="text">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <div class="left">位数</div>
                                <div class="right">
                                    <input type="text">
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>其他</td>
                        <td style="text-align: left;">
                            <input type="radio">复制房源<br>
                            <input type="radio">保留原有资料
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="copyFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="copyTung">确 定</el-button>
            </div>
            <div class="title">
                <h5>温情提示</h5>
                <p>1、若需要连续复制多栋，请用半角冒号分隔。例如您需要复制从A栋到M栋（合计13栋）产房信息，在复制到栋号中录入A：M。</p>
                <p>2、若栋号位数为多位时，请在位数中录入您需要的位数。位数不能大于10。</p>
            </div>
        </el-dialog>
        <!-- 删除确认弹窗 -->
        <el-dialog title="删除栋" :visible.sync="dialogFormVisible1" width="30%" top="35vh" id="delete_box">
            <el-form :model="form">
            <p>确定删除房源吗？</p>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="deleteHouse" size="mini">确 定</el-button>
                <el-button @click="dialogFormVisible1 = false" type="primary" size="mini">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="对接测绘数据" :visible.sync="dialogFormVisible2" width="70%">
            <el-form :model="form">
            <p>请输入房间号进行查询</p>
            <div class="search_input"><input type="text" v-model="houseNo"><el-button type="primary" size="small">查 询</el-button></div>
            </el-form>
            <div class="quarterMessage_box">
                <template>      
                    <el-table ref="multipleTable" :data="houseList" tooltip-effect="dark" style="width: 100%"
                        @selection-change="handleSelectionChange1" border :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                        <el-table-column type="selection" width="40"> </el-table-column>
                        <el-table-column label="序号" width="50" type="index"></el-table-column>
                        <el-table-column prop="buildName" label="栋名称" width="80"></el-table-column>
                        <el-table-column prop="houseNo" label="房号" width="60"></el-table-column>
                        <el-table-column prop="sourceName" label="房屋来源" width="120"></el-table-column>
                        <el-table-column prop="typeName" label="户型" width="120"></el-table-column>
                        <el-table-column prop="orientationName" label="朝向" width="80"></el-table-column>
                        <el-table-column prop="coveredArea" label="建筑面积" width="80"></el-table-column>
                        <el-table-column prop="function" label="房屋用途" ></el-table-column>
                        
                    </el-table>
                </template>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import {tool,requset} from '../../static/js/tool'
import http from '@/api/common.js'

export default {
    name:'housingmessage',
    data() {
      return {
        multipleSelection: [],
        multipleSelection1: [],
        classA:'active',
        classB:'moren',
        nameTitle:'新增小区',
        houseNo:'',
        rules:tool.rules4,
        houseGuids:[],//删除的房源数组
        houseList:[],
        orientation:'1',//朝向
        buildingName:'',//栋名称
        districtGuid:'',//小区标识
        houseCoveredAreaBegin:'',//建筑面积开始
        houseCoveredAreaEnd:'',//建筑面积结束
        houseFunction:'',//房屋用途
        houseRecource:'',//房屋来源
        houseType:'',//户型
        pageIndex:'',//起始页
        pageSize:'',//每页显示的条
        fileList: [],
        
        pageObj:{
            currentPage4: 1,
            pageSize:10,
            total:40
        },
      
        show:true,
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        copyFormVisible:false,
        form:{
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
        houseInfoPreDTO:{
            allocationRight: "string",//分配权
            area: "string",//行政区
            assetType: "",//资产类型
            bdcdyma: "",//不动产单元代码
            buildGuid: "string",//幢标识
            buildName: "",//栋名称
            busy: true,//是否被占用
            closed: true,//是否已经被查封
            completionArea: '',//竣工面积
            completionIndoorArea: '',//竣工套内面积
            completionShareArea: '',//竣工公摊面积
            coveredArea: '',//建筑面积
            currentProperty: "string",//当前属性
            currentUseTime: "2019-05-18T15:35:39.304Z",//此次开始使用时间
            decorationType: "",//装修类型
            districtGuid: "string",//小区标识
            districtName: "",//小区名称
            districtParentGuid: "string",//大区标识
            firstUseTime: "2019-05-18T15:35:39.304Z",//第一次使用时间
            floorNo: "",//楼层号
            function: "",//住宅功能
            guid: "",//唯一标识
            houseId: "",//房屋编号
            houseNo: "",//房号
            indoorArea: "",//室内面积、套内面积
            innerFloor: '',//是否有架空层
            locked: true,//是否被锁定
            maintained: true,//被维修
            manageRight: "string",//管理权
            nature: "",//房屋性质
            natureName: "",//房屋性质名称
            operationalRight: "string",//运维权
            orientation: '',//朝向
            orientationName: "",////朝向名
            originalProperty: "string",//原始属性、最初属性
            outStockReason: "string",//出库原因
            postAddress: "string",//邮政地址
            projectNo: "string",//项目编号
            propertyRight: "",//产权
            reportGuid: "string",//上报标识
            residentialPoolArea: '',//公摊面积、分摊面积
            rightOverImmovablesId: "",//不动产权号
            serialNo: "string",//网格编码
            signatoryRight: "string",//签约权
            situational: true,//问题房屋标记 true:问题房屋，false:不是问题房屋
            situationalRemark: "string",//问题房屋备注
            source: "",//房产来源
            sourceName: "string",//房产来源名称
            specification: "房屋说明",//房屋说明
            state: 0,//房屋状态
            stateName: "",////房屋状态名称
            street: "string",//街道
            terrace: "",//平台
            type: '',//户型
            typeName: "",//户型名称
            unit: "",//单元
            unitGuid: "string",//单元标识
            useState: "string",//使用状态
            useTime: 0//累计使用时间
            //房屋归属字段没找到
        },
        options: {
            source:[],
            user1:[{
                value: '选项11',
                label: '住宅'
                }, {
                value: '选项21',
                label: '商铺'
                }, {
                value: '选项31',
                label: '设施'
                }, {
                value: '选项41',
                label: '未填报'
                }],
            apartment:[],
            orientation:[],
            houseBelong:[],
            queryTerrace:[],
            houesUser:[]
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
            this.pageObj.pageSize = val;
            this.getHousingMessageList(this.pageObj.currentPage4,val);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
             this.pageObj.currentPage4 = val;
            this.getHousingMessageList(val,this.pageObj.pageSize);
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log('成功');
                console.log(this.houseInfoPreDTO)
                this.addHouse();
                //this.addAuarters()
            } else {
                this.open('保存失败，请确认信息是否填写完整！');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            console.log(files);
            console.log(fileList);
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        chenggong(response, file, fileList){
            console.log(fileList);
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        handleSelectionChange1(val) {
            console.log(val);
            this.multipleSelection1 = val;
        },
        //提示框
         open(title) {
            this.$message(title);
        },
        
        //复制栋
        copyTung(){
            var that = this;
            let data = {
                buildingGuid:'1',
                buildingNo:'1',
                copyHouse:true,
                num:'2',
                saveOldDate:true
            }
            http.copyTung(data).then(res => {
                console.log(res);
                // this.copyFormVisible = false;
                // if(res.status == 'success') {
                //     that.open('新增房源成功');
                // }else{
                //     that.open('新增房源失败');
                // }
                 //that.options.houesUser = tool.changeData(res);
            });
        },
        //新增房源
        addHouse(){
            var that = this;
            let houseInfoPreDTO = that.houseInfoPreDTO;
            if(houseInfoPreDTO.innerFloor == "是") {
                houseInfoPreDTO.innerFloor = "true";
            }else if(houseInfoPreDTO.innerFloor == "否") {
                 houseInfoPreDTO.innerFloor = "false"
            }
            http.addHouse(houseInfoPreDTO).then(res => {
                console.log(res);
                    that.open('保存房源成功');
                 //that.options.houesUser = tool.changeData(res);
            });
        },
        //获取房屋用途可选项
        getHouesUser(){
             var that = this;
            let params = {
                buildPurpose:1
            };
            http.getTungUser(params).then(res => {
                 that.options.houesUser = tool.changeData(res);
            });
        },
        //平台下拉
        getQueryTerrace(){
            var that = this;
            let params = {
                teaace:1
            };
            http.getQueryTerrace(params).then(res => {
                 that.options.queryTerrace = tool.changeData(res);
            });
        },
        //获取房屋归属
        getHouseBelong(){
            var that = this;
            let params = {
                houseBelong:1
            };
            http.getHouseBelong(params).then(res => {
                 that.options.houseBelong = tool.changeData(res);
            });
        },
        //删除房源
        deleteHouse(){
            var that = this;
            that.dialogFormVisible1 = false;
            let arr = [];
            if(that.multipleSelection.length != 0) {
                that.multipleSelection.forEach(function (ele,index) {
                    arr.push(ele.houseNo);
                })
                let houseGuids = arr;
                http.deleteHouse(houseGuids).then(res => {
                    if(res.status == "success") {
                        that.open('删除房源成功！')
                    }else{
                        that.open('删除房源失败！')
                    }
                    that.checkHousList(1,10)
                });
            }else{
                that.open('请选择房源');
            }

            
        },

        //获取朝向
        getOrientation(){
            var that = this;
            let params = {
                orientation:1
            };
            http.getOrientation(params).then(res => {
                console.log(res);
                 that.options.orientation = tool.changeData(res);
            });
        },
        ////获取房屋来源
        getSource(){
             var that = this;
            let params = {
                houseRecourceName:1
            };
            http.getSource(params).then(res => {
                 that.options.source = tool.changeData(res);
            });
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
        //点击查询获取房源信息列表
        queryHousList(){
            this.checkHousList(1,10);
            this.open('查询房源成功');
        },
        //查询房源信息列表
        checkHousList(pageIndex,pageSize){
            var that = this;
            that.getHousingMessageList(pageIndex,pageSize);
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
                that.houseList = res.content;
                that.pageObj.total = res.totalPages;
                that.pageObj.pageSize = res.size;
                that.pageObj.currentPage4 = res.number + 1;
            });
            
        },
        //点击确定
        queding(){
            this.dialogFormVisible = false;
            //调整公共状态
            this.$store.commit('is_pop');
            //重定向页面
           
        },
        //获取各种下拉框的函数
        getOptions(optionsName,optionsData) {
            var that = this;
            that.options[optionsName] = optionsData;
        },
   
        copyqueding(){
            this.copyFormVisible = false;
        },
        add(){
            for(var n in  this.houseInfoPreDTO){
                this.houseInfoPreDTO[n] = "";  
            } 
             this.nameTitle = "新增小区";
             this.houseInfoPreDTO.districtName = this.quartersObj.name;
             this.show = false;
        },
        // 双击查看房屋详情
        doubleClick(row){
            console.log(row);
            this.houseInfoPreDTO = row;
            this.nameTitle = row.districtName
            if(row.innerFloor) {
                this.houseInfoPreDTO.innerFloor = '是'
            }else {
                 this.houseInfoPreDTO.innerFloor = '否'
            }
            this.show = false;
        },
        fanhui(){
            this.show = true;
        }
    },
    created(){
        //获取房屋来源
        this.getSource();
       //查询户型
       this.getApartment();
        //查询朝向
        this.getOrientation();
        //获取房屋归属
        this.getHouseBelong();
        //平台下拉
        this.getQueryTerrace();
        //获取房屋用途可选项
        this.getHouesUser();
        //获取房源信息列表
        this.getHousingMessageList(this.pageObj.currentPage4,this.pageObj.pageSize);
        this.houseInfoPreDTO.districtName = this.quartersObj.name;
     },
     computed:{
     ...mapState({
        quartersObj: state => state.quartersObj,
        tungObj:state => state.tungObj,
     })
   },
    
  };
</script>
<style lang="scss" scoped>
#housingMessage{
    width:100%;
    
  
    .content{
        width: calc(100% - 239px);
        float: left;
        margin: 0 auto;
        margin-left:15px;
    }
    .content_d{
        float: left;
        margin: 0 auto;
        margin-top: 20px;
        width: 100%;
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
            p.noactive{
                background:rgba(247, 247, 247, 1);
                border-top: none;
                span{
                    color:rgba(153, 153, 153, 1);
                    font-weight: 400;
                }
            }
        }
    }
     
 .changci_content_left {
    float: left;
    background: #fff;
    box-sizing: border-box;
    padding: 0px 18px;
    min-height: 491px;
    padding-bottom: 20px;
    width: 100%;
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
                    width:48px;

                }
                div{
                    float: left;
                    /deep/ .el-input .el-input__inner{
                        height: 30px;
                        line-height: 30px;
                    }
                    .homePage /deep/ .el-date-picker {
                        padding: 0;
                        background: red;
                    }
                    .el-select /deep/ .el-input{
                            height: 35px;
                    }
                }
            }
        }
    }
    //搜索框样式结束
    .margin_box {
        margin-top: 50px;
    }
    .quarterMessage_box{
        /deep/ .el-table {
            th {
                padding:6px 0;
            }
            .cell{
                text-align: center;
            }
        }
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
                        top: -36px;
                        left: 5px;
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
                             td.copy{
                                color:green;
                                text-decoration:underline;
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
                    .upload-demo{
                        width: 40%;
                        margin:auto;
                        .el-upload__tip{
                            float: left;
                        }
                    }
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
    #copyFormVisible{
        td>div{
            height: 36px;
            line-height: 36px;
            box-sizing: border-box;
            padding:2px;
            .left{
                float: left;
                height: 100%;
                line-height: 32px;
            }
            .right{
                float:left;
                height: 100%;
                line-height: 32px;
                width: 90%;
                input{
                    box-sizing: border-box;
                    border:1px solid #ccc;
                    height: 28px;
                    width:90%;
                }
            }
        }
    }
    #delete_box{
        .el-button{
            padding: 6px 20px;
        }
    }

}
</style>
