import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, Select, DatePicker } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
// import DatePicker from 'components/UI/AntdDatePicker/AntdDatePicker';
import { FormTitle } from './AccountSettings.style';
import dayjs from 'dayjs';
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
  const location = useLocation();
  const hour = location.state.hour;
  const minute = location.state.minute;
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [bookingDate, setBookingDate] = React.useState(null);
  const [skipped, setSkipped] = React.useState(new Set());
  useEffect(() => {
    console.log(firstName);
  }, [firstName, lastName, email, phone, address]);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setPhone(data.phoneNumber);
    setEmail(data.email);
    setAddress(data.address);
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
      <Row>
        <Col xxl={2} xl={4} lg={4} md={0} sm={0}></Col>
        <Col xxl={20} xl={16} lg={16} md={24} sm={24}>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length && (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            )}
            {activeStep === 0 && (
              <Fragment>
                <FormTitle>Basic Information</FormTitle>
                <form
                  className="form-container"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                          render={({ field: { onChange, onBlur, value } }) => (
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
                          render={({ field: { onChange, onBlur, value } }) => (
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
                          errors.booking && <span>This field is required!</span>
                        }
                      >
                        <Controller
                          name="bookingDate"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <DatePicker
                              format="YYYY-MM-DD HH:mm:ss"
                              disabledDate={disabledDate}
                              disabledTime={disabledDateTime}
                              defaultValue={dayjs(`${hour}/${minute}`, 'HH:mm')}
                              showTime={{
                                defaultValue: dayjs(
                                  `${hour}/${minute}`,
                                  'HH:mm',
                                ),
                              }}
                            />
                          )}
                        />
                      </FormControl>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={12} xs={24}>
                      <FormControl
                        label="Email address"
                        htmlFor="email"
                        error={
                          errors.email && (
                            <>
                              {errors.email?.type === 'required' && (
                                <span>This field is required!</span>
                              )}
                              {errors.email?.type === 'pattern' && (
                                <span>Please enter a valid email address!</span>
                              )}
                            </>
                          )
                        }
                      >
                        <Controller
                          name="email"
                          defaultValue=""
                          control={control}
                          rules={{
                            required: true,
                            pattern:
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              type="email"
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
                        label="Phone number"
                        htmlFor="phoneNumber"
                        error={
                          errors.phoneNumber && (
                            <>
                              {errors.phoneNumber?.type === 'required' && (
                                <span>This field is required!</span>
                              )}
                              {errors.phoneNumber?.type === 'pattern' && (
                                <span>Please enter your valid number!</span>
                              )}
                            </>
                          )
                        }
                      >
                        <Controller
                          name="phoneNumber"
                          defaultValue=""
                          control={control}
                          rules={{
                            required: true,
                            pattern: /^[0-9]*$/,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          )}
                        />
                      </FormControl>
                    </Col>
                    <Col lg={24} xs={24}>
                      <FormControl
                        label="Where you live"
                        htmlFor="address"
                        error={
                          errors.address && <span>This field is required!</span>
                        }
                      >
                        <Controller
                          name="address"
                          defaultValue=""
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          )}
                        />
                      </FormControl>
                    </Col>
                    <Col lg={24} xs={24}>
                      <FormControl
                        label="Describe Yourself (Optional)"
                        htmlFor="describeYourself"
                      >
                        <Controller
                          name="describeYourself"
                          defaultValue=""
                          control={control}
                          rules={{}}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input.TextArea
                              rows={5}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                            />
                          )}
                        />
                      </FormControl>
                    </Col>
                  </Row>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button type="submit">
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </form>
              </Fragment>
            )}
            {activeStep === 1 && (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>
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
            {activeStep === 2 && (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>
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
          </Box>
        </Col>
        <Col xxl={2} xl={4} lg={4} md={0} sm={0}></Col>
      </Row>
    </Container>
  );
}
