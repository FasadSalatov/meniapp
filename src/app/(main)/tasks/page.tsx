'use client'

import { ArrowRight, Coin, Instagram, Telegram, Youtube } from "@/components/Icon";
import { Navbar } from "@/components/shared/Navbar";
import { useState, useEffect } from "react";
import axios from 'axios';
import Image from 'next/image';
import ApiService from '@/components/api/ApiService'; // Импортируем ApiService
import { useLaunchParams } from '@telegram-apps/sdk-react';

const API_URL = 'https://spacetest.shop/api';

export default function Page() {
    const [tab, setTab] = useState('finances');
    const [tasks, setTasks] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const lp = useLaunchParams();
    const userId = lp.initData?.user?.id;

    useEffect(() => {
        async function fetchData() {
            try {
                const [tasksRes, userRes] = await Promise.all([
                    ApiService.getUserTasks(userId),
                    ApiService.getUserInfo(userId),
                ]);
                setTasks(tasksRes.data);
                setUserInfo(userRes.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        }
        fetchData();
    }, []);

    const handleTaskComplete = async (taskId) => {
        try {
            await ApiService.markTaskAsDone(userId, taskId);
            setTasks(prevTasks => prevTasks.map(task => 
                task.id === taskId ? { ...task, isDone: true } : task
            ));
        } catch (error) {
            console.error("Ошибка при выполнении задачи:", error);
        }
    };

    return (
        <div className="flex flex-col relative pb-[60px] h-screen" style={{ background: 'url(/images/bg.jpg) no-repeat top center', backgroundSize: '100%' }}>
            <div className="overflow-auto px-4 pt-4">
                <div className="text-[28px] text-center mb-4">Задания</div>

                {/* Ежедневные задания */}
                <div className="mb-7">
                    <div className="text-lg mb-4">Ежедневные задания</div>
                    {tasks.map((task) => (
                        <div key={task.id} className={`rounded-xl p-2.5 flex items-center border mb-2 border-white border-opacity-30 ${task.isDone ? 'opacity-50' : ''}`}>
                            <div className="relative w-[54px] aspect-square mr-3">
                                <Youtube />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="leading-none font-normal text-md">{task.description}</div>
                                <div className="flex items-center gap-1">
                                    <div className="relative w-4"><Coin /></div>
                                    <span className="text-sm">+567</span>
                                </div>
                            </div>
                            {!task.isDone && <ArrowRight onClick={() => handleTaskComplete(task.id)} />}
                        </div>
                    ))}
                </div>

                {/* Список заданий */}
                <div className="mb-7">
                    <div className="text-lg mb-4">Список заданий</div>
                    <div className="rounded-xl p-2.5 flex items-center border mb-2 border-white border-opacity-30">
                        <div className="relative w-[54px] aspect-square mr-3"><Instagram /></div>
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="leading-none font-normal text-md">Подписаться в Instagram</div>
                            <div className="flex items-center gap-1">
                                <div className="relative w-4"><Coin /></div>
                                <span className="text-sm">+567</span>
                            </div>
                        </div>
                        <ArrowRight />
                    </div>
                    <div className="rounded-xl p-2.5 flex items-center border mb-2 border-white border-opacity-30">
                        <div className="relative w-[54px] aspect-square mr-3"><Telegram /></div>
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="leading-none font-normal text-md">Подписаться в Телеграм</div>
                            <div className="flex items-center gap-1">
                                <div className="relative w-4"><Coin /></div>
                                <span className="text-sm">+567</span>
                            </div>
                        </div>
                        <ArrowRight />
                    </div>
                </div>

                {/* Задания платформы */}
                <div className="mb-7">
                    <div className="text-lg mb-4">Задания платформы</div>
                    <div className="rounded-xl p-2.5 flex items-center border mb-2 border-white border-opacity-30">
                        <div className="flex mr-3 gap-2">
                            <div className="relative w-[54px] aspect-square">
                                <Image fill alt="" src="/images/tasks/1.png" className="rounded-lg" objectFit="cover" />
                            </div>
                            <div className="relative w-[54px] aspect-square">
                                <Image fill alt="" src="/images/tasks/2.png" className="rounded-lg" objectFit="cover" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 flex-1 pr-5">
                            <div className="leading-none font-normal text-md">Зарегистрируйтесь на платформе CWI</div>
                            <div className="flex items-center gap-1">
                                <div className="relative w-4"><Coin /></div>
                                <span className="text-sm">+567</span>
                            </div>
                        </div>
                        <ArrowRight />
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    );
}
