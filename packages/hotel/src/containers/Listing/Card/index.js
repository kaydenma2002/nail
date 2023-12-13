import { Col, Row } from 'antd';
import {Card, Flex, Typography } from 'antd';
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { margin } from 'styled-system';
import {
    GUEST_BOOKING_PAGE,
} from 'settings/constant';

export function CardComponent(props) {
    const navigate = useNavigate();
    const [timeList, setTimeList] = useState([]);
    const handleClick = (time) => {
        navigate(`${GUEST_BOOKING_PAGE}`);
        
    };
    useEffect(() => {
        const calculateTimes = () => {
            const now = new Date();

            const time1 = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
            const time2 = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
            const time3 = new Date(now.getTime() + 90 * 60 * 1000); // 1 hour 30 minutes from now
            const time4 = new Date(now.getTime() + 120 * 60 * 1000); // 2 hours from now

            const formattedTimes = [
                time1,
                time2,
                time3,
                time4,
            ].map(time => time.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: false }));

            setTimeList(formattedTimes);
        };

        // Call the function initially
        calculateTimes();

        // Set up an interval to update the times every minute
        const intervalId = setInterval(() => {
            calculateTimes();
        }, 60 * 1000);
        
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    return (
        <Card
            
            style={{
                width: '100%',
                display: 'flex', // Use flexbox for layout
            }}
        >
            {/* Image on the left */}
            <div style={{ flex: '1' }}>
                <Row>
                    <Col span={10}>
                        <img
                            alt="example"
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                    </Col>
                    <Col span={14}>
                        <div style={{ marginLeft: '16px', height: '100%' }}>
                            <Card title={props.name} bordered={false} style={{ height: '100%' }}>
                                <p>{props.address}</p>
                                <p>{props.phone}</p>
                                <div>
                                    <Row>
                                        {timeList.map((time, index) => (
                                            <Col xxl={8} xl={12} lg={12} md={12} sm={12} style={{marginTop:'5px',marginBottom:'5px'}}>

                                                <Button onClick={() => handleClick(time)} style={{ padding:'8px'}} variant="contained">{time}</Button>

                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                                {/* <p>{props.name}</p> */}
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* Content on the right */}
        </Card>
    )
}