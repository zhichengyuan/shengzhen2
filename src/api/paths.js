/* 此处添加api接口 */
export const url = {
    // batchInfo:"batch/list",  //例子
    queryHouse:'/construction_raising/house/queryHouse',//双击查询房屋详情
    communityBuilding:'/construction_raising/community_building/get',//查询某个小区下的栋
    checkBach:'/construction_raising/house_intoStore/get',//根据批次标识查询批次基本信息
    checkQuery:'/construction_raising/community_info/get',//房源信息录入-双击查看某个小区详情
    savePreHouse:'/construction_raising/pre_houses/save',//提交预房源
    submitPreHouse:'/construction_raising/pre_houses/submit',////提交房源入库
    deteleYuHousing:'/construction_raising/house/deletePre',//移除预房源
    query: '/construction_raising/house_bulid/get', //对栋测绘数据的查询
    doubleClick: '/construction_raising/building/query', // 双击查看栋详情
    addBuilding: '/construction_raising/house/add', //新增栋信息
    addHouse: '/construction_raising/house/add', //新增房源
    addAuarters: '/construction_raising/house_district/add', //建设筹集-小区信息新增
    getQueryTerrace: '/construction_raising/house/query_terrace', //平台下拉
    getHouseBelong: '/construction_raising/house/query_houseBelong', //房屋归属下拉
    getDistrictCode: '/construction_raising/house_district_code/get', //建设筹集小区信息新增条件-小区号生成获取
    getAddress: '/construction_raising/address/get', //生成地址
    chooseHouse: '/construction_raising/house_intoStore/choose_house', //选择预房源-可选房源
    chooseDistrict: '/construction_raising/house_intoStore/choose_district', //选择预房源-选择小区
    deleteHouse: '/construction_raising/house/delete', //删除房源
    deleteApply: '/construction_raising/house_intoStore/delete', //删除入库申请批次
    exportApply: '/construction_raising/house_intoStore/export', //按条件导出入库申请
    getWarehousingApply: '/construction_raising/house_intoStore/page', //按条件查询入库申请
    saveApplyBatch: '/construction_raising/house_intoStore/save', //保存申请批次
    copyTung: '/construction_raising/building/copy', //复制栋
    getPreHousList: '/construction_raising/house_intoStore/listHouse', //获取预房源列表
    getStatusoptions: '/construction_raising/house_intoStore/state', //获取上报状态
    getCompanyoptions: '/construction_raising/house_intoStore/getReportUnit', //获取上报单位
    getAscriptionoptions: '/construction_raising/house_intoStore/getAccountAbleUnit', //获取上报责任单位
    getHousingMessageList: '/construction_raising/house/page', //获取房源信息列表
    getOrientation: '/construction_raising/house/query_orientation', //获取朝向
    getApartment: '/construction_raising/house/query_houseType', //查看户型
    getSource: '/construction_raising/house/query_houseResource', ////获取房屋来源
    getTungList: '/construction_raising/house_bulid_list/get', //获取栋信息列表
    getBuildingBasics: '/construction_raising/buildbasic_prepare/get', //获取建筑基础可选项
    getIsElevator: '/construction_raising/elevator_prepare/get', //获取是否带电梯选项
    getTungAscription: '/construction_raising/buildbelong_prepare/get', //获取东归属选项
    getBottomUse: '/construction_raising/groundflooruse_prepare/get', //获取底层用途(不好用)
    getStructure: '/construction_raising/construction_prepare/get', //获取建筑结构可选项
    getTungUser: '/construction_raising/buildpurpose_prepare/get', //获取栋用途
    getCommunityOwner: '/construction_raising/belongarea_prepare/get', //获取小区归属
    getIsselfTube: '/construction_raising/selfmanagement_prepare/get', ////是否自管
    getStandard: '/construction_raising/districtparent_prepare/get', //建房标准
    getHousingData: '/construction_raising/house_district_list/get', //房源信息录入查询
    getMappingData: '/construction_raising/house_district/get', //点击查询对接测绘数据
    getIsoneself: '/construction_raising/selfbulid_prepare/get', //是否自建
    getStreet: '/construction_raising/street_prepare/get', //小区街道可选项获取
    getMaintain: '/construction_raising/ascription_prepare/get', //维护归属可选项获取
    getArea: '/construction_raising/area_prepare/get', //获取小区区域
    exportFunc: '/construction_raising/to_export/get', //导出房源信息
    deteleTung: '/construction_raising/building/delete', //删除栋


    getDictionary: '/demand/dictionary', //根据字典名称查询
    getTableList: '/demand/queue_list/page', //公租，安居轮候册table信息
    getTurnoverList: '/demand/queue_list/page/turnover', //周转轮候册table信息
    getSecurityList: '/demand/beneficiary/page', //保障对象查询,table信息
    getStaffList: '/demand/store/person', //人员库查询table信息
    getUnitList: '/demand/store/unit' // 单位库查询table信息
}