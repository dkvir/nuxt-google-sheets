export const useSearchStore = defineStore("imageStore", {
  state: () => ({
    reasonsData: use1001Copy(),
    searchValue: null,
  }),
  getters: {
    getReasons() {
      return this.reasonsData.filter((item) => {
        if (this.searchValue == null) return this.reasonsData;
        return item.cardIndex.toString().includes(this.searchValue);
      });
    },
  },
  actions: {
    changeSearchValue(value) {
      this.searchValue = value;
    },
  },
});
