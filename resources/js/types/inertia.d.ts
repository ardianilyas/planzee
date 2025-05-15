import type { PageProps as InertiaPageProps } from '@inertiajs/core';
export interface PageProps extends InertiaPageProps {
    flash?: {
        success?: string,
        error?: string
    }
}