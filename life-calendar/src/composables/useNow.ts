import { onBeforeMount, onMounted, ref } from "vue";

export function useNow(intervalMs = 60_000) {
    const now = ref(Date.now());
    let timer: number | undefined;

    onMounted(() => {
        if (typeof window !== "undefined") {
            timer = window.setInterval(() => {
                now.value = Date.now();
            }, intervalMs);
        }
    });

    onBeforeMount(() => {
        if (timer) {
            clearInterval(timer);
        }
    });

    return now;
}
