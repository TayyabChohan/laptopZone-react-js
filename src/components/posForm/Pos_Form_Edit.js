import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import {
  pos_form_data,
  get_pos_store_name,
  pos_form_state,
  create_charge_stripe,
  close_model,
  get_item_qty_aganist_ebay_id,
  single_item_end,
  update_multiple_barcode_Qty,
  send_to_FireStore
} from '../../action/posActions.js'
import {
  get_barcode_detail_pos_edit,
  change_line_type_edit,
  change_Dis_Amount_edit,
  change_Dis_Amount_Perc_edit,
  change_cost_price_edit,
  get_tax_edit,
  change_exempt_edit,
  update_invoice_pos,
  delete_pos_barcode_edit,
  change_all_dis_per_edit,
  change_all_dis_amt_edit,
  Remove_Edit,
  change_sale_tax,
  get_scan_barcode_detail_edit
} from '../../action/posEditActions.js'
import {
  get_invoice_receipt_detail,
  remove_invoice_receipt_detail,
  delete_invoice_receipt_detail,
  edit_invocie_receipt_amount_paid
} from '../../action/posInvoiceReceiptActions.js'
import { get_portal_name } from '../../action/eBayIntegrationActions.js'
import $ from 'jquery'
import { edit_invoice_receipt } from '../../action/posReceiptActions.js'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import POSDataTableEdit from '../datatables/PosDatatables/POSDataTableEdit.js'
import PosReceiptPaymentDetail from '../datatables/PosDatatables/PosReceiptPaymentDetail.js'
import { toastr } from 'react-redux-toastr'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import StripeCheckout from 'react-stripe-checkout'

class Pos_Form_Edit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      finalurl: '',
      open_buyerInfo: true,
      open_searchBarcode: true,
      open_StoreModal: true,
      doc_date: new Date(),
      doc_no: '',
      phoneNumber: '',
      buyer_address: '',
      buyer_name: '',
      buyer_email: '',
      city_id: '',
      state_id: '',
      ad_market: 'Craiglist',
      ad_id: '',
      ser_barcode: '',
      buyer_city: '',
      buyer_state: '',
      pos_barcode_detail: '',
      dis_total_amount: '',
      store_id: '',
      button_change_field: false,
      scan_barcode: '',
      market_id: '',
      portal_name: '',
      // Payment State
      total_discount_per: '',
      total_discount_amount: '',
      tender_amount: '',
      total_amount_left: '',
      total_amount_paid: '',
      total_paid: '',
      amount_payable: '',
      total_advance: '',
      net_total: '',
      tender_refund: '',
      sale_tax_amt: '',
      sale_tax_per: '',
      exempt: false,
      change_payment: true,
      card_no: '',
      save_button: false,
      save_button1: false,
      mod_remarks: '',
      total_barcode: '',
      adj_barcode: 'release'
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
    window.scrollTo(0, 0)

    const data = {
      lz_pos_mt_id: this.props.location.state.lz_pos_mt_id
    }
    this.props.get_portal_name()
    this.props.edit_invoice_receipt(data)
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.buyer_info !== this.props.buyer_info &&
      this.props.buyer_info !== ''
      // prevProps.pos_barcode_detail_edit !==
      //   this.props.pos_barcode_detail_edit &&
      // this.props.pos_barcode_detail_edit !== ''
    ) {
      const default_city = this.props.pos_city.filter(
        item => item.CITY_ID == this.props.buyer_info.BUYER_CITY_ID
      )
      const defalt_buyer_city = []

      default_city.map(item => {
        return defalt_buyer_city.push({
          value: item.CITY_ID,
          label: item.CITY_DESC
        })
      })
      // console.table(this.props.store_name)
      const store_names = this.props.store_name.filter(
        item => item.LJ_POS_STORE_ID == this.props.buyer_info.STORE_ID
      )
      // console.log(store_names)
      const default_store_name = []
      store_names.map(item => {
        return default_store_name.push({
          value: item.LJ_POS_STORE_ID,
          label:
            item.STORE_NAME + ' | ' + item.CITY_DESC + ' | ' + item.STATE_DESC
        })
      })

      this.setState({
        store_id: default_store_name,
        doc_date: this.props.buyer_info.DOC_DATE,
        doc_no: this.props.buyer_info.DOC_NO,
        phoneNumber: this.props.buyer_info.BUYER_PHONE_ID,
        buyer_address: this.props.buyer_info.BUYER_ADDRESS,
        buyer_name: this.props.buyer_info.BUYER_NAME,
        buyer_email: this.props.buyer_info.BUYER_EMAIL,
        city_id: defalt_buyer_city,
        // market_id: portal_name,
        // state_id: default_buyer_states,
        ad_market: 'Craiglist',
        buyer_zip: this.props.buyer_info.BUYER_ZIP,
        // tender_amount: this.props.buyer_info.TENDER_AMOUNT,
        exempt: this.props.buyer_info.TAX_EXEMPT == 'true',
        card_number: this.props.buyer_info.CREDIT_CARD,
        sale_tax_per: this.props.sale_tax_per,
        total_amount_paid: Number(this.props.buyer_info.TOTAL_AMOUNT).toFixed(
          2
        ),
        total_paid: Number(this.props.buyer_info.TOTAL_PAID).toFixed(2)
      })

      if (this.props.buyer_info.TOTAL_AMOUNT == '0') {
        this.setState({
          save_button1: false
        })
      }
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
        value: this.props.pos_state[0].STATE_ID,
        label: this.props.pos_state[0].STATE_DESC
      })
      this.setState({
        state_id: default_buyer_state
      })
    }

    if (
      prevState.store_id !== this.state.store_id &&
      this.state.store_id !== ''
      // prevState.exempt !== this.state.exempt &&
      // this.state.exempt !== ''
    ) {
      const data = {
        store_id: this.state.store_id[0]
          ? this.state.store_id[0]
          : this.state.store_id
      }
      this.props.get_tax_edit(data, this.state.exempt)
    }
    if (
      prevProps.sale_tax_per !== this.props.sale_tax_per &&
      this.props.sale_tax_per !== ''
    ) {
      this.setState({
        sale_tax_per: this.props.sale_tax_per
      })
      // this.props.change_sale_tax(this.state.exempt)
    }
    if (
      prevState.sale_tax_per !== this.state.sale_tax_per &&
      this.state.sale_tax_per !== ''
    ) {
      this.props.change_sale_tax(this.state.exempt)
    }
    if (
      prevProps.total_amount !== this.props.total_amount &&
      this.props.total_amount !== ''
    ) {
      let tender_amount = this.state.tender_amount.split('$ ')
      tender_amount = tender_amount[1] ? tender_amount[1] : tender_amount[0]
      tender_amount = tender_amount == '' ? 0 : tender_amount
      // console.log(tender_amount)
      // console.log(this.props.total_amount)
      const net_amount =
        Number(this.props.total_amount) - Number(this.props.total_adavnce)
      const amount_payable =
        Number(net_amount) - Number(this.state.total_paid) == 0
          ? 0
          : Number(net_amount) - Number(this.state.total_paid)
      let refund =
        amount_payable == 0 ? 0 : Number(tender_amount) - Number(amount_payable)
      let net_total = Number(
        Number(this.props.total_amount) - Number(this.props.total_adavnce)
      ).toFixed(2)
      net_total = net_total - Number(this.state.total_paid)
      // console.log(refund)
      this.setState({
        tender_refund: Number(refund).toFixed(2),
        total_amount: this.props.total_amount,
        total_advance: this.props.total_adavnce,
        sale_tax_amt: this.props.sale_tax_amt,
        dis_total_amount: this.props.dis_total_amount,
        net_total: Number(net_amount).toFixed(2),
        amount_payable:
          Number(amount_payable) > 0
            ? Math.abs(Number(amount_payable).toFixed(2))
            : Number(0).toFixed(2),
        save_button: true,
        save_button1: this.props.total_amount != '0'
      })
    }
    if (
      prevProps.pos_barcode_detail_edit !==
        this.props.pos_barcode_detail_edit &&
      this.props.pos_barcode_detail_edit == ''
    ) {
      const net_amount =
        Number(this.props.total_amount) - Number(this.props.total_adavnce)
      const amount_payable =
        Number(net_amount) - Number(this.state.total_paid) == 0
          ? 0
          : Number(net_amount) - Number(this.state.total_paid)

      let net_total = Number(
        Number(this.props.total_amount) - Number(this.props.total_adavnce)
      ).toFixed(2)

      net_total = net_total - Number(this.state.total_paid)
      let tender_amount = this.state.tender_amount.split('$ ')
      tender_amount = tender_amount[1] ? tender_amount[1] : tender_amount[0]
      let refund =
        Number(this.state.total_paid) - Number(net_amount) == 0
          ? 0
          : Number(tender_amount) - Number(amount_payable)
      this.setState({
        amount_payable:
          Number(amount_payable) > 0
            ? Math.abs(Number(amount_payable).toFixed(2))
            : Number(0).toFixed(2),
        save_button: false,
        save_button1: this.props.total_amount != '0'
      })
    }
    if (prevState.tender_amount !== this.state.tender_amount) {
      let tender_amount = this.state.tender_amount.split('$ ')
      tender_amount = tender_amount[1] ? tender_amount[1] : tender_amount[0]
      tender_amount = tender_amount == '' ? 0 : tender_amount
      const net_amount =
        Number(this.props.total_amount) - Number(this.props.total_adavnce)
      const amount_payable = Number(net_amount) - Number(this.state.total_paid)
      let refund =
        Number(this.state.total_paid) - Number(net_amount) == 0
          ? 0
          : Number(tender_amount) - Number(amount_payable)
      let net_total = Number(
        Number(this.props.total_amount) - Number(this.props.total_adavnce)
      ).toFixed(2)
      net_total = net_total - Number(this.state.total_paid)
      this.setState({
        amount_payable:
          Number(amount_payable) > 0
            ? Math.abs(Number(amount_payable).toFixed(2))
            : Number(0).toFixed(2),
        // Math.abs(Number(amount_payable).toFixed(2)),
        tender_refund: Number(refund).toFixed(2),
        save_button: true,
        save_button1: this.props.total_amount != '0'
      })
    }

    if (prevState.total_discount_amount !== this.state.total_discount_amount) {
      if (this.state.total_discount_amount == '') {
        this.props.change_all_dis_amt_edit('$ 0', this.state.exempt)
      } else {
        this.props.change_all_dis_amt_edit(
          this.state.total_discount_amount,
          this.state.exempt
        )
      }
    }
    if (prevState.total_discount_per !== this.state.total_discount_per) {
      if (this.state.total_discount_per == '') {
        this.props.change_all_dis_per_edit('$ 0', this.state.exempt)
      } else {
        this.props.change_all_dis_per_edit(
          this.state.total_discount_per,
          this.state.exempt
        )
      }
    }

    if (
      prevProps.total_amount_per_edit !== this.props.total_amount_per_edit &&
      this.props.total_amount_per_edit !== ''
    ) {
      this.setState({
        total_discount_per: '$ ' + this.props.total_amount_per_edit
      })
    }
    if (
      prevProps.total_discount_amount_edit !==
        this.props.total_discount_amount_edit &&
      this.props.total_discount_amount_edit !== ''
    ) {
      this.setState({
        total_discount_amount: '$ ' + this.props.total_discount_amount_edit
      })
    }
    if (prevState.exempt !== this.state.exempt && this.state.exempt !== '') {
      const data = {
        store_id: this.state.store_id[0]
          ? this.state.store_id[0]
          : this.state.store_id
      }
      this.props.get_tax_edit(data, this.state.exempt)
      this.props.change_exempt_edit(this.state.exempt)
    }
    if (
      prevProps.portal_name !== this.props.portal_name &&
      this.props.portal_name !== ''
    ) {
      const portal_name = this.props.portal_name.filter(
        item =>
          item.PORTAL_ID == 11 || item.PORTAL_ID == 9 || item.PORTAL_ID == 12
      )
      const market_places = []
      portal_name.map(item => {
        market_places.push({
          value: item.PORTAL_ID,
          label: item.PORTAL_DESC
        })
      })
      const portal_id = []
      const portal = portal_name.filter(
        item => item.PORTAL_ID == this.props.buyer_info.PORTAL_ID
      )
      portal.map(item => {
        return portal_id.push({
          value: item.PORTAL_ID,
          label: item.PORTAL_DESC
        })
      })
      this.setState({
        ...this.state,
        portal_name: market_places,
        market_id: portal_id[0]
      })
    }
    if (
      prevProps.barcode_qty !== this.props.barcode_qty &&
      this.props.barcode_qty !== ''
    ) {
      this.setState({
        ...this.state,
        total_barcode: Number(this.props.barcode_qty) - 1
      })
    }
    if (
      prevProps.open_model !== this.props.open_model &&
      this.props.open_model == true
    ) {
      const data = {
        ebay_id: this.props.reducerEbay_id
      }
      this.props.get_item_qty_aganist_ebay_id(data)

      this.props.close_model()
      // this.onCancelConfirmAlert()
    }
    if (prevProps.show_model !== this.props.show_model) {
      window.$('#myModal').modal('show')
    }
  }
  setButtonRepaire = () => {
    this.setState(prevState => ({
      button_change_field: !prevState.button_change_field
    }))
  }
  SacnBarcode = e => {
    e.preventDefault()
    const data = {
      scan_barcode: this.state.scan_barcode,
      exempt: this.state.exempt
    }
    // console.log(data)
    this.props.get_scan_barcode_detail_edit(data)
    this.setState({
      scan_barcode: ''
    })
  }

  handleOnClickBuyerInfoModal = () => {
    this.setState(prevState => ({
      open_buyerInfo: !prevState.open_buyerInfo
    }))
  }

  handleOnClickSeacrhBarcodeModal = () => {
    this.setState(prevState => ({
      open_searchBarcode: !prevState.open_searchBarcode
    }))
  }

  handleOnClickStoreName = () => {
    this.setState(prevState => ({
      open_StoreModal: !prevState.open_StoreModal
    }))
  }
  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  handleOnTotalPer = e => {
    const total_discount_per = $('#total_discount_per').val()
    // console.log(total_discount_per)
    this.setState({
      total_discount_per: total_discount_per
    })

    // this.props.get_location(location_value);
  }
  handleOnTotalDis = e => {
    const total_discount_amount = $('#total_discount_amount').val()
    this.setState({
      total_discount_amount: total_discount_amount
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

  handleChangeStore = store_id => {
    this.setState({
      store_id: store_id
    })
  }

  handleChangeMarket = market_id => {
    this.setState({
      market_id: market_id
    })
  }

  handleOnClickExempt = () => {
    this.setState(prevState => ({
      exempt: !prevState.exempt
    }))
  }
  changePaymentMethodToCash = () => {
    this.setState({
      change_payment: true
    })
    // this.setState(prevState => ({
    //   change_payment: !prevState.change_payment
    // }))
  }
  changePaymentMethodToCard = () => {
    this.setState({
      change_payment: false
    })
    const data = {
      doc_no: this.state.doc_no,
      user_id: localStorage.getItem('userId')
    }
    this.props.send_to_FireStore(data)
  }

  changePaymentMethod = () => {
    this.setState(prevState => ({
      change_payment: !prevState.change_payment
    }))
  }

  handleOnChangeModel = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  SearchBarcode = e => {
    e.preventDefault()
    const data = {
      barcode: this.state.ser_barcode,
      exempt: this.state.exempt
    }
    // console.log(data)
    this.props.get_barcode_detail_pos_edit(data)
  }
  getInvoiceDetail = () => {
    const data = {
      id: this.props.location.state.lz_pos_mt_id
    }
    // console.log(data)
    this.props.get_invoice_receipt_detail(data)
  }
  CloseModal = () => {
    const data = {
      lz_pos_mt_id: this.props.location.state.lz_pos_mt_id
    }
    this.props.edit_invoice_receipt(data)
  }

  SingleEnd = () => {
    const data = {
      ebay_id: this.props.reducerEbay_id,
      remarks: this.state.mod_remarks,
      user_id: localStorage.getItem('userId')
    }
    this.props.single_item_end(data)
  }

  update_Qty = () => {
    const data = {
      adj_cur_qty: this.props.barcode_qty,
      ebay_id: this.props.reducerEbay_id,
      remarks: this.state.mod_remarks,
      adj_qty: this.state.total_barcode,
      adj_barcode: this.state.adj_barcode,
      barcode_no: this.props.reducerBarcode,
      user_id: localStorage.getItem('userId')
    }
    if (this.state.total_barcode > this.state.adj_cur_qty) {
      alert('Qty Connot be Greater than ' + this.state.adj_cur_qty)
      return false
    } else if (this.state.total_barcode == this.state.adj_cur_qty) {
      alert('Qty is Unchanged. Please Less the Qty First')
      return false
    } else {
      console.log(data)
      this.props.update_multiple_barcode_Qty(data)
    }
  }

  onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
    // console.log(token)
    console.log(token)
    if (token.id !== null) {
      this.setState({
        card_last_4: token.card.last4,
        exp_month: token.card.exp_month,
        exp_year: token.card.exp_year,
        token_id: token.id,
        tender_amount: '$ ' + this.state.tender_amount,
        change_payment: false
      })
      const data = {
        id: token.id,
        amount: this.state.tender_amount
      }
      this.props.create_charge_stripe(data)
    }
  }

  updateInvoicepos = e => {
    e.preventDefault()
    const data = {
      portal_id: this.state.market_id,
      lz_pos_mt_id: this.props.location.state.lz_pos_mt_id,
      tender_amount: this.state.tender_amount,
      doc_no: this.state.doc_no,
      doc_date: this.state.doc_date,
      ad_id: this.state.ad_id,
      phone_no: this.state.phoneNumber,
      buyer_email: this.state.buyer_email,
      buyer_name: this.state.buyer_name,
      buyer_address: this.state.buyer_address,
      buyer_city: this.state.city_id,
      buyer_state: this.state.state_id,
      buyer_zip: this.state.buyer_zip,
      pay_mode: this.state.change_payment,
      exempt: this.state.exempt,
      card_number: this.state.card_no,
      net_amount: this.state.net_total,
      tender_refund: this.state.tender_refund,
      user_id: localStorage.getItem('userId'),
      disc_total_amount: this.props.dis_total_amount,
      amount_paid: this.props.buyer_info.TOTAL_PAID,
      store_id: this.state.store_id,
      sale_tax: this.state.sale_tax_per,
      data: this.props.pos_barcode_detail_edit
    }
    console.table(data)
    const save = this.props.pos_barcode_detail_edit.filter(
      item => item.LINE_TYPE === null
    )
    // console.table(data)
    if (save.length > 0) {
      toastr.error('Error', 'Please Select All line Types')
    } else {
      window.scrollTo(0, 0)
      this.props.update_invoice_pos(data)

      this.setState({
        save_button: false,
        save_button1: false
      })
    }
  }
  removeData = () => {
    this.props.Remove_Edit()
  }
  newMethod (sum) {
    return (Number(sum / 100) * Number(this.state.sale_tax_per)).toFixed(2)
  }

  closeModel = () => {
    this.props.close_model()
  }

  openModel = () => {
    // this.setState({
    //   ...this.state,
    //   open: true
    // })
    const data = {
      ebay_id: this.props.reducerEbay_id
    }
    this.props.get_item_qty_aganist_ebay_id(data)
    window.$('#myModal').modal('show')
    this.props.close_model()
  }

  onCancelConfirmAlert = cell => {
    confirmAlert({
      title: 'End The Item', // Title dialog
      message:
        'Are you sure to End Aganist ' + this.props.reducerEbay_id + ' Ebay Id', // Message dialog
      closeOnEscape: false,
      closeOnClickOutside: false,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.openModel()
          }
        },
        {
          label: 'No',
          onClick: () => {
            this.closeModel()
          }
        }
      ]
    })
  }
  render () {
    // console.log(this.props)
    console.log(this.state.change_payment)
    // console.log(this.state.exempt)
    // console.log(this.props.sale_tax_amt)
    // console.log(this.state.save_button1)
    // console.log(this.props.total_amount)
    // console.log(this.state.tender_refund)
    let amount_pay = Number(this.state.amount_payable)
    // Number(this.state.net_total) - Number(this.state.total_paid)
    amount_pay = Math.abs(Number(amount_pay)).toFixed(2)
    const checked = this.state.exempt == true
    // console.log(this.state.sale_tax_per)
    const save_button_ena = this.props.pos_barcode_detail_edit.length > 0
    const button_city = this.state.city_id !== '' && this.state.state_id !== ''
    const save_button =
      this.state.store_id !== '' && button_city && save_button_ena
    // console.table(this.props.store_name)
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    const disable_barcode = this.state.store_id !== ''
    const buyer_city = []
    this.props.pos_city.map(item => {
      return buyer_city.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      })
    })
    // const buyer_states = []

    // this.props.pos_state.map(item => {
    //   return buyer_states.push({
    //     value: item.STATE_ID,
    //     label: item.STATE_DESC
    //   })
    // })

    const Store_name = []
    this.props.store_name.map(item => {
      return Store_name.push({
        value: item.LJ_POS_STORE_ID,
        label:
          item.STORE_NAME + ' | ' + item.CITY_DESC + ' | ' + item.STATE_DESC
      })
    })

    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Point Of Sale</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>Point Of Sale</li>
            <li className='active'>POS Form</li>
          </ol>
        </section>
        <section className='content'>
          {/* <div className='row'>
            <div className='col-sm-12'>
              <div
                className={
                  this.state.open_StoreModal ? 'box' : 'box collapsed-box'
                }
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Select Store Name</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_StoreModal
                            ? 'fa fa-minus'
                            : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickStoreName}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> *
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-sm-3'>
                        <label htmlFor='Store'>Store Name</label>
                        <div className='form-group has-feedback' id='Store'>
                          <small>Store_Name| City | State</small>
                          <Select
                            id='Store'
                            options={Store_name}
                            value={this.state.store_id}
                            onChange={this.handleChangeStore}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2' style={{ float: 'right' }}>
                        <div className='form-group' style={{ float: 'right' }}>
                          <Link
                            to='/posReceiptView'
                            type='button'
                            className='btn btn-primary btn-group'
                            onClick={this.removeData}
                          >
                            Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={
                  this.state.open_searchBarcode ? 'box' : 'box collapsed-box'
                }
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Search Item Barcode</h3>
                  <div className='box-tools pull-right'>
                    <Link
                      to='/posReceiptView'
                      type='button'
                      className='btn btn-primary btn-group'
                      onClick={this.removeData}
                    >
                      Back
                    </Link>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_searchBarcode
                            ? 'fa fa-minus'
                            : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickSeacrhBarcodeModal}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <form onSubmit={this.SearchBarcode}>
                        <div className='col-sm-3'>
                          <div className='input-group'>
                            <label
                              htmlFor='Search Barcode'
                              className='control-label'
                            >
                              Search Barcode:
                            </label>
                            <input
                              type='text'
                              className='form-control ser_barcode '
                              id='ser_barcode'
                              name='ser_barcode'
                              value={this.state.ser_barcode}
                              onChange={this.handleOnChange}
                              placeholder='Search Barcode '
                              disabled={
                                !this.state.save_button &&
                                !this.state.save_button1
                              }
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
                      {this.state.button_change_field ? (
                        <form onSubmit={this.SacnBarcode}>
                          <div className='col-sm-3'>
                            <div
                              className='input-group'
                              style={{ marginLeft: '18px' }}
                            >
                              <label
                                htmlFor='scan_barcode'
                                className='control-label'
                              >
                                Repair Form :
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                id='scan_barcode'
                                name='scan_barcode'
                                value={this.state.scan_barcode}
                                onChange={this.handleOnChange}
                                placeholder='Repair Form Barcode'
                              />
                              <div
                                className='input-group-btn'
                                style={{ display: 'block' }}
                              >
                                <button
                                  className='btn btn-info '
                                  id='click_scan_barcode_barcode'
                                  type='submit'
                                >
                                  <i className='glyphicon glyphicon-search' />
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      ) : null}
                      <div className='col-sm-2'>
                        <div
                          className='form-group'
                          style={{ marginTop: '37px', float: 'right' }}
                        >
                          <Button
                            type='button'
                            className='btn btn-primary'
                            onClick={this.setButtonRepaire}
                          >
                            {this.state.button_change_field
                              ? 'Remove Repair Form'
                              : 'Show Repair Form'}
                          </Button>
                        </div>
                      </div>
                      <div className='col-sm-3' style={{ float: 'right' }}>
                        <label htmlFor='Store'>Store Name</label>
                        <div className='form-group has-feedback' id='Store'>
                          <small>Store_Name| City | State</small>
                          <Select
                            id='Store'
                            options={Store_name}
                            value={this.state.store_id}
                            onChange={this.handleChangeStore}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*

                            Display Data In Table

                        */}
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header'>
                  <h3 className='box-title'>Point Of Sale Barcode Detail</h3>
                </div>
                <div className='box-body'>
                  <POSDataTableEdit
                    {...this.props}
                    exempt={this.state.exempt}
                  />
                </div>
              </div>
            </div>
          </div>
          {/**
            Buyer Info
          */}
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={
                  this.state.open_buyerInfo ? 'box' : 'box collapsed-box'
                }
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Buyer Info</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_buyerInfo
                            ? 'fa fa-minus'
                            : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickBuyerInfoModal}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label htmlFor='Doc No' className='control-label'>
                            DOC No:
                          </label>
                          <input
                            type='number'
                            className='form-control'
                            id='doc_no'
                            name='doc_no'
                            value={this.state.doc_no}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className='col-sm-2 '>
                        <div className='form-group'>
                          <label htmlFor='Date' className='control-label'>
                            Date:
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='date'
                            name='doc_date'
                            value={dateFormat(
                              this.state.doc_date,
                              'dd/mm/yyyy'
                            )}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label htmlFor='Phone' className='control-label'>
                            Phone :
                          </label>
                          <NumberFormat
                            className='form-control'
                            format='(###) ###-########'
                            mask='_'
                            onChange={this.handleOnChange}
                            name='phoneNumber'
                            value={this.state.phoneNumber}
                            disabled={
                              !this.state.save_button &&
                              !this.state.save_button1
                            }
                          />
                        </div>
                      </div>

                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='Email' className='control-label'>
                            Email :
                          </label>
                          <input
                            type='email'
                            className='form-control'
                            id='buyer_email'
                            name='buyer_email'
                            onChange={this.handleOnChange}
                            value={this.state.buyer_email}
                            disabled={
                              !this.state.save_button &&
                              !this.state.save_button1
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='Buyer Name' className='control-label'>
                            Buyer Name:
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='buyer_name'
                            name='buyer_name'
                            onChange={this.handleOnChange}
                            value={this.state.buyer_name}
                            disabled={
                              !this.state.save_button &&
                              !this.state.save_button1
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-sm-12'>
                      <div className='col-sm-6'>
                        <div className='form-group'>
                          <label htmlFor='Address' className='control-label'>
                            Address:
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='address'
                            name='buyer_address'
                            onChange={this.handleOnChange}
                            value={this.state.buyer_address}
                            disabled={
                              !this.state.save_button &&
                              !this.state.save_button1
                            }
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

                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label htmlFor='Zip' className='control-label'>
                            Zip:
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='buyer_zip'
                            name='buyer_zip'
                            onChange={this.handleOnChange}
                            value={this.state.buyer_zip}
                            disabled={
                              !this.state.save_button &&
                              !this.state.save_button1
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className='col-sm-12'>
                      <div className='box-header'>
                        <h3 className='box-title'>Market </h3>
                        <div className='box-tools pull-right'>
                          <button
                            type='button'
                            className='btn btn-box-tool'
                            data-widget='collapse'
                          >
                            <i className='' />
                          </button>
                        </div>
                      </div>
                      <div className='box-body'>
                        <div className='row'>
                          <div className='col-sm-12'>
                            {/* <div className='col-sm-3'>
                              <div className='form-group'>
                                <label
                                  htmlFor='Market'
                                  className='control-label'
                                >
                                  Ad Market:
                                </label>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='ad_market'
                                  name='ad_market'
                                  value={this.state.ad_market}
                                  onChange={this.handleOnChange}
                                  readOnly
                                />
                              </div>
                            </div> */}
                            <div className='col-sm-3'>
                              <label htmlFor='market'>
                                Select Market Place
                              </label>
                              <div
                                className='form-group has-feedback'
                                id='market'
                              >
                                {/* <small>Select Market Place</small> */}
                                <Select
                                  id='market'
                                  options={this.state.portal_name || []}
                                  value={this.state.market_id}
                                  onChange={this.handleChangeMarket}
                                  className='basic-select'
                                  classNamePrefix='select'
                                />
                              </div>
                            </div>
                            <div className='col-sm-3'>
                              <div className='form-group'>
                                <label
                                  htmlFor='Ad ID'
                                  className='control-label'
                                >
                                  Ad ID:
                                </label>
                                <input
                                  type='text'
                                  className='form-control'
                                  id='ad_id'
                                  name='ad_id'
                                  value={this.state.ad_id}
                                  onChange={this.handleOnChange}
                                  disabled={
                                    !this.state.save_button &&
                                    !this.state.save_button1
                                  }
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </section>
        <section className='content'> */}

          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header'>
                  <h3 className='box-title'>Payment</h3>
                </div>
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-2'>
                      <div className='form-group'>
                        <label htmlFor='sale_tax_per' className='control-label'>
                          Sale Tax %
                        </label>
                        <NumberFormat
                          className='form-control'
                          id='sale_tax_per'
                          name='sale_tax_per'
                          displayType={'text'}
                          value={
                            this.state.exempt == false
                              ? this.state.sale_tax_per
                              : ''
                          }
                          thousandSeparator
                          suffix={' %'}
                        />
                      </div>
                    </div>

                    <div className='col-sm-2'>
                      <div className='form-group'>
                        <label htmlFor='sale_tax_amt' className='control-label'>
                          Sales Tax Amount
                        </label>
                        <NumberFormat
                          className='form-control'
                          id='sale_tax_amt'
                          name='sale_tax_amt'
                          displayType={'text'}
                          value={
                            this.state.exempt == false
                              ? this.state.sale_tax_amt
                              : ''
                          }
                          thousandSeparator
                          prefix={'$ '}
                        />
                      </div>
                    </div>
                    <div className='col-sm-2'>
                      <div className='form-group' style={{ marginTop: '25px' }}>
                        <label>
                          <input
                            type='checkbox'
                            className='checkbox-inline'
                            value='exempt'
                            onClick={this.handleOnClickExempt}
                            checked={checked}
                          />
                          Exempt
                        </label>
                      </div>
                    </div>
                    <div className='col-sm-2'>
                      <div className='form-group'>
                        <label htmlFor='total_amount' className='control-label'>
                          Total Amount
                        </label>
                        <NumberFormat
                          className='form-control'
                          id='total_amount'
                          name='total_amount'
                          displayType={'text'}
                          value={this.state.total_amount}
                          thousandSeparator
                          prefix={'$ '}
                        />
                      </div>
                    </div>
                    <div className='col-sm-2'>
                      <div className='form-group'>
                        <label
                          htmlFor='total_advance'
                          className='control-label'
                        >
                          Total Advance
                        </label>
                        <NumberFormat
                          className='form-control'
                          id='total_advance'
                          name='total_advance'
                          displayType={'text'}
                          value={this.state.total_advance}
                          thousandSeparator
                          prefix={'$ '}
                        />
                      </div>
                    </div>
                    <div className='col-sm-2'>
                      <div className='form-group'>
                        <label htmlFor='net_total' className='control-label'>
                          Net Total
                        </label>
                        <NumberFormat
                          className='form-control'
                          id='net_total'
                          name='net_total'
                          displayType={'text'}
                          value={this.state.net_total}
                          thousandSeparator
                          prefix={'$ '}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-12'>
                      {/* {this.state.change_payment === true ? ( */}
                      {/* <React.Fragment> */}
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='tender_amount'
                            className='control-label'
                          >
                            Tender Amount
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='tender_amount'
                            name='tender_amount'
                            onChange={this.handleOnChange}
                            value={
                              this.state.net_total == '0.00'
                                ? this.state.net_total
                                : this.state.tender_amount
                            }
                            // thousandSeparator
                            prefix={'$ '}
                            required
                            disabled={
                              !this.state.save_button ||
                              !this.state.save_button1
                            }
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='tender_refund'
                            className='control-label'
                          >
                            Tender Refund
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='tender_refund'
                            name='tender_refund'
                            displayType={'text'}
                            value={
                              // this.state.tender_amount == ''
                              //   ? ''
                              //   :
                              this.state.net_total == '0.00'
                                ? // this.state.tender_amount -
                                this.state.net_total
                                : this.state.tender_refund
                            }
                            thousandSeparator
                            prefix={'$ '}
                          />
                        </div>
                      </div>{' '}
                      {/* </React.Fragment>
                      ) : (
                        <div className='col-sm-3'>
                          <div className='form-group'>
                            <label htmlFor='card_no' className='control-label'>
                              Credit Card No
                            </label>
                            <input
                              type='number'
                              className='form-control'
                              id='card_no'
                              min='0'
                              name='card_no'
                              onChange={this.handleOnChange}
                              value={this.state.card_no}
                              disabled={
                                !this.state.save_button ||
                                !this.state.save_button1
                              }
                            />
                          </div>
                        </div>
                      )} */}
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='total_discount_amount'
                            className='control-label'
                          >
                            Discount Amount
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='total_discount_amount'
                            name='total_discount_amount'
                            value={this.state.total_discount_amount}
                            onBlur={this.handleOnTotalDis}
                            thousandSeparator
                            prefix={'$ '}
                            disabled={!this.state.save_button}
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='total_discount_per'
                            className='control-label'
                          >
                            Discount %
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='total_discount_per'
                            name='total_discount_per'
                            value={this.state.total_discount_per}
                            onBlur={this.handleOnTotalPer}
                            thousandSeparator
                            prefix={'$ '}
                            disabled={!this.state.save_button}
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='total_amount_paid'
                            className='control-label'
                          >
                            Amount Payable
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='total_amount_paid'
                            name='total_amount_paid'
                            displayType={'text'}
                            value={this.state.amount_payable}
                            // onBlur={this.handleOnTotalPer}
                            thousandSeparator
                            prefix={'$ '}
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label htmlFor='total_paid' className='control-label'>
                            Amount Paid
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='total_paid'
                            name='total_paid'
                            displayType={'text'}
                            value={this.state.total_paid}
                            thousandSeparator
                            prefix={'$ '}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-sm-2' style={{ float: 'right' }}>
                        <div className='form-group'>
                          <label
                            htmlFor='total_dicount_per'
                            className='control-label'
                          >
                            {this.state.change_payment == true
                              ? 'Cash Payment'
                              : 'Card Payment'}
                          </label>
                          <Button
                            type='button'
                            className={
                              this.state.change_payment == true
                                ? 'btn btn-primary btn-block btn-flat'
                                : 'btn btn-warning btn-block btn-flat'
                            }
                            onClick={
                              this.state.change_payment == true
                                ? this.changePaymentMethodToCard
                                : this.changePaymentMethod
                            }
                          >
                            {this.state.change_payment == true
                              ? 'Cash Payment'
                              : 'Card Payment'}
                          </Button>
                        </div>
                      </div>
                      {/* <div className='col-sm-2'>
                        <div className='form-group'>
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.changePaymentMethodToCash}
                            disabled={
                              !this.state.save_button ||
                              !this.state.save_button1
                            }
                          >
                            Cash
                          </Button>
                        </div>
                      </div> */}
                      {/* <div className='col-sm-2'>
                        <div className='form-group'>
                          <StripeCheckout
                            amount={amount_pay * 100}
                            email={this.state.buyer_email || ''}
                            className='btn btn-primary btn-block btn-flat'
                            currency='USD'
                            country='US'
                            stripeKey='pk_test_UZjTyWOEnHUCzNIdt4C20xF900fJp9MTSb'
                            token={this.onToken}
                            zipCode={false}
                            label={'Pay with ' + amount_pay}
                            // zipCode
                          />
                        </div>
                      </div> */}
                      <div className='col-sm-2' style={{ float: 'right' }}>
                        <div className='form-group'>
                          <Button
                            type='button'
                            className='btn btn-warning btn-block btn-flat'
                            data-toggle='modal'
                            data-target='#Modal'
                            onClick={this.getInvoiceDetail}
                          >
                            Invoice Payment Detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='col-sm-2'>
                      <div className='form-group'>
                        <Button
                          type='button'
                          className='btn btn-primary btn-block btn-flat'
                          onClick={this.updateInvoicepos}
                          disabled={
                            !this.state.save_button || !this.state.save_button1
                          }
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                    <div className='col-sm-2' style={{ float: 'right' }}>
                      <div className='form-group'>
                        <Link
                          to='/posReceiptView'
                          type='button'
                          className='btn btn-primary btn-block btn-flat btn-group'
                          onClick={this.removeData}
                        >
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**
Search Barcode Start
*/}
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className='modal fade'
                id='Modal'
                data-backdrop='static'
                tabIndex='-1'
              >
                <div className='modal-dialog modal-lg' style={{ width: '70%' }}>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                        onClick={this.CloseModal}
                      >
                        &times;
                      </button>
                      <h4 className='modal-title'> Invocie Receipts </h4>
                    </div>
                    <div className='modal-body'>
                      <section className='content'>
                        <h4> Invocie Receipts Details </h4>
                        <PosReceiptPaymentDetail {...this.props} />
                      </section>
                    </div>{' '}
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-default'
                        data-dismiss='modal'
                        onClick={this.CloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**
            Model
          */}
          <div
            className='modal fade'
            id='myModal'
            role='dialog'
            tabIndex='-1'
            data-backdrop='static'
            // data-keyboard='false'
          >
            <div className='modal-dialog modal-lg' style={{ width: '70%' }}>
              <div className='modal-content'>
                <div
                  className='modal-header'
                  style={{ backgroundColor: 'paleturquoise' }}
                >
                  <button type='button' className='close' data-dismiss='modal'>
                    &times;
                  </button>
                  <h4 className='modal-title'>End Item Remarks</h4>
                </div>
                {/* <form> */}
                <div className='modal-body'>
                  {this.props.barcode_qty <= 1 ? (
                    <div class='row'>
                      <div class='col-sm-12'>
                        {/* <div class='box'> */}
                        {/* <div class='box-header '>
                              <h1 class='box-title'>End Item Remarks</h1>
                              <div class='box-tools pull-right' />
                            </div> */}
                        <div class='box-body '>
                          <div class='col-sm-12 '>
                            <div class='col-sm-2'>
                              <div class='form-group'>
                                <label for='Feed Name'>eBay Id:</label>
                                <input
                                  name='mod_ebay_id'
                                  type='text'
                                  id='mod_ebay_id'
                                  class='mod_ebay_id form-control '
                                  value={this.props.reducerEbay_id}
                                  ReadOnly
                                />
                              </div>
                            </div>
                            <div class='col-sm-8'>
                              <div class='form-group'>
                                <label for='remarks'>Remarks :</label>
                                <input
                                  name='mod_remarks'
                                  type='text'
                                  id='mod_remarks'
                                  class='mod_remarks form-control '
                                  value={this.state.mod_remarks}
                                  onChange={this.handleOnChangeModel}
                                />
                              </div>
                            </div>
                            <div class='col-sm-1 pull-right'>
                              <div
                                class='form-group'
                                style={{ marginTop: '35px' }}
                              >
                                <input
                                  type='button'
                                  class='btn btn-primary btn-sm'
                                  id='ModCancel'
                                  data-dismiss='modal'
                                  // onClick={this.cancelSingleEnd}
                                  value='Cancel'
                                />
                              </div>
                            </div>
                            <div class='col-sm-1 pull-right'>
                              <div
                                class='form-group'
                                style={{ marginTop: '35px' }}
                              >
                                <input
                                  type='button'
                                  class='btn btn-danger btn-sm'
                                  id='ModendItem'
                                  name='ModendItem'
                                  onClick={this.SingleEnd}
                                  value='End'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  ) : (
                    <div class='row'>
                      <div class='col-sm-12'>
                        <div class='box-body '>
                          {' '}
                          <div class='col-sm-12 '>
                            <div class='col-sm-2'>
                              <div class='form-group'>
                                <label for='Feed Name'>eBay Id:</label>
                                <input
                                  name='adj_ebay_id'
                                  type='text'
                                  id='adj_ebay_id'
                                  class='adj_ebay_id form-control '
                                  value={this.props.reducerEbay_id}
                                  ReadOnly
                                />
                              </div>
                            </div>
                            <div class='col-sm-2'>
                              <div class='form-group'>
                                <label for='Feed Name'>Total Barcode:</label>
                                <input
                                  name='adj_cur_qty'
                                  type='number'
                                  min='1'
                                  id='adj_cur_qty'
                                  class='form-control'
                                  value={this.props.barcode_qty}
                                  ReadOnly
                                />
                              </div>
                            </div>
                            <div class='col-sm-2'>
                              <div class='form-group'>
                                <label for='Feed Name'>Qty:</label>
                                <input
                                  name='total_barcode'
                                  min='1'
                                  type='number'
                                  id='total_barcode'
                                  class='total_barcode form-control'
                                  value={this.state.total_barcode}
                                  onChange={this.handleOnChangeModel}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div class='col-sm-3'>
                              <div class='form-group'>
                                <label for='remarks'>Remarks :</label>
                                <input
                                  name='mod_remarks'
                                  type='text'
                                  id='mod_remarks'
                                  class='mod_remarks form-control '
                                  value={this.state.mod_remarks}
                                  onChange={this.handleOnChangeModel}
                                />
                              </div>
                            </div>
                            <div
                              class='col-sm-3 p-t-24'
                              style={{ marginTop: '35px' }}
                            >
                              <label for='remarks'>Barcode :</label>
                              <input
                                name='adj_barcode'
                                type='radio'
                                id='adj_barcode'
                                value='release'
                                checked={this.state.adj_barcode == 'release'}
                                onChange={this.handleOnChangeModel}
                              />
                              &nbsp;&nbsp;
                              <span>Relaese &nbsp;&nbsp;&nbsp;&nbsp;</span>
                              {/* <input
                                name='adj_barcode'
                                type='radio'
                                id='adj_barcode'
                                value='discard'
                                onChange={this.handleOnChangeModel}
                              />
                              &nbsp;&nbsp;<span>Discard </span> */}
                            </div>
                            <div class='col-sm-1 pull-right p-t-24'>
                              <div
                                class='form-group'
                                style={{ marginTop: '35px' }}
                              >
                                <input
                                  type='button'
                                  class='btn btn-primary btn-sm'
                                  id='adj_ModCancel'
                                  name='adj_ModCancel'
                                  data-dismiss='modal'
                                  value='Cancel'
                                />
                              </div>
                            </div>
                            <div class='col-sm-1 pull-right p-t-24'>
                              <div
                                class='form-group'
                                style={{ marginTop: '35px' }}
                              >
                                <input
                                  type='button'
                                  class='btn btn-success btn-sm'
                                  id='updateQty'
                                  name='updateQty'
                                  value='Update'
                                  onClick={this.update_Qty}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className='modal-footer'
                  style={{ backgroundColor: 'paleturquoise' }}
                >
                  <button
                    type='button'
                    className='btn btn-default'
                    data-dismiss='modal'
                  >
                    Cancel
                  </button>
                </div>
                {/* </form> */}
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
    pos_state: state.posReducer.pos_state,
    pos_city: state.posReducer.pos_city,
    pos_barcode_detail_edit: state.posReducer.pos_barcode_detail_edit,
    sale_tax_amt: state.posReducer.sale_tax_amt_edit,
    sale_tax_per: state.posReducer.sale_tax_per_edit,
    total_amount: state.posReducer.total_amount_edit,
    total_adavnce: state.posReducer.total_advance_edit,
    dis_total_amount: state.posReducer.dis_total_amount_edit,
    button_status: state.posReducer.button_status,
    store_name: state.posReducer.store_name,
    buyer_info: state.posReducer.buyer_info,
    total_amount_per_edit: state.posReducer.total_amount_per_edit,
    total_discount_amount_edit: state.posReducer.total_discount_amount_edit,
    receipt_payment_detail: state.posReducer.receipt_payment_detail,
    open_model: state.posReducer.open_model,
    reducerBarcode: state.posReducer.barcode,
    reducerEbay_id: state.posReducer.ebay_id,
    barcode_qty: state.posReducer.barcode_qty,
    portal_name: state.eBayReducer.portal_name,
    show_model: state.posReducer.show_model
  }
}
export default connect(
  mapStateToProps,
  {
    pos_form_data,
    change_exempt_edit,
    get_pos_store_name,
    get_barcode_detail_pos_edit,
    change_line_type_edit,
    change_Dis_Amount_edit,
    change_Dis_Amount_Perc_edit,
    change_cost_price_edit,
    edit_invoice_receipt,
    get_tax_edit,
    update_invoice_pos,
    delete_pos_barcode_edit,
    pos_form_state,
    change_all_dis_per_edit,
    change_all_dis_amt_edit,
    get_invoice_receipt_detail,
    remove_invoice_receipt_detail,
    delete_invoice_receipt_detail,
    edit_invocie_receipt_amount_paid,
    Remove_Edit,
    change_sale_tax,
    get_scan_barcode_detail_edit,
    create_charge_stripe,
    close_model,
    get_item_qty_aganist_ebay_id,
    single_item_end,
    update_multiple_barcode_Qty,
    send_to_FireStore,
    get_portal_name
  }
)(Pos_Form_Edit)
