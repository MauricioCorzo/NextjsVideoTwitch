'use server';

import { revalidatePath } from 'next/cache';
import { prisma_db } from '@/lib/db';
import { Stream } from '@prisma/client';
import { getSelfUser } from '@/lib/auth-service';

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelfUser();
        const selfStrem = await prisma_db.stream.findUnique({
            where: { userId: self.id },
        });

        if (!selfStrem) throw new Error('Stream not found');

        const validData: Partial<Stream> = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed,
        };

        const stream = await prisma_db.stream.update({
            where: {
                id: selfStrem.id,
            },
            data: {
                ...validData,
            },
        });

        revalidatePath(`/you/${self.username}/chat`);
        revalidatePath(`/you/${self.username}`);
        revalidatePath(`/${self.username}`);

        return stream;
    } catch (error) {
        throw new Error('Internal Error');
    }
};
