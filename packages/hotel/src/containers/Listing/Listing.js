import React, { useState, Fragment } from 'react';
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
import { Pagination } from 'antd';
import SearchArea from './Search/Search';
import { Button, Card, Flex, Typography } from 'antd';
import { Col, Row } from 'antd';
const { Meta } = Card;
import { useParams } from 'react-router-dom';

export default function Listing(props) {
  const location = useLocation();
  const pathname = location.pathname;

  console.log('Current Pathname:', location);

  // Log or use the additional prop
  


  // Log the prop value
  
  const { width } = useWindowSize();
  const [showMap, setShowMap] = useState(false);
  let url = '/data/top-hotel.json';
  const { data, loading, loadMoreData, total, limit } = useDataApi(url);
  let columnWidth = [1 / 3, 1 / 3, 1 / 3];

  if(location.search) {
    url += location.search;
  }
  if(showMap) {
    columnWidth = [1 / 1, 1 / 2, 1 / 2, 1 / 2, 1 / 3];
  }
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
        <Row>
          <Col span={7}></Col>
          <Col span={8}>
            <Card
              hoverable
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
                  <Col span={12}>
                    <div style={{marginLeft:'16px'}}></div>
                  </Col>
                </Row>




              </div>
              {/* Content on the right */}

            </Card>
          </Col>
          <Col span={7} >

          </Col>

        </Row>
      </ListingWrapper>
    </>
  );
}
