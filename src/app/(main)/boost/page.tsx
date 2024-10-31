'use client';

import { Battery, Coin, Energy, Finger } from "@/components/Icon";
import { Navbar } from "@/components/shared/Navbar";
import { useEffect, useState } from "react";
import ApiService from '@/components/api/ApiService';
import { useLaunchParams } from '@telegram-apps/sdk-react';

export default function Page() {
    const [balance, setBalance] = useState(0);
    const [energy, setEnergy] = useState({ current: 0, max: 6 });
    const [boosters, setBoosters] = useState([]);
    const lp = useLaunchParams();
    const userId = lp.initData?.user?.id;

    useEffect(() => {
        if (userId) {
            ApiService.getUserInfo(userId).then(response => {
                setBalance(response.data.balance);
                setEnergy({ current: response.data.energyCurrent, max: response.data.energyMax });
            }).catch(error => console.error("Error fetching user data:", error));

            ApiService.getBoosters().then(response => {
                setBoosters(response.data);
            }).catch(error => console.error("Error fetching boosters:", error));
        }
    }, [userId]);

    return (
        <div className="flex flex-col h-screen items-stretch px-4 pt-4 pb-[80px]" style={{ background: 'url(/images/bg.jpg) no-repeat top center', backgroundSize: '100%' }}>
            <div className={"flex items-center flex-col mb-4"}>
                <div className="mb-4">Ваш баланс</div>
                <div className="mx-auto flex items-center gap-3 mb-4">
                    <div className="relative w-9">
                        <Coin />
                    </div>
                    <span className="text-4xl">{balance.toLocaleString()}</span>
                </div>
            </div>
            <div className="mb-7">
                <div className="text-lg mb-4">
                    Бесплатные ежедневные усилители
                </div>
                <div className="rounded-xl p-2.5 flex items-center border border-white border-opacity-30">
                    <div className="relative w-[54px] aspect-square mr-3">
                        <Energy />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="leading-none font-normal text-md">Полная энергия</div>
                        <div className="text-sm">Доступно {energy.current}/{energy.max}</div>
                    </div>
                </div>
            </div>
            <div className="mb-7">
                <div className="text-lg mb-4">
                    Усилители
                </div>
                {boosters.map((booster, index) => (
                    <div key={index} className="rounded-xl p-2.5 flex items-center border border-white border-opacity-30 mb-2">
                        <div className="relative w-[54px] aspect-square mr-3">
                            {booster.icon === "Finger" ? <Finger /> : <Battery />}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="leading-none font-normal text-md">{booster.name}</div>
                            <div className="flex items-center gap-1">
                                <div className="relative w-4">
                                    <Coin />
                                </div>
                                <span className="text-sm">{booster.price.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Navbar />
        </div>
    );
}
