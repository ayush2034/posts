<template>
  <article
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col gap-3 hover:shadow-lg hover:border-gray-300 transition duration-200"
  >
    <!-- Title -->
    <h2
      class="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors"
    >
      {{ post.title }}
    </h2>

    <!-- Body -->
    <p class="text-sm text-gray-600 line-clamp-3 leading-relaxed">
      {{ post.body }}
    </p>

    <!-- Footer -->
    <div
      class="mt-auto flex items-center justify-between text-xs text-gray-500"
    >
      <!-- Post ID -->
      <span class="font-medium">#{{ post.id }}</span>

      <!-- Tags -->
      <span v-if="post.tags?.length" class="flex flex-wrap gap-1">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium"
        >
          #{{ tag }}
        </span>
      </span>
    </div>

    <!-- Stats: Views & Likes -->
    <div
      class="flex items-center gap-4 text-gray-500 text-xs pt-2 border-t border-gray-100"
    >
      <!-- Views -->
      <span class="flex items-center gap-1"> 👁️ {{ post.views ?? 0 }} </span>

      <!-- Likes -->
      <span class="flex items-center gap-1">
        ❤️ {{ post.reactions?.likes ?? 0 }}
      </span>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
