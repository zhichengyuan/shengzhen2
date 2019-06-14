/* 公共方法 */
import {tool,requset} from '../../static/js/tool'
import { url } from '@/api/paths'

export default {//例子
    
    queryHouse(params){
        return requset.get(window.g.HOSTURL+url.queryHouse,params)//双击查询房屋详情
    },
    checkBach(params){
        return requset.get(window.g.HOSTURL+url.checkBach,params)//根据批次标识查询批次基本信息
    },
    
    checkQuery1(params){
        return requset.post(window.g.HOSTURL+url.checkQuery,params)//房源信息录入-双击查看某个小区详情
    },
   
    communityBuilding(params){
        return requset.post(window.g.HOSTURL+url.communityBuilding,params)////查询某个小区下的栋
    },
    
    savePreHouse(data){
        return requset.post(window.g.HOSTURL+url.savePreHouse, {},data)//提交预房源
    },
    submitPreHouse(data){
        return requset.post(window.g.HOSTURL+url.submitPreHouse, {},data)//提交房源入库
    },
    deteleYuHousing(data){
        return requset.post(window.g.HOSTURL+url.deteleYuHousing, {},data)//删除栋
    },
    deteleTung(data){
        return requset.post(window.g.HOSTURL+url.deteleTung, {},data)//删除栋
    },
    query(params){
        return requset.get(window.g.HOSTURL+url.query, params)//对栋测绘数据的查询
    },
    doubleClick(params){
        return requset.get(window.g.HOSTURL+url.doubleClick, params)//双击查看栋详情
    },
    addBuilding(data){
        return requset.post(window.g.HOSTURL+url.addBuilding, {},data)//新增栋信息
    },
    addHouse(data){
        return requset.post(window.g.HOSTURL+url.addHouse, {},data)//新增房源
    },
    addAuarters(data){
        return requset.post(window.g.HOSTURL+url.addAuarters, {},data)//v建设筹集-小区信息新增
    },
    getQueryTerrace(params){
        return requset.get(window.g.HOSTURL+url.getQueryTerrace, params)//平台下拉
    },
    getHouseBelong(params){
        return requset.get(window.g.HOSTURL+url.getHouseBelong, params)//房屋归属下拉
    },
    getDistrictCode(params){
        return requset.get(window.g.HOSTURL+url.getDistrictCode, params)//建设筹集小区信息新增条件-小区号生成获取
    },
    getAddress(params){
        return requset.get(window.g.HOSTURL+url.getAddress, params)//生成地址
    },
    chooseHouse(params){
        return requset.get(window.g.HOSTURL+url.chooseHouse, params)//选择预房源-可选房源
    },
    chooseDistrict(params){
        return requset.get(window.g.HOSTURL+url.chooseDistrict, params)//选择预房源-选择小区
    },
    deleteHouse(data){
        return requset.post(window.g.HOSTURL+url.deleteHouse, {},data)//v
    },
    deleteApply(data){
        return requset.post(window.g.HOSTURL+url.deleteApply, {},data)//删除入库申请批次
    },
    exportApply(params){
        return requset.get(window.g.HOSTURL+url.exportApply, params)//按条件导出入库申请
    },
    getWarehousingApply(params){
        return requset.get(window.g.HOSTURL+url.getWarehousingApply, params)//按条件查询入库申请
    },
    saveApplyBatch(data){
        return requset.post(window.g.HOSTURL+url.saveApplyBatch, {},data)//保存申请批次
    },
    copyTung(data){
        return requset.post(window.g.HOSTURL+url.copyTung, {},data)//复制栋
    },
    getPreHousList(params){
        return requset.get(window.g.HOSTURL+url.getPreHousList, params)//获取预房源列表
    },
    getStatusoptions(params){
        return requset.get(window.g.HOSTURL+url.getStatusoptions, params)//获取上报状态
    },
    getCompanyoptions(params){
        return requset.get(window.g.HOSTURL+url.getCompanyoptions, params)//获取上报单位
    },
    getAscriptionoptions(params){
        return requset.get(window.g.HOSTURL+url.getAscriptionoptions, params)//获取上报责任单位
    },
    getHousingMessageList(params){
        return requset.get(window.g.HOSTURL+url.getHousingMessageList, params)//获取房源信息列表
    },
    getOrientation(params){
        return requset.get(window.g.HOSTURL+url.getOrientation, params)//获取朝向
    },
    getApartment(params){
        return requset.get(window.g.HOSTURL+url.getApartment, params)//查看户型
    },
    getSource(params){
        return requset.get(window.g.HOSTURL+url.getSource, params)//获取房屋来源
    },
    getTungList(params){
        return requset.get(window.g.HOSTURL+url.getTungList, params)//获取栋信息列表
    },
    getBuildingBasics(params){
        return requset.get(window.g.HOSTURL+url.getBuildingBasics, params)//获取建筑基础可选项
    },
    getIsElevator(params){
        return requset.get(window.g.HOSTURL+url.getIsElevator, params)//获取是否带电梯选项
    },
    getTungAscription(params){
        return requset.get(window.g.HOSTURL+url.getTungAscription, params)//获取东归属选项
    },
    getBottomUse(params){
        return requset.get(window.g.HOSTURL+url.getBottomUse, params)//获取底层用途
    },
    getStructure(params){
        return requset.get(window.g.HOSTURL+url.getStructure, params) //获取建筑结构可选项
    },
    getTungUser(params){
        return requset.get(window.g.HOSTURL+url.getTungUser, params) //获取栋用途
    },
    getCommunityOwner(params){
        return requset.get(window.g.HOSTURL+url.getCommunityOwner, params) //获取小区归属
    },
    getIsselfTube(params){
        return requset.get(window.g.HOSTURL+url.getIsselfTube, params) //////是否自管
    },
    getStandard(params){
        return requset.get(window.g.HOSTURL+url.getStandard, params) ////建房标准
    },
    getHousingData(params){
        return requset.get(window.g.HOSTURL+url.getHousingData, params) //房源信息录入查询
    },
    getMappingData(params){
        return requset.get(window.g.HOSTURL+url.getMappingData, params)//点击查询对接测绘数据
    },
    getIsoneself(params){
        return requset.get(window.g.HOSTURL+url.getIsoneself, params) ////是否自建
    },
    getStreet(params){
        return requset.get(window.g.HOSTURL+url.getStreet, params) //小区街道可选项获取
    },
    getMaintain(params){
        return requset.get(window.g.HOSTURL+url.getMaintain, params) //维护归属可选项获取
    },
    getArea(params) {
        return requset.get(window.g.HOSTURL+url.getArea, params) //导出获取区域可选项
    },
    exportFunc(params) {
        return requset.get(window.g.HOSTURL+url.exportFunc, params) //导出房源录入信息
    },
    getDictionary(params) {
       return requset.get(url.getDictionary, params) //查询公租轮候册信息
   },
    getTableList(params) {
    return requset.get(url.getTableList, params) //查询安居轮候册信息
    },
    getTurnoverList(params) { 
        return requset.get(url.getTurnoverList, params) //查询周转轮候册页面信息
    },
    getSecurityList(params) {
        return requset.get(url.getSecurityList, params)  //查询保障对象页面信息
    },
    getStaffList(params) {
        return requset.get(url.getStaffList, params) //人员库页面信息
    },
    getUnitList(params) {
        return requset.get(url.getUnitList, params) //单位库页面信息
    },
}
