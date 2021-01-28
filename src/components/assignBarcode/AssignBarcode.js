import React, { Component } from 'react'
import { getMerchantDetail } from '../../action/merchantLotDetailActions.js'
import {
  get_employee_names,
  get_unique_count_lot,
  load_special_lots,
  toggle_Function_Barcodes,
  toggle_Function_Barcodes_all,
  combine_pices_specific_barcode,
  assign_barcode_specific_emp,
  toggle_function_filter,
  load_special_date_lots,
  change_assign_filter_data
} from '../../action/assignBarcodeActions.js'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import $ from 'jquery'
import dateFormat from 'dateformat'
import AssignBarcodeDataTable from '../datatables/assignBarcodeDataTable/AssignBarcodeDataTable.js'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker'
import moment from 'moment'

class AssignBarcode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      merchant_id: '',
      employee_id: '',
      date_range: [new Date(), new Date()],
      radioVal: '0',
      assignFilter: '',
      load: false,
      lot_posting_chek: '',
      filterData: '',
      startDate: moment().subtract(6, 'days'),
      endDate: moment(),
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
          moment()
            .subtract(1, 'month')
            .startOf('month'),
          moment()
            .subtract(1, 'month')
            .endOf('month')
        ]
      }
    }
    this.handleEvent = this.handleEvent.bind(this)
  }
  componentWillMount () {
    if (localStorage.getItem('userName')) {
      // console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }
  componentDidMount () {
    const data = {
      mid: localStorage.getItem('merId'),
      user_id: localStorage.getItem('userId')
    }
    this.props.getMerchantDetail(data)
    this.props.get_employee_names()
    const dataa = {
      // lot_date: [new Date(), new Date()],
      startDate: dateFormat(this.state.startDate, 'yyyy-mm-dd'),
      endDate: dateFormat(this.state.endDate, 'yyyy-mm-dd'),
      merch_id: this.state.merchant_id,
      filterData: this.state.filterData == '' ? '2' : this.state.filterData,
      // lot_posting: '2',
      get_emp: this.state.employee_id,
      lot_posting_chek: this.state.lot_posting_chek
    }
    this.props.get_unique_count_lot(dataa)
    this.props.load_special_lots(dataa)
  }
  handleChangeMerchant = merchant_id => {
    this.setState({
      ...this.state,
      merchant_id: merchant_id
      //   merid: merchant_id.value
    })
  }

  handleChangeEmployee = employee_id => {
    this.setState({
      ...this.state,
      employee_id: employee_id
    })
  }
  onChangeRadioCheck = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  SubmitData = () => {
    const data = {
      // lot_date: this.state.date_range,
      merch_id: this.state.merchant_id,
      lot_posting: this.state.radioVal,
      startDate: dateFormat(this.state.startDate, 'yyyy-mm-dd'),
      endDate: dateFormat(this.state.endDate, 'yyyy-mm-dd'),
      filterData: this.state.filterData == '' ? '2' : this.state.filterData,
      assignFilter:
        this.state.assignFilter == '' ? '2' : this.state.assignFilter,
      get_emp: this.state.employee_id,
      lot_posting_chek: this.state.lot_posting_chek
    }
    // console.log(data)
    this.props.get_unique_count_lot(data)
    this.props.load_special_lots(data)
  }
  AssignBarcodes = () => {
    console.log(this.state)
    const data = {
      get_emp: this.state.employee_id,
      toggle_barcodes: this.props.toggle_barcodes,
      user_id: localStorage.getItem('userId')
    }
    this.props.assign_barcode_specific_emp(data)
  }
  handleEvent (event, picker) {
    this.setState(prevState => ({
      startDate: picker.startDate,
      endDate: picker.endDate,
      load: !prevState.load
    }))
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.filterData !== this.state.filterData &&
      this.state.filterData !== ''
    ) {
      const data = {
        merch_id: this.state.merchant_id,
        lot_posting: this.state.radioVal,
        startDate: dateFormat(this.state.startDate, 'yyyy-mm-dd'),
        endDate: dateFormat(this.state.endDate, 'yyyy-mm-dd'),
        filterData: this.state.filterData,
        get_emp: this.state.employee_id,
        assignFilter:
          this.state.assignFilter == '' ? '2' : this.state.assignFilter,
        lot_posting_chek: this.state.lot_posting_chek
      }
      this.props.get_unique_count_lot(data)
      this.props.load_special_lots(data)
      //  / this.props.toggle_function_filter(data)
    }
    if (prevState.load !== this.state.load) {
      const data = {
        merch_id: this.state.merchant_id,
        lot_posting: this.state.radioVal,
        startDate: dateFormat(this.state.startDate, 'yyyy-mm-dd'),
        endDate: dateFormat(this.state.endDate, 'yyyy-mm-dd'),
        filterData: this.state.filterData == '' ? '2' : this.state.filterData,
        assignFilter:
          this.state.assignFilter == '' ? '2' : this.state.assignFilter,
        get_emp: this.state.employee_id,
        lot_posting_chek: this.state.lot_posting_chek
      }
      this.props.get_unique_count_lot(data)
      this.props.load_special_date_lots(data)
    }
    if (
      prevState.assignFilter !== this.state.assignFilter &&
      this.state.assignFilter !== ''
    ) {
      this.props.change_assign_filter_data(this.state.assignFilter)
    }
  }
  render () {
    let start = dateFormat(this.state.startDate, 'yyyy-mm-dd')
    let end = dateFormat(this.state.endDate, 'yyyy-mm-dd')
    let label = start + ' - ' + end
    if (start === end) {
      label = start
    }
    // console.log(this.state.startDate)
    // console.log(this.state.endDate)
    let buttonStyle = { width: '100%' }
    const assignenable = localStorage.getItem('userId')
    const date = this.state.date_range.length > 1
    const merchant_data = []

    this.props.merchant_name.map(item => {
      return merchant_data.push({
        value: item.MERCHANT_ID,
        label: item.CONTACT_PERSON
      })
    })
    const employee_data = []

    this.props.employee_name.map(item => {
      return employee_data.push({
        value: item.EMPLOYEE_ID,
        label: item.USER_NAME
      })
    })
    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Assign Barcodes</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>pre-sale</a>
            </li>
            <li className='active'>Assign Barcode</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              {/* <section className='content'> */}
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Special Lots</h3>
                </div>
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-sm-2'>
                        <label htmlFor='merchant_name'>Merchant Name</label>
                        <div
                          className='form-group has-feedback'
                          id='merchant_name'
                        >
                          <Select
                            id='merchant_name'
                            options={merchant_data}
                            isClearable
                            value={this.state.merchant_id}
                            onChange={this.handleChangeMerchant}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>

                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='date_range'>Date Range</label>
                          <div
                            className='input-group'
                            style={{ width: '220px' }}
                          >
                            <DatetimeRangePicker
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              ranges={this.state.ranges}
                              onEvent={this.handleEvent}
                            >
                              <Button
                                className='selected-date-range-btn btn-danger'
                                style={buttonStyle}
                              >
                                <div className='pull-left'>
                                  <i className='fa fa-calendar' />
                                  &nbsp;
                                  <span>{label}</span>
                                </div>
                                <div className='pull-right'>
                                  <i className='fa fa-angle-down' />
                                </div>
                              </Button>
                            </DatetimeRangePicker>
                          </div>
                        </div>
                      </div>
                      <div className='col-sm-4' style={{ marginTop: '32px' }}>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='filterData'
                            value='0'
                            onChange={this.onChangeRadioCheck}
                          />
                          Dekit
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='filterData'
                            value='1'
                            onChange={this.onChangeRadioCheck}
                          />
                          Special Lot
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='filterData'
                            value='2'
                            onChange={this.onChangeRadioCheck}
                          />
                          All
                        </label>

                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='assignFilter'
                            value='0'
                            onChange={this.onChangeRadioCheck}
                          />
                          Assigned
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='assignFilter'
                            value='1'
                            onChange={this.onChangeRadioCheck}
                          />
                          Un Assigned
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='assignFilter'
                            value='2'
                            onChange={this.onChangeRadioCheck}
                          />
                          All
                        </label>
                      </div>
                      {/* <div className='col-sm-4' style={{ marginTop: '32px' }}>
                        <input
                          type='checkbox'
                          name='lot_posting_chek'
                          value='4'
                          onChange={this.onChangeRadioCheck}
                        />
                        &nbsp;Unique&nbsp;&nbsp;&nbsp;&nbsp;
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='radioVal'
                            value='1'
                            onChange={this.onChangeRadioCheck}
                          />
                          Posted
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='radioVal'
                            value='2'
                            onChange={this.onChangeRadioCheck}
                          />
                          Un Posted
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='radioVal'
                            value='3'
                            onChange={this.onChangeRadioCheck}
                          />
                          Ready Data
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='radioVal'
                            value='0'
                            onChange={this.onChangeRadioCheck}
                          />
                          All
                        </label>
                      </div> */}
                      <div className='col-sm-2' style={{ marginTop: '10px' }}>
                        <h3> Unique Items: {this.props.total_record || ''}</h3>
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='col-sm-2'>
                        <label htmlFor='employee_name'>Employee Name</label>
                        <div
                          className='form-group has-feedback'
                          id='employee_name'
                        >
                          <Select
                            id='employee_name'
                            options={employee_data}
                            isClearable
                            value={this.state.employee_id}
                            onChange={this.handleChangeEmployee}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>
                      {assignenable == '21' || assignenable == '22' ? (
                        <div
                          className='col-sm-1 form-group has-feedback'
                          style={{ marginTop: '25px' }}
                        >
                          <button
                            type='button'
                            className='btn btn-warning btn-block btn-flat from-control'
                            onClick={this.AssignBarcodes}
                            disabled={this.props.toggle_barcodes.length === 0}
                          >
                            Assign
                          </button>
                        </div>
                      ) : (
                        ''
                      )}

                      <div className='col-sm-1' style={{ float: 'right' }}>
                        <button
                          type='button'
                          className='btn btn-primary btn-block btn-flat'
                          onClick={this.SubmitData}
                          disabled={!date}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Special Lots</h3>
                </div>
                <div className='box-body'>
                  <AssignBarcodeDataTable {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <ErrorMessage />
        <AlertMessage />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    merchant_name: state.genrateBarcodeReducer.merchantname,
    employee_name: state.assignBarcodeReducer.employee_name,
    total_record: state.assignBarcodeReducer.total_count,
    special_lot_data: state.assignBarcodeReducer.special_lot_data,
    toggle_barcodes: state.assignBarcodeReducer.toggle_barcodes,
    images: state.assignBarcodeReducer.images
  }
}
export default connect(
  mapStateToProps,
  {
    getMerchantDetail,
    get_employee_names,
    get_unique_count_lot,
    load_special_lots,
    toggle_Function_Barcodes,
    toggle_Function_Barcodes_all,
    combine_pices_specific_barcode,
    assign_barcode_specific_emp,
    toggle_function_filter,
    load_special_date_lots,
    change_assign_filter_data
  }
)(AssignBarcode)
