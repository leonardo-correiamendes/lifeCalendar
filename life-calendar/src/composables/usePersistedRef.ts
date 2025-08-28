import { ref, watch } from "vue";
export function usePersistedRef<T>(key: string, initial: T) {
    const v = ref<T>(initial);
    const raw = localStorage.getItem(key);
    if (raw != null) {
        try {
            v.value = JSON.parse(raw) as T;
        } catch {}
    }
    watch(v, (val) => localStorage.setItem(key, JSON.stringify(val)));
    return v;
}
