'use client';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ConnectModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'primary'}>Generate connection</Button>
            </DialogTrigger>

            <DialogContent className='z-[80]'>
                <DialogHeader>
                    <DialogTitle>Generate connection</DialogTitle>
                </DialogHeader>

                <Select>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Ingress Type' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='RTMP'>RTMP</SelectItem>
                        <SelectItem value='WHIP'>WHIP</SelectItem>
                    </SelectContent>
                </Select>

                <Alert>
                    <AlertTriangle className='size-4' />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>This action will reset all active streams using the current connection.</AlertDescription>
                </Alert>

                <div className='flex justify-between items-center'>
                    <DialogClose>
                        <Button variant={'destructive'}>Cancel</Button>
                    </DialogClose>

                    <Button variant={'primary'} onClick={() => {}}>
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
