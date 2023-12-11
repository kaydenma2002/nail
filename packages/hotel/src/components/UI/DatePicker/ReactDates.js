import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates'; // Change to SingleDatePicker
import 'react-dates/lib/css/_datepicker.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactDatesStyleWrapper } from './ReactDates.style';

class DateRangePickerBox extends Component {
  constructor(props) {
    super(props);
    const separator =
      this.props.item && this.props.item.separator
        ? this.props.item.separator
        : '/';
    const dateFormat =
      this.props.item && this.props.item.format
        ? this.props.item.format
        : 'llll';
    this.state = {
      focusedInput: null,
      startDate: this.props.startDate ? this.props.startDate : null,
      dateFormat,
      separator,
    };
    this.onDateChangeFunc = this.onDateChangeFunc.bind(this);
    this.onFocusChangeFunc = this.onFocusChangeFunc.bind(this);
  }

  onDateChangeFunc = (date) => {
    const { dateFormat } = this.state;
    this.setState({ startDate: date });
    if (date !== null) {
      this.props.updateSearchData({
        setStartDate: date.format(dateFormat),
        setEndDate: null,
      });
    }
  };

  onFocusChangeFunc = ({ focused }) => {
    this.setState({ focusedInput: focused });
  };

  render() {
    const { focusedInput, startDate } = this.state;
    // DateRangePickerBox props list
    const {
      className,
      startDateId,
      startDatePlaceholderText,
      disabled,
      showClearDates,
      isRTL,
      orientation,
      anchorDirection,
      withPortal,
      withFullScreenPortal,
      small,
      block,
      numberOfMonths,
      regular,
      noBorder,
    } = this.props;

    // Add all classs to an array **************
    const addAllClasses = ['date_picker'];
    // className prop checking **************
    if (className) {
      addAllClasses.push(className);
    }

    // React-Dates SingleDatePicker Props List
    const defaultCalenderProps = {
      id: startDateId ? startDateId : 'start_unique_id',
      date: startDate,
      onDateChange: this.onDateChangeFunc,
      focused: focusedInput,
      onFocusChange: this.onFocusChangeFunc,
      placeholder: startDatePlaceholderText,
      disabled,
      isRTL,
      showClearDate: showClearDates ? showClearDates : false,
      orientation,
      anchorDirection,
      withPortal,
      withFullScreenPortal,
      small,
      numberOfMonths: numberOfMonths ? numberOfMonths : 2,
      block,
      regular,
      noBorder,
    };

    return (
      <ReactDatesStyleWrapper className={addAllClasses.join(' ')}>
        <SingleDatePicker
          {...defaultCalenderProps}
          onFocusChange={this.onFocusChangeFunc}
        />
      </ReactDatesStyleWrapper>
    );
  }
}

DateRangePickerBox.propTypes = {
  startDateId: PropTypes.string.isRequired,
  startDatePlaceholderText: PropTypes.string,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['START_DATE']),
  ]),
  showClearDates: PropTypes.bool,
  isRTL: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  anchorDirection: PropTypes.oneOf(['left', 'right']),
  withPortal: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  small: PropTypes.bool,
  block: PropTypes.bool,
  numberOfMonths: PropTypes.number,
  regular: PropTypes.bool,
  noBorder: PropTypes.bool,
  updateSearchData: PropTypes.func,
};

export default DateRangePickerBox;
