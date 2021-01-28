import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import {
  getMerchantDetail,
  getTotalBar,
  removeTotalBar,
  countBarCodeInserted,
  printBarCode,
  barcodeDataTable,
  // allBarcodeDataTable,
  getBarcodeDetail,
  genrateBarcodeByDT_ID,
  genrateAllBarcodes,
  updateCost,
  add_new_barcode,
  delete_barcode
} from '../../action/genrateActionBarcode.js'
import BarcodeDataTable from '../datatables/BarcodeDataTable.js'
import ErrorMessage from '../messages/ErrorMessage.js'
import MerchantLotDetail from './MerchantLotDetail.js'
import { connect } from 'react-redux'
import AlertMessage from '../messages/AlertMessage.js'
import Select from 'react-select'
// import Firebase from './Firebase.js'
class GenrateBarcode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      merchant_name: localStorage.getItem('merId'),
      seller_account_name: '',
      lot_id: '',
      merchant_id: [],
      number_of_barcode: '',
      bar_range: '0',
      alert: false,
      alertMessage: '',
      pos_check: false,
      select_lot_id: []
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

    this.props.removeTotalBar()
    const mid = localStorage.getItem('merId')
    const user_id = localStorage.getItem('userId')
    const status = ''
    this.props.barcodeDataTable(mid, user_id, status)
  }
  handleOnCHnageMerchant = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleOnChangeCheck = () => {
    this.setState(prevState => ({
      pos_check: !prevState.pos_check
    }))
  }

  handleOnChange = e => {
    const { value, name } = e.target
    this.setState({ ...this.state, [name]: value }, () => {
      console.log(this.state.lot_id)
      if (this.state.number_of_barcode > 199) {
        console.log('please Insert Less than 200')

        this.setState({
          ...this.state,
          number_of_barcode: '',
          alert: true,
          alertMessage: 'Please enter less than 200'
        })
      } else {
        this.setState({
          ...this.state,
          alert: false,
          alertMessage: ''
        })
      }
      if (this.state.number_of_barcode < 0) {
        console.log('please Fill')
        this.setState({ ...this.state, number_of_barcode: '' })
        console.log(this.state)
      }
      if (this.state.number_of_barcode > 0) {
        this.props.countBarCodeInserted(this.state.number_of_barcode)
      }
      //   this.props.removeTotalBar()
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.merchant_name !== prevState.merchant_name) {
      console.log('prev :' + prevState.merchant_name)
      console.log('current:' + this.state.merchant_name)
      this.props.removeTotalBar()
      this.setState({
        ...this.state,
        seller_account_name: '',
        lot_id: '',
        number_of_barcode: '',
        select_lot_id: []
      })
    }
    if (
      this.state.select_lot_id !== prevState.select_lot_id &&
      this.state.select_lot_id != '' &&
      this.state.select_lot_id != '0'
    ) {
      this.props.getTotalBar(this.state.select_lot_id.value)
    }
    if (this.state.seller_account_name !== prevState.seller_account_name) {
      this.setState({
        ...this.state,
        lot_id: '',
        select_lot_id: []
      })
    }
    if (this.state.number_of_barcode !== prevState.number_of_barcode) {
      this.props.countBarCodeInserted(this.state.number_of_barcode)
    }
  }

  handleOnClick = () => {
    this.props.removeTotalBar()
  }

  handleOnSubmit = e => {
    e.preventDefault()
    const data = {
      merchant_id: this.state.merchant_name,
      seller_account_id: this.state.seller_account_name,
      lot_id: this.state.select_lot_id.value,
      no_of_bar: this.state.number_of_barcode,
      user_id: localStorage.getItem('userId'),
      bar_range: this.state.bar_range,
      pos_check: this.state.pos_check
    }
    this.props.printBarCode(data)
    this.myFormRef.reset()
    // this.props.barcodeDataTable()
  }

  handleChange = merchant_id => {
    this.setState({ ...this.state, merchant_id: merchant_id })
  }
  handleChangeLot = select_lot_id => {
    this.setState({ ...this.state, select_lot_id: select_lot_id })
  }
  render () {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    let default_seller_data = (this.props.seller_account_names || []).filter(
      item =>
        item.MERCHANT_ID === this.state.merchant_name &&
        item.DEFAULT_MERCHANT === '1'
    )

    console.log(this.state)
    //  DATE
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    const yyyy = today.getFullYear()
    today = yyyy + '/' + mm + '/' + dd

    // Enable And Disable Fields
    const enable_seller = this.state.merchant_name > 0
    const enable_lot = this.state.seller_account_name > 0 && enable_seller
    const alertShow = this.state.alert
    // Filter Seller Account Acording to Merchant
    let seller_data = (this.props.seller_account_names || []).filter(
      item => item.MERCHANT_ID === this.state.merchant_name
    )
    console.log(seller_data)
    // Filter Lot According To Merchant
    let lot_data = (this.props.lot_name || []).filter(
      item => item.MERCHANT_ID === this.state.merchant_name
    )
    let lot_array = []
    lot_data.map(item => {
      lot_array.push({
        value: item.LOT_ID,
        label: item.LOT_DESC
      })
    })

    // ENbale Print Button
    // && this.state.merchant_name != ''
    const buttonenbale =
      this.state.number_of_barcode > 0 && this.state.seller_account_name > 0
    console.log(lot_data)
    const selectLot = this.state.lot_id == 0

    const merchant_names = []

    this.props.merchant_names.map(item => {
      merchant_names.push({
        value: item.MERCHANT_ID,
        label: item.CONTACT_PERSON
      })
    })

    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Generate Barcode</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Generate Barcode</a>
            </li>
            <li className='active'>generatebarcode</li>
          </ol>
        </section>
        {alertShow ? (
          <div className='row'>
            <div className='col-xs-12'>
              <div
                className='alert alert-danger alert-dismissible'
                role='alert'
              >
                <button
                  type='button'
                  className='close'
                  data-dismiss='alert'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
                {this.state.alertMessage}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {/* <Firebase /> */}
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <MerchantLotDetail />
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Generate Barcode</h3>
                </div>
                <div className='box-body'>
                  <form
                    onSubmit={this.handleOnSubmit}
                    ref={el => (this.myFormRef = el)}
                  >
                    <div className='col-xs-2'>
                      <div className='form-group has-feedback'>
                        <label for='current_date'>Date</label>
                        <input
                          type='text'
                          id='current_date'
                          className='form-control'
                          name='issue_date'
                          placeholder='Current Date'
                          readOnly
                          value={today}
                        />
                      </div>
                    </div>
                    <div className='col-xs-2'>
                      <div className='form-group has-feedback'>
                        <label for='select_merchant_name'> Merchant Name</label>

                        <select
                          id='select_merchant_name'
                          className='form-control'
                          name='merchant_name'
                          onChange={this.handleOnCHnageMerchant}
                          onClick={this.handleOnClick}
                          required
                          // disabled={!enable}
                        >
                          <option value='0'>Select One</option>
                          {(this.props.merchant_names || []).map(data => {
                            let select = ''
                            if (
                              data.MERCHANT_ID == localStorage.getItem('merId')
                            ) {
                              select = 'selected'
                            }
                            return (
                              <option
                                key={data.MERCHANT_ID}
                                value={data.MERCHANT_ID}
                                selected={select}
                              >
                                {data.CONTACT_PERSON}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    {/* {!enable_seller ? ( */}

                    {/* ) : ( */}
                    <div className='col-xs-2'>
                      <div className='form-group has-feedback'>
                        <label for='select_seller_account'>
                          Seller Account
                        </label>
                        <select
                          id='select_seller_name'
                          className='form-control'
                          name='seller_account_name'
                          onChange={this.handleOnChange}
                          onClick={this.handleOnClick}
                          required
                          disabled={!enable_seller}
                        >
                          <option value='0'>Select One</option>
                          {(seller_data || []).map(item => {
                            let select = ''
                            if (
                              item.MERCHANT_ID ==
                                localStorage.getItem('merId') ||
                              item.DEFAULT_MERCHANT === '1'
                            ) {
                              if (this.state.seller_account_name == '') {
                                this.setState({
                                  ...this.state,
                                  seller_account_name: item.ACCT_ID
                                })
                              }
                              select = 'selected'
                            }
                            return (
                              <option
                                key={item.ACCT_ID}
                                value={item.ACCT_ID}
                                selected={select}
                              >
                                {item.ACCOUNT_NAME}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    {/* ) */}
                    {/* } */}
                    {!enable_lot ? (
                      ''
                    ) : (
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_lot_name'>Lot</label>
                          <Select
                            id='select_lot_name'
                            options={lot_array}
                            value={this.state.select_lot_id}
                            onChange={this.handleChangeLot}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                          {/* <select
                            id='select_lot_name'
                            className='form-control'
                            name='lot_id'
                            onChange={this.handleOnChange}
                            required
                            // disabled={!enable_lot}
                          >
                            <option value='0' selected={selectLot}>
                              Select One
                            </option>
                            {(lot_data || []).map(item => (
                              <option key={item.LOT_ID} value={item.LOT_ID}>
                                {item.LOT_DESC}
                              </option>
                            ))}
                          </select> */}
                        </div>
                      </div>
                    )}
                    <div className='col-xs-2'>
                      <div className='form-group has-feedback'>
                        <label for='barcode'>No of Barcode</label>
                        <input
                          type='number'
                          id='barcode'
                          className='form-control'
                          name='number_of_barcode'
                          placeholder='Barcode'
                          value={this.state.number_of_barcode}
                          onChange={this.handleOnChange}
                        />
                        <label
                          className='control-label'
                          style={{ color: 'red' }}
                        >
                          Range:
                        </label>
                        &nbsp;&nbsp;
                        <input
                          type='radio'
                          className='bar_range'
                          name='bar_range'
                          value='1'
                          onChange={this.handleOnChange}
                        />
                        &nbsp;Yes&nbsp;&nbsp;
                        <input
                          type='radio'
                          className='bar_range'
                          name='bar_range'
                          value='0'
                          onChange={this.handleOnChange}
                          // checked
                        />
                        &nbsp;No &nbsp;&nbsp;
                        <label
                          className='control-label'
                          style={{ color: 'red' }}
                        >
                          POS:
                        </label>
                        &nbsp;&nbsp;
                        <input
                          type='checkbox'
                          className='pos_check'
                          name='pos_check'
                          value='1'
                          onChange={this.handleOnChangeCheck}
                        />
                      </div>
                    </div>
                    <div className='col-sm-2'>
                      <div className='form-group has-feedback'>
                        <label for='print_barcode'> Print </label>
                        <button
                          type='submit'
                          className='btn btn-primary btn-block btn-flat'
                          disabled={!buttonenbale}
                        >
                          Print
                        </button>
                      </div>
                    </div>
                    <div className='col-sm-12 '>
                      <div className='col-sm-1'>
                        Total Barcode:
                        <p id='to_bar' style={{ color: 'red' }}>
                          {this.props.total_barcodes.TOTAL_BAR}
                        </p>
                      </div>
                      <div className='col-sm-1'>
                        Cost $:
                        <p style={{ color: 'red' }} id='to_cost'>
                          {this.props.total_barcodes.COST_LOT}
                        </p>
                      </div>
                      <div className='col-sm-1'>
                        Weight / lbs:
                        <p style={{ color: 'red' }} id='to_weihgt'>
                          {this.props.total_barcodes.WEIGH}
                        </p>
                      </div>
                      <div className='col-sm-1'>
                        $ / LBS:
                        <p style={{ color: 'red' }} id='to_lbs'>
                          {this.props.total_barcodes.COST_PER_LBS}
                        </p>
                      </div>
                      <div className='col-sm-1'>
                        Avg Cost:
                        <p style={{ color: 'red' }} id='to_avg'>
                          {this.props.total_barcodes.AVG_AMOUNT}
                        </p>
                      </div>
                    </div>
                  </form>
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
                  <h3 className='box-title'>Barcode Records</h3>
                </div>
                <div className='box-body'>
                  <BarcodeDataTable
                    data={this.props.datatable_data}
                    {...this.props}
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
const mapStateToProps = state => {
  return {
    merchant_names: state.genrateBarcodeReducer.merchantname,
    lot_name: state.genrateBarcodeReducer.lot,
    seller_account_names: state.genrateBarcodeReducer.seller_account,
    total_barcodes: state.genrateBarcodeReducer.total_barcode,
    datatable_data: state.genrateBarcodeReducer.barcode_detail_table,
    detail_barcode: state.genrateBarcodeReducer.detail_barcode
  }
}
export default connect(
  mapStateToProps,
  {
    getMerchantDetail,
    getTotalBar,
    removeTotalBar,
    countBarCodeInserted,
    printBarCode,
    barcodeDataTable,
    // allBarcodeDataTable,
    getBarcodeDetail,
    genrateBarcodeByDT_ID,
    genrateAllBarcodes,
    updateCost,
    add_new_barcode,
    delete_barcode
  }
)(GenrateBarcode)
