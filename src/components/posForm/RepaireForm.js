import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import {
  get_pos_store_name,
  pos_form_state,
  pos_form_data
} from '../../action/posActions.js'
import {
  save_pos_repaire_data,
  repaire_pos_data,
  pos_form_state_edit,
  delete_pos_repaire_data,
  print_pos_repaire,
  get_barcode_detail_pos_repair,
  change_line_type_repaire,
  change_cost_price_repaire,
  delete_pos_barcode_repaire,
  change_advance_payment_repaire
} from '../../action/posRepaireActions.js'
import {
  get_barcode_detail_pos_repair_edit,
  update_pos_repaire_data,
  change_line_type_repaire_edit,
  change_cost_price_repaire_edit,
  delete_pos_barcode_repaire_edit,
  change_advance_payment_repaire_edit,
  get_specific_pos_repair_data,
  edit_unmount
} from '../../action/posRepairEditActions.js'
import { Redirect } from 'react-router-dom'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import ReapireFromDatatable from '../datatables/PosDatatables/RepaireFormDatatable.js'
import { toastr } from 'react-redux-toastr'
import RepairFormPartsDataTable from '../datatables/PosDatatables/RepairFormPartsDataTable.js'
class RepaireForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open_box: true,
      open_table: true,
      delivery_date: new Date(),
      address: '',
      product_owner: '',
      phoneNumber: '',
      email: '',
      repaire_cost: '',
      repaire_des: '',
      serial_no: '',
      store_id: JSON.parse(localStorage.getItem('store_name')),
      city_id: '',
      advance_payment: '',
      state_id: '',
      mpn: '',
      brand: '',
      line_type: '',
      service_charges: '',
      scan_barcode: ''
    }
  }
  componentWillMount () {
    if (localStorage.getItem('userName')) {
    } else {
      let getUrl = window.location
      let finalurl = getUrl.protocol + '//' + getUrl.hostname

      this.setState({ redirectToReferrer: true, finalurl: finalurl })
    }
  }

  componentDidMount () {
    this.props.pos_form_data()
    this.props.get_pos_store_name()
    this.props.repaire_pos_data()
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.pos_city !== this.props.pos_city &&
      this.props.pos_city !== ''
    ) {
      const default_buyer_city = []
      default_buyer_city.push({
        value: this.props.pos_city[8].CITY_ID,
        label: this.props.pos_city[8].CITY_DESC
      })

      this.setState({
        city_id: default_buyer_city[0]
      })
    }
    if (prevState.city_id !== this.state.city_id && this.state.city_id !== '') {
      const data = {
        city_id: this.state.city_id[0]
          ? this.state.city_id[0]
          : this.state.city_id
      }
      // console.table(data)
      this.props.pos_form_state(data)
    }
    if (
      prevProps.pos_state !== this.props.pos_state &&
      this.props.pos_state !== ''
    ) {
      const default_buyer_state = []
      default_buyer_state.push({
        value: this.props.pos_state[0].STATE_ID || '',
        label: this.props.pos_state[0].STATE_DESC || ''
      })
      this.setState({
        state_id: default_buyer_state[0]
      })
    }
    if (
      prevState.store_id !== this.state.store_id &&
      this.state.store_id !== ''
    ) {
      const data = {
        store_id: this.state.store_id[0]
          ? this.state.store_id[0]
          : this.state.store_id
      }
      this.props.get_tax(data)
      localStorage.setItem(
        'store_name',
        JSON.stringify(
          this.state.store_id[0] ? this.state.store_id[0] : this.state.store_id
        )
      )
    }
  }
  handleOnClickBox = () => {
    this.setState(prevState => ({
      open_box: !prevState.open_box
    }))
  }

  handleOnClickTable = () => {
    this.setState(prevState => ({
      open_table: !prevState.open_table
    }))
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleChangeState = state_id => {
    this.setState({
      state_id: state_id
    })
  }
  handleChangeCity = city_id => {
    this.setState({
      city_id: city_id
    })
  }
  handleChangeLineType = line_type => {
    this.setState({
      line_type: line_type
    })
  }
  handleChangeStore = store_id => {
    this.setState({
      store_id: store_id
    })
  }

  handleOnSubmit = e => {
    // e.preventDefault()
    const data = {
      delivery_date: dateFormat(this.state.delivery_date, 'dd/mm/yyyy'),
      product_owner: this.state.product_owner,
      // repaire_cost: this.state.repaire_cost,
      repaire_cost: this.state.service_charges,
      repaire_des: this.state.repaire_des,
      email: this.state.email,
      serial_no: this.state.serial_no.toUpperCase(),
      store_id: this.state.store_id,
      phoneNumber: this.state.phoneNumber,
      advance_payment: this.state.advance_payment,
      mpn: this.state.mpn,
      user_id: localStorage.getItem('userId'),
      city_id: this.state.city_id,
      state_id: this.state.state_id,
      brand: this.state.brand,
      line_type: this.state.line_type,
      service_charges: this.state.service_charges,
      data: this.props.pos_repair_barcode_detail
    }
    const save = this.props.pos_repair_barcode_detail.filter(
      item => item.LINE_TYPE === null
    )
    const price = this.props.pos_repair_barcode_detail.filter(
      item => item.COST_PRICE == null
    )
    console.log(data)
    if (this.state.phoneNumber == '') {
      toastr.error('Error', 'Please Enter Phone Number')
    } else if (this.state.line_type == '') {
      toastr.error('Error', 'Please Enter Line Type')
    } else if (save.length > 0) {
      toastr.error('Error', 'Please Select All line Types')
    } else if (price.length > 0) {
      toastr.error('Error', 'Please Insert Price')
    } else {
      this.props.save_pos_repaire_data(data)
      this.setState({
        product_owner: '',
        repaire_cost: '',
        repaire_des: '',
        email: '',
        serial_no: '',
        store_id: '',
        phoneNumber: '',
        advance_payment: '',
        mpn: '',
        city_id: '',
        state_id: '',
        brand: '',
        line_type: '',
        service_charges: ''
      })
    }
  }
  scan_Barcode = e => {
    e.preventDefault()
    const data = {
      barcode: this.state.scan_barcode
    }
    // console.log(this.state)
    this.props.get_barcode_detail_pos_repair(data)
    this.setState({
      // scan_barcode: ''
    })
  }
  render () {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    let Store_name = []
    this.props.store_name.map(item => {
      return Store_name.push({
        value: item.LJ_POS_STORE_ID,
        label:
          item.STORE_NAME + ' | ' + item.CITY_DESC + ' | ' + item.STATE_DESC
      })
    })
    const disable_barcode = this.state.scan_barcode !== ''
    const buyer_city = []
    this.props.pos_city.map(item => {
      return buyer_city.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      })
    })
    const Line_types = [
      // {
      //   value: 'PT',
      //   label: 'Parts'
      // },
      { value: 'SR', label: 'Service' }
      // { value: 'SH', label: 'Shipping' },
      // { value: 'OT', label: 'Other' }
    ]
    const button = this.state.store_id !== ''
    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Repair Form POS</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>Point Of Sale</li>
            <li className='active'>Repair Form POS</li>
          </ol>
        </section>

        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={this.state.open_box ? 'box' : 'box collapsed-box'}
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Repair Form</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_box ? 'fa fa-minus' : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickBox}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    {/* <form onSubmit={this.handleOnSubmit}> */}
                    <div className='col-sm-12'>
                      <div className='col-sm-2'>
                        <div className='form-group' id='Store'>
                          <label htmlFor='Store'>Store Name</label>
                          <small> Store_Name| City | State</small>
                          <Select
                            id='Store'
                            options={Store_name}
                            value={this.state.store_id}
                            onChange={this.handleChangeStore}
                            className='basic-select'
                            classNamePrefix='select'
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='product_owner'
                            className='control-label'
                          >
                            Customer
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='product_owner'
                            name='product_owner'
                            value={this.state.product_owner}
                            onChange={this.handleOnChange}
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label htmlFor='Email' className='control-label'>
                            Email
                          </label>
                          <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            onChange={this.handleOnChange}
                            value={this.state.email}
                            // required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label htmlFor='Phone' className='control-label'>
                            Phone *
                          </label>
                          <NumberFormat
                            className='form-control'
                            format='(###) ###-########'
                            mask='_'
                            onChange={this.handleOnChange}
                            name='phoneNumber'
                          />
                        </div>
                      </div>

                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='service_charges'
                            className='control-label'
                          >
                            Service Charges
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='service_charges'
                            name='service_charges'
                            onChange={this.handleOnChange}
                            value={this.state.service_charges}
                            thousandSeparator
                            prefix={'$'}
                            required
                          />
                          {/* <input
                              type='number'
                              className='form-control'
                              id='repaire_cost'
                              name='repaire_cost'
                              onChange={this.handleOnChange}
                              value={this.state.repaire_cost}
                              required
                            /> */}
                        </div>
                      </div>
                      {/* <div className='col-sm-2'>
                          <div className='form-group'>
                            <label
                              htmlFor='repaire_cost'
                              className='control-label'
                            >
                              Estimated Repair Cost
                            </label>
                            <NumberFormat
                              className='form-control'
                              id='repaire_cost'
                              name='repaire_cost'
                              onChange={this.handleOnChange}
                              value={this.state.repaire_cost}
                              thousandSeparator
                              prefix={'$'}
                              required
                            />
                            {/* <input
                              type='number'
                              className='form-control'
                              id='repaire_cost'
                              name='repaire_cost'
                              onChange={this.handleOnChange}
                              value={this.state.repaire_cost}
                              required
                            /> *
                          </div>
                        </div> */}
                    </div>

                    <div className='col-sm-12'>
                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='Date' className='control-label'>
                            Expected Delivery Date
                          </label>
                          <Flatpickr
                            className='form-control'
                            options={{
                              minDate: 'today',
                              enableTime: true,
                              dateFormat: 'Y-m-d H:i'
                            }}
                            value={this.state.delivery_date}
                            onChange={delivery_date => {
                              this.setState({ delivery_date })
                            }}
                          />
                        </div>
                      </div>
                      {/* <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='Address' className='control-label'>
                              Address
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              id='address'
                              name='address'
                              onChange={this.handleOnChange}
                              value={this.state.address}
                              required
                            />
                          </div>
                        </div> */}
                      <div className='col-sm-3'>
                        <label htmlFor='city'>Line Type</label>
                        <div className='form-group has-feedback' id='city'>
                          <Select
                            id='city'
                            options={Line_types}
                            value={this.state.line_type}
                            onChange={this.handleChangeLineType}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-3'>
                        <label htmlFor='city'>City Name</label>
                        <div className='form-group has-feedback' id='city'>
                          <Select
                            id='city'
                            options={buyer_city}
                            value={this.state.city_id}
                            onChange={this.handleChangeCity}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <label htmlFor='state'>State Name</label>
                        <div className='form-group has-feedback' id='state'>
                          <Select
                            id='state'
                            // options={buyer_states}
                            value={this.state.state_id}
                            onChange={this.handleChangeState}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-sm-12'>
                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='serial_no' className='control-label'>
                            Serial No
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='serial_no'
                            name='serial_no'
                            onChange={this.handleOnChange}
                            value={this.state.serial_no.toUpperCase()}
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='brand' className='control-label'>
                            Brand
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='brand'
                            name='brand'
                            onChange={this.handleOnChange}
                            value={this.state.brand}
                            // required
                          />
                        </div>
                      </div>
                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='mpn' className='control-label'>
                            MPN | Modal
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='mpn'
                            name='mpn'
                            onChange={this.handleOnChange}
                            value={this.state.mpn}
                            // required
                          />
                        </div>
                      </div>

                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='advance_payment'
                            className='control-label'
                          >
                            Advance Payment
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='advance_payment'
                            name='advance_payment'
                            onChange={this.handleOnChange}
                            value={this.state.advance_payment}
                            thousandSeparator
                            prefix={'$'}
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='repaire_des'
                            className='control-label'
                          >
                            Repair Description
                          </label>
                          <textarea
                            rows='4'
                            cols='50'
                            id='repaire_des'
                            name='repaire_des'
                            className='form-control'
                            onChange={this.handleOnChange}
                            value={this.state.repaire_des}
                            style={{ resize: 'none', width: '450px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-sm-12'>
                      <form onSubmit={this.scan_Barcode}>
                        <div className='col-sm-3'>
                          <div className='input-group'>
                            <label
                              htmlFor='scan_barcode'
                              className='control-label'
                            >
                              Scan Barcode:
                            </label>
                            <input
                              type='text'
                              className='form-control scan_barcode '
                              id='scan_barcode'
                              name='scan_barcode'
                              value={this.state.scan_barcode}
                              onChange={this.handleOnChange}
                              placeholder='Scan Barcode other then service'
                            />
                            <div
                              className='input-group-btn'
                              style={{ display: 'block' }}
                            >
                              <button
                                className='btn btn-info '
                                id='click_ser_barcode'
                                type='submit'
                                disabled={!disable_barcode}
                              >
                                <i className='glyphicon glyphicon-search' />
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div
                        className='col-sm-2'
                        style={{ float: 'right', marginTop: '50px' }}
                      >
                        <div className='form-group'>
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.handleOnSubmit}
                            disabled={!button}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={this.state.open_table ? 'box' : 'box collapsed-box'}>
            <div className='box-header with-border'>
              <h3 className='box-title'>Scan Barcode:</h3>
              <div className='box-tools pull-right'>
                <button
                  type='button'
                  className='btn btn-box-tool'
                  data-widget='collapse'
                >
                  <i
                    className={
                      this.state.open_table ? 'fa fa-minus' : 'fa fa-plus'
                    }
                    onClick={this.handleOnClickTable}
                  />
                </button>
              </div>
            </div>
            {/* <!-- /.box-header --> *
            <div className='box-body'>
              <div className='col-sm-12'>
                <form onSubmit={this.scan_Barcode}>
                  <div className='col-sm-3'>
                    <div className='input-group'>
                      <label htmlFor='scan_barcode' className='control-label'>
                        Scan Barcode:
                      </label>
                      <input
                        type='text'
                        className='form-control scan_barcode '
                        id='scan_barcode'
                        name='scan_barcode'
                        value={this.state.scan_barcode}
                        onChange={this.handleOnChange}
                        placeholder='Scan Barcode other then service'
                      />
                      <div
                        className='input-group-btn'
                        style={{ display: 'block' }}
                      >
                        <button
                          className='btn btn-info '
                          id='click_ser_barcode'
                          type='submit'
                          disabled={!disable_barcode}
                        >
                          <i className='glyphicon glyphicon-search' />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div> */}

          {this.props.pos_repair_barcode_detail !== [] ? (
            <div
              className={this.state.open_table ? 'box' : 'box collapsed-box'}
            >
              <div className='box-header with-border'>
                <h3 className='box-title'>Scan Barcode Detail</h3>
                <div className='box-tools pull-right'>
                  <button
                    type='button'
                    className='btn btn-box-tool'
                    data-widget='collapse'
                  >
                    <i
                      className={
                        this.state.open_table ? 'fa fa-minus' : 'fa fa-plus'
                      }
                      onClick={this.handleOnClickTable}
                    />
                  </button>
                </div>
              </div>
              {/* <!-- /.box-header --> */}
              <div className='box-body'>
                {/* <div className='row'> */}
                <RepairFormPartsDataTable {...this.props} />
                {/* </div> */}
              </div>
            </div>
          ) : null}

          <div className={this.state.open_table ? 'box' : 'box collapsed-box'}>
            <div className='box-header with-border'>
              <h3 className='box-title'>Repair Form</h3>
              <div className='box-tools pull-right'>
                <button
                  type='button'
                  className='btn btn-box-tool'
                  data-widget='collapse'
                >
                  <i
                    className={
                      this.state.open_table ? 'fa fa-minus' : 'fa fa-plus'
                    }
                    onClick={this.handleOnClickTable}
                  />
                </button>
              </div>
            </div>
            {/* <!-- /.box-header --> */}
            <div className='box-body'>
              {/* <div className='row'> */}
              <ReapireFromDatatable {...this.props} />
              {/* </div> */}
            </div>
          </div>
        </section>
        <ErrorMessage />
        <AlertMessage />
      </React.Fragment>
    )
  }
}
const mapStateToPRops = state => {
  return {
    store_name: state.posReducer.store_name,
    pos_state: state.posReducer.pos_state,
    pos_city: state.posReducer.pos_city,
    pos_state_edit: state.posReducer.pos_state_edit,
    repaire_data: state.posRepaireReducer.repaire_data,
    pos_repair_barcode_detail:
      state.posRepaireReducer.pos_repair_barcode_detail,
    pos_repair_barcode_detail_edit:
      state.posRepaireReducer.pos_repair_barcode_detail_edit
  }
}
export default connect(
  mapStateToPRops,
  {
    get_pos_store_name,
    save_pos_repaire_data,
    pos_form_state,
    pos_form_data,
    pos_form_state_edit,
    repaire_pos_data,
    update_pos_repaire_data,
    delete_pos_repaire_data,
    print_pos_repaire,
    get_barcode_detail_pos_repair,
    get_barcode_detail_pos_repair_edit,
    change_line_type_repaire,
    change_cost_price_repaire,
    delete_pos_barcode_repaire,
    change_advance_payment_repaire,
    change_line_type_repaire_edit,
    change_cost_price_repaire_edit,
    delete_pos_barcode_repaire_edit,
    change_advance_payment_repaire_edit,
    get_specific_pos_repair_data,
    edit_unmount
  }
)(RepaireForm)
