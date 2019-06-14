import Vue from 'vue'
import Router from 'vue-router'
import Construction from '@/components/construction'
import addQuarters from '@/components/addquarters'
import housingInformation from '@/components/housinginformation'
import quartersMessage from '@/components/quartersMessage'
import tungMessage from '@/components/tungMessage'
import housingMessage from '@/components/housingMessage'
import warehousingApplication from '@/components/warehousingApplication'
import Warehousing from '@/components/warehousing'
import newWarehousing from '@/components/newWarehousing'
import preHousing from '@/components/preHousing'
import Enclosure from '@/components/enclosure'

Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'construction',
      component: Construction,
      redirect:'/housinginformation',
      children:[
        {
          path: '/housinginformation',//房源信息模块
          name: 'housinginformation',
          component: housingInformation,
        },
        {
          path: '/addquarters',//新增小区模块
          name: 'addQuarters',
          component: addQuarters,
          redirect:'/quartersmessage',
          children:[
            {
              path: '/quartersmessage',
              name: 'quartersMessage',
              component: quartersMessage,
            },
            {
              path: '/tungmessage',
              name: 'tungMessage',
              component: tungMessage,
            },
            {
              path: '/housingmessage',
              name: 'housingmessage',
              component: housingMessage,
            }
          ]
        },
        {
          path: '/warehousingapplication',//房源入库模块
          name: '/warehousingapplication',
          component: warehousingApplication,
        },
        {
          path: '/warehousing',
          name: 'warehousing',
          component: Warehousing,
          redirect:'/newwarehousing',
          children:[
            {
              path: '/newwarehousing',//入库申请页面
              name: 'newwarehousing',
              component: newWarehousing,
            },
            {
              path: '/prehousing',
              name: 'prehousing',
              component: preHousing,
            },
            {
              path: '/enclosure',
              name: 'enclosure',
              component: Enclosure,
            }
          ]
        }
      
      ]
    },
    

   
  ],
})

