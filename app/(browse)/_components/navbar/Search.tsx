'use client';
import { FormEvent, useState } from 'react';
import qs from 'query-string';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const SearchInput = () => {
    const router = useRouter();

    const [value, setValue] = useState('');

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value) return;

        const url = qs.stringifyUrl(
            {
                url: '/search',
                query: { term: value },
            },
            { skipEmptyString: true }
        );

        router.push(url);
    };

    const onClear = () => setValue('');

    return (
        <>
            <form className='relative w-full lg:w-[400px] flex items-center gap-2 mx-auto' onSubmit={onSubmit}>
                <label className='w-full flex items-center justify-between gap-1 pr-2 bg-background rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
                    <Input
                        placeholder='Search'
                        className='border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 '
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <div className='w-5 flex-shrink-0'>
                        {value && (
                            <X className='w-5 flex-shrink-0 text-muted-foreground cursor-pointer hover:opacity-75 transition' onClick={onClear} />
                        )}
                    </div>
                </label>

                <Button title='Search' type='submit' size={'sm'} variant={'secondary'} className='flex-shrink-0'>
                    <SearchIcon className='w-5 text-muted-foreground' />
                </Button>
            </form>
        </>
    );
};
