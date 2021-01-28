import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import {
  search_barcode,
  checkCustomBarcode,
  InsertLotCustomBarcode,
  add_barcode_aganist_lot_and_barcode,
  get_appointment_lot_barcode_detail,
  save_all_lot_barcode
} from '../../action/appointmentActions.js'
import Select from 'react-select'
import AppointmentLotBarcodeDataTable from '../datatables/AppointmentLotBarcodeDataTable.js'

class SearchBarcode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lot_id: '',
      service_id: '',
      open: true,
      redirectToReferrer: false,
      disable: false
    }
  }

  handleOnClick = e => {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }
  handleChangeService_id = service_id => {
    this.setState({
      service_id: service_id
    })
  }
  handleChangelot_id = lot_id => {
    this.setState({
      lot_id: lot_id
    })
  }
  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({ ...this.state, [name]: value })
    // console.log(this.state)
  }
  handleOnSubmit = e => {
    e.preventDefault()
    // const data = {
    //   lot_id: this.state.lot_id,
    //   merchant_id: this.props.detailModel.MERCHANT_ID
    // }
    // this.props.add_barcode_aganist_lot_and_barcode(data)
    // this.myFormRef.reset()
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.lot_id !== this.state.lot_id &&
      this.state.lot_id !== null &&
      this.state.lot_id !== ''
    ) {
      const data = {
        service_id: this.props.searchData.service_id,
        lot_id: this.state.lot_id,
        merchant_id: this.props.detailModel.MERCHANT_ID,
        appointment_id: this.props.detailModel.APPOINTMENT_ID
      }
      // console.log(data)
      this.props.get_appointment_lot_barcode_detail(data)
    }
    if (
      prevProps.searchData.service_detail !==
        this.props.searchData.service_detail &&
      this.props.searchData.service_detail
    ) {
      this.setState({
        service_id: this.props.searchData.service_detail,
        lot_id: ''
      })
    }
  }
  // componentWillUnmount () {
  //   this.props.appointment_lot_barcode()
  // }
  render () {
    // console.log(this.props.searchData.service_id)
    const lot = []

    this.props.appointment_merchant_lot.map(item => {
      lot.push({
        value: item.LOT_ID,
        label: item.LOT_DESC
      })
    })
    const services = []
    this.props.service.map(item => {
      services.push({
        value: item.SERVICE_ID,
        label: item.SERVICE_DESC
      })
    })

    return (
      <React.Fragment>
        <div className={this.state.open ? 'box' : 'box collapsed-box'}>
          <div className='box-header with-border'>
            <h3 className='box-title'>Merchant Lot Detail</h3>
            <div className='box-tools pull-right'>
              <button
                type='button'
                className='btn btn-box-tool'
                data-widget='collapse'
              >
                <i
                  className={this.state.open ? 'fa fa-minus' : 'fa fa-plus'}
                  onClick={this.handleOnClick}
                />
              </button>
            </div>
          </div>
          <div className='box-body'>
            <form
              onSubmit={this.handleOnSubmit}
              ref={el => (this.myFormRef = el)}
            >
              <div className='row'>
                <div className='col-sm-3'>
                  <label htmlFor='servicetype'>Service Name</label>
                  <div className='form-group has-feedback' id='servicetype'>
                    <Select
                      id='servicetype'
                      // isMulti
                      placeholder='Search...'
                      options={services}
                      value={this.state.service_id}
                      onChange={this.handleChangeService_id}
                      className='basic-multi-select'
                      classNamePrefix='select'
                      required
                    />
                  </div>
                </div>
                <div className='col-sm-3'>
                  <label htmlFor='servicetype'>Lot Name</label>
                  <div className='form-group has-feedback' id='servicetype'>
                    <Select
                      id='servicetype'
                      // isClearable
                      options={lot}
                      value={this.state.lot_id}
                      onChange={this.handleChangelot_id}
                      className='basic-select'
                      classNamePrefix='select'
                      required
                    />
                  </div>
                </div>

                {/* <div className='col-sm-2 '>
                  <div className='form-group' style={{ marginTop: '7px' }}>
                    <label className='control-label' />
                    <Button
                      type='submit'
                      title='Search  Barcode'
                      id='save_merch_lot'
                      name='save_merch_lot'
                      className='btn btn-success btn-block btn-flat'
                    >
                      Search
                    </Button>
                  </div>
                </div> */}
              </div>
            </form>
          </div>
        </div>
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'> Barcodes </h3>
                </div>
                <div className='box-body'>
                  <AppointmentLotBarcodeDataTable
                    data={this.props.appointment_lot_barcode || []}
                    {...this.props}
                    service_id={this.state.service_id || ''}
                    disable={this.state.disable}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    services: state.appointmentReducer.services,
    search_barcodes: state.appointmentReducer.search_barcodes,
    appointment_merchant_lot: state.appointmentReducer.appointment_merchant_lot,
    appointment_lot_barcode: state.appointmentReducer.appointment_lot_barcode
  }
}

export default connect(
  mapStateToProps,
  {
    search_barcode,
    checkCustomBarcode,
    InsertLotCustomBarcode,
    add_barcode_aganist_lot_and_barcode,
    get_appointment_lot_barcode_detail,
    save_all_lot_barcode
  }
)(SearchBarcode)
