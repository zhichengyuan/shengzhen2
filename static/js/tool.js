import Vue from 'vue'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

const val = new Vue()

let tool = {
    changeData(data) {
        var newArr = [];
        for (var porp in data){
            var obj = {};
            obj.label = porp;
            obj.value = data[porp];
            newArr.push(obj)
        }
        return newArr;
    },
    //获取当前时间
    getNowFormatDate(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    rules:{
      name: [
        { required: true, message: '请输入小区名称', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      code:[
        { required: true, message: '此项为必填项', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      landNo:[
        { required: true, message: '请输入宗地号', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      belongArea:[
        { required: true, message: '请选择大区', trigger: 'change' }
      ],
      street:[
        { required: true, message: '请输入宗地号街道', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      roadName:[
        { required: true, message: '请输入路', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      landArea:[
       
      ],
      address:[
        { required: true, message: '请输入生成地址', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      totalCoveredArea:[
      ],
      volumeRatio:[
      ],
      region1: [
        { required: true, message: '请选择大区', trigger: 'change' }
      ],
      area:[
        { required: true, message: '请选择所在地区', trigger: 'change' }
      ],
 
      region: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
      ],
      startConstructionTime: [
        
      ],
      finishConstructionTime: [
        
      ],
      deliveryTime: [
        
      ],
      developer:[
        { required: true, message: '请输入开发商', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      designOrgnation:[
        { required: true, message: '请输入设计单位', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      remark:[
        { required: true, message: '请输入小区详细说明', trigger: 'blur' },
        { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
      ],
      selfManagement:[
          { required: true, message: '请选择是否自管', trigger: 'change' }
      ],
      selfBuilt:[
          { required: true, message: '请选择是否自建', trigger: 'change' }
      ],
      decorationStandard:[
          { required: true, message: '请选择装修标准', trigger: 'change' }
      ],
      type: [
        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
      ],
      resource: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
      ],
      desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
      ]
    },
    rules2:{
      name: [
        { required: true, message: '请输入小区名称', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      code:[
        { required: true, message: '此项为必填项', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      landNo:[
        { required: true, message: '请输入宗地号', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      regionDistrictGuid:[
        { required: true, message: '请输入大区编号', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      buildPurpose:[
        { required: true, message: '请选择栋用途', trigger: 'change' }
      ],
      belongArea:[
        { required: true, message: '请选择大区', trigger: 'change' }
      ],
      unitCount:[
        { required: true, message: '请选择大区', trigger: 'change' }
      ],
      construction:[
        { required: true, message: '请选择建筑结构', trigger: 'change' }
      ],
      buildBasic:[
        { required: true, message: '请选择建筑基础', trigger: 'change' }
      ],
      groundFloorUse:[
        { required: true, message: '请选择底层用途', trigger: 'change' }
      ],
      elevator:[
        { required: true, message: '请选择是否带电梯', trigger: 'change' }
      ],
      buildingInfoMaintainBelong:[
        { required: true, message: '请选择栋归属', trigger: 'change' }
      ],
      floorCount:[
        { required: true, message: '请输入总楼层数', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      coveredArea:[
      ],
      skirtFloorCount:[
      ],
      subFloorCount:[
        { required: true, message: '请输入地下层数', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      baseArea:[
        { required: true, message: '请输入基层面积', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],

      startConstructionTime: [
        
      ],
      finishConstructionTime: [
        
      ],
      deliveryTime: [
        
      ],
     
      remark:[
        { required: true, message: '请输入小区详细说明', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
    
    },
    rules3:{
      name: [
        { required: false, message: '请输入小区名称', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      code:[
        { required: false, message: '此项为必填项', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      landNo:[
        { required: false, message: '请输入宗地号', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      regionDistrictGuid:[
        { required: false, message: '请输入大区编号', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      buildPurpose:[
        { required: false, message: '请选择栋用途', trigger: 'change' }
      ],
      belongArea:[
        { required: false, message: '请选择大区', trigger: 'change' }
      ],
      unitCount:[
        { required: false, message: '请选择大区', trigger: 'change' }
      ],
      construction:[
        { required: false, message: '请选择建筑结构', trigger: 'change' }
      ],
      buildBasic:[
        { required: false, message: '请选择建筑基础', trigger: 'change' }
      ],
      groundFloorUse:[
        { required: false, message: '请选择底层用途', trigger: 'change' }
      ],
      elevator:[
        { required: false, message: '请选择是否带电梯', trigger: 'change' }
      ],
      buildingInfoMaintainBelong:[
        { required: false, message: '请选择栋归属', trigger: 'change' }
      ],
      floorCount:[
      ],
      skirtFloorCount:[
      ],
      subFloorCount:[
      ],
      baseArea:[
        { required: false, message: '请输入基层面积', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],

      startConstructionTime: [
        
      ],
      finishConstructionTime: [
        
      ],
      deliveryTime: [
        
      ],
      remark:[
        { required: false, message: '请输入小区详细说明', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      coveredArea:[
      ],
    },
    rules4:{
      districtName: [
        { required: true, message: '请输入小区名称', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      buildName:[
        { required: true, message: '请选择栋名称', trigger: 'change' }
      ],
      houseNo:[
        { required: true, message: '请输入房号', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      rightOverImmovablesId:[
        { required: true, message: '请输入不动产权号', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      unit:[
        { required: true, message: '请输入所在单元', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      floorNo:[
        { required: true, message: '请选择所在楼层', trigger: 'change' }
      ],
      propertyRight:[
        { required: true, message: '请输入产权单位', trigger: 'blur' },
        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
      ],
      function:[
        { required: true, message: '请选择房屋用途', trigger: 'change' }
      ],
      natureName:[
        { required: true, message: '请选择房屋性质', trigger: 'change' }
      ],
      typeName:[
        { required: true, message: '请选择户型', trigger: 'change' }
      ],
      orientation:[
        { required: false, message: '请选择朝向', trigger: 'change' }
      ],
      terrace:[
        { required: true, message: '请选择平台', trigger: 'change' }
      ],
      innerFloor:[
        { required: true, message: '请选择是否有架空层', trigger: 'change' }
      ],
      decorationType:[
        { required: true, message: '请选择装修类型', trigger: 'change' }
      ],
      stateName:[
        { required: true, message: '请选择房屋来源', trigger: 'change' }
      ],
      houseBelong:[
        { required: true, message: '请选择房屋归属', trigger: 'change' }
      ],
      coveredArea:[
        
      ],
      completionShareArea:[
        { required: true, message: '请输入分摊面积', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      completionIndoorArea:[
        { required: true, message: '请输入套内面积', trigger: 'blur' },
        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
      ],
      completionArea:[
        { required: true, message: '请输入竣工面积', trigger: 'blur' }
      ],
     
      specification:[
        { required: true, message: '请输入房屋详细说明', trigger: 'blur' },
        { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
      ],
    },
  
}




let requset = {
    
    getOptionsMessage(api,optionsName,func){
        var optionsData = [];
        axios({
            method:'get',
            url:window.g.HOSTURL + api,
        })
        .then(function (response) {
            if(response.data.status == "success") {
                var data = response.data.data;
                optionsData = tool.changeData(data);
                func(optionsName,optionsData);
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log('请求失败');
        })
    },
    getMessage(api,data,name,func) {
        axios({
            method:'get',
            url:window.g.HOSTURL + api,
            data:data
        })
        .then(function (response) {
            if(response.data.status == "success") {
                var data = response.data.data;
                func(name,data);
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log('请求失败');
        })
    },
    get(url, params) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'get',
            url,
            params: params
          }).then(res => {
            if (res.data.status == "success") {
              resolve(res.data.data || res.data || res)
            } else {
              val.$alert(res.data.message, "提示")
            }
          }).catch(err => {
            val.$alert(err.message, "提示")
          })
        })
      },
      post(url, params, data) {
        console.log(data);
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url,
            data: data,
            params: params,
           
          
          }).then(res => {
            if (res.data.status == "success") {
              resolve(res.data.data || res.data || res)
    
            } else {
              val.$alert(res.data.message, "提示")
            }
          }).catch(err => {
            console.log(err)
            val.$alert(err.message, "提示")
          })
        })
      }
}



export {
    tool,
    requset
}