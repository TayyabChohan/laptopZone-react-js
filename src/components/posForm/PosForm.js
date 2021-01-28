import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import {
  pos_form_data,
  get_pos_store_name,
  get_tax,
  change_exempt,
  get_barcode_detail_pos,
  change_line_type,
  change_Dis_Amount,
  change_Dis_Amount_Perc,
  change_cost_price,
  change_save_button_props,
  save_invoice_pos,
  delete_pos_barcode,
  pos_form_state,
  get_scan_barcode_detail,
  change_all_dis_amt,
  change_all_dis_per,
  remove_all_unmount,
  create_charge_stripe,
  send_to_FireStore,
  get_latest_payment,
  close_model,
  get_item_qty_aganist_ebay_id,
  single_item_end,
  update_multiple_barcode_Qty
} from '../../action/posActions.js'
import { get_portal_name } from '../../action/eBayIntegrationActions.js'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import PosDataTable from '../datatables/PosDatatables/PosDataTable.js'
import { toastr } from 'react-redux-toastr'
import $ from 'jquery'
import StripeCheckout from 'react-stripe-checkout'
import SearchRepair from './SearchRepair.js'
class PosForm extends Component {
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
      buyer_zip: '',
      city_id: '',
      state_id: '',
      ad_market: 'Craiglist',
      ad_id: '',
      ser_barcode: '',
      buyer_city: '',
      buyer_state: '',
      pos_barcode_detail: '',
      dis_total_amount: '',
      store_id: JSON.parse(localStorage.getItem('store_name')),
      scan_barcode: '',
      button_change_field: false,
      total_discount_amount: '',
      total_dicount_per: '',
      total_amount: '',
      line_type: '',
      market_id: '',
      portal_name: '',
      // Payment State
      tender_amount: '',
      tender_refund: '',
      sale_tax_amt: '',
      sale_tax_per: '',
      exempt: false,
      change_payment: true,
      card_no: '',
      card_last_4: '',
      exp_month: '',
      exp_year: '',
      token_id: '',
      // open: false
      // Model State
      mod_remarks: '',
      total_barcode: '',
      adj_barcode: 'release'
    }
  }
  componentWillMount () {
    this.props.get_latest_payment()
    if (localStorage.getItem('userName')) {
    } else {
      let getUrl = window.location
      let finalurl = getUrl.protocol + '//' + getUrl.hostname

      this.setState({ redirectToReferrer: true, finalurl: finalurl })
    }
    const data = {
      scan_barcode:
        this.props.location.state !== 0 &&
        this.props.location.state !== undefined
          ? this.props.location.state.barcode
          : ''
    }
    if (localStorage.getItem('store_name')) {
      const data = {
        store_id: this.state.store_id[0]
          ? this.state.store_id[0]
          : this.state.store_id
      }
      this.props.get_tax(data)
    }
    if (
      this.props.location.state !== 0 &&
      this.props.location.state !== undefined
    ) {
      //   this.props.pos_form_data()
      this.props.get_pos_store_name()
      this.props.get_scan_barcode_detail(data)
      this.setState({
        scan_barcode: '',
        line_type: 'SR'
      })
    }
  }
  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.pos_form_data()
    this.props.get_pos_store_name()
    this.props.get_portal_name()
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.buyer_info_pos !== this.props.buyer_info_pos &&
      this.props.buyer_info_pos !== ''
    ) {
      const city = this.props.pos_city.filter(
        item => item.CITY_ID == this.props.buyer_info_pos.CITY_ID
      )
      const default_city = []
      city.map(item => {
        default_city.push({
          value: item.CITY_ID,
          label: item.CITY_DESC
        })
      })

      const store = this.props.store_name.filter(
        item => item.LJ_POS_STORE_ID == this.props.buyer_info_pos.STORE_ID
      )
      const default_store = []
      store.map(item => {
        default_store.push({
          value: item.LJ_POS_STORE_ID,
          label:
            item.STORE_NAME + ' | ' + item.CITY_DESC + ' | ' + item.STATE_DESC
        })
      })
      this.setState({
        phoneNumber: this.props.buyer_info_pos.PHONE_NO,
        buyer_email: this.props.buyer_info_pos.EMAIL,
        buyer_name: this.props.buyer_info_pos.PRODUCT_OWNER,
        // buyer_city: default_city,
        city_id: default_city[0],
        store_id: default_store
      })
    }
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
        doc_no: this.props.doc_no.DOC_NO,
        city_id: default_buyer_city
      })
    }
    if (prevState.city_id !== this.state.city_id && this.state.city_id !== '') {
      const data = {
        city_id: this.state.city_id[0]
          ? this.state.city_id[0]
          : this.state.city_id
      }
      // if (data.city_id.label == 'Dallas') {
      //   this.setState({
      //     ...this.state,
      //     exempt: true
      //   })
      // }
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
      prevProps.pos_barcode_detail !== this.props.pos_barcode_detail &&
      this.props.pos_barcode_detail !== ''
    ) {
      this.setState({
        pos_barcode_detail: this.props.pos_barcode_detail
      })
    }
    if (
      prevProps.total_amount !== this.props.total_amount &&
      this.props.total_amount !== ''
    ) {
      this.setState({
        total_amount: this.props.total_amount,
        tender_amount: this.props.total_amount,
        sale_tax_amt: this.props.sale_tax_amt,
        dis_total_amount: this.props.dis_total_amount
      })
    }
    if (
      prevState.total_amount !== this.state.total_amount &&
      this.state.total_amount !== ''
    ) {
      let tender_amount = this.state.tender_amount.split('$ ')
      tender_amount = tender_amount[1]
      let refund = Number(tender_amount) - Number(this.state.total_amount)
      // refund = Math.abs(refund)
      this.setState({
        tender_refund: Number(refund).toFixed(2)
      })
    }
    if (
      prevState.tender_amount !== this.state.tender_amount &&
      this.state.tender_amount !== ''
    ) {
      let tender_amount = this.state.tender_amount.split('$ ')
        ? this.state.tender_amount.split('$ ')
        : this.state.tender_amount
      tender_amount = tender_amount[1] ? tender_amount[1] : tender_amount
      let refund = Number(tender_amount) - Number(this.state.total_amount)
      this.setState({
        tender_refund: Number(refund).toFixed(2)
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
    if (
      prevProps.sale_tax_per !== this.props.sale_tax_per &&
      this.props.sale_tax_per !== ''
    ) {
      this.setState({
        sale_tax_per: this.props.sale_tax_per
      })
    }
    if (prevState.exempt !== this.state.exempt && this.state.exempt !== '') {
      this.props.change_exempt(this.state.exempt)
    }
    if (prevState.total_discount_amount !== this.state.total_discount_amount) {
      if (this.state.total_discount_amount == '') {
        this.props.change_all_dis_amt('$ 0', this.state.exempt)
      } else {
        this.props.change_all_dis_amt(
          this.state.total_discount_amount,
          this.state.exempt
        )
      }
    }
    if (prevState.total_dicount_per !== this.state.total_dicount_per) {
      if (this.state.total_dicount_per == '') {
        this.props.change_all_dis_per('$ 0', this.state.exempt)
      } else {
        this.props.change_all_dis_per(
          this.state.total_dicount_per,
          this.state.exempt
        )
      }
    }

    if (
      prevProps.total_amount_per !== this.props.total_amount_per &&
      this.props.total_amount_per !== ''
    ) {
      this.setState({
        total_dicount_per: '$ ' + this.props.total_amount_per
      })
    }
    if (
      prevProps.total_discount_amount !== this.props.total_discount_amount &&
      this.props.total_discount_amount !== ''
    ) {
      this.setState({
        total_discount_amount: '$ ' + this.props.total_discount_amount
      })
    }
    // if (
    //   prevProps.pos_state !== this.props.pos_state &&
    //   this.props.pos_state !== ''
    // ) {
    //   const default_buyer_state = []
    //   default_buyer_state.push({
    //     value: this.props.pos_state[0].STATE_ID || '',
    //     label: this.props.pos_state[0].STATE_DESC || ''
    //   })
    //   this.setState({
    //     state_id: default_buyer_state[0]
    //   })
    // }
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
    if (
      prevProps.barcode_qty !== this.props.barcode_qty &&
      this.props.barcode_qty !== ''
    ) {
      this.setState({
        ...this.state,
        total_barcode: Number(this.props.barcode_qty) - 1
      })
    }
    if (prevProps.show_model !== this.props.show_model) {
      window.$('#myModal').modal('show')
    }
    if (prevProps.close_model !== this.props.close_model) {
      window.$('#myModal').modal('hide')
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
      this.setState({
        ...this.state,
        portal_name: market_places
      })
    }
    if (
      prevProps.remove_form_data !== this.props.remove_form_data &&
      this.props.remove_form_data == true
    ) {
      this.setState({
        market_place: '',
        phoneNumber: '',
        buyer_address: '',
        buyer_name: '',
        buyer_email: '',
        city_id: '',
        state_id: '',
        ad_id: '',
        ser_barcode: '',
        card_number: '',
        tender_refund: '',
        total_amount: '',
        tender_amount: '',
        total_discount_amount: '',
        total_dicount_per: ''
      })
    }
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

  handleOnClickExempt = () => {
    this.setState(prevState => ({
      exempt: !prevState.exempt
    }))
  }
  changePaymentMethodToCash = () => {
    this.setState({
      change_payment: true
    })
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
    window.scrollTo(0, 0)
  }
  handleOnTotalPer = e => {
    const total_dicount_per = $('#total_dicount_per').val()
    this.setState({
      total_dicount_per: total_dicount_per
    })

    // this.props.get_location(location_value);
  }
  handleOnTotalDis = e => {
    const total_discount_amount = $('#total_discount_amount').val()
    this.setState({
      total_discount_amount: total_discount_amount
    })
  }
  SearchBarcode = e => {
    e.preventDefault()
    const data = {
      barcode: this.state.ser_barcode
    }
    // console.log(this.state)
    this.props.get_barcode_detail_pos(data)
    this.setState({
      ser_barcode: '',
      line_type: ''
    })
  }
  SacnBarcode = e => {
    e.preventDefault()
    const data = {
      scan_barcode: this.state.scan_barcode
    }
    this.props.get_scan_barcode_detail(data)
    this.setState({
      scan_barcode: '',
      line_type: 'SR'
    })
  }

  setButtonRepaire = () => {
    this.setState(prevState => ({
      button_change_field: !prevState.button_change_field
    }))
  }

  handleOnChangeModel = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleChangeMarket = market_id => {
    this.setState({
      market_id: market_id
    })
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

  saveInvoicePos = e => {
    e.preventDefault()
    let tender_amount = this.state.tender_amount.split('$ ')
      ? this.state.tender_amount.split('$ ')
      : this.state.tender_amount
    tender_amount = tender_amount[1] ? tender_amount[1] : tender_amount[0]
    let total_amount = this.state.total_amount.split('$ ')
    console.log(total_amount)
    total_amount = total_amount[0]
    // console.log(total_amount)
    let tender_refund = this.state.tender_refund.split('$ ')
    console.log(tender_refund)
    tender_refund = tender_refund[0]
    // console.log(tender_refund)
    const data = {
      market_place_id: this.state.market_place,
      tender_amount: tender_amount,
      doc_no: this.state.doc_no,
      doc_date: this.state.doc_date,
      ad_id: this.state.ad_id,
      phone_no: this.state.phoneNumber,
      buyer_email: this.state.buyer_email,
      buyer_name: this.state.buyer_name,
      buyer_address: this.state.buyer_address,
      buyer_city: this.state.city_id[0]
        ? this.state.city_id[0]
        : this.state.city_id,
      buyer_state: this.state.state_id[0]
        ? this.state.state_id[0]
        : this.state.state_id,
      buyer_zip: this.state.buyer_zip,
      pay_mode: this.state.change_payment,
      exempt: this.state.exempt,
      card_number: this.state.card_no,
      net_amount: total_amount,
      tender_refund: tender_refund,
      user_id: localStorage.getItem('userId'),
      disc_total_amount: this.state.dis_total_amount,
      store_id: this.state.store_id[0]
        ? this.state.store_id[0]
        : this.state.store_id,
      sale_tax: this.state.sale_tax_per,
      data: this.props.pos_barcode_detail,
      card_date:
        this.state.exp_year !== ''
          ? this.state.exp_month + '/' + this.state.exp_year
          : '',
      card_last_4: this.state.card_last_4
    }
    const save = this.props.pos_barcode_detail.filter(
      item => item.LINE_TYPE === null
    )
    const price = this.props.pos_barcode_detail.filter(
      item => item.COST_PRICE == null
    )
    // console.table(data)
    console.log(data)
    if (save.length > 0) {
      toastr.error('Error', 'Please Select All line Types')
    } else if (price.length > 0) {
      toastr.error('Error', 'Please Insert Price')
    } else {
      window.scrollTo(0, 0)
      this.props.save_invoice_pos(data)
      // this.setState({
      //   market_place: '',
      //   phoneNumber: '',
      //   buyer_address: '',
      //   buyer_name: '',
      //   buyer_email: '',
      //   city_id: '',
      //   state_id: '',
      //   ad_id: '',
      //   ser_barcode: '',
      //   card_number: '',
      //   tender_refund: '',
      //   total_amount: '',
      //   tender_amount: '',
      //   total_discount_amount: '',
      //   total_dicount_per: ''
      // })
    }
  }

  onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
    // console.log(token)
    // console.log(token)
    if (token.id !== null) {
      this.setState({
        card_last_4: token.card.last4,
        exp_month: token.card.exp_month,
        exp_year: token.card.exp_year,
        token_id: token.id,
        tender_amount: '$ ' + this.state.total_amount,
        change_payment: false
      })
      const data = {
        id: token.id,
        amount: this.state.total_amount
      }
      // console.log(data)
      this.props.create_charge_stripe(data)
    }
  }
  componentWillUnmount () {
    this.props.pos_form_data()
    this.props.get_pos_store_name()
    this.props.remove_all_unmount()
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
    // console.log(this.props.barcode_qty)
    console.log(this.state)
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    console.log(this.state.change_payment)
    // const button = this.props.button_status
    const save_button_ena = this.props.pos_barcode_detail.length > 0
    const disable_barcode = this.state.store_id !== null
    const button_city = this.state.city_id !== '' && this.state.state_id !== ''
    const save_button =
      this.state.store_id !== null && button_city && save_button_ena
    console.log(this.state.store_id !== null)
    const buyer_city = []
    this.props.pos_city.map(item => {
      return buyer_city.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      })
    })

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
                      <div className='col-sm-2'>
                        <form onSubmit={this.SearchBarcode}>
                          <div className='input-group input-group-md'>
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
                        </form>
                      </div>

                      {this.state.button_change_field ? (
                        <div
                          className='col-sm-2'
                          style={{ marginLeft: '18px' }}
                        >
                          <form onSubmit={this.SacnBarcode}>
                            <div className='input-group input-group-md'>
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
                          </form>
                        </div>
                      ) : null}
                      <div className='col-sm-2'>
                        <div
                          className='form-group'
                          style={{ marginTop: '23px', float: 'right' }}
                        >
                          <Button
                            type='button'
                            className='btn btn-primary'
                            data-toggle='modal'
                            data-target='#myModalSearch'
                            data-dismiss='modal'
                          >
                            Search Repair
                          </Button>
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div
                          className='form-group'
                          style={{ marginTop: '23px', float: 'right' }}
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

          {/**
Search Barcode Start
*/}
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className='modal fade'
                id='myModalSearch'
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
                        onClick={this.RemoveSearchBarcodes}
                      >
                        &times;
                      </button>
                      <h4 className='modal-title'>Search Repair</h4>
                    </div>
                    <div className='modal-body'>
                      <section className='content'>
                        <h4> Search Repair Barcodes </h4>
                        <SearchRepair {...this.propss} />
                      </section>
                    </div>{' '}
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-default'
                        data-dismiss='modal'
                        onClick={this.RemoveSearchBarcodes}
                      >
                        Cancel
                      </button>
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
                  <PosDataTable
                    {...this.props}
                    exempt={this.state.exempt}
                    // line_type={this.state.line_type}
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
                            required
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
                            required
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
          {/**
  Grand Totals

*/}
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
                            this.state.exempt === false
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
                            this.state.exempt === false
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
                          />
                          Exempt
                        </label>
                      </div>
                    </div>
                    <div className='col-sm-2'>
                      <div className='form-group'>
                        <label htmlFor='total' className='control-label'>
                          Total Amount
                        </label>
                        <NumberFormat
                          className='form-control'
                          id='total'
                          name='total'
                          displayType={'text'}
                          value={this.props.total}
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
                          value={this.props.total_advance}
                          thousandSeparator
                          prefix={'$ '}
                        />
                      </div>
                    </div>
                    <div className='col-sm-2'>
                      <div className='form-group'>
                        <label htmlFor='total_amount' className='control-label'>
                          Net Amount
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
                  </div>

                  <div className='row'>
                    <div className='col-sm-12'>
                      {/* {this.state.change_payment === true ? ( */}
                      <React.Fragment>
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
                              value={this.state.tender_amount}
                              // thousandSeparator
                              prefix={'$ '}
                              required
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
                                this.state.tender_amount == ''
                                  ? ''
                                  : this.state.total_amount == '0.00'
                                    ? '0.00'
                                    : this.state.tender_refund
                              }
                              thousandSeparator
                              prefix={'$ '}
                            />
                          </div>
                        </div>{' '}
                      </React.Fragment>
                      {/* ) : ( */}
                      {/* <div className='col-sm-3'>
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
                             />
                           </div>
                         </div>
                        // ''
                      // )} */}
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
                            disabled={!save_button_ena}
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='total_dicount_per'
                            className='control-label'
                          >
                            Discount %
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='total_dicount_per'
                            name='total_dicount_per'
                            value={this.state.total_dicount_per}
                            onBlur={this.handleOnTotalPer}
                            thousandSeparator
                            prefix={'$ '}
                            disabled={!save_button_ena}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-12'>
                      {/* <div className='col-sm-2'>
                        <div className='form-group'>
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.changePaymentMethodToCash}
                          >
                            Cash
                          </Button>
                        </div>
                      </div> */}
                      {/* <div className='col-sm-2'>
                        <div className='form-group'>
                          <StripeCheckout
                            amount={this.state.total_amount * 100}
                            email={this.state.buyer_email || ''}
                            className='btn btn-primary btn-block btn-flat'
                            currency='USD'
                            country='US'
                            stripeKey='pk_test_UZjTyWOEnHUCzNIdt4C20xF900fJp9MTSb'
                            token={this.onToken}
                            zipCode={false}
                            label={'Pay with ' + this.state.total_amount}
                            // zipCode
                          />
                        </div>
                      </div> */}
                      {/* <div className='col-sm-2' style={{ float: 'right' }}>
                        <div className='form-group'>
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.changePaymentMethodToCard}
                          >
                            Card Payment
                          </Button>
                        </div>
                      </div> */}
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
                          onClick={this.saveInvoicePos}
                          disabled={!save_button}
                        >
                          Save
                        </Button>
                      </div>
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
    doc_no: state.posReducer.pos_doc_no,
    pos_state: state.posReducer.pos_state,
    pos_city: state.posReducer.pos_city,
    pos_barcode_detail: state.posReducer.pos_barcode_detail,
    sale_tax_amt: state.posReducer.sale_tax_amt,
    sale_tax_per: state.posReducer.sale_tax_per,
    total_advance: state.posReducer.total_advance,
    total_amount: state.posReducer.total_amount,
    dis_total_amount: state.posReducer.dis_total_amount,
    button_status: state.posReducer.button_status,
    store_name: state.posReducer.store_name,
    buyer_info_pos: state.posReducer.buyer_info_pos,
    total: state.posReducer.total,
    total_discount_amount: state.posReducer.total_discount_amount,
    total_amount_per: state.posReducer.total_amount_per,
    open_model: state.posReducer.open_model,
    reducerBarcode: state.posReducer.barcode,
    reducerEbay_id: state.posReducer.ebay_id,
    barcode_qty: state.posReducer.barcode_qty,
    merchant_name: state.genrateBarcodeReducer.merchantname,
    portal_name: state.eBayReducer.portal_name,
    show_model: state.posReducer.show_model,
    close_model: state.posReducer.close_model,
    remove_form_data: state.posReducer.remove_form_data
  }
}
export default connect(
  mapStateToProps,
  {
    pos_form_data,
    get_pos_store_name,
    get_tax,
    change_exempt,
    get_barcode_detail_pos,
    change_line_type,
    change_Dis_Amount,
    change_Dis_Amount_Perc,
    change_cost_price,
    save_invoice_pos,
    change_save_button_props,
    delete_pos_barcode,
    pos_form_state,
    get_scan_barcode_detail,
    change_all_dis_amt,
    change_all_dis_per,
    remove_all_unmount,
    create_charge_stripe,
    send_to_FireStore,
    get_latest_payment,
    close_model,
    get_item_qty_aganist_ebay_id,
    single_item_end,
    update_multiple_barcode_Qty,
    get_portal_name
  }
)(PosForm)
