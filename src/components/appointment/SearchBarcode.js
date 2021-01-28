import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import {
  search_barcode,
  checkCustomBarcode,
  InsertSearchCustomBarcode
} from '../../action/appointmentActions.js'
import Select from 'react-select'
import AppointmentSearchBarcodeDataTable from '../datatables/AppointmentSearchBarcodeDataTable.js'

class SearchBarcode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search_barcode: '',
      service_id: '',
      open: true,
      redirectToReferrer: false
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
  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({ ...this.state, [name]: value })
    // console.log(this.state)
  }
  handleOnSubmit = e => {
    e.preventDefault()
    const data = {
      search_barcode: this.state.search_barcode,
      merchant_id: this.props.detailModel.MERCHANT_ID
    }
    // console.log(this.props.detailModel.MERCHANT_ID)
    this.props.search_barcode(data)
    // this.myFormRef.reset()
  }

  componentWillUnmount () {
    this.props.search_barcode()
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.searchData.service_detail !=
        this.props.searchData.service_detail ||
      prevProps.searchData.appointment_id !=
        this.props.searchData.appointment_id
    ) {
      this.setState({
        // service_id: {
        //   value: this.props.searchData.service_detail.value,
        //   label: this.props.searchData.service_detail.label
        // },
        service_id: this.props.searchData.service_detail,
        search_barcode: ''
      })
    }
    if (
      prevProps.searchData.appointment_id !=
        this.props.searchData.appointment_id ||
      this.props.searchData.search_barcode
    ) {
      //   this.state.search_barcode = ''
      this.setState({
        search_barcode: ''
      })
    }
  }

  render () {
    const services = []
    this.props.service.map(item => {
      services.push({
        value: item.SERVICE_ID,
        label: item.SERVICE_DESC
      })
    })
    // if (this.state.service_id == '') {
    //   this.setState({
    //     service_id: this.props.searchData.service_detail
    //   })
    // }
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
                <div className='col-sm-6'>
                  <label>Search Barcode</label>
                  <div className='form-group has-feedback'>
                    <input
                      type='text'
                      name='search_barcode'
                      id='search_barcode'
                      className='form-control'
                      value={this.state.search_barcode}
                      onChange={this.handleOnChange}
                      required
                    />
                    <span className='glyphicon glyphicon-search form-control-feedback' />
                  </div>
                </div>

                <div className='col-sm-2 '>
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
                </div>
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
                  <AppointmentSearchBarcodeDataTable
                    data={this.props.search_barcodes || []}
                    {...this.props}
                    service_id={this.state.service_id || ''}
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
    search_barcodes: state.appointmentReducer.search_barcodes
  }
}

export default connect(
  mapStateToProps,
  { search_barcode, checkCustomBarcode, InsertSearchCustomBarcode }
)(SearchBarcode)
