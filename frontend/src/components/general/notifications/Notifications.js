
import React, { useState, useEffect } from 'react';
import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Badge, Popover, List, Button } from 'antd';
import { PATHS } from '../../../utils/config';
import axios from 'axios';

const Notifications = () => {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.GET_NOTIFICATIONS_BY_EMAIL + localStorage.getItem('user');
            // console.log(URL);
            const response = await axios.get(URL);
            // console.log(response.data);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    const handleMarkAsRead = async (notification) => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.UPDATE_NOTIFICATION + notification.id;
            const response = await axios.patch(URL, { read: true });
            if (response.status === 200) {
                const updatedNotifications = notifications.map((item) => {
                    if (item.id === notification.id) {
                        return { ...item, read: true };
                    }
                    return item;
                });
                setNotifications(updatedNotifications);
            }
        } catch (error) {
            console.error('Error updating notification:', error);
        }
    };

    const renderNotificationItem = (notification) => (
        <List.Item style={{ width: '300px' }}>
            <List.Item.Meta
                title={notification.type}
                description={notification.description}
            />
            {
                notification.read
                    ? null
                    : <CheckCircleOutlined
                        onClick={() => handleMarkAsRead(notification)}
                        style={{ fontSize: '24px', cursor: 'pointer', color: 'blue', marginLeft: '5px' }} />
            }
        </List.Item>
    );

    const content = (
        <List
            dataSource={notifications}
            renderItem={renderNotificationItem}
        />
    );

    const notificationCount = notifications.filter((item) => !item.read).length;

    return (
        <Popover
            content={content}
            trigger="click"
            open={visible}
            onOpenChange={handleVisibleChange}
        >
            <Badge count={notificationCount}>
                <BellOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
            </Badge>
        </Popover>
    );
};

export default Notifications;
