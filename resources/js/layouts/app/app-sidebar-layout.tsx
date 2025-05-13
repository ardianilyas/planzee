import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [], title, desc }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], title: string, desc: string }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className='p-6 min-h-screen h-full w-full max-w-7xl'>

                    {title && <h1 className="text-2xl font-medium">{title}</h1>}

                    {desc && <p className="text-muted-foreground mb-6">{desc}</p>}

                    {children}
                    
                </div>
            </AppContent>
        </AppShell>
    );
}
