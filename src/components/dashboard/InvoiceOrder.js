import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Modal from 'react-modal'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import Select from 'react-select'
import {
  get_order_data,
  close_pane,
  get_order_id_barcode,
  get_Verify,
  get_UnVerify,
  get_all_record,
  verified_all_barcode,
  un_verified_all_barcode
} from '../../action/invoiceOrderActions.js'
import { getMerchantDetail } from '../../action/merchantLotDetailActions.js'
import InvoiceOrderDataTable from '../datatables/dashboardDataTable/InvoiceOrderDataTable.js'
import InvoiceOrderBarcodeDataTable from '../datatables/dashboardDataTable/InvoiceOrderBarcodeDataTable.js'
import { connect } from 'react-redux'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import NumberFormat from 'react-number-format'
class InvoiceOrder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      open_box: true,
      scan_order_id: '',
      isPaneOpen: false,
      isPaneOpenLeft: false,
      merchant_id: ''
    }
  }
  componentWillMount () {
    if (localStorage.getItem('userName')) {
      // console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.order_data !== this.props.order_data &&
      this.props.order_data !== ''
    ) {
      this.setState({
        isPaneOpen: true
      })
    }
    if (
      prevProps.merchant_name !== this.props.merchant_name &&
      this.props.merchant_name !== ''
    ) {
      const merchant_id = localStorage.getItem('merId')
      const data = this.props.merchant_name.filter(
        item => item.MERCHANT_ID == merchant_id
      )
      const merchant_data = []

      data.map(item => {
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
  componentDidMount () {
    Modal.setAppElement(this.el)
    const data = {
      mid: localStorage.getItem('merId'),
      user_id: localStorage.getItem('userId')
    }
    this.props.getMerchantDetail(data)
  }

  handleOnClickBox = () => {
    this.setState(prevState => ({
      open_box: !prevState.open_box
    }))
  }
  close_pane = () => {
    this.props.close_pane()
  }
  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleChangeMerchant = merchant_id => {
    this.setState({
      merchant_id: merchant_id
    })
  }
  scanOrder = e => {
    e.preventDefault()
    const data = {
      order_id: this.state.scan_order_id,
      merchant_id: this.state.merchant_id
    }
    this.props.get_order_data(data)
    this.setState({
      scan_order_id: ''
    })
  }
  render () {
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
    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Get Invoice Orders </h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Dashboard</a>
            </li>
            <li className='active'>Get Invoice Orders</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={this.state.open_box ? 'box' : 'box collapsed-box'}
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Get Invoice Orders</h3>
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
                    <div className='col-sm-12'>
                      <form onSubmit={this.scanOrder}>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label
                              htmlFor='scan_order_id'
                              className='control-label'
                            >
                              Scan Order Id
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              id='scan_order_id'
                              name='scan_order_id'
                              value={this.state.scan_order_id}
                              onChange={this.handleOnChange}
                              placeholder='Scan Order Id'
                            />
                          </div>
                        </div>
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
                              isClearable
                            />
                          </div>
                        </div>
                        <div className='col-sm-1'>
                          <div
                            className='form-group'
                            style={{ marginTop: '24px', float: 'right' }}
                          >
                            <Button
                              type='submit'
                              className='btn btn-primary btn-block btn-flat'
                              //   onClick={this.saveInvoicePos}
                              //   disabled={!save_button}
                            >
                              Get Orders
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**
           */}
          <div ref={ref => (this.el = ref)}>
            <SlidingPane
              className='some-custom-class'
              overlayClassName='some-custom-overlay-class'
              isOpen={this.props.isPaneOpen}
              title='Get Invoice Orders'
              subtitle='Get Order Detail.'
              onRequestClose={this.close_pane}
            >
              <InvoiceOrderDataTable {...this.props} />
              <br />
            </SlidingPane>
          </div>
          ;
          {this.props.order_barcode.length > 0 ? (
            <React.Fragment>
              <div className='row'>
                <div className='col-xs-12'>
                  <div className='box'>
                    <div className='box-header with-border'>
                      <h3 className='box-title'>Invoice Master Barcodes</h3>
                    </div>
                    <div className='box-body'>
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='order_id'>Order_Id</label>
                          <input
                            type='text'
                            id='order_id'
                            className='form-control'
                            value={this.props.master_order_data.ORDER_ID || ''}
                            disabled
                          />
                        </div>
                      </div>

                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='Ebay_id'>Ebay Id</label>
                          <input
                            type='text'
                            id='Ebay_id'
                            className='form-control'
                            value={this.props.master_order_data.EBAY_ID || ''}
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-5'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='item_title'>Item Title</label>
                          <input
                            type='text'
                            id='item_title'
                            className='form-control'
                            value={
                              this.props.master_order_data.ITEM_TITLE || ''
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-1'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='Invoice_id'>Invoice Id</label>
                          <input
                            type='text'
                            id='Invoice_id'
                            className='form-control'
                            value={
                              this.props.master_order_data.INVOICE_ID || ''
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='shipping_label_rate'>
                            Shipping Lable Rate
                          </label>
                          <input
                            type='text'
                            id='shipping_label_rate'
                            className='form-control'
                            value={
                              this.props.master_order_data.SHIPING_LABEL_RATE ||
                              ''
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-1'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='sale_price'>Sale Price</label>
                          <input
                            type='text'
                            id='sale_price'
                            className='form-control'
                            value={
                              this.props.master_order_data.SALE_PRICE || ''
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-1'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='qty'>Qty</label>
                          <input
                            type='text'
                            id='qty'
                            className='form-control'
                            value={this.props.master_order_data.QTY || ''}
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='buyer_name'>Buyer Name</label>
                          <input
                            type='text'
                            id='buyer_name'
                            className='form-control'
                            value={
                              this.props.master_order_data.BUYER_NAME || ''
                            }
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='sale_date'>Sale Date</label>
                          <input
                            type='text'
                            id='sale_date'
                            className='form-control'
                            value={this.props.master_order_data.SALE_DATE || ''}
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='status'>Status</label>
                          <input
                            type='text'
                            id='status'
                            className='form-control'
                            value={this.props.master_order_data.STATUS || ''}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-xs-12'>
                  <div className='box'>
                    <div className='box-header with-border'>
                      <h3 className='box-title'>Invoice Order Barcodes</h3>
                    </div>
                    <div className='box-body'>
                      <InvoiceOrderBarcodeDataTable {...this.props} />
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            ''
          )}
        </section>
        <ErrorMessage />
        <AlertMessage />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    order_data: state.invoiceOrderReducer.order_data,
    isPaneOpen: state.invoiceOrderReducer.isPaneOpen,
    order_barcode: state.invoiceOrderReducer.order_barcode,
    merchant_name: state.genrateBarcodeReducer.merchantname,
    master_order_data: state.invoiceOrderReducer.master_order_data
  }
}
export default connect(
  mapStateToProps,
  {
    get_order_data,
    close_pane,
    get_order_id_barcode,
    getMerchantDetail,
    get_Verify,
    get_UnVerify,
    get_all_record,
    verified_all_barcode,
    un_verified_all_barcode
  }
)(InvoiceOrder)
