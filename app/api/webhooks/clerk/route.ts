import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { type UserWebhookEvent } from '@clerk/nextjs/server';

import { prisma_db } from '@/lib/db';

export async function POST(req: Request) {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!CLERK_WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    //get headers
    const headerPayload = headers();

    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    let event: UserWebhookEvent;

    // Verify the payload with the headers
    try {
        event = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as UserWebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400,
        });
    }

    // Get the ID and type
    const { id } = event.data;
    const eventType = event.type;

    if (eventType === 'user.created') {
        await prisma_db.user.create({
            data: {
                externalUserId: event.data.id,
                username: event.data.username!,
                imageUrl: event.data.image_url,
                stream: {
                    create: {
                        name: `${event.data.username}'s stream`,
                    },
                },
            },
        });
    }

    if (eventType === 'user.updated') {
        const currentUser = await prisma_db.user.findUnique({
            where: {
                externalUserId: event.data.id,
            },
        });
        if (!currentUser) {
            return new Response('User not found', { status: 404 });
        }
        await prisma_db.user.update({
            where: {
                externalUserId: currentUser.externalUserId,
            },
            data: {
                username: event.data.username!,
                imageUrl: event.data.image_url,
            },
        });
    }

    if (eventType === 'user.deleted') {
        await prisma_db.user.delete({
            where: {
                externalUserId: event.data.id,
            },
        });
    }

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    return new Response('Webhook Processed', {
        status: 200,
    });
}
