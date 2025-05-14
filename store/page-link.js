export const usePageLink = defineStore("page-link", {
  state: () => ({
    currentPage: "/",
    loading: false,
    pointerEvents: false,
  }),
  actions: {
    changeCurrentPage(to) {
      this.currentPage = to;
    },
    changePageLoading(status) {
      this.loading = status;
    },
    changePointerEvents(status) {
      this.pointerEvents = status;
    },
  },
});
