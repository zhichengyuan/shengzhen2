<template>
<!-- 栋信息和新增栋模板 -->
    <div id="tungMessage">
        <!-- 右侧头部tab切换 -->
            <h2 style="display:none">
                <p :class="classB"> <router-link :to="{path: '/housinginformation', query:{}}"><span>房源信息录入</span></router-link><span class="close_tab"></span></p>
                <p :class="classA" style=""><span>新增小区</span><router-link :to="{path: '/housinginformation', query:{}}"><span class="close_tab"></span></router-link></p>
            </h2>
        <!-- 右侧头部tab切换结束 -->
        <div class="content_d">
            <h2>
                <p :class="(show == 1 ? 'active' : 'noactive')"><span class="tab_name" @click="fanhui" >栋信息</span><span class="close_img"></span></p><p v-if="show == 2"><span class="tab_name">新增栋</span><span class="close_img"></span></p><p v-if="show == 3"><span class="tab_name">{{tungName}}</span><span class="close_img"></span></p>
            </h2>
            <div class="changci_content_left" v-if="show == 1">
                <!-- 搜索框开始 -->
                <!-- 价格：{{price}}--{{noPop}} -->
                <div class="search_box">
                    <ul class="search clearfix">
                        <li style="width:25%">
                            <span>栋&nbsp;&nbsp;&nbsp;&nbsp;号</span>
                            <div style="width:70%;">
                                <el-input v-model="form.code" placeholder="请输入内容" clearable></el-input>
                            </div>
                        </li>
                        <li style="width:25%">
                            <span>栋名称</span>
                            <div style="width:70%;">
                                <div>
                                    <el-input v-model="form.name" placeholder="请输入内容" clearable></el-input>
                                </div>
                            </div>
                        </li>
                        <li style="width:25%">
                            <span>单元数</span>
                            <div style="width:70%;">
                                <div>
                                    <el-input v-model="form.unitCount" placeholder="请输入内容" clearable></el-input>
                                </div>
                            </div>
                        </li>
                        <li style="width:25%">
                            <span>宗地号</span>
                            <div style="width:70%;">
                                <div>
                                    <el-input v-model="form.landNo" placeholder="请输入内容" clearable></el-input>
                                </div>
                            </div>
                        </li>
                        <li style="width:25%">
                            <span>楼层数</span>
                            <div style="width:70%;">
                                <div>
                                    <el-input v-model="form.floorCount" placeholder="请输入内容" clearable></el-input>
                                </div>
                            </div>
                        </li>
                        <li style="width:26%">
                            <span>栋用途</span>
                            <div style="width:70%;">
                                <template>
                                    <el-select v-model="form.buildPurpose" clearable>
                                        <el-option v-for="item in options.tungUser" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </template>
                            </div>
                        </li>
                        <li style="width:25%">
                            <el-button type="primary" size="mini"  @click="queryTungList">查询</el-button>
                            <el-button type="primary" size="mini" >导出 </el-button>
                        </li>
                    </ul>
                </div>
                <!-- 搜索框结束 -->
                <p>
                    <el-button type="primary" size="mini" @click="dialogFormVisible = true;">对接测绘数据 </el-button>
                    <el-button type="primary" size="mini" class="button_right delete" @click="dialogFormVisible1 = true">删除 </el-button>
                    <el-button type="primary" size="mini" class="button_right add" @click="add">新增 </el-button>
                </p>
                <div class="quarterMessage_box ">
                    <template>
                        <el-table ref="multipleTable" :data="tungListData" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange" @row-dblclick="doubleClick" border :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                            <el-table-column type="selection" width="55"> </el-table-column>
                            <el-table-column label="序号" width="60" type="index"></el-table-column>
                            <el-table-column prop="code" label="栋号" width="60"></el-table-column>
                            <el-table-column prop="name" label="栋名称" width="80"></el-table-column>
                            <el-table-column prop="unitCount" label="单元数" width="80"></el-table-column>
                            <el-table-column prop="landNo" label="宗地号" width="120"></el-table-column>
                            <el-table-column prop="floorCount" label="楼层数" width="80"></el-table-column>
                            <el-table-column prop="skirtFloorCount" label="裙楼层数" width="80"></el-table-column>
                            <el-table-column prop="floorCount" label="地下层数" width="80"></el-table-column>
                            <el-table-column prop="buildPurpose" label="栋用途" width="80"></el-table-column>
                            <el-table-column prop="" label="操作" show-overflow-tooltip >
                                 <template><span @click="copyFormVisible = true" style="color:#409eff;">复制</span></template>
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
            <div class="changci_content_left" v-if="show == 2">
                <div class="quarterMessage_box margin_box">
                    <el-form :model="dto" :rules="rules" ref="dto" label-width="100px" class="demo-ruleForm">
                        <el-form-item class="width button">
                            <el-button type="primary" @click="submitForm('dto')" size="mini">保存</el-button>
                        </el-form-item>
                         <div style="border-top:1px solid rgb(222, 230, 249);border-left:1px solid rgb(222, 230, 249);" class="clearfix">
                        <el-form-item label="小区编号" prop="regionDistrictGuid" class="readyOnly ">
                            <el-input v-model="dto.regionDistrictGuid" placeholder="请输入小区编号" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="宗地号" prop="landNo" class="readyOnly ">
                            <el-input v-model="dto.landNo" placeholder="选择大区后自动生成" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="栋号" prop="code">
                            <el-input v-model="dto.code"></el-input>
                        </el-form-item>
                        <el-form-item label="栋名称" prop="name">
                            <el-input v-model="dto.name"></el-input>
                        </el-form-item>
                        <el-form-item label="栋用途" prop="buildPurpose">
                            <el-select v-model="dto.buildPurpose" placeholder="请选择栋用途">
                                <el-option v-for="item in options.tungUser" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单元数" prop="unitCount">
                            <el-input v-model="dto.unitCount"></el-input>
                        </el-form-item>
                        <el-form-item label="总楼层数" prop="floorCount">
                            <el-input v-model="dto.floorCount" placeholder="请输入总楼层数"></el-input>
                            
                        </el-form-item>
                        <el-form-item label="裙楼层数" prop="skirtFloorCount">
                            <el-input v-model="dto.skirtFloorCount"></el-input>
                        </el-form-item>
                        <el-form-item label="地下层数" prop="subFloorCount">
                            <el-input v-model="dto.subFloorCount"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑结构" prop="construction">
                            <el-select v-model="dto.construction" placeholder="请选择建筑结构">
                                <el-option v-for="item in options.structure" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="建筑基础" prop="buildBasic">
                            <el-select v-model="dto.buildBasic" placeholder="请选择建筑基础">
                                <el-option v-for="item in options.buildingBasics" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="建筑面积" prop="coveredArea">
                            <el-input v-model="dto.coveredArea" class="danwei"></el-input>
                             <span class="ping">平方米</span>
                        </el-form-item>
                        <el-form-item label="基层面积" prop="baseArea">
                            <el-input v-model="dto.baseArea" class="danwei"></el-input>
                            <span class="ping">平方米</span>
                        </el-form-item>
                        <el-form-item label="开工时间" required>
                            <el-form-item prop="startConstructionTime">
                                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker> -->
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dto.startConstructionTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="竣工时间" required>
                            <el-form-item prop="finishConstructionTime">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dto.finishConstructionTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="交付使用时间" required>
                            <el-form-item prop="deliveryTime">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dto.deliveryTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="底层用途" prop="groundFloorUse">
                            <el-select v-model="dto.groundFloorUse" placeholder="请选择底层用途">
                                <el-option v-for="item in options.bottomUse" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否带电梯" prop="elevator">
                            <el-select v-model="dto.elevator" placeholder="请选择是否带电梯">
                                <el-option v-for="item in options.isElevator" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="栋归属" prop="buildingInfoMaintainBelong">
                            <el-select v-model="dto.buildingInfoMaintainBelong" placeholder="请选择栋归属">
                                <el-option v-for="item in options.tungAscription" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        
                      
                        <el-form-item label="栋详细说明" prop="remark" class="width xiangqing">
                            <el-input type="textarea" v-model="dto.remark"></el-input>
                        </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
             <div class="changci_content_left" v-if="show == 3">
            
                <div class="quarterMessage_box margin_box">
                    <el-form :model="dtoMessage" :rules="rules2" ref="dtoMessage" label-width="100px" class="demo-ruleForm">
                        <el-form-item class="width button">
                            <el-button type="primary" @click="submitForm('dtoMessage')" size="mini">保存</el-button>
                        
                        </el-form-item>
                         <div style="border-top:1px solid rgb(222, 230, 249);border-left:1px solid rgb(222, 230, 249);" class="clearfix">
                        <el-form-item label="大区编号" prop="regionDistrictGuid">
                            <el-input v-model="dtoMessage.regionDistrictGuid" placeholder="请输入大区编号"></el-input>
                        </el-form-item>
                        <el-form-item label="宗地号" prop="landNo">
                            <el-input v-model="dtoMessage.landNo" placeholder="选择大区后自动生成"></el-input>
                        </el-form-item>
                        <el-form-item label="栋号" prop="code">
                            <el-input v-model="dtoMessage.code"></el-input>
                        </el-form-item>
                        <el-form-item label="栋名称" prop="name">
                            <el-input v-model="dtoMessage.name"></el-input>
                        </el-form-item>
                        <el-form-item label="栋用途" prop="buildPurpose">
                            <el-select v-model="dtoMessage.buildPurpose" placeholder="请选择栋用途">
                                <el-option v-for="item in options.tungUser" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单元数" prop="unitCount">
                            <el-input v-model="dtoMessage.unitCount"></el-input>
                        </el-form-item>
                        <el-form-item label="总楼层数" prop="floorCount">
                            <el-input v-model="dtoMessage.floorCount" placeholder="请输入总楼层数"></el-input>
                            
                        </el-form-item>
                        <el-form-item label="裙楼层数" prop="skirtFloorCount">
                            <el-input v-model="dtoMessage.skirtFloorCount"></el-input>
                        </el-form-item>
                        <el-form-item label="地下层数" prop="subFloorCount">
                            <el-input v-model="dtoMessage.subFloorCount"></el-input>
                        </el-form-item>
                        <el-form-item label="建筑结构" prop="construction">
                            <el-select v-model="dtoMessage.construction" placeholder="请选择建筑结构">
                                <el-option v-for="item in options.structure" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="建筑基础" prop="buildBasic">
                            <el-select v-model="dtoMessage.buildBasic" placeholder="请选择建筑基础">
                                <el-option v-for="item in options.buildingBasics" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="建筑面积" prop="coveredArea">
                            <el-input v-model="dtoMessage.coveredArea"></el-input>
                        </el-form-item>
                        <el-form-item label="基层面积" prop="baseArea">
                            <el-input v-model="dtoMessage.baseArea"></el-input>
                        </el-form-item>
                        <el-form-item label="开工时间" required>
                            <el-form-item prop="startConstructionTime">
                                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker> -->
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dtoMessage.startConstructionTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="竣工时间" required>
                            <el-form-item prop="finishConstructionTime">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dtoMessage.finishConstructionTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="交付使用时间" required>
                            <el-form-item prop="deliveryTime">
                                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="dtoMessage.deliveryTime" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="底层用途" prop="groundFloorUse">
                            <el-select v-model="dtoMessage.groundFloorUse" placeholder="请选择底层用途">
                                <el-option v-for="item in options.bottomUse" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否带电梯" prop="elevator">
                            <el-select v-model="dtoMessage.elevator" placeholder="请选择是否带电梯">
                                <el-option v-for="item in options.isElevator" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="栋归属" prop="buildingInfoMaintainBelong">
                            <el-select v-model="dtoMessage.buildingInfoMaintainBelong" placeholder="请选择栋归属">
                                <el-option v-for="item in options.tungAscription" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="栋详细说明" prop="remark" class="width xiangqing">
                            <el-input type="textarea" v-model="dtoMessage.remark"></el-input>
                        </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <el-dialog title="对接测绘数据" :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="form">
            <p>请输入建筑物ID进行查询</p>
            <div class="search_input"><input type="text" v-model="bullidID"><el-button type="primary" size="small" @click="query">查 询</el-button></div>
            </el-form>
            <div class="quarterMessage_box">
                <template> 
                    <el-table :data="tungList" style="width: 100%" border
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                        <el-table-column prop="buildID" label="建筑物ID" width="80"></el-table-column>
                        <el-table-column prop="riseId" label="栋号" width="120"></el-table-column>
                        <el-table-column prop="name" label="栋名称" width="120"></el-table-column>
                        <el-table-column prop="landNo" label="宗地号" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="floorCount" label="楼层号" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="skirtFloorCount" label="裙楼层数" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="subFloorCount" label="底下层数" width="120"></el-table-column>
                        <el-table-column prop="coveredArea" label="建筑面积" show-overflow-tooltip> </el-table-column>
                    </el-table>
                </template>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addBuilding2">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 复制弹窗 -->
        <el-dialog title="复制栋" :visible.sync="copyFormVisible" width="50%" top="15vh" id="copyFormVisible">
            <div class="quarterMessage_box">
                <el-form ref="form" :model="copyFrom" label-width="80px" class="copy_box">
                    <el-form-item label="复制来源" >
                            <el-input placeholder="金领家园A栋" v-model="copyFrom.buildingGuid"></el-input>
                    </el-form-item>
                     <el-form-item label="复制到" class="border_box">
                            <span>栋号</span><el-input placeholder="" class="copy_width" v-model="copyFrom.buildingNo"></el-input>
                            <span>位数</span><el-input placeholder="" class="copy_width" v-model="copyFrom.num"></el-input>
                    </el-form-item>
                    <el-form-item label="其他">
                        <el-radio-group v-model="ridor1">
                            <el-radio @click.native.prevent="clickitem(3)" :label="3"> 复制房源</el-radio>
                        </el-radio-group><br/>
                        <el-radio-group v-model="ridor2">
                            <el-radio @click.native.prevent="clickitem1(3)" :label="3"> 保留原有材料</el-radio>
                            <!-- <el-radio label="保留原有材料" name="saveOldDate"></el-radio> -->
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                
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
            <p>确定删除该栋及其栋详情吗？</p>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="deteleTung" size="mini">确 定</el-button>
                <el-button @click="dialogFormVisible1 = false" type="primary" size="mini">取 消</el-button>
            </div>
        </el-dialog>
    </div>
    <!-- 栋信息和新增栋模板结束-->
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import {tool,requset} from '../../static/js/tool'
import http from '@/api/common.js'
export default {
    name:'tungmessage',
    data() {
      return {
        
        multipleSelection: [],
        classA:'active',
        classB:'moren',
        show:1,
        tungName:'',//栋名称
        copyFormVisible:false,
        dialogFormVisible1:false,
        ridor1:'',
        ridor2:'',
        buildingNo:'',//复制到栋号
        tungListData:[],//栋信息列表
        
        addtungUser:'',
        buildingBasics:'',//建筑基础
        structure:'',//建筑结构
        bottomUse:'',//底层用途
        tungAscription:'',//栋归属
        isElevator:'',//是否带电梯
        bullidID:'',//建筑Id
        tungList:[],//测绘数据栋列表
        tungListObj:{},//测绘数据栋信息
        isTungListShow:false,//是否显示测绘数据栋列表
        dialogFormVisible: false,
        pageObj:{
            currentPage4: 1,
            pageSize:10,
            total:40
        },
        copyFrom:{
            buildingGuid:'',//复制来源栋标识
            buildingNo:'',//复制到：栋号
            copyHouse:'',//是否复制房源
            num:'',//复制来：位数
            saveOldDate:'',
        },
        form:{
            code:'',//栋号
            name:'',//栋名称
            unitCount:'',//单元数
            landNo:'',//宗地号
            floorNumber:'',//楼层数
            buildPurpose:'',//栋用途
            floorCount:'',//楼层数
            communityGuid:''
        },
        dto:{
            baseArea: '',//基层面积
            buildBasic: "",//建筑基础
            buildID: "string",
            buildPurpose: "",//栋用途
            buildingInfoMaintainBelong: '',//栋信息维护归属
            code: '',//小区号
            construction: "",//建筑结构
            coveredArea: '',//建筑面积    
            deliveryTime: "",//交付时间
            districtGuid: "string",//小区标识
            districtName: "string",//小区名称
            elevator: '',//是否带电梯
            finishConstructionTime: "",// 竣工时间
            floorCount: '',//楼层数
            groundFloorUse: "",//底层用途  
            guid: "string",//唯一标识
            houseType: '',//房屋类型
            houseTypeName: "string",//房屋类型名称
            landNo: '',//宗地号
            middleFloor: "string",//指定中间层
            name: "",//栋名称(幢名称)
            otherArea: '',//其他面积
            parentGuid: "string",//幢标识
            pictureCode: "string",//图片代码
            regionDistrictGuid: "",//大区标识
            remark: "说明",//备注
            reportGuid: "string",//上报标识
            riseId: "string",//栋编码
            selfSale: true,//是否代售
            serialNo: "string",//网格办编码（栋）
            shareArea: '',//分摊面积
            skirtFloorCount: '',//裙楼层数
            startConstructionTime: "",//开工时间
            state: 0,//状态
            subFloorCount: '',//地下层数
            unitCount: '',//单元总数
            usedName: "string",//曾用栋名
            usefulLife: ''//使用年限
            //栋号不确定
        },
        rules:tool.rules2,
        rules2:tool.rules3,
        dtoMessage:{
            baseArea: 0,//基层面积
            buildBasic: "",//建筑基础
            buildID: "string",
            buildPurpose: "string",//栋用途
            buildingInfoMaintainBelong: 0,//栋信息维护归属
            code: "001",//小区号
            construction: "string",//建筑结构
            coveredArea: 0,//建筑面积    
            deliveryTime: "",//交付时间
            districtGuid: "string",//小区标识
            districtName: "string",//小区名称
            elevator: true,//是否带电梯
            finishConstructionTime: "",// 竣工时间
            floorCount: 0,//楼层数
            groundFloorUse: "",//底层用途  
            guid: "string",//唯一标识
            houseType: 0,//房屋类型
            houseTypeName: "string",//房屋类型名称
            landNo: "T2019-02901",//宗地号
            middleFloor: "string",//指定中间层
            name: "A栋",//栋名称(幢名称)
            otherArea: 0,//其他面积
            parentGuid: "string",//幢标识
            pictureCode: "string",//图片代码
            regionDistrictGuid: "100001",//大区标识
            remark: "说明",//备注
            reportGuid: "string",//上报标识
            riseId: "string",//栋编码
            selfSale: true,//是否代售
            serialNo: "string",//网格办编码（栋）
            shareArea: 0,//分摊面积
            skirtFloorCount: 0,//裙楼层数
            startConstructionTime: "2019-05-20T07:05:28.255Z",//开工时间
            state: 0,//状态
            subFloorCount: 0,//地下层数
            unitCount: 0,//单元总数
            usedName: "string",//曾用栋名
            usefulLife: 0//使用年限
            //栋号不确定
        },
        options: {
            tungUser:[],//栋用途选项
            structure:[],//建筑结构选项
            bottomUse:[],//底层用途选项
            tungAscription:[],//栋归属选项
            isElevator:[],//是否带电梯可选项
            buildingBasics:[]//建筑基础可选项
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
            this.communityBuilding(this.pageObj.currentPage4,val);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageObj.currentPage4 = val;
            this.communityBuilding(val,this.pageObj.pageSize);
        },
      submitForm(formName) {
          this.$nextTick(() => {
                console.log(this.dto)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('成功')
                        this.addBuilding();
                        // this.addAuarters()
                    } else {
                        this.open('请确认填写信息完整！！！');
                        return false;
                    }
            });
          })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        clickitem (e) {
            e === this.ridor1 ? this.ridor1 = '' : this.ridor1 = e
            if(this.ridor1){
                this.copyFrom.copyHouse = true;
            }else {
                this.copyFrom.copyHouse = false;
            }
        },
        clickitem1(e){
            e === this.ridor2 ? this.ridor2 = '' : this.ridor2 = e
            //console.log(this.copyFrom.saveOldDate);
            if(this.ridor2){
                this.copyFrom.saveOldDate = true;
            }else {
                this.copyFrom.saveOldDate = false;
            }
        },
        //提示框
        open(title) {
            this.$message(title);
        },
        queding1(){
            this.dialogFormVisible1 = false;
        },
        //查询栋信息列表
        queryTungList(){
            this.communityBuilding(1,10);
            // this.getTungList(1,10);
            this.open('查询成功');
        },
        // 双击查看栋详情
        doubleClick(row){
            console.log(row);
            var that = this;
            that.show = 3;
            let params = {
                buildingGuid : row.guid,
            }
            http.doubleClick(params).then(res => {
                console.log(res);
                that.tungName = res.name;
                that.dtoMessage = res;
                this.$store.commit('add_tungObj',res);
            });
        },
        //新增栋信息
        addBuilding(){
            var that = this;
            let dto = that.dto;
            http.addBuilding(dto).then(res => {
                console.log(res);
                this.$store.commit('add_tungObj',res);
                that.open('保存栋成功');
              
            });
        },
        // 对接测绘数据里面的栋信息
        addBuilding2(){
            var that = this;
            let dto = that.tungListObj;
            if(JSON.stringify(dto) == "{}") {
                that.open('请先查询栋');
            }else{
                 http.addBuilding(dto).then(res => {
                     console.log(res);
                     that.open('新增栋成功');
                     this.$store.commit('add_tungObj',res);
                     that.dialogFormVisible = false;
                    // if(res.status == 'success') {
                    //     that.open('新增栋成功');
                    // }else{
                    //     that.open('新增栋失败');
                    // }
                    // that.dialogFormVisible = false;
                    // that.getTungList(1,10);
                });
            }
           
        },
        //获取建筑基础
        getBuildingBasics(){
            var that = this;
            let params = {
                buildBasic:1
            };
            http.getBuildingBasics(params).then(res => {
                 that.options.buildingBasics = tool.changeData(res);
            });
        },
        //获取是否带电梯可选项
        getIsElevator(){
            var that = this;
            let params = {
                elevator:true
            };
            http.getIsElevator(params).then(res => {
                 that.options.isElevator = tool.changeData(res);
            });
        },
        //获取东归属选项
        getTungAscription(){
            var that = this;
            let params = {};
            http.getTungAscription(params).then(res => {
                 that.options.tungAscription = tool.changeData(res);
            });
        },
        //获取栋用途可选项
        getTungUser(){
             var that = this;
            let params = {
                buildPurpose:1
            };
            http.getTungUser(params).then(res => {
                 that.options.tungUser = tool.changeData(res);
            });
        },
        //获取建筑结构可选项
        getStructure(){
             var that = this;
            let params = {
                construction:1
            };
            http.getStructure(params).then(res => {
                 that.options.structure = tool.changeData(res);
            });
        },
        //获取底层用途
        getBottomUse(){
            var that = this;
            let params = {
                groundFloorUse:1
            };
            http.getBottomUse(params).then(res => {
                 that.options.bottomUse = tool.changeData(res);
            });
        },
       //删除栋
        deteleTung(){
            var that = this;
            let arr = [];
            if(that.multipleSelection.length != 0) {
                that.multipleSelection.forEach(function (ele,index) {
                    arr.push(ele.code);
                })
                let buildingGuids = arr;
                that.dialogFormVisible1 = false;
                // console.log(buildingGuids);
                http.deteleTung(buildingGuids).then(res => {
                    that.open(res);
                    // that.getTungList(1,10);
                    this.communityBuilding(1,10);
                });
            }else{
                that.open('请选择栋');
            }
             that.dialogFormVisible1 = false;
           
        },
        //获取栋信息列表
        getTungList(pageIndex,pageSize){
            var that = this;
            let params = {
                code:that.form.code,
                name : that.form.name,
                unitCount : that.form.unitCount,
                landNo :that.form.landNo,
                communityGuid:that.form.communityGuid,
                buildPurpose:that.form.buildPurpose,
                floorCount:that.form.floorCount,
                pageIndex : pageIndex,
                pageSize : pageSize,
            }
             http.getTungList(params).then(res => {
                 console.log(res);
                that.tungListData = res.content;
            });
                
        },
        //查询某个小区下的栋
        communityBuilding(pageIndex,pageSize){
            var that = this;
            let data = {
                code:that.form.code,
                name : that.form.name,
                unitCount : that.form.unitCount,
                landNo :that.form.landNo,
                communityGuid:this.quartersObj.guid,
                buildPurpose:that.form.buildPurpose,
                floorCount:that.form.floorCount,
                pageIndex : pageIndex,
                pageSize : pageSize,
            }
             http.communityBuilding(data).then(res => {
                 console.log('查询某个小区下的栋',res);
                    
                 that.tungListData = res.content;
                 that.pageObj.total = res.totalPages;
                 that.pageObj.pageSize = res.size;
                 that.pageObj.currentPage4 = res.number + 1;
            });
                
        },
        //复制栋 信息
        copyTung(){
            var that = this;
            that.copyFormVisible = false;
            let data = that.copyFrom;
            http.copyTung(data).then(res => {
                 console.log('复制成功',res);
            });
          
        },
        copyqueding(){
            
        },
        //对栋测绘数据的查询
        query(){
            var that = this;
            if(that.bullidID != ''){
                var params = {
                    bullidID: that.bullidID
                }
                http.query(params).then(res => {
                    console.log('查询成公关稿',res);
                    that.tungListObj = res;
                    that.tungList = [];
                    that.tungList.push(res);
                });
            }else {
                that.open('请输入建筑物ID进行查询!');
            }
        },
        //获取测绘数据栋
        getTung(optionsName,data){
            var that = this;
            that.isTungListShow = true;
            that[optionsName] = data;
            console.log(optionsName,data);
        },
        //获取各种下拉框的函数
        getOptions(optionsName,optionsData) {
            var that = this;
            that.options[optionsName] = optionsData;
        },
        //提示框
         open(title) {
            this.$message(title);
        },
        //点击确定
        queding(){
            this.dialogFormVisible = false;
            //调整公共状态
            this.$store.commit('is_pop');
            //重定向页面
           
        },
        add(){
            this.show = 2;
        },
        fanhui(){
            this.show = true;
        }
    },
    created(){
        //this.deteleTung1();
        this.communityBuilding(this.pageObj.currentPage4,this.pageObj.pageSize);
        //  //获取栋信息列表
        // this.getTungList(1,10);
        //获取栋用途
        this.getTungUser();
        //获取建筑结构
        this.getStructure();
        //获取底层用途
        this.getBottomUse();
         //获取栋归属
        this.getTungAscription();
         //是否电梯可选项
        this.getIsElevator();
        //获取建筑基础可选项
        this.getBuildingBasics();
        this.dto.regionDistrictGuid = this.quartersObj.code;
        this.dto.landNo = this.quartersObj.landNo;
    },
    computed:{
     ...mapState({
        quartersObj: state => state.quartersObj
     })
    }
  };
</script>
<style lang="scss" scoped>
#tungMessage{
    
    .content_d{
        width: calc(100% - 239px);
        float: left;
        margin: 20px 0px 0 15px;
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
    width: 100%;
    float: left;
    background: #fff;
    box-sizing: border-box;
    padding: 0px 18px;
    min-height: 491px;
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
    .margin_box{
        margin-top: 50px;
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
                .el-table {
                    th{
                        padding:6px 0;
                    }
                    .cell{
                        text-align: center;
                    }
                }
                
                .el-form{
                    
                    margin-bottom: 10px;
                    .border_box{
                        border-top:1px solid #ccc;
                        border-bottom:1px solid #ccc;
                        .copy_width{
                            width: 94%;
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
                .copy_box{
                    border: 1px solid #ccc;
                    .el-form-item{
                        margin-bottom: 0px;
                        .el-form-item__content{
                            line-height: 30px;
                        }
                        .el-form-item__label{
                            line-height: 30px;
                            text-align: center;
                        }
                        .el-input__inner{
                            height: 30px;
                            line-height: 30px;
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
