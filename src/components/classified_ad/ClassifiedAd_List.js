import React, { Component } from 'react'
import { getMerchantDetail } from '../../action/merchantLotDetailActions.js'
import { get_employee_names } from '../../action/assignBarcodeActions.js'
import {
  search_classified_ad,
  get_pices_specific_ad_id,
  get_classified_ad
} from '../../action/classifiedActions.js'
import { connect } from 'react-redux'
import Select from 'react-select'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker'
import moment from 'moment'
import { Button } from 'react-bootstrap'
import dateFormat from 'dateformat'
import ClassifiedAdDatatable from '../datatables/classifiedad/ClassifiedAdDatatable.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'
class ClassifiedAd_List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      merchant_id: '',
      employee_id: '',
      filterData: '1',
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
      user_id: localStorage.getItem('1')
    }
    this.props.getMerchantDetail(data)
    this.props.get_employee_names()
    const dataa = {
      merchant_id: localStorage.getItem('merId'),
      startDate: dateFormat(this.state.startDate, 'yyyy-mm-dd'),
      endDate: dateFormat(this.state.endDate, 'yyyy-mm-dd'),
      filterData: this.state.filterData
    }
    console.log(dataa)
    this.props.get_classified_ad(dataa)
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.merchant_name !== this.props.merchant_name &&
      this.props.merchant_name !== ''
    ) {
      const merchant_data = []
      this.props.merchant_name.map(item => {
        return merchant_data.push({
          value: item.MERCHANT_ID,
          label: item.CONTACT_PERSON
        })
      })
      this.setState({
        merchant_id: merchant_data[0]
      })
    }
  }
  handleChangeMerchant = merchant_id => {
    this.setState({
      ...this.state,
      merchant_id: merchant_id
      //   merid: merchant_id.value
    })
  }
  onChangeRadioCheck = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  handleEvent = (event, picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    })
  }
  handleChangeEmployee = employee_id => {
    this.setState({
      ...this.state,
      employee_id: employee_id
    })
  }
  AssignBarcodes = () => {
    const data = {
      employee_id: this.state.employee_id,
      assign_by: localStorage.getItem('userId'),
      merchant_id: this.state.merchant_id,
      startDate: dateFormat(this.state.startDate, 'yyyy-mm-dd'),
      endDate: dateFormat(this.state.endDate, 'yyyy-mm-dd')
    }
    console.log(data)
  }
  SearchData = () => {
    const data = {
      employee_id: this.state.employee_id,
      merchant_id: this.state.merchant_id,
      startDate: dateFormat(this.state.startDate, 'yyyy-mm-dd'),
      endDate: dateFormat(this.state.endDate, 'yyyy-mm-dd'),
      filterData: this.state.filterData
    }
    this.props.search_classified_ad(data)
    console.log(data)
  }
  render () {
    const assignenable = localStorage.getItem('userId')
    let start = dateFormat(this.state.startDate, 'yyyy-mm-dd')
    let end = dateFormat(this.state.endDate, 'yyyy-mm-dd')
    let label = start + ' - ' + end
    if (start === end) {
      label = start
    }

    let buttonStyle = { width: '100%' }
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
          <h1>Classified Ad</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>classified_ad</a>
            </li>
            <li className='active'>ClassifiedAd_List</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              {/* <section className='content'> */}
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Classified Ad</h3>
                </div>
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <div className='col-sm-2'>
                        <label htmlFor='merchant_name'>Merchant Name</label>
                        <div
                          className='form-group has-feedback'
                          id='merchant_name'
                        >
                          <Select
                            id='merchant_name'
                            options={merchant_data}
                            // isClearable
                            value={this.state.merchant_id}
                            onChange={this.handleChangeMerchant}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>
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
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='date_range'>Date Range</label>
                          <div className='input-group'>
                            <DatetimeRangePicker
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              ranges={this.state.ranges}
                              onEvent={this.handleEvent}
                            >
                              <Button className='selected-date-range-btn'>
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
                      <div className='col-sm-2' style={{ marginTop: '40px' }}>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='filterData'
                            value='0'
                            checked={this.state.filterData == '0'}
                            onChange={this.onChangeRadioCheck}
                          />
                          Ident
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='filterData'
                            value='1'
                            checked={this.state.filterData == '1'}
                            onChange={this.onChangeRadioCheck}
                          />
                          Not Ident
                        </label>
                        <label
                          className='radio-inline'
                          style={{ display: 'inline' }}
                        >
                          <input
                            type='radio'
                            name='filterData'
                            value='2'
                            checked={this.state.filterData == '2'}
                            onChange={this.onChangeRadioCheck}
                          />
                          All
                        </label>
                      </div>
                      {assignenable == '21' || assignenable == '22' ? (
                        <div
                          className='col-sm-1 form-group has-feedback'
                          style={{ marginTop: '30px' }}
                        >
                          <button
                            type='button'
                            className='btn btn-warning btn-block btn-flat from-control'
                            onClick={this.AssignBarcodes}
                            // disabled={this.props.toggle_barcodes.length === 0}
                          >
                            Assign
                          </button>
                        </div>
                      ) : (
                        ''
                      )}
                      <div
                        className='col-sm-1 form-group has-feedback'
                        style={{ marginTop: '30px' }}
                      >
                        <button
                          type='button'
                          className='btn btn-primary btn-block btn-flat'
                          onClick={this.SearchData}
                          // disabled={!date}
                        >
                          Search
                        </button>
                      </div>
                      {/* <div className='col-sm-2' style={{ marginTop: '10px' }}>
                        <h3> Unique Items:11122</h3>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='box'>
            <div className='box-header with-border'>
              <h3 className='box-title'>Classified Ad</h3>
            </div>
            <div className='box-body'>
              <div className='row'>
                <div className='col-xs-12'>
                  <ClassifiedAdDatatable {...this.props} />
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
    search_classified_data: state.classifiedadReducer.search_classified_data,
    images: state.classifiedadReducer.images
  }
}
export default connect(
  mapStateToProps,
  {
    getMerchantDetail,
    get_employee_names,
    search_classified_ad,
    get_pices_specific_ad_id,
    get_classified_ad
  }
)(ClassifiedAd_List)
