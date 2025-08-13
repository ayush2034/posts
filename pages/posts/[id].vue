<template>
  <div class="bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 min-h-screen py-8">
    <article class="max-w-4xl mx-auto px-4">
      <!-- Back link -->
      <NuxtLink
        to="/posts"
        class="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors"
      >
        ← Back to Posts
      </NuxtLink>

      <!-- Post Header -->
      <header class="mt-2 mb-5">
        <h1
          class="text-3xl font-bold text-gray-900 leading-tight tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          {{ post?.title || "Loading…" }}
        </h1>
        <p class="text-sm text-gray-500 mt-2">Post #{{ id }}</p>
      </header>

      <!-- Loading & Error -->
      <div v-if="pending" class="text-center text-gray-600 animate-pulse py-10">
        Loading post…
      </div>
      <div v-else-if="error" class="text-center text-red-600 font-semibold py-10">
        Failed to load: {{ error }}
      </div>

      <!-- Post Content -->
      <div
        v-else-if="post"
        class="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-8 space-y-8 transition-all hover:shadow-xl"
      >
        <!-- Post Body -->
        <p class="text-gray-800 leading-relaxed">
          {{ post.body }}
        </p>

        <!-- Tags -->
        <section v-if="post.tags?.length" class="pt-4 border-t border-gray-100">
          <h3 class="font-semibold text-gray-900 mb-4">Tags</h3>
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm font-medium shadow-sm hover:shadow-md hover:from-indigo-100 hover:to-purple-100 transition-all cursor-pointer"
            >
              #{{ tag }}
            </span>
          </div>
        </section>

        <!-- Likes & Views -->
        <section
          class="pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600"
        >
          <div class="flex items-center gap-2">
            <span
              class="flex items-center gap-1 text-pink-500 font-medium"
            >
              ❤️ {{ post.reactions?.likes ?? 0 }} Likes
            </span>
          </div>
          <div class="flex items-center gap-1 font-medium">
            👁 {{ post?.views ?? 0 }} Views
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
