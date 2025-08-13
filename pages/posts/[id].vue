<template>
  <div
    class="bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 min-h-screen"
  >
    <article class="max-w-4xl mx-auto">
      <!-- Back link -->
      <NuxtLink
        to="/posts"
        class="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
      >
        ← Back to Posts
      </NuxtLink>

      <!-- Post Header -->
      <header class="mt-4 mb-8">
        <h1 class="text-3xl font-bold text-gray-900 leading-tight">
          {{ post?.title || "Loading…" }}
        </h1>
        <p class="text-sm text-gray-500 mt-1">Post #{{ id }}</p>
      </header>

      <!-- Loading & Error -->
      <div v-if="pending" class="text-gray-600 animate-pulse">
        Loading post…
      </div>
      <div v-else-if="error" class="text-red-600 font-semibold">
        Failed to load: {{ error }}
      </div>

      <!-- Post Content -->
      <div
        v-else-if="post"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
      >
        <p class="text-gray-800 leading-7 text-base">
          {{ post.body }}
        </p>

        <!-- Tags -->
        <section v-if="post.tags?.length" class="pt-4 border-t">
          <h3 class="font-semibold text-gray-900 mb-3">Tags</h3>
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              #{{ tag }}
            </span>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script setup>
import { usePostsStore } from "@/stores/posts";

const route = useRoute();
const id = Number(route.params.id);
const store = usePostsStore();

const post = ref(store.getPost(id));
const pending = ref(false);
const error = ref(null);

if (!post.value) {
  pending.value = true;
  try {
    post.value = await store.fetchPost(id);
  } catch (err) {
    error.value = err.message || String(err);
  } finally {
    pending.value = false;
  }
}
</script>
