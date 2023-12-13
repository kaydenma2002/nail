import React, { useState, useEffect } from 'react';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import Container from 'components/UI/Container/Container';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import useWindowSize from 'library/hooks/useWindowSize';
import CategorySearch from '../Search/CategorySearch/CategorySearch';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import axios from '../../../config/axios';
import FilterDrawer from '../Search/MobileSearchView';

import { LISTING_POSTS_PAGE, SINGLE_POST_PAGE } from 'settings/constant';

const TopHotelsGrid = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { width } = useWindowSize();
  const [posts, setPosts] = useState([]);
  let limit;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/get-nails');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(true);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once, similar to componentDidMount

  useEffect(() => {
    // Code that depends on the loaded data
    if (data && width <= 767) {
      setPosts(data.slice(0, 4));
      limit = 4;
    } else if (data && width >= 768 && width < 992) {
      setPosts(data.slice(0, 6));
      limit = 6;
    } else if (data && width >= 992 && width < 1200) {
      setPosts(data.slice(0, 8));
      limit = 8;
    } else if (data && width >= 1200) {
      setPosts(data.slice(0, 10));
      limit = 10;
    }
  }, [data, width]);

  return (
    <Container fluid={true}>
      <SectionTitle
        title={<Heading content="Customers’ Choice: Top nails" />}
        link={<TextLink link={LISTING_POSTS_PAGE} content="View All" />}
      />
      <Toolbar
        left={
          width > 991 ? (
            <CategorySearch location={location} />
          ) : (
            <FilterDrawer location={location} />
          )
        }
      />
      <SectionGrid
        link={SINGLE_POST_PAGE}
        columnWidth={[1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5]}
        data={posts}
        loading={loading}
        limit={limit}
        placeholder={<PostPlaceholder />}
      />
    </Container>
  );
};

export default TopHotelsGrid;
