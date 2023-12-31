import SideNav from '@/app/ui/dashboard/sidenav';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
  };

export default function Layout ({ children }: { children: React.ReactNode}) {
    {/* layout component recieves a children prop. the child can either be a page or another layout. In this case the pages inside /dashboard will automatically be nested inside a Layout component. */}

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className='w-full flex-none md:w-64'>
                <SideNav />
            </div>
            <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
        </div>
    )
}