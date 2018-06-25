import Vue from 'vue';
import Router from 'vue-router';
import SnapshotsView from '@/components/SnapshotsView.vue';
import Menu from '@/components/Menu.vue';
import SnapshotRequests from '@/components/SnapshotRequests.vue';

const SnapshotsUploadList = () => import('@/components/SnapshotsUploadList.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/client/:clId/project/:prId/snapshots/upload',
      name: 'snapshotsUpload',
      component: SnapshotsUploadList,
    },
    {
      path: '/snapshots/view',
      name: 'snapshots/view',
      component: SnapshotsView,
    },
    {
      path: '/home',
      name: 'home',
      component: Menu,
    },
    {
      path: '/client/:clId/project/:prId/snapshotRequests',
      name: 'snapshotRequests',
      components: { default: SnapshotRequests, menu: Menu },
    },
  ],
});
