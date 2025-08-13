<!-- pages/posts/index.vue -->
<template>
  <section>
    <div class="p-6 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 min-h-screen">
      <!-- Header -->
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="flex items-center gap-3">
          <button
            @click="refresh"
            :disabled="pending"
            aria-label="Refresh posts"
            class="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 active:scale-95 transition duration-150 disabled:opacity-50"
          >
            🔄 Refresh
          </button>
          <span class="text-xs text-gray-500" v-if="lastFetched">
            Last loaded:
            <strong>{{ new Date(lastFetched).toLocaleString() }}</strong>
          </span>
        </div>
      </div>

      <!-- Loading / Error -->
      <div v-if="pending" class="text-gray-600 animate-pulse">
        Loading posts…
      </div>
      <div v-else-if="error" class="text-red-600 font-semibold">
        Failed to load: {{ typeof error === 'string' ? error : error.message || 'Unknown error' }}
      </div>

      <!-- Posts Grid -->
      <div
        v-if="posts.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
      >
        <NuxtLink
          v-for="p in posts"
          :key="p.id"
          :to="`/posts/${p.id}`"
          class="block h-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-xl transform hover:scale-[1.02] transition duration-200"
        >
          <PostCard :post="p" class="h-full" />
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-else-if="!pending && !error" class="text-gray-500 text-center mt-6">
        No posts found.
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "@/stores/posts";
import PostCard from "@/components/PostCard.vue";

const store = usePostsStore();
const { allPosts: posts, lastFetched, pending, error } = storeToRefs(store);

onMounted(async () => {
  await store.fetchPosts();
});

async function refresh() {
  try {
    await store.fetchPosts({ force: true });
  } catch (err) {
    console.error("Failed to refresh:", err);
  }
}
</script>
