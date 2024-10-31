import Image from 'next/image';
import { ArrowRight, Profile, Safe } from "@/components/Icon";
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import ApiService from '@/components/api/ApiService'; // Импортируем ApiService

export const Header = () => {
    const lp = useLaunchParams();
    const userId = lp.initData?.user?.id;

    // Локальные состояния для отображения данных API
    const [balance, setBalance] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (userId) {
            ApiService.initialize(userId).then(() => {
                // Обновляем состояния после инициализации данных
                setBalance(ApiService.userInfo?.balance);
                setUserName(ApiService.userInfo?.username);
            });
        }
    }, [userId]);

    return (
        <div className="flex flex-col gap-2.5 justify-center px-4 pb-4 pt-3 relative z-10">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Profile width={32} />
                    <div className="text-xs text-nowrap">
                        {lp.initData?.user?.firstName} {lp.initData?.user?.lastName || userName}
                    </div>
                </div>
                <div className="flex gap-1.5">
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-[8px] opacity-50 leading-none mb-1">Пассивный доход в месяц</span>
                        <span className="text-xl leading-none">{balance ? `+${balance}K` : 'Загрузка...'}</span>
                    </div>
                    <div className="w-[42px] aspect-square relative">
                        <Safe />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-stretch">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <span className="text-[10px]">Уличный пацан</span>
                        <ArrowRight width={12} />
                    </div>
                    <div className="text-[10px]">
                        4 <span className="opacity-50">/ 10</span>
                    </div>
                </div>
                <div className="relative w-full h-2.5 rounded-md overflow-hidden">
                    <Image
                        fill
                        alt=""
                        src="/images/progress.png"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    );
};
