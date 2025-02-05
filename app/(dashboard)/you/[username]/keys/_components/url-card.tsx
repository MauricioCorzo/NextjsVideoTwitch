'use client';

import { Input } from '@/components/ui/input';
import { CopyButton } from './CopyButton';

interface UrlCardProps {
    value: string | null;
}

export const UrlCard = ({ value }: UrlCardProps) => {
    return (
        <div className='rounded-xl bg-muted p-6'>
            <div className='flex items-center gap-10'>
                <p className='font-semibold shrink-0'>Server URL</p>
                <div className='space-y-2 w-full'>
                    <div className='w-full flex items-center gap-2'>
                        <Input value={value || ''} disabled placeholder='Server URL' />
                        <CopyButton value={value || ''} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// interface CardProps {
//     label: string;
//     value: string | null;
//     children?: ReactNode;
// }

// export const Card = ({ label, value, children }: CardProps) => {
//     return (
//         <div className='rounded-xl bg-muted p-6'>
//             <div className='flex items-center gap-10'>
//                 <p className='font-semibold shrink-0'>{label}</p>
//                 <div className='space-y-2 w-full'>
//                     <div className='w-full flex items-center gap-2'>
//                         <Input value={value || ''} disabled placeholder='Server URL' />
//                         <CopyButton value={value || ''} />
//                     </div>
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// };
