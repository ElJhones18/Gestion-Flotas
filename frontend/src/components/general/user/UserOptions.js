import { UserOutlined, UserDeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { List, Popover } from 'antd';
import { useState } from 'react';
import { ROUTES } from '../../../routes';
import { Link } from 'react-router-dom';

const UserOptions = () => {
    const [visible, setVisible] = useState(false);

    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    const content = (
        <List
            size="small"
            dataSource={
                localStorage.getItem('role') === 'Conductor'
                    ? [
                        { title: 'Portal del Conductor', icon: <InfoCircleOutlined />, route: ROUTES.DRIVER_PORTAL },
                        { title: 'Cerrar sesión', icon: <UserDeleteOutlined />, route: ROUTES.LOGOUT },
                    ]
                    : [
                        { title: 'Cerrar sesión', icon: <UserDeleteOutlined />, route: ROUTES.LOGOUT },
                    ]
            }
            renderItem={item => (
                <List.Item>
                    <Link to={item.route} style={{ color: 'black' }}>{item.icon} &nbsp;&nbsp; {item.title} </Link>
                </List.Item>
            )}
        />
    );

    return (
        <Popover
            content={content}
            trigger="click"
            open={visible}
            onOpenChange={handleVisibleChange}
        >
            <UserOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
        </Popover>
    );
};

export default UserOptions;