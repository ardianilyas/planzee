import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string,
    desc?: string,
}

export default ({ children, breadcrumbs, title = '', desc = '', ...props }: AppLayoutProps) => (
    <AppLayoutTemplate title={title} desc={desc} breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);