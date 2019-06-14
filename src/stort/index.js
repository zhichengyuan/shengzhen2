import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
    activeName:'',
    add_tabs: [],
    quartersObj:{},
    tungObj:{},
    guidObj:{
        quartersName:'',
        quartersGuid:'',
        trungGuid:''
    }
}

const getters = {
    priceNum(state) {
        return state.num
    }
}
// let newArray = [];
const mutations = {
    add_tabs_fn (state, data) {
                this.state.add_tabs.push(data);
    },
    add_active (state,data) {
        this.state.activeName = data;
    },
    reduce_tabs_fn (state,targetName) {
        console.log('移除',targetName);
        var data = this.state.add_tabs;
        for(var  i=0;i<data.length;i++) {
           if(data[i].url == targetName){
               console.log(data[i]);
               this.state.add_tabs.splice(i,1);
           }
        }
    //    this.state.add_tabs.splice(index,1);       
    },
    //设置小区属性
    add_quartersObj (state,data) {
        this.state.quartersObj = data;
    },
    //设置栋信息属性
    add_tungObj (state,data) {
        this.state.tungObj = data;
    },
    //设置小区id
    add_guidObj_quartersGuid (state,guid) {
        this.state.guidObj.quartersGuid = guid;
    },
    //设置小区名称
    add_guidObj_quartersName (state,guid) {
        this.state.guidObj.quartersGuid = guid;
    }
}

const actions = {

}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;