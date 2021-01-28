import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Redirect } from 'react-router-dom'
import { get_pos_store_name } from '../../action/posActions.js'
import {
  pos_receipt_view,
  print_invoice,
  delete_invoice,
  edit_invoice_receipt,
  edit_invoice_receipt_using_cell,
  toggle_post_unpost_invoice,
  delete_all_pos_invoice,
  post_all_pos_invoice,
  unpost_all_pos_invoice,
  get_receipt_by_store,
  print_invoice_Epos
} from '../../action/posReceiptActions.js'
import PosReceiptDataTable from '../datatables/PosDatatables/PosReceiptDataTable.js'
import AlertMessage from '../messages/AlertMessage.js'
import ErrorMessage from '../messages/ErrorMessage.js'
import LoadLibraries from './posPrintLibrary'
class POS_Receipt_View extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      store_id: '',
      open_StoreModal: true,
      open_DataModal: true
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
  callback = () => {
    alert('success')
  }
  componentDidMount () {
    //     var compressedFunc = localStorage.getItem('compressedFunc');

    // // Convert the String back to a function
    // var myFunc = eval('(' + compressedFunc + ')');

    // // Use it
    // myFunc();
    // var f = localStorage.getItem("ePosDev");
    // // f.connect('192.168.0.137', 8008, this.callback);
    //     // console.log(f.connectPrinter());
    //     var ePosDev = localStorage.getItem('ePosDev');
    // console.log(ePosDev.toString())
    // // Convert the String back to a function
    // var connectPrinter = eval('(' + ePosDev + ')');
    // // console.log(connectPrinter)
    // // Use it
    // connectPrinter();

    this.props.get_pos_store_name()
    this.props.pos_receipt_view()
  }

  handleOnClickStoreName = () => {
    this.setState(prevState => ({
      open_StoreModal: !prevState.open_StoreModal
    }))
  }
  handleOnClickDataModal = () => {
    this.setState(prevState => ({
      open_DataModal: !prevState.open_DataModal
    }))
  }

  handleChangeStore = store_id => {
    this.setState({
      store_id: store_id
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.store_id !== this.state.store_id &&
      this.state.store_id !== ''
    ) {
      const data = {
        store_id: this.state.store_id
      }
      this.props.get_receipt_by_store(data)
    }
  }
  componentWillUnmount () {
    this.props.get_receipt_by_store()
    this.props.pos_receipt_view()
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
    Store_name.push({
      value: 'all',
      label: 'All Stores'
    })
    return (
      <React.Fragment>
        <LoadLibraries />

        <section className='content-header'>
          <h1>Point Of Sale Receipt View</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>Point Of Sale</li>

            <li className='active'>POS Receipt View</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
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
                {/* <!-- /.box-header --> */}
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
          </div>
          {/*
                    DataTable View
                */}
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={
                  this.state.open_DataModal ? 'box' : 'box collapsed-box'
                }
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>POS Receipt View</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_DataModal
                            ? 'fa fa-minus'
                            : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickDataModal}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <PosReceiptDataTable
                        pos_receipt_detail={this.props.pos_receipt_detail || []}
                        {...this.props}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AlertMessage />
        <ErrorMessage />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    store_name: state.posReducer.store_name,
    pos_receipt_detail: state.posReducer.pos_receipt_detail
  }
}
export default connect(
  mapStateToProps,
  {
    get_pos_store_name,
    pos_receipt_view,
    print_invoice,
    delete_invoice,
    edit_invoice_receipt,
    edit_invoice_receipt_using_cell,
    toggle_post_unpost_invoice,
    delete_all_pos_invoice,
    post_all_pos_invoice,
    unpost_all_pos_invoice,
    get_receipt_by_store,
    print_invoice_Epos
  }
)(POS_Receipt_View)
