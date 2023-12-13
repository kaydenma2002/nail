import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import TextLink from 'components/UI/TextLink/TextLink';
import Rating from 'components/UI/Rating/Rating';
import Favourite from 'components/UI/Favorite/Favorite';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GridCard from '../GridCard/GridCard';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const PostGrid = ({
  name,
  rating,
  street_address,
  price,
  ratingCount,

  slug,
  link,
}) => {
  return (
    <GridCard
      isCarousel={true}
      favorite={
        <Favourite
          onClick={(event) => {
            console.log(event);
          }}
        />
      }
      image="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      street_address={street_address}
      name={<TextLink link={`${link}/${slug}`} content={name} />}
      price={`$${price}/Night - Free Cancellation`}
      rating={<Rating rating={rating} ratingCount={ratingCount} type="bulk" />}
      viewDetailsBtn={
        <TextLink
          link={`${link}/${slug}`}
          icon={<FiExternalLink />}
          content="View Details"
        />
      }
    ></GridCard>
  );
};

export default PostGrid;
