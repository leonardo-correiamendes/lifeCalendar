<template>
    <div
        class="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4"
    >
        <div class="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
            <div class="flex flex-col gap-6">
                <div>
                    <label
                        for="birth"
                        class="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Date de naissance
                    </label>
                    <input
                        type="date"
                        v-model="birthDate"
                        :max="today.toISOString().split('T')[0]"
                        :min="'1930-01-01'"
                        class="border border-gray-300 p-2 rounded max-w-xs"
                    />
                </div>

                <div class="max-w-md mx-auto px-4 py-6 bg-white rounded shadow">
                    <div class="mb-4 flex items-center gap-4 text-sm">
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
                    <div class="text-sm text-gray-800 space-y-1">
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

                <div
                    class="p-4 bg-gray-50 rounded-md border border-gray-200 space-y-6"
                >
                    <div
                        v-for="(decade, dIndex) in decades"
                        :key="dIndex"
                        class="space-y-2 p-4 rounded-md bg-white border border-gray-200 shadow-sm"
                    >
                        <h3 class="text-sm font-semibold text-gray-500">
                            Décennie {{ dIndex * 10 + 1 }} –
                            {{ (dIndex + 1) * 10 }}
                        </h3>

                        <div
                            v-for="year in decade"
                            :key="year.year"
                            class="flex items-center gap-2 justify-center"
                        >
                            <div class="w-10 text-right text-xs text-gray-500">
                                {{ year.year }}
                            </div>

                            <div
                                class="grid gap-[2px]"
                                :style="{ '--cell': 'clamp(6px, 1.4vw, 12px)', gridTemplateColumns: 'repeat(52, var(--cell))' }"
                            >
                                <div
                                    v-for="week in year.weeks"
                                    :key="`${year.year}-${week.week}`"
                                    :class="[
                                        'h-[var(--cell)] w-[var(--cell)] rounded-sm opacity-0 animate-appear',
                                        (year.year - 1) * weeksPerYear +
                                            week.week <=
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePersistedRef } from "../composables/usePersistedRef.ts";

const maxAge = 90;
const weeksPerYear = 52;
const birthDate = usePersistedRef<string>("lc.birthdate", "");
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

const lifePercentageNumber = computed(
    () => (livedWeeks.value / totalWeeks) * 100
);

const lifePercentage = computed(() => lifePercentageNumber.value.toFixed(1));

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

const decades = computed(() => {
    const result = [];
    for (let i = 0; i < maxAge; i += 10) {
        result.push(lifeCalendar.slice(i, i + 10));
    }
    return result;
});
</script>

<style scoped>
@keyframes appear {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-appear {
    animation: appear 0.3s ease-out forwards;
}
</style>
