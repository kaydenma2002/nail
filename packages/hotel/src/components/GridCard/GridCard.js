import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import GridCardWrapper, {
  ImageWrapper,
  FavoriteIcon,
  ContentWrapper,
  LocationArea,
  TitleArea,
  PriceArea,
  MetaWrapper,
  buttonStyle,
} from './GridCard.style';
import { width } from 'styled-system';

const GridCard = ({
  className,
  favorite,
  street_address,
  image,
  name,
  price,
  children,
}) => {
  const [timeLabels, setTimeLabels] = useState([]);

  useEffect(() => {
    const generateTimeLabels = (startTime, interval, numberOfButtons) => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      const labels = [];

      for (let i = 0; i < numberOfButtons; i++) {
        const startHour = currentHour + (currentMinutes > startTime ? 1 : 0);
        const hour = startHour + Math.floor((i * interval) / 60);
        const minutes = (startHour * 60 + startTime + i * interval) % 60;

        labels.push(`${hour}:${String(minutes).padStart(2, '0')}`);
      }

      return labels;
    };

    // Generate time labels for 3 buttons starting at 30 minutes intervals
    const labels = generateTimeLabels(30, 45, 3);
    setTimeLabels(labels);
  }, []); // Run once when the component mounts

  let classes = className;

  return (
    <GridCardWrapper className={`grid_card ${classes}`.trim()}>
      <ContentWrapper className="content_wrapper">
        <div>{image && <img src={image}></img>}</div>
        {street_address && <LocationArea>{street_address}</LocationArea>}
        {name && <TitleArea>{name}</TitleArea>}

        <MetaWrapper className="meta_wrapper">
          {price && <PriceArea className="price">{price}</PriceArea>}
        </MetaWrapper>

        <div
          className="button-container"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {timeLabels.map((label, index) => (
            <Button key={index} type="primary" style={buttonStyle}>
              {label}
            </Button>
          ))}
        </div>
      </ContentWrapper>

      {favorite && <FavoriteIcon>{favorite}</FavoriteIcon>}
    </GridCardWrapper>
  );
};

GridCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  price: PropTypes.string,
  street_address: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default GridCard;
