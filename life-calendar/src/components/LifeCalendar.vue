<template>
    <div
        class="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-start py-10 px-4"
    >
        <div
            class="w-full max-w-5xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
            <div class="flex flex-col gap-6">
                <!-- Thème -->
                <div class="flex items-center gap-2 ml-auto">
                    <label class="text-xs text-gray-500 dark:text-gray-400"
                        >Thème</label
                    >
                    <ThemeToggle />
                </div>

                <!-- Saisie date de naissance -->
                <div>
                    <label
                        for="birth"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                    >
                        Date de naissance
                    </label>
                    <input
                        id="birth"
                        type="date"
                        v-model="birthDateInput"
                        :max="todayStr"
                        :min="minBirthStr"
                        @change="onBirthInputChange"
                        class="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-2 rounded max-w-xs"
                    />
                </div>

                <!-- Stats -->
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
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 relative">
                                <span
                                    class="absolute inset-0 border border-amber-400"
                                ></span>
                            </div>
                            <span class="text-gray-700 dark:text-gray-200"
                                >Jalon</span
                            >
                        </div>
                    </div>

                    <div
                        class="text-sm text-gray-800 dark:text-gray-100 space-y-2"
                    >
                        <p>
                            <strong>{{ livedWeeks }}</strong> semaines vécues
                        </p>
                        <p>
                            <strong>{{ weeksRemaining }}</strong> semaines
                            restantes
                        </p>
                        <p>
                            <strong>{{ lifePercentage }}</strong
                            >% de ta vie potentielle déjà vécue
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

                <!-- ÉDITEUR MILESTONES -->
                <MilestoneForm
                    :total-weeks="totalWeeks"
                    @add="onAddMilestone"
                />

                <!-- Liste Milestones -->
                <div v-if="milestones.length" class="max-w-md mx-auto w-full">
                    <h3
                        class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2"
                    >
                        Jalons
                    </h3>
                    <ul class="space-y-2">
                        <li
                            v-for="m in milestones"
                            :key="m.id"
                            class="flex items-center justify-between rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                        >
                            <div class="text-sm">
                                <div
                                    class="font-medium text-gray-800 dark:text-gray-100"
                                >
                                    {{ m.label }}
                                </div>
                                <div
                                    class="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    Semaine {{ m.weekIndex }}
                                </div>
                            </div>
                            <button
                                class="text-xs px-2 py-1 rounded-md border border-red-300/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                @click="removeMilestone(m.id)"
                            >
                                Supprimer
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- CALENDRIER -->
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
                                        'h-[var(--cell)] w-[var(--cell)] rounded-sm box-content relative',
                                        (year.year - 1) * weeksPerYear +
                                            week.week <
                                        animationCutOff
                                            ? 'opacity-0 animate-appear'
                                            : '',
                                        (year.year - 1) * weeksPerYear +
                                            week.week <=
                                        livedWeeks
                                            ? 'bg-teal-600'
                                            : 'bg-neutral-300 dark:bg-neutral-600',
                                        milestoneSet.has(
                                            (year.year - 1) * weeksPerYear +
                                                week.week
                                        )
                                            ? 'after:absolute after:inset-0 after:border after:border-amber-400 after:pointer-events-none'
                                            : '',
                                    ]"
                                    :style="{
                                        animationDelay: `${
                                            year.year * week.week * 0.0005
                                        }s`,
                                    }"
                                    :title="
                                        milestoneLabelMap.get(
                                            (year.year - 1) * weeksPerYear +
                                                week.week
                                        ) || ''
                                    "
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
import { computed, ref } from "vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { usePersistedRef } from "../composables/usePersistedRef";
import { useNow } from "../composables/useNow";
import MilestoneForm from "@/components/MilestoneForm.vue";
import { useMilestones } from "../composables/useMilestones";

const maxAge = 90;
const weeksPerYear = 52;
const msPerWeek = 1000 * 60 * 60 * 24 * 7;

const minBirthStr = "1930-01-01";
const today = new Date();
const todayStr = today.toISOString().split("T")[0];

const birthDate = usePersistedRef<string>("lc.birthdate", "");
const birthDateInput = ref(birthDate.value); // buffer input pour clamp à la validation

function clampDateStr(iso: string): string {
    const min = new Date(minBirthStr);
    const max = new Date(todayStr);
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    if (d < min) return minBirthStr;
    if (d > max) return todayStr;
    return iso;
}
function onBirthInputChange() {
    const clamped = clampDateStr(birthDateInput.value);
    birthDateInput.value = clamped;
    birthDate.value = clamped;
}

const totalWeeks = maxAge * weeksPerYear;
const now = useNow();

const livedWeeks = computed(() => {
    const birth = new Date(birthDate.value);
    if (isNaN(birth.getTime())) return 0;
    return Math.floor((now.value - birth.getTime()) / msPerWeek);
});

const weeksRemaining = computed(() => {
    return Math.max(0, totalWeeks - livedWeeks.value);
});

const lifePercentageNumber = computed(
    () => (livedWeeks.value / totalWeeks) * 100
);
const lifePercentage = computed(() => lifePercentageNumber.value.toFixed(1));
const lifePct = computed(() =>
    Math.max(0, Math.min(100, lifePercentageNumber.value))
);

// Grille années/semaines
const lifeCalendar = Array.from({ length: maxAge }, (_, yearIndex) => ({
    year: yearIndex + 1,
    weeks: Array.from({ length: weeksPerYear }, (_, weekIndex) => ({
        year: yearIndex + 1,
        week: weekIndex + 1,
    })),
}));

const decades = computed(() => {
    const result: (typeof lifeCalendar)[] = [];
    for (let i = 0; i < maxAge; i += 10) {
        result.push(lifeCalendar.slice(i, i + 10));
    }
    return result;
});

// Âge exact
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

const animationCutOff = 52 * 15;

// ==== Milestones (jalons) ====
const { milestones, milestoneSet, addMilestone, removeMilestone } =
    useMilestones();

function onAddMilestone(p: { label: string; weekIndex: number }) {
    addMilestone(p.label, p.weekIndex);
}

const milestoneLabelMap = computed(() => {
    const map = new Map<number, string>();
    for (const x of milestones.value) {
        map.set(x.weekIndex, x.label);
    }
    return map;
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
