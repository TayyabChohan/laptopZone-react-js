import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import {
  inser_Appointment,
  get_Appointment_Detail,
  approved_APPOINTMENT,
  get_Services,
  cencel_Appointment,
  pending_Appointment,
  get_specific_services,
  in_process_appointment,
  complete_appointment,
  checkCustomBarcode,
  search_barcode,
  Remove_Search_Barcodes,
  get_specific_log_detail,
  delete_appointment_services,
  save_date_appointmetnt_Barcode_log,
  diff_Mins,
  get_appointment_summary,
  get_lot_aganist_appointment_merchant,
  add_barcode_aganist_lot_and_barcode,
  Remove_Lot_Barcodes,
  delete_all_appointment_barcode,
  save_Appointment_Packing,
  add_packing_all_appointment_barcode,
  get_all_appointment_packing
} from '../../action/appointmentActions.js'
import { get_packing_type } from '../../action/genrateBillingActions.js'
import { getMerchantDetail } from '../../action/merchantLotDetailActions.js'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import CreateAppointmentDatatable from '../datatables/CreateAppointmentDatatable.js'
// import Test from '../datatables/Test.js'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import { Redirect } from 'react-router-dom'

class CreateAppointment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appointment_date: new Date(),
      service_id: '',
      merchant_id: [],
      remarks: '',
      merid: localStorage.getItem('merId'),
      no_of_items: '',
      services_id: [],
      created_date: '',
      redirectToReferrer: false
      // date: new Date(),
      // datee: new Date()
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
      user_id: localStorage.getItem('userId')
    }
    this.props.get_packing_type()
    this.props.get_Services()
    const user_id = localStorage.getItem('userId')
    const merchant_id = localStorage.getItem('merId')
    this.props.getMerchantDetail(data)
    this.props.get_Appointment_Detail(user_id, merchant_id)
  }

  componentWillUnmount () {
    this.props.get_Appointment_Detail()
    this.props.search_barcode()
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({ ...this.state, [name]: value }, () => {
      if (this.state.no_of_items < 0) {
        // console.log('please Fill')
        this.setState({ ...this.state, no_of_items: '' })
        // console.log(this.state)
      }
    })
  }

  handleChange = service_id => {
    this.setState({ ...this.state, service_id: service_id })
  }
  handleChangeMerchant = merchant_id => {
    this.setState({
      ...this.state,
      merchant_id: merchant_id,
      merid: merchant_id.value
    })
  }
  handleOnSubmit = e => {
    e.preventDefault()

    const data = {
      service_id: this.state.service_id,
      remarks: this.state.remarks,

      appointment_date: dateFormat(
        this.state.appointment_date,
        'd/m/yy H:M:ss'
      ),
      no_of_items: this.state.no_of_items,
      mid: this.state.merid,
      user_id: localStorage.getItem('userId'),
      created_date: this.state.created_date
    }
    // console.log(data)
    this.props.inser_Appointment(data)
    this.setState({
      service_id: '',
      merchant_id: ''
    })
    this.myFormRef.reset()
  }

  render () {
    // console.log(this.state.service_id)
    // console.log(dateFormat(this.state.appointment_date, 'd/m/yy H:M:ss'))
    // console.log(this.state.merchant_id.value)
    // console.log(this.state)
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    const merchant_data = []

    this.props.merchant_name.map(item => {
      return merchant_data.push({
        value: item.MERCHANT_ID,
        label: item.CONTACT_PERSON
      })
    })
    const service_data = []

    this.props.services.map(item => {
      service_data.push({
        value: item.SERVICE_ID,
        label: item.SERVICE_DESC
      })
    })
    const enable =
      this.state.merchant_id > 0 ||
      (this.state.service_id &&
        this.state.appointment_date &&
        this.state.no_of_items)
    // console.log(this.state.appointment_date)
    // console.log(this.props.appointment_detail)
    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Create Appointment</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Appointment</a>
            </li>
            <li className='active'>Create Appointment</li>
          </ol>
        </section>

        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              {/* <section className='content'> */}
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Create Appointment</h3>
                </div>
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <form
                        onSubmit={this.handleOnSubmit}
                        ref={el => (this.myFormRef = el)}
                      >
                        <div className='row'>
                          <div className='col-sm-3'>
                            <label htmlFor='servicetype'>Service Name</label>
                            <div
                              className='form-group has-feedback'
                              id='servicetype'
                            >
                              <Select
                                id='servicetype'
                                isMulti
                                options={service_data}
                                value={this.state.service_id}
                                onChange={this.handleChange}
                                className='basic-multi-select'
                                classNamePrefix='select'
                                required
                              />
                            </div>
                          </div>
                          {localStorage.getItem('userId') == 2 ? (
                            <div className='col-sm-2'>
                              <label htmlFor='servicetype'>Merchant Name</label>
                              <div
                                className='form-group has-feedback'
                                id='merchanttype'
                              >
                                <Select
                                  id='merchanttype'
                                  options={merchant_data}
                                  value={this.state.merchant_id}
                                  onChange={this.handleChangeMerchant}
                                  className='basic-select'
                                  classNamePrefix='select'
                                  required
                                />
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                          <div className='col-sm-2'>
                            <div className='form-group has-feedback'>
                              <label htmlFor='remarks'>Remarks</label>
                              <input
                                type='text'
                                id='remarks'
                                className='form-control'
                                name='remarks'
                                placeholder='Remarks'
                                onChange={this.handleOnChange}
                              />
                            </div>
                          </div>
                          <div className='col-sm-2'>
                            <div className='form-group has-feedback'>
                              <label htmlFor='no_of_item'>No Of Items</label>
                              <input
                                type='number'
                                id='no_of_item'
                                min='1'
                                className='form-control'
                                name='no_of_items'
                                value={this.state.no_of_itmes}
                                placeholder='Expected Items'
                                onChange={this.handleOnChange}
                                required
                              />
                            </div>
                          </div>

                          <div className='col-sm-2'>
                            <div className='form-group has-feedback'>
                              <label htmlFor='appointmentdate'>
                                Appointment Date
                              </label>
                              <div className='input-group'>
                                <Flatpickr
                                  options={{
                                    minDate: 'today',
                                    enableTime: true,
                                    dateFormat: 'Y-m-d H:i',
                                    minTime: '09:00',
                                    maxTime: '18:00'
                                  }}
                                  className='form-control'
                                  value={this.state.appointment_date}
                                  onChange={appointment_date => {
                                    this.setState({ appointment_date })
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-xs-4'>
                            <button
                              type='submit'
                              className='btn btn-primary btn-block btn-flat'
                              disabled={!enable}
                            >
                              Create Appointment
                            </button>
                          </div>
                          <div className='col-xs-4'>
                            {/* <button type="button" className="btn btn-primary btn-block btn-flat" disabled={!enable} >Generate Token</button> */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* </section> */}
            </div>
          </div>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Appointments</h3>
                </div>
                <div className='box-body'>
                  <CreateAppointmentDatatable
                    data={this.props.appointment_detail || []}
                    {...this.props}
                    user_id={localStorage.getItem('userId')}
                    specific_service={this.props.specific_services || []}
                    message={this.props.message}
                    diffTime={this.props.diffTime}
                    appointment_summary={this.props.appointmentsummary}
                  />
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
// React.PropTypes = {
//   Data: Date.prototype.setMinutes()
// }
const mapStateToProps = state => {
  return {
    services: state.appointmentReducer.services,
    appointment_detail: state.appointmentReducer.appointment_detail,
    specific_services: state.appointmentReducer.specific_services,
    message: state.appointmentReducer.message,
    merchant_name: state.genrateBarcodeReducer.merchantname,
    log_detail: state.appointmentReducer.specific_log,
    search_barcodes: state.appointmentReducer.search_barcodes,
    diffTime: state.appointmentReducer.timeDiff,
    appointmentsummary: state.appointmentReducer.appointment_summary,
    appointment_merchant_lot: state.appointmentReducer.appointment_merchant_lot,
    appointment_time: state.appointmentReducer.appointment_time,
    total_charge: state.appointmentReducer.total_charge,
    packing_item_detail: state.genrateBillingReducer.packing_item_detail,
    appointment_packing: state.appointmentReducer.appointment_packing
  }
}
export default connect(
  mapStateToProps,
  {
    get_Services,
    inser_Appointment,
    get_Appointment_Detail,
    cencel_Appointment,
    approved_APPOINTMENT,
    pending_Appointment,
    get_specific_services,
    getMerchantDetail,
    in_process_appointment,
    complete_appointment,
    checkCustomBarcode,
    search_barcode,
    Remove_Search_Barcodes,
    get_specific_log_detail,
    delete_appointment_services,
    save_date_appointmetnt_Barcode_log,
    diff_Mins,
    get_appointment_summary,
    get_lot_aganist_appointment_merchant,
    add_barcode_aganist_lot_and_barcode,
    Remove_Lot_Barcodes,
    delete_all_appointment_barcode,
    get_packing_type,
    save_Appointment_Packing,
    add_packing_all_appointment_barcode,
    get_all_appointment_packing
  }
)(CreateAppointment)
