import type { PageProps } from "@/types/inertia";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export function useFlashToast() {
    const page = usePage<PageProps>();
    const { flash } = page.props;

    useEffect(() => {
        if(flash?.success) {
            toast.success(flash.success);
        }
        if(flash?.error) {
            toast.error(flash.error);
        }
    }, [flash])
}