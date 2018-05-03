import Vue from 'vue'
import Router from 'vue-router'
import SnapshotsUpload from '@/components/SnapshotsUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'snapshots/upload',
      component: SnapshotsUpload
    }
  ]
})
