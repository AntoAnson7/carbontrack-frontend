import React, { useEffect, useState } from 'react';
import { notification } from 'antd';

const NotificationManager = ({ activeGoal }) => {
    const [notificationInterval, setNotificationInterval] = useState(null);

    useEffect(() => {
        // Clear previous interval if any
        if (notificationInterval) {
            clearInterval(notificationInterval);
        }

        // Only set up notifications if there’s an active goal
        if (activeGoal) {
            const interval = setInterval(() => {
                notification.success({
                    message: 'Stay on Track with Your Goal!',
                    description: `Remember to stay within your CO₂ emissions goal of ${activeGoal.daily_goal} kg CO₂ today. Try using public transport or reducing energy usage to help meet your target!`,
                    placement: 'topRight',
                    duration: 5,
                });
            }, 10000); // Adjust to desired interval

            setNotificationInterval(interval);
        }

        // Clear interval on component unmount
        return () => clearInterval(notificationInterval);
    }, [activeGoal]);

    return null; // No visual output needed
};

export default NotificationManager;
