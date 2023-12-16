import React, { useState, Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { Checkbox } from 'antd';
import useWindowSize from 'library/hooks/useWindowSize';
import useDataApi from 'library/hooks/useDataApi';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import FilterDrawer from './Search/MobileSearchView';
import CategorySearch from './Search/CategorySearch/CategorySearch';
import ListingMap from './ListingMap';
import { SINGLE_POST_PAGE } from 'settings/constant';
import ListingWrapper, { PostsWrapper, ShowMapCheckbox } from './Listing.style';
import SearchArea from './Search/Search';
import { Button, Card, Flex, Typography } from 'antd';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { CardComponent } from './Card/index';
import axios from '../../config/axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Listing(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-nails?page=${page}`);
        setData(response.data.nails);
        setTotal(response.data.total_count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(1);
    fetchData();
  }, [page]);
  const handleChange = (event, value) => {
    if (value === page) {
      return; // Do nothing if the value is the same
    }

    // Update the page state
    setPage(value);

    // Perform other actions if needed
    console.log(value);
  };
  const location = useLocation();
  const pathname = location.pathname;

  const { width } = useWindowSize();

  const handleMapToggle = () => {
    setShowMap((showMap) => !showMap);
  };

  return (
    <>
      <ListingWrapper>
        <Sticky top={82} innerZ={10} activeClass="isHeaderSticky">
          <Toolbar
            left={
              width > 991 ? (
                <CategorySearch location={location} />
              ) : (
                <FilterDrawer location={location} />
              )
            }
            right={
              <ShowMapCheckbox>
                <Checkbox defaultChecked={false} onChange={handleMapToggle}>
                  Show map
                </Checkbox>
              </ShowMapCheckbox>
            }
          />
        </Sticky>
        <SearchArea />
        <div style={{ marginTop: '1rem' }}></div>
        {data.map((item, index) => (
          <Row gutter={[16, 16]} key={index} justify="center">
            <Col xs={2} sm={4} md={6} lg={8} xl={7}></Col>
            <Col style={{padding:'1rem'}} span={6} xs={20} sm={16} md={12} lg={8} xl={8}>
              <CardComponent
                name={item.name}
                address={item.full_address}
                phone={item.phone}
              />
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={7}></Col>
          </Row>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2}>
            <Pagination
              count={Math.floor(total / 10)}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </ListingWrapper>
    </>
  );
}
