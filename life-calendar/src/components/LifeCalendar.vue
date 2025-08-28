<template>
    <div
        class="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-10 px-4"
    >
        <div
            class="w-full max-w-5xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
            <div class="flex flex-col gap-6">
                <div class="flex items-center gap-2 ml-auto">
                    <label class="text-xs text-gray-500 dark:text-gray-400"
                        >Thème</label
                    >
                    <ThemeToggle />
                </div>

                <div>
                    <label
                        for="birth"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                        >Date de naissance</label
                    >
                    <input
                        type="date"
                        v-model="birthDate"
                        :max="today.toISOString().split('T')[0]"
                        :min="'1930-01-01'"
                        class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded max-w-xs"
                    />
                </div>

                <div
                    class="max-w-md mx-auto px-4 py-6 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700"
                >
                    <div class="mb-4 flex items-center gap-4 text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 bg-teal-600 rounded-sm"></div>
                            <span class="text-gray-700 dark:text-gray-200"
                                >Semaines vécues</span
                            >
                        </div>
                        <div class="flex items-center gap-2">
                            <div
                                class="w-4 h-4 bg-neutral-300 dark:bg-neutral-600 rounded-sm border border-gray-400 dark:border-neutral-500"
                            ></div>
                            <span class="text-gray-700 dark:text-gray-200"
                                >Semaines à venir</span
                            >
                        </div>
                    </div>
                    <div
                        class="text-sm text-gray-800 dark:text-gray-100 space-y-2"
                        aria-live="polite"
                    >
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
                        <div
                            class="h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden"
                        >
                            <div
                                class="h-full bg-teal-600"
                                :style="{ width: lifePct + '%' }"
                            ></div>
                        </div>
                        <p>
                            <strong>{{ ageExact?.y }}</strong> ans,
                            <strong>{{ ageExact?.m }}</strong> mois,
                            <strong>{{ ageExact?.d }}</strong> jours déjà vécus
                        </p>
                    </div>
                </div>

                <div
                    class="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-md border border-gray-200 dark:border-gray-700 space-y-6"
                >
                    <div
                        v-for="(decade, dIndex) in decades"
                        :key="dIndex"
                        class="space-y-2 p-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                        <h3
                            class="text-sm font-semibold text-gray-500 dark:text-gray-400"
                        >
                            Décennie {{ dIndex * 10 + 1 }} –
                            {{ (dIndex + 1) * 10 }}
                        </h3>

                        <div
                            v-for="year in decade"
                            :key="year.year"
                            class="flex items-center gap-2 justify-center"
                        >
                            <div
                                class="w-6 md:w-10 text-right text-xs text-gray-500 dark:text-gray-400"
                            >
                                {{ year.year }}
                            </div>

                            <div
                                class="grid gap-px sm:gap-[2px] [--cell:6px] sm:[--cell:8px] md:[--cell:10px] lg:[--cell:12px] max-w-full overflow-x-auto"
                                :style="{
                                    gridTemplateColumns:
                                        'repeat(52, var(--cell))',
                                }"
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
                                            : 'bg-neutral-300 dark:bg-neutral-600',
                                    ]"
                                    :style="{
                                        animationDelay: `${
                                            year.year * week.week * 0.0005
                                        }s`,
                                    }"
                                />
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
import ThemeToggle from "@/components/ThemeToggle.vue";
import { usePersistedRef } from "../composables/usePersistedRef.ts";
import { useNow } from "../composables/useNow.ts";


const maxAge = 90;
const weeksPerYear = 52;
const birthDate = usePersistedRef<string>("lc.birthdate", "");
const today = new Date();
const totalWeeks = maxAge * weeksPerYear;

const msPerWeek = 1000 * 60 * 60 * 24 * 7;

const now = useNow();

const livedWeeks = computed(() => {
    const birth = new Date(birthDate.value);
    if (isNaN(birth.getTime())) return 0;
    return Math.floor((now.value - birth.getTime()) / msPerWeek);
});

const weeksRemaining = computed(() => {
    Math.max(0, totalWeeks - livedWeeks.value);
});

const lifePercentageNumber = computed(
    () => (livedWeeks.value / totalWeeks) * 100
);

const lifePercentage = computed(() => lifePercentageNumber.value.toFixed(1));

const lifePct = computed(() => Math.max(0, Math.min(100, lifePercentageNumber.value)));

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

function diffYMD(from: Date, to: Date) {
    let y = to.getFullYear() - from.getFullYear();
    let m = to.getMonth() - from.getMonth();
    let d = to.getDate() - from.getDate();
    if (d < 0) {
        m--;
        d += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    }
    if (m < 0) {
        y--;
        m += 12;
    }
    return { y, m, d };
}

const ageExact = computed(() => {
    const birth = new Date(birthDate.value);
    if (isNaN(birth.getTime())) return null;
    const { y, m, d } = diffYMD(birth, new Date());
    return { y, m, d };
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
