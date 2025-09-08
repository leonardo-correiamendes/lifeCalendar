<template>
    <form
        @submit.prevent="submit"
        class="maw-w-md mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-2 items-end p-4 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
        <div class="sm:col-span-2">
            <label class="block text-sm text-gray-600 dark:text-gray300 mb-1"
                >Label</label
            >
            <input
                v-model="label"
                type="text"
                placeholder="Ex: Diplôme, Mariage, etc..."
                class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
        </div>
        <div>
            <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                Semaine (1-{{ totalWeeks }})
            </label>
            <input
                v-model.number="week"
                type="number"
                :min="1"
                max="totalweeks"
                class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                inputmode="numeric"
            />
        </div>

        <div class="sm:col-span-3">
            <button
                type="submit"
                class="px-3 py-2 rounded-lg bg-teal-600 text-white text-sm hover:bg-teal-700"
            >
                Ajouter
            </button>
            <p v-if="error" class="mt-2 text-xs text-red-500">{{ error }}</p>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ totalWeeks: number }>();
const emit = defineEmits<{
    (e: "add", payload: { label: string; weekIndex: number }): void;
}>();

const label = ref("");
const week = ref<number | null>(null);
const error = ref<string | null>(null);

function submit() {
    error.value = null;
    const w = Number(week.value);
    if (!label.value.trim()) {
        error.value = "Label is required";
        return;
    }
    if (!Number.isFinite(w) || w < 1) {
        error.value = "La Semaine doit être >= 1";
        return;
    }
    emit("add", { label: label.value.trim(), weekIndex: w });
    label.value = "";
    week.value = null;
}
</script>
