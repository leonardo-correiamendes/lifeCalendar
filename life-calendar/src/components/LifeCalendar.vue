<template>
    <div class="flex flex-col gap-1">
        <div class="mb-4">
            <label for="birth" class="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <input type="date" v-model="birthDate" class="border border-gray-300 p-2 rounded">
        </div>
        <div v-for="year in lifeCalendar" :key="year.year" class="flex flex-wrap gap-[2px]">
            <div v-for="(week, i) in year.weeks" :key="`${year.year}-${week.week}`" :class="['w-3 h-3', (year.year - 1) * weeksPerYear + week.week <= livedWeeks ? 'bg-blue-600' : 'bg-gray-200']"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const maxAge = 85;
const weeksPerYear = 52;
const birthDate = ref<string>('2005-08-13'); 
const today = new Date();

const msPerWeek = 1000 * 60 * 60 * 24 * 7;
const livedWeeks = computed(() => {
    const birth = new Date(birthDate.value)
    if (isNaN(birth.getTime())) return 0;
    return Math.floor((today.getTime() - birth.getTime()) / msPerWeek);
})

const lifeCalendar = Array.from({ length: maxAge }, (_, yearIndex) => {
    return {
        year: yearIndex + 1,
        weeks: Array.from({ length: weeksPerYear }, (_, weekIndex) => {
            return {
                year: yearIndex + 1,
                week: weekIndex + 1,
            };
        }),
    };
});
</script>

<style scoped>
/* On utilisera surtout Tailwind, mais tu peux ajouter du CSS ici si besoin */
</style>
