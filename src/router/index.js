import Vue from 'vue';
import Router from 'vue-router';
import SnapshotsView from '@/components/SnapshotsView.vue';
import Menu from '@/components/Menu.vue';
import SnapshotRequests from '@/components/SnapshotRequests.vue';
import Alert from '@/components/Alert.vue';

const SnapshotsUploadList = () => import('@/components/SnapshotsUploadList.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/client/:clId/project/:prId/snapshots/upload',
      name: 'snapshotsUpload',
      components: { default: SnapshotsUploadList, alert: Alert },
    },
    {
      path: '/snapshots/view',
      name: 'snapshots/view',
      components: { default: SnapshotsView, alert: Alert },
    },
    {
      path: '/home',
      name: 'home',
      components: { default: Menu, alert: Alert },
    },
    {
      path: '/client/:clId/project/:prId/snapshotRequests',
      name: 'snapshotRequests',
      components: { default: SnapshotRequests, menu: Menu, alert: Alert },
    },
  ],
});
