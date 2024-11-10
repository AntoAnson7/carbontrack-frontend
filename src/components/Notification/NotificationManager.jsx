import React, { useEffect, useState } from 'react';
import { notification } from 'antd';

const NotificationManager = ({ activeGoal }) => {
    useEffect(() => {
        let interval;

        if (activeGoal) {
            interval = setInterval(() => {
                notification.success({
                    message: 'Stay on Track with Your Goal!',
                    description: `Remember to stay within your CO₂ emissions goal of ${activeGoal.daily_goal} kg CO₂ today. Try using public transport or reducing energy usage to help meet your target!`,
                    placement: 'topRight',
                    duration: 5,
                });
            }, 10000); 
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeGoal]);

    return null;
};

export default NotificationManager;
