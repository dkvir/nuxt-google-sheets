import * as THREE from "three";
import { defineStore } from "pinia";

export const useTextureLoaderStore = defineStore("textureLoaderStore", {
  state: () => ({
    loadedTexture: null,
    isLoading: false,
    isLoaded: false,
    timelineCompete: false,
    loaderComplete: false,
    isZoomed: false,
    mountedTexture: null,
  }),
  actions: {
    preloadTexture(url) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
          url,
          (texture) => {
            this.loadedTexture = texture;
            this.isLoading = false;
            this.isLoaded = true;
            resolve();
          },
          undefined,
          (error) => {
            console.error("Failed to load image:", url, error);
            reject(error);
          }
        );
      });
    },
    changeTimelineLoaded(status) {
      this.timelineCompete = status;
    },
    changeloaderComplete(status) {
      this.loaderComplete = status;
    },
    changeIsZoomedStatus(status) {
      this.isZoomed = status;
    },
    changeMountedTexture(link) {
      this.mountedTexture = link;
    },
  },
});
