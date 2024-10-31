'use client'

import { Repeat } from "@/components/Icon";
import { Navbar } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/Button";
import { FriendCard } from "@/components/ui/FriendCard";
import { InviteCard } from "@/components/ui/InviteCard";
import { useUtils } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import ApiService from '@/components/api/ApiService';

const items = [
    { title: 'Пригласи 3 друзей', image: '/images/friends/1.png', income: '+175К' },
    { title: 'Пригласи 7 друзей', image: '/images/friends/2.png', income: '+175К' },
    { title: 'Пригласи 10 друзей', image: '/images/friends/3.png', income: '+175К' },
    { title: 'Пригласи 25 друзей', image: '/images/friends/4.png', income: '+175К' },
];

export default function Page() {
    const utils = useUtils();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const userId = 123; // Замените на актуальный user_id
                const response = await ApiService.get(`/api/user/referral/${userId}`);
                setFriends(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке друзей:", error);
            }
        };

        fetchFriends();
    }, []);

    return (
        <div className="flex flex-col relative pb-[140px] h-screen" style={{ background: 'url(/images/bg.jpg) no-repeat top center', backgroundSize: '100%' }}>
            <div className="overflow-auto px-4 pt-4">
                <div className="text-[28px] text-center mb-4">Пригласите друзей!</div>
                <div className="font-normal text-md text-center mb-4">Вы и ваш друг получите бонусы</div>
                <div className="flex flex-col gap-2 mb-8">
                    {items.map((item, index) => (
                        <InviteCard key={index} {...item} />
                    ))}
                </div>
                <div className="flex items-center mb-5 justify-between">
                    <div className="text-lg">Список ваших друзей ({friends.length})</div>
                    <Repeat />
                </div>
                <div className="flex flex-col gap-2 mb-8">
                    {friends.map((friend, index) => (
                        <FriendCard key={index} name={friend.username} income={friend.balance} balance={friend.balance} />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-[96px] right-4 left-4">
                <Button onClick={() => utils.shareURL('https://google.com', 'Invite')}>Пригласить друга</Button>
            </div>
            <Navbar />
        </div>
    );
}
