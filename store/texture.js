export const useTextureStore = defineStore("useTextureStore", {
  state: () => ({
    textureIndex: null,
    reasonIndex: null,
    textureAtlasIndex: null,
    changeCursor: false,
    isShareActive: false,
  }),
  actions: {
    changeTextureIndex(index) {
      this.textureIndex = index;
    },
    changeReasonIndex(index) {
      this.reasonIndex = index;
    },
    changeTextureAtlasIndex(index) {
      this.textureAtlasIndex = index;
    },
    toggleShare(status) {
      this.isShareActive = status;
    },
    togglechangeCursor(status) {
      this.changeCursor = status;
    },
  },
});
