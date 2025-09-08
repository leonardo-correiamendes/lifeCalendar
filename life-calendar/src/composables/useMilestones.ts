import { computed } from "vue";
import { usePersistedRef } from "./usePersistedRef";

export interface Milestone {
    id: string;
    label: string;
    weekIndex: number;
    color?: string | null;
}

const KEY = "lc.milestones";

export function useMilestones() {
    const milestones = usePersistedRef<Milestone[]>(KEY, []);

    const milestoneSet = computed(() => {
        const s = new Set<number>();
        for (const m of milestones.value) s.add(m.weekIndex);
        return s;
    });

    function addMilestone(label: string, weekIndex: number, color?: string) {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const clean = String(label).trim();
        if (!clean) return;
        milestones.value = [
            ...milestones.value,
            { id, label: clean, weekIndex, color: color ?? null },
        ];
    }

    function removeMilestone(id: string) {
        milestones.value = milestones.value.filter((m) => m.id !== id);
    }

    function updateMilestone(id: string, patch: Partial<Milestone>) {
        milestones.value = milestones.value.map((m) =>
            m.id === id ? { ...m, ...patch } : m
        );
    }

    function clearMilestones() {
        milestones.value = [];
    }

    return {
        milestones,
        milestoneSet,
        addMilestone,
        removeMilestone,
        updateMilestone,
        clearMilestones,
    };
}
