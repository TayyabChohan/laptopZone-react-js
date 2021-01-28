import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMerchantDetail } from '../../action/merchantLotDetailActions.js'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import Select from 'react-select'
import InvoiceDataTable from '../datatables/InvoiceDataTable.js'
import {
  get_invoice_detail,
  get_invoice_data_detail,
  get_specific_invoice_detail,
  change_Dis_Amount,
  change_Dis_Amount_Perc,
  Change_Charge,
  save_Discount_Amount,
  changeAllDisAmount,
  changeAllDisPerc,
  SaveAllDisAmountChanges,
  insert_payment_detail,
  get_Receipt_no
} from '../../action/invoiceActions.js'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
class InvoiceDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      open: true,
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
  componentDidMount () {
    const data = {
      mid: localStorage.getItem('merId'),
      user_id: localStorage.getItem('userId')
    }
    this.props.getMerchantDetail(data)
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevState.merchant_id == '') {
      const merchant_detail = []
      const merchant = this.props.merchant_name.filter(
        item => item.MERCHANT_ID == localStorage.getItem('merId')
      )
      merchant.map(item => {
        merchant_detail.push({
          value: item.MERCHANT_ID,
          label: item.CONTACT_PERSON
        })
      })
      this.setState({
        ...this.state,
        merchant_id: merchant_detail[0]
      })
    }
    if (
      prevState.merchant_id != '' &&
      this.state.merchant_id != prevState.merchant_id
    ) {
      // if (this.state.merchant_id != prevState.merchant_id) {
      const data1 = {
        merchant_id: this.state.merchant_id.value,
        user_id: localStorage.getItem('userId')
      }
      this.props.get_invoice_detail(data1)
      console.log(data1)
      // }
    }
  }

  handleOnClick = e => {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }

  handleChangeMerchantId = merchant_id => {
    this.setState({
      merchant_id: merchant_id
    })
  }

  render () {
    const merchant_name = []

    this.props.merchant_name.map(item => {
      merchant_name.push({
        value: item.MERCHANT_ID,
        label: item.CONTACT_PERSON
      })
    })
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    // console.log(this.state.merchant_id)
    // console.log(this.props.invoice_detail)
    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Invoice Detail</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Invoice Detail</a>
            </li>
            <li className='active'>Invoice Detail</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className={this.state.open ? 'box' : 'box collapsed-box'}>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Merchant Name</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                      onClick={this.closeAlert}
                    >
                      <i
                        className={
                          this.state.open ? 'fa fa-minus' : 'fa fa-plus'
                        }
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
                    <div className='col-sm-3'>
                      <div className='form-group'>
                        <label htmlFor='merchantname'>Merchant Name</label>
                        <div
                          className='form-group has-feedback'
                          id='merchantname'
                        >
                          <Select
                            id='merchantname'
                            // isMulti
                            options={merchant_name}
                            value={this.state.merchant_id}
                            onChange={this.handleChangeMerchantId}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Invoice Detail</h3>
                </div>
                <div className='box-body'>
                  <InvoiceDataTable
                    invoice_detail={this.props.invoice_detail || []}
                    {...this.props}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <AlertMessage />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    merchant_name: state.genrateBarcodeReducer.merchantname,
    invoice_detail: state.invoiceReducer.invoice_detail,
    invoice_data_detail: state.invoiceReducer.invoice_data_detail,
    specific_invoice_detail: state.invoiceReducer.specific_invoice_detail,
    invoice_summary: state.invoiceReducer.invoice_summary,
    invoicePaymentarray:state.invoiceReducer.invoicePaymentarray
  }
}
export default connect(
  mapStateToProps,
  {
    getMerchantDetail,
    get_invoice_detail,
    get_invoice_data_detail,
    get_specific_invoice_detail,
    change_Dis_Amount,
    change_Dis_Amount_Perc,
    Change_Charge,
    save_Discount_Amount,
    changeAllDisAmount,
    changeAllDisPerc,
    SaveAllDisAmountChanges,
    insert_payment_detail,
    get_Receipt_no
  }
)(InvoiceDetail)
