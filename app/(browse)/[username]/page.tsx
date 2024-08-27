import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUserName } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import { Actions } from './_components/actions';
import { isBlockedByUser } from '@/lib/block-service';
import { getSelfUser } from '@/lib/auth-service';
import { SuspenseWithLoaderFallback } from '@/components/SuspenseWithLoaderFallback';

type UserPageProps = {
    params: {
        username: string;
    };
};

const UserPage = async ({ params }: UserPageProps) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // const user = await getUserByUserName(params.username);

    // if (!user) {
    //     notFound();
    // }

    // const self = await getSelfUser();
    // const userIsBlocked = !!user.blockedBy.find((u) => u.blockerId === self.id);

    // const isFollowing = await isFollowingUser(user.id, self);
    // const iam_BlockedByThisUser = await isBlockedByUser(user.id, self);

    // if (iam_BlockedByThisUser) {
    //     notFound();
    // }

    return (
        <SuspenseWithLoaderFallback>
            <Test params={params} />
        </SuspenseWithLoaderFallback>
    );
};

const Test = async ({ params }: UserPageProps) => {
    await new Promise((resolve) => setTimeout(resolve, 300000));
    const user = await getUserByUserName(params.username);

    if (!user) {
        notFound();
    }

    const self = await getSelfUser();
    const userIsBlocked = !!user.blockedBy.find((u) => u.blockerId === self.id);

    const isFollowing = await isFollowingUser(user.id, self);
    const iam_BlockedByThisUser = await isBlockedByUser(user.id, self);

    if (iam_BlockedByThisUser) {
        notFound();
    }
    return (
        <div className='grid grid-cols-1 gap-4'>
            <p>User:</p> <pre className='[word-wrap:break-word] min-w-0 whitespace-pre-line'>{JSON.stringify(user, null, 2)}</pre>:{' '}
            <p>isFollowing: {`${isFollowing}`}</p>
            <Actions userId={user.id} isFollowing={isFollowing} userIsBlocked={userIsBlocked} />
        </div>
    );
};

export default UserPage;
