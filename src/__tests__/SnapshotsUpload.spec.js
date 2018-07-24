import mockAxios from 'axios';
import { createWrapper } from './__helpers__/test_utils_wrapper_factory';
import SnapshotsUpload from '../components/SnapshotsUpload.vue';

jest.mock('axios');

describe('SnapshotUpload.vue', () => {
  let wrapper;  

  const propsData = {
    requestId: 'ab27c74f73ba26561c61cbcc',
    requestName: 'Show us a problem with your workspace', 
  };
  const vueTestWrapperElements = {
    componentToTest: SnapshotsUpload,
    propsData,
  };

  beforeEach(async () => {
    wrapper = createWrapper(vueTestWrapperElements);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    jest.clearAllMocks();
  });

  const snapshotImage = { dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD' };
  const snapshotComment = 'comment about the space';  
  
  const populateSnapshotUploadForm = (snapshotUploadTestWrapper) => {
    snapshotUploadTestWrapper.setData({
      snapshotData: { 
        imageFile: '',
        localImageDisplay: '',
        snapshot: {
          imageUrl: '',
          comment: snapshotComment,
        },
      },
    });
    wrapper.vm.addImage(snapshotImage);
  };

  describe('Tests loading successfully', () => {    
    it('should have loaded a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  describe('Load snapshot request', () => {
    it('should display the snapshot request name', async () => {
      expect(wrapper.find(`#${propsData.requestId}RequestName`).element.innerHTML).toEqual(propsData.requestName);
    });
  });

  describe('Display image', () => {    
    it('should display image when user adds image', async () => {
      wrapper.vm.addImage(snapshotImage);
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#snapshotImage').exists()).toBeTruthy();
    });
  });
  
  describe('Form validation on submit snapshot', () => {
    it('should display error, on save snapshot, if comment not populated', async () => {
      wrapper.find('#submitSnapshotBtn').trigger('click');
      await wrapper.vm.$nextTick();
      expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
      expect(wrapper.vm.commentErrors).not.toBeEmpty();
    });
  
    it('should display error, on save snapshot, if image not provided', async () => {
      wrapper.find('#submitSnapshotBtn').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('#imageError').exists()).toBeTruthy();
    });
  
    it('should be no error, on save snapshot, if comment and image are populated', async () => {
      expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
      expect(wrapper.vm.commentErrors).toBeEmpty();

      populateSnapshotUploadForm(wrapper);

      wrapper.find('#submitSnapshotBtn').trigger('click');
      await wrapper.vm.$nextTick();

      expect(Array.isArray(wrapper.vm.commentErrors)).toBeTrue();
      expect(wrapper.vm.commentErrors).toBeEmpty();
      expect(wrapper.find('#imageError').exists()).toBeFalsy();
    });
  });

  describe('Save snapshot', () => {
    const imageUploadConfig = {
      signedImageUploadUrl: 'https://signed-url.com',
      imageUrl: 'https://image-url.com',
    };

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: imageUploadConfig,
      }));
  
    it('should upload image to AWS with signed AWS URL and accompanying config data', async () => {
      populateSnapshotUploadForm(wrapper);

      wrapper.find('#submitSnapshotBtn').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      const paramsExpectedToBePassedToAWS = {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Encoding': 'base64',
        },
      };
      const testImageFileData = snapshotImage.dataUrl;
      const imageDataExpectedToBePassedToAWS = Buffer.from(testImageFileData.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      expect(mockAxios.put).toHaveBeenCalledTimes(1);
      expect(mockAxios.put).toHaveBeenCalledWith(
        imageUploadConfig.signedImageUploadUrl, 
        imageDataExpectedToBePassedToAWS, 
        paramsExpectedToBePassedToAWS,
      );
    });

    it('should save Snapshot', async () => {
      populateSnapshotUploadForm(wrapper);

      wrapper.find('#submitSnapshotBtn').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      const snapshot = {
        imageUrl: imageUploadConfig.imageUrl,
        comment: snapshotComment,
        requestId: propsData.requestId,
      };

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post.mock.calls[0][1]).toEqual(snapshot);
    });
  });
});
