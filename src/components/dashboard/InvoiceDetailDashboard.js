import React, { Component } from 'react'
import { connect } from 'react-redux'
import AlertMessage from '../messages/AlertMessage.js'
import DashboardInvoiceDataTable from '../datatables/dashboardDataTable/DashboardInvoiceDataTable.js'
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
  SaveAllDisAmountChanges
} from '../../action/invoiceActions.js'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
class InvoiceDetailDashboard extends Component {
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
      merchant_id: localStorage.getItem('merId'),
      user_id: localStorage.getItem('userId')
    }
    this.props.get_invoice_detail(data)
    // this.props.getMerchantDetail(data)
  }

  render () {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    // console.log(this.state.merchant_id)
    // console.log(this.props.invoice_detail)
    return (
      <React.Fragment>
        <div className='col-xs-12'>
          <div className='box'>
            <div className='box-header with-border'>
              <h3 className='box-title'>Invoices</h3>
            </div>
            <div className='box-body'>
              <DashboardInvoiceDataTable
                invoice_detail={this.props.invoice_detail || []}
                {...this.props}
              />
            </div>
          </div>
        </div>
        <AlertMessage />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    invoice_detail: state.invoiceReducer.invoice_detail,
    invoice_data_detail: state.invoiceReducer.invoice_data_detail,
    specific_invoice_detail: state.invoiceReducer.specific_invoice_detail,
    invoice_summary: state.invoiceReducer.invoice_summary
  }
}
export default connect(
  mapStateToProps,
  {
    get_invoice_detail,
    get_invoice_data_detail,
    get_specific_invoice_detail,
    change_Dis_Amount,
    change_Dis_Amount_Perc,
    Change_Charge,
    save_Discount_Amount,
    changeAllDisAmount,
    changeAllDisPerc,
    SaveAllDisAmountChanges
  }
)(InvoiceDetailDashboard)
