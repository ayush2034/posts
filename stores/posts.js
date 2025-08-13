import { defineStore } from "pinia";

const TTL = 15 * 60 * 1000; // 15 minutes in ms
const API = "https://dummyjson.com";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [], // list cache
    lastFetched: 0, // list timestamp
    byId: {}, // { [id]: { data: Post, fetchedAt: number } }
  }),
  getters: {
    allPosts: (state) => state.posts,
    getPost: (state) => (id) => state.byId[id]?.data || null,
    isFresh: () => (ts) => Date.now() - ts < TTL,
  },
  actions: {
    async fetchPosts(opts = { force: false }) {
      if (
        !opts.force &&
        this.posts.length > 0 &&
        Date.now() - this.lastFetched < TTL
      ) {
        return this.posts;
      }
      const { posts } = await $fetch(`${API}/posts?limit=100`);
      this.posts = posts || [];
      this.lastFetched = Date.now();
      for (const p of this.posts) {
        this.byId[p.id] = { data: p, fetchedAt: Date.now() };
      }
      return this.posts;
    },

    async fetchPost(id, opts = { force: false }) {
      const cached = this.byId[id];
      if (!opts.force && cached && Date.now() - cached.fetchedAt < TTL) {
        return cached.data;
      }
      const post = await $fetch(`${API}/posts/${id}`);
      this.byId[id] = { data: post, fetchedAt: Date.now() };
      return post;
    },
  },
});
