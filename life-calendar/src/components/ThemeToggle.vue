<script setup lang="ts">
import { useDark } from "../composables/useDark";
const { mode } = useDark(); // 'light' | 'dark' | 'system'
</script>

<template>
    <div
        role="tablist"
        class="inline-flex rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1 shadow-sm"
    >
        <button
            role="tab"
            :data-active="mode === 'light'"
            @click="mode = 'light'"
            class="inline-flex items-center justify-center rounded-2xl px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            :class="
                mode === 'light'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : ''
            "
            title="Clair"
        >
            <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
            >
                <circle cx="12" cy="12" r="4" />
                <path
                    d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364-1.414 1.414M8.05 17.95l-1.414 1.414m0-13.728 1.414 1.414M16.95 17.95l1.414 1.414"
                />
            </svg>
            <span class="ml-2 hidden sm:inline">Clair</span>
        </button>

        <button
            role="tab"
            :data-active="mode === 'dark'"
            @click="mode = 'dark'"
            class="inline-flex items-center justify-center rounded-2xl px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            :class="
                mode === 'dark'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : ''
            "
            title="Sombre"
        >
            <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <span class="ml-2 hidden sm:inline">Sombre</span>
        </button>

        <button
            role="tab"
            :data-active="mode === 'system'"
            @click="mode = 'system'"
            class="inline-flex items-center justify-center rounded-2xl px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            :class="
                mode === 'system'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : ''
            "
            title="Système"
        >
            <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
            >
                <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
                <path d="M2 20h20" />
            </svg>
            <span class="ml-2 hidden sm:inline">Système</span>
        </button>
    </div>
</template>
