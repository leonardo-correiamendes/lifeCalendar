<template>
    <div
        class="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4"
    >
        <div class="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
            <div class="flex flex-col gap-1">
                <div class="mb-6">
                    <label
                        for="birth"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Date de naissance</label
                    >
                    <input
                        type="date"
                        v-model="birthDate"
                        :max="today.toISOString().split('T')[0]"
                        :min="'1930-01-01'"
                        class="border border-gray-300 p-2 rounded maw-w-xs"
                    />
                </div>
                <div
                    class="mb-6 max-w-md mx-auto px-4 py-6 bg-white rounded shadow"
                >
                    <div class="mb-4 flex items-center gap-3 text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 bg-teal-600 rounded-sm"></div>
                            <span>Semaines vécues</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div
                                class="w-4 h-4 bg-neutral-300 rounded-sm border border-gray-400"
                            ></div>
                            <span>Semaines à venir</span>
                        </div>
                    </div>
                    <div class="mb-6 text-sm text-gray-800">
                        <p>
                            <strong>{{ livedWeeks }}</strong> semaines vécues
                        </p>
                        <p>
                            <strong>{{ weeksRemaining }}</strong> semaines
                            restantes
                        </p>
                        <p>
                            <strong>{{ lifePercentage }}%</strong> de ta vie
                            potentielle déjà vécue
                        </p>
                    </div>
                </div>
                <div class="p-4 bg-gray-50 rounded-md border border-gray-200">
                    <div
                        v-for="year in lifeCalendar"
                        :key="year.year"
                        class="grid gap-[2px] mb-1 justify-center"
                        :style="{ gridTemplateColumns: 'repeat(52, 12px)' }"
                    >
                        <div
                            v-for="week in year.weeks"
                            :key="`${year.year}-${week.week}`"
                            :class="[
                                'h-[12px] w-[12px] rounded-sm',
                                'opacity-0 animate-appear',
                                (year.year - 1) * weeksPerYear + week.week <=
                                livedWeeks
                                    ? 'bg-teal-600'
                                    : 'bg-neutral-300',
                            ]"
                            :style="{
                                animationDelay: `${
                                    year.year * week.week * 0.0005
                                }s`,
                            }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const maxAge = 85;
const weeksPerYear = 52;
const birthDate = ref<string>("2005-08-13");
const today = new Date();
const totalWeeks = maxAge * weeksPerYear;

const msPerWeek = 1000 * 60 * 60 * 24 * 7;
const livedWeeks = computed(() => {
    const birth = new Date(birthDate.value);
    if (isNaN(birth.getTime())) return 0;
    return Math.floor((today.getTime() - birth.getTime()) / msPerWeek);
});

const weeksRemaining = computed(() => {
    return totalWeeks - livedWeeks.value;
});

const lifePercentage = computed(() => {
    return ((livedWeeks.value / totalWeeks) * 100).toFixed(1);
});

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

<style scoped></style>
