import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, DatePicker, Select } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { FormTitle } from './AccountSettings.style';
import dayjs from 'dayjs';
import { Card } from 'antd';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default function HorizontalLinearStepper() {
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const statesData = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  const location = useLocation();
  const hour = location.state.hour;
  const minute = location.state.minute;
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [zipCode, setZipCode] = React.useState(null);
  const [bookingDate, setBookingDate] = React.useState(null);
  const [skipped, setSkipped] = React.useState(new Set());
  useEffect(() => {
    console.log(firstName);
  }, [firstName, lastName, city, state, zipCode, address, bookingDate]);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setCity(data.city);
    setState(data.state);
    setZipCode(data.zipCode);
    setState(data.state);
    setAddress(data.address);
    setBookingDate(data.bookingDate);
    console.log(data);
    handleNext();
  };

  const steps = [
    'Customer Information',
    'Checkout Confirmation',
    'Billing Invoice',
  ];

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, hour),
    disabledMinutes: () => range(0, minute),
  });

  return (
    <Container fluid={true}>
      <Row style={{ marginTop: '4rem' }}>
        <Col xxl={1} xl={1} lg={1} md={0} sm={0}></Col>
        <Col xxl={22} xl={22} lg={22} md={24} sm={24}>
          {activeStep === 0 && (
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={24}>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24}>
                  <Card>
                    <Box sx={{ width: '100%' }}>
                      <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                          const stepProps = {};
                          const labelProps = {};

                          if (isStepSkipped(index)) {
                            stepProps.completed = false;
                          }
                          // return (
                          //   <Step key={label} {...stepProps}>
                          //     <StepLabel {...labelProps}>{label}</StepLabel>
                          //   </Step>
                          // );
                        })}
                      </Stepper>

                      <Fragment>
                        <FormTitle>Enter Billing Information</FormTitle>

                        <Row gutter={30}>
                          <Col lg={12} xs={24}>
                            <FormControl
                              label="First name"
                              htmlFor="firstName"
                              error={
                                errors.firstName && (
                                  <span>This field is required!</span>
                                )
                              }
                            >
                              <Controller
                                name="firstName"
                                defaultValue=""
                                control={control}
                                rules={{ required: true }}
                                render={({
                                  field: { onChange, onBlur, value },
                                }) => (
                                  <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                  />
                                )}
                              />
                            </FormControl>
                          </Col>
                          <Col lg={12} xs={24}>
                            <FormControl
                              label="Last name"
                              htmlFor="lastName"
                              error={
                                errors.lastName && (
                                  <span>This field is required!</span>
                                )
                              }
                            >
                              <Controller
                                name="lastName"
                                defaultValue=""
                                control={control}
                                rules={{ required: true }}
                                render={({
                                  field: { onChange, onBlur, value },
                                }) => (
                                  <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                  />
                                )}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                        <Row gutter={30}>
                          <Col lg={24} xs={24}>
                            <FormControl
                              label="Booking Date"
                              htmlFor="bookingDate"
                              error={
                                errors.bookingDate && (
                                  <span>This field is required!</span>
                                )
                              }
                            >
                              <Controller
                                name="bookingDate"
                                control={control}
                                rules={{ required: true }}
                                defaultValue={dayjs(
                                  `${hour}/${minute}`,
                                  'HH:mm'
                                )}
                                render={({
                                  field: { onChange, onBlur, value },
                                }) => (
                                  <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={disabledDate}
                                    disabledTime={disabledDateTime}
                                    showTime={{
                                      defaultValue: dayjs(
                                        `${hour}/${minute}`,
                                        'HH:mm'
                                      ),
                                    }}
                                    onChange={onChange} // send value to hook form
                                    onBlur={onBlur} // notify when input is touched/blur
                                    value={value}
                                    id="bookingDate" // Make sure this matches the htmlFor prop in FormControl
                                  />
                                )}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                        <Row gutter={30}>
                          <Col lg={24} xs={24}>
                            <FormControl
                              label="Street"
                              htmlFor="street"
                              error={
                                errors.street && (
                                  <>
                                    {errors.street?.type === 'required' && (
                                      <span>This field is required!</span>
                                    )}
                                  </>
                                )
                              }
                            >
                              <Controller
                                name="street"
                                defaultValue=""
                                control={control}
                                rules={{ required: true }}
                                render={({
                                  field: { onChange, onBlur, value },
                                }) => (
                                  <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                  />
                                )}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                        <Row gutter={30}>
                          <Col xxl={8} xl={12} lg={12} xs={24}>
                            <FormControl
                              label="State"
                              htmlFor="state"
                              error={
                                errors.state && (
                                  <>
                                    {errors.state?.type === 'required' && (
                                      <span>This field is required!</span>
                                    )}
                                  </>
                                )
                              }
                            >
                              <Select
                                showSearch
                                placeholder="Select a state"
                                optionFilterProp="children"
                              >
                                {statesData.map((state, index) => (
                                  <Option key={index} value={state}>
                                    {state}
                                  </Option>
                                ))}
                              </Select>
                            </FormControl>
                          </Col>
                          <Col xxl={8} xl={12} lg={12} xs={24}>
                            <FormControl
                              label="City"
                              htmlFor="city"
                              error={
                                errors.city && (
                                  <span>This field is required!</span>
                                )
                              }
                            >
                              <Controller
                                name="city"
                                defaultValue=""
                                control={control}
                                rules={{ required: true }}
                                render={({
                                  field: { onChange, onBlur, value },
                                }) => (
                                  <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                  />
                                )}
                              />
                            </FormControl>
                          </Col>
                          <Col xxl={8} xl={12} lg={12} xs={24}>
                            <FormControl
                              label="Zip Code"
                              htmlFor="zipCode"
                              error={
                                errors.zipCode && (
                                  <span>This field is required!</span>
                                )
                              }
                            >
                              <Controller
                                name="zipCode"
                                defaultValue=""
                                control={control}
                                rules={{ required: true }}
                                render={({
                                  field: { onChange, onBlur, value },
                                }) => (
                                  <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                  />
                                )}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                      </Fragment>
                    </Box>
                  </Card>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24}>
                  <Card>
                    <Fragment>
                      <FormTitle>Payment Information</FormTitle>

                      <Row gutter={30}>
                        <Col lg={24} xs={24}>
                          <FormControl
                            label="Card Number"
                            htmlFor="cardNumber"
                            error={
                              errors.cardNumber && (
                                <span>This field is required!</span>
                              )
                            }
                          >
                            <Controller
                              name="cardNumber"
                              defaultValue=""
                              control={control}
                              rules={{ required: true }}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <Input
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                />
                              )}
                            />
                          </FormControl>
                        </Col>
                      </Row>
                      <Row gutter={30}>
                        <Col lg={12} xs={24}>
                          <FormControl
                            label="Expriry Date"
                            htmlFor="expiryDate"
                            error={
                              errors.expiryDate && (
                                <span>This field is required!</span>
                              )
                            }
                          >
                            <Controller
                              name="expiryDate"
                              defaultValue=""
                              control={control}
                              rules={{ required: true }}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <Input
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                />
                              )}
                            />
                          </FormControl>
                        </Col>
                        <Col lg={12} xs={24}>
                          <FormControl
                            label="CVC"
                            htmlFor="cvc"
                            error={
                              errors.cvc && <span>This field is required!</span>
                            }
                          >
                            <Controller
                              name="cvc"
                              control={control}
                              rules={{ required: true }}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <Input
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                />
                              )}
                            />
                          </FormControl>
                        </Col>
                      </Row>
                      <Row gutter={30}>
                        <Col lg={24} xs={24}>
                          <FormControl
                            label="Card Holder Name"
                            htmlFor="card_name"
                            error={
                              errors.card_name && (
                                <>
                                  {errors.card_name?.type === 'required' && (
                                    <span>This field is required!</span>
                                  )}
                                </>
                              )
                            }
                          >
                            <Controller
                              name="card_name"
                              defaultValue=""
                              control={control}
                              rules={{ required: true }}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <Input
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                />
                              )}
                            />
                          </FormControl>
                        </Col>
                      </Row>
                    </Fragment>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                      }}
                    >
                      <Box />
                      <FormControl>
                        <Button variant='outline'  type="submit">
                          {activeStep === steps.length - 1 ? 'Finish' : 'Pay'}
                          </Button>
                      </FormControl>
                    </Box>
                  </Card>
                </Col>
              </Row>
            </form>
          )}
          {activeStep === 1 && (
            <React.Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Col>

        <Col xxl={1} xl={1} lg={1} md={24} sm={24}></Col>
      </Row>
    </Container>
  );
}
