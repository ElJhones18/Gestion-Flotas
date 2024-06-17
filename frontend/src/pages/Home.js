import homeImage from '../uploads/images/home.png';
import img1 from '../uploads/images/1.png';
import img2 from '../uploads/images/2.png';
import img3 from '../uploads/images/3.png';
import { Carousel, Card, Col, Row } from 'antd';
import { AppstoreTwoTone, TabletTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

export const Home = () => {

    // const contentStyle = {
    //     height: '460px',
    //     color: '#fff',
    //     // lineHeight: '160px',
    //     // lineHeight: '160px',
    //     // textAlign: 'center',
    //     background: '#364d79',
    // };

    if (localStorage.getItem('role') === 'Admin') {
        return (

            <div style={{ position: 'fixed', top: "80px", left: "200px", width: '100%', height: '100%', overflow: 'hidden' }}>
                <img src={homeImage} alt="Home" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRight: 'none' }} />
            </div>
        );
    } else {
        return (
            <div>
                <Carousel autoplay>
                    <div>
                        <img src={img2} alt="Image 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <img src={img1} alt="Image 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <img src={img3} alt="Image 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </Carousel>

                <Row style={{ padding: '20px' }} gutter={16}>
                    <Col span={8}>
                        <Link to={ROUTES.MY_TASKS}>
                            <Card bordered={false}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <AppstoreTwoTone style={{ fontSize: '100px' }} /><br />
                                    <h4 style={{ fontSize: '20px' }}>Mis Tareas</h4>
                                </div>
                            </Card>
                        </Link>
                    </Col>

                    <Col span={8}>
                        <Link to={ROUTES.DRIVER_PORTAL}>
                            <Card bordered={false}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <TabletTwoTone style={{ fontSize: '100px' }} /> <br />
                                    <h4 style={{ fontSize: '20px' }}>Portal de conductor</h4>
                                </div>
                            </Card>
                        </Link>
                    </Col>

                    <Col span={8}>
                        <Link to={ROUTES.CHECKLIST}>
                            <Card bordered={false}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <ProfileTwoTone style={{ fontSize: '100px' }} /><br />
                                    <h4 style={{ fontSize: '20px' }}>Realizar checklist</h4>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }
};
