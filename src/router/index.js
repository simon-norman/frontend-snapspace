import Vue from 'vue';
import Router from 'vue-router';
import SnapshotsUpload from '@/components/SnapshotsUpload.vue';
import SnapshotsView from '@/components/SnapshotsView.vue';
import SnapshotRequests from '@/components/SnapshotRequests.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'snapshots/upload',
      component: SnapshotsUpload,
    },
    {
      path: '/snapshots/view',
      name: 'snapshots/view',
      component: SnapshotsView,
    },
    {
      path: '/snapshotRequests',
      name: 'snapshotRequests',
      component: SnapshotRequests,
    },
  ],
});
