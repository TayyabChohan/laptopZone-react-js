import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import NumberFormat from 'react-number-format'
import dateFormat from 'dateformat'
import '../../../dataTable.css'
import { toastr } from 'react-redux-toastr'
import { Redirect, Link } from 'react-router-dom'
import RepairFormEditDataTable from './RepairFormEditDataTable.js'
// src\dataTable.css
const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-danger'
        size='xs'
        onClick={() => that.onClickDelete(cell, row)}
      >
        <span className='glyphicon glyphicon-trash p-b-5' aria-hidden='true' />
      </Button>
      <Button
        style={{ marginLeft: '3px' }}
        className='btn btn-warning'
        size='xs'
        title='Detail'
        data-toggle='modal'
        data-target='#myModal'
        onClick={() => that.onClickEdit(cell, row)}
      >
        <span className='glyphicon glyphicon-pencil p-b-5' aria-hidden='true' />
      </Button>
      <Button
        className='btn btn-primary'
        style={{ marginLeft: '3px' }}
        size='xs'
        onClick={() => that.onClickPrint(cell, row)}
      >
        <span className='glyphicon glyphicon-print p-b-5' aria-hidden='true' />
      </Button>
      <Button
        className='btn btn-primary'
        size='xs'
        style={{ margin: '3px' }}
        onClick={() => that.onClickPOS(cell, row)}
        disabled={
          row.REPAIR_STATUS !== 'Complete' &&
          row.REPAIR_STATUS !== 'Not Repairable'
        }
      >
        Genrate Invoice
      </Button>
    </React.Fragment>
  )
}
const adv_pay = (cell, row) => {
  const value = Number(row.ADVANCE_PAYMENT).toFixed(2)
  return (
    <NumberFormat
      displayType={'text'}
      name='repaire_cost'
      value={'$ ' + value}
      thousandSeparator
      prefix={'$'}
    />
  )
  // return '$ ' + value
}

const exp_cost = (cell, row) => {
  const value = Number(row.EXPT_REPAIRE_COST).toFixed(2)
  return (
    <NumberFormat
      displayType={'text'}
      name='repaire_cost'
      value={'$ ' + value}
      thousandSeparator
      prefix={'$'}
    />
  )
  // return '$ ' + value
}
const exp_payable = (cell, row) => {
  const value = Number(row.EXPECTED_PAYABLE).toFixed(2)

  return (
    <NumberFormat
      displayType={'text'}
      name='repaire_cost'
      value={'$ ' + value}
      thousandSeparator
      prefix={'$'}
    />
  )
  // return '$ ' + value
}

const ser_charge = (cell, row) => {
  const value = Number(row.SERVICE_CHARGES).toFixed(2)

  return (
    <NumberFormat
      displayType={'text'}
      name='service_charge'
      value={'$ ' + value}
      thousandSeparator
      prefix={'$'}
    />
  )
  // return '$ ' + value
}
var that = ''

class ReapireFromDatatable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      repaire_edit: '',
      edit_delivery_date: new Date(),
      edit_address: '',
      edit_product_owner: '',
      edit_phoneNumber: '',
      edit_email: '',
      edit_repaire_cost: '',
      edit_service_charges: '',
      edit_repaire_des: '',
      edit_serial_no: '',
      edit_store_id: '',
      edit_city_id: '',
      edit_state_id: '',
      edit_mpn: '',
      edit_advance_payment: '',
      edit_brand: '',
      edit_repair_status: '',
      move: false,
      barcode: '',
      scan_barcode_edit: ''
    }
    that = this
  }
  onClickEdit = (cell, row) => {
    this.setState({
      repaire_edit: row
    })
    const data = {
      id: row.LZ_POS_REPAIRE_ID
    }
    this.props.get_specific_pos_repair_data(data)
  }
  onClickPrint = (cell, row) => {
    const data = {
      id: row.LZ_POS_REPAIRE_ID
    }
    this.props.print_pos_repaire(data)
  }
  onClickPOS = (cell, row) => {
    this.setState({
      move: true,
      barcode: row.RECEIPT_BARCODE_NO
    })
  }
  onClickDelete = (cell, row) => {
    // console.log(row)
    // console.log(cell)
    const data = {
      id: row.LZ_POS_REPAIRE_ID,
      user_id: localStorage.getItem('userId')
    }
    this.props.delete_pos_repaire_data(data)
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.repaire_edit !== this.state.repaire_edit &&
      this.state.repaire_edit !== ''
    ) {
      let Store_name = []
      const data = this.props.store_name.filter(
        item => item.LJ_POS_STORE_ID == this.state.repaire_edit.STORE_ID
      )
      data.map(item => {
        return Store_name.push({
          value: item.LJ_POS_STORE_ID,
          label:
            item.STORE_NAME + ' | ' + item.CITY_DESC + ' | ' + item.STATE_DESC
        })
      })
      const city = this.props.pos_city.filter(
        item => item.CITY_ID == this.state.repaire_edit.CITY_ID
      )
      const buyer_city = []
      city.map(item => {
        return buyer_city.push({
          value: item.CITY_ID,
          label: item.CITY_DESC
        })
      })
      const repair_status = [
        { value: 0, label: 'Pending' },
        { value: 1, label: 'Waiting For Parts' },
        { value: 2, label: 'Complete' },
        { value: 3, label: 'Not Repairable' }
      ]
      const edit_repair_status = repair_status.filter(
        item => item.value == this.state.repaire_edit.REPAIRE_STATUS
      )
      this.setState({
        edit_delivery_date: new Date(),
        edit_product_owner: this.state.repaire_edit.PRODUCT_OWNER,
        edit_phoneNumber: this.state.repaire_edit.PHONE_NO,
        edit_email: this.state.repaire_edit.EMAIL,
        edit_repaire_cost: this.state.repaire_edit.EXPT_REPAIRE_COST,
        edit_service_charges: this.state.repaire_edit.SERVICE_CHARGES,
        edit_repaire_des: this.state.repaire_edit.REPAIRE_DES,
        edit_serial_no: this.state.repaire_edit.SERIAL_NO,
        edit_store_id: Store_name[0],
        edit_city_id: buyer_city[0],
        edit_mpn: this.state.repaire_edit.MPN,
        edit_advance_payment: this.state.repaire_edit.ADVANCE_PAYMENT,
        edit_brand: this.state.repaire_edit.BRAND,
        edit_repair_status: edit_repair_status[0]
      })
    }
    if (
      prevState.edit_city_id !== this.state.edit_city_id &&
      this.state.edit_city_id !== ''
    ) {
      const data = {
        city_id: this.state.edit_city_id[0]
          ? this.state.edit_city_id[0]
          : this.state.edit_city_id
      }
      // console.table(data)
      this.props.pos_form_state_edit(data)
    }
    if (
      prevProps.pos_state_edit !== this.props.pos_state_edit &&
      this.props.pos_state_edit !== ''
    ) {
      const default_buyer_state = []
      default_buyer_state.push({
        value: this.props.pos_state_edit[0].STATE_ID || '',
        label: this.props.pos_state_edit[0].STATE_DESC || ''
      })
      this.setState({
        edit_state_id: default_buyer_state[0]
      })
    }
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }
  trClassFormat (row, rowIndex) {
    // row is the current row data
    if (row.REPAIR_STATUS === 'Pending') {
      return 'tRepairPos-Pending'
    } else if (row.REPAIR_STATUS === 'Waiting For Parts') {
      // console.table(row)
      return 'tRepairPos-waiting'
    } else if (row.REPAIR_STATUS === 'Complete') {
      return 'tRepairPos-complete'
    } else {
      return 'tRepairPos-not'
    }
  }
  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleChangeState = edit_state_id => {
    this.setState({
      edit_state_id: edit_state_id
    })
  }
  handleChangeCity = edit_city_id => {
    this.setState({
      edit_city_id: edit_city_id
    })
  }
  handleChangeStore = edit_store_id => {
    this.setState({
      edit_store_id: edit_store_id
    })
  }
  handleChangeRepairStatus = edit_repair_status => {
    this.setState({
      edit_repair_status: edit_repair_status
    })
  }
  handleOnSubmit = e => {
    e.preventDefault()
    const data = {
      delivery_date: dateFormat(this.state.edit_delivery_date, 'dd/mm/yyyy'),
      product_owner: this.state.edit_product_owner,
      repaire_cost: this.state.edit_repaire_cost,
      service_charges: this.state.edit_service_charges,
      repaire_des: this.state.edit_repaire_des,
      email: this.state.edit_email,
      serial_no: this.state.edit_serial_no.toUpperCase(),
      store_id: this.state.edit_store_id,
      phoneNumber: this.state.edit_phoneNumber,
      mpn: this.state.edit_mpn,
      user_id: localStorage.getItem('userId'),
      city_id: this.state.edit_city_id,
      state_id: this.state.edit_state_id,
      id: this.state.repaire_edit.LZ_POS_REPAIRE_ID,
      edit_advance_payment: this.state.edit_advance_payment,
      edit_brand: this.state.edit_brand,
      edit_repair_status: this.state.edit_repair_status,
      data: this.props.pos_repair_barcode_detail_edit
    }
    const save = this.props.pos_repair_barcode_detail_edit.filter(
      item => item.LINE_TYPE === null
    )
    const price = this.props.pos_repair_barcode_detail_edit.filter(
      item => item.COST_PRICE == null
    )
    console.log(data)
    if (this.state.edit_phoneNumber == '') {
      toastr.error('Error', 'Please Enter Phone Number')
    } else if (this.state.edit_line_type == '') {
      toastr.error('Error', 'Please Enter Line Type')
    } else if (save.length > 0) {
      toastr.error('Error', 'Please Select All line Types')
    } else if (price.length > 0) {
      toastr.error('Error', 'Please Insert Price')
    } else {
      this.props.update_pos_repaire_data(data)
    }
  }
  unmount_data = () => {
    this.props.edit_unmount()
  }
  scan_Barcode_edit = e => {
    e.preventDefault()
    const data = {
      barcode: this.state.scan_barcode_edit
    }
    // console.log(data)
    this.props.get_barcode_detail_pos_repair_edit(data)
    this.setState({
      scan_barcode_edit: ''
    })
  }
  render () {
    const disable_barcode = this.state.scan_barcode_edit !== ''
    if (this.state.move) {
      return (
        <Redirect
          to={{
            pathname: `/posform`,
            state: { barcode: this.state.barcode }
          }}
        />
      )
    }
    const repair_status = [
      { value: 0, label: 'Pending' },
      { value: 1, label: 'Waiting For Parts' },
      { value: 2, label: 'Complete' },
      { value: 3, label: 'Not Repairable' }
    ]
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: '25',
          value: 25
        },
        {
          text: '50',
          value: 50
        },
        {
          text: '75',
          value: 75
        },
        {
          text: 'All',
          value: this.props.repaire_data.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: '<<', // First page button text
      lastPage: '>>', // Last page button text
      prePageTitle: 'Go to previous', // Previous page button title
      nextPageTitle: 'Go to next', // Next page button title
      firstPageTitle: 'Go to first', // First page button title
      lastPageTitle: 'Go to Last', // Last page button title
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: 'bottom', // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }
    // console.log(this.props.datatable_data)
    // let colums = []
    let Store_name = []
    this.props.store_name.map(item => {
      return Store_name.push({
        value: item.LJ_POS_STORE_ID,
        label:
          item.STORE_NAME + ' | ' + item.CITY_DESC + ' | ' + item.STATE_DESC
      })
    })

    const buyer_city = []
    this.props.pos_city.map(item => {
      return buyer_city.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      })
    })
    return (
      <React.Fragment>
        <div
          className='modal fade'
          id='myModal'
          role='dialog'
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
                  onClick={this.unmount_data}
                >
                  &times;
                </button>
                <h4 className='modal-title'>Repaire Form Edit</h4>
              </div>
              {/* <form> */}
              <div className='modal-body'>
                <h4> Repaire Form </h4>
                <div className='row'>
                  <form onSubmit={this.handleOnSubmit}>
                    <div className='col-sm-12'>
                      <div className='col-sm-3'>
                        <div className='form-group' id='Store'>
                          <label htmlFor='Store'>Store Name</label>
                          <small> Store_Name| City | State</small>
                          <Select
                            id='Store'
                            options={Store_name}
                            value={this.state.edit_store_id}
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
                            Product Owner
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='product_owner'
                            name='edit_product_owner'
                            value={this.state.edit_product_owner}
                            onChange={this.handleOnChange}
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label htmlFor='Phone' className='control-label'>
                            Phone
                          </label>
                          <NumberFormat
                            className='form-control'
                            format='(###) ###-########'
                            mask='_'
                            onChange={this.handleOnChange}
                            name='edit_phoneNumber'
                            value={this.state.edit_phoneNumber}
                          />
                        </div>
                      </div>

                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='Email' className='control-label'>
                            Email
                          </label>
                          <input
                            type='email'
                            className='form-control'
                            id='Email'
                            name='edit_email'
                            onChange={this.handleOnChange}
                            value={this.state.edit_email}
                            // required
                          />
                        </div>
                      </div>
                      {/* <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='repaire_cost'
                            className='control-label'
                          >
                            Estimated Repaire Cost
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='repaire_cost'
                            name='edit_repaire_cost'
                            onChange={this.handleOnChange}
                            value={this.state.edit_repaire_cost}
                            thousandSeparator
                            prefix={'$'}
                          />
                        </div>
                      </div> */}
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='repaire_cost'
                            className='control-label'
                          >
                            Service Charges
                          </label>
                          <NumberFormat
                            className='form-control'
                            id='repaire_cost'
                            name='edit_service_charges'
                            onChange={this.handleOnChange}
                            value={this.state.edit_service_charges}
                            thousandSeparator
                            displayType={'text'}
                            prefix={'$'}
                          />
                        </div>
                      </div>
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
                              dateFormat: 'Y-m-d'
                            }}
                            value={this.state.edit_delivery_date}
                            onChange={edit_delivery_date => {
                              this.setState({ edit_delivery_date })
                            }}
                          />
                        </div>
                      </div>
                      <div className='col-sm-3'>
                        <label htmlFor='city'>City Name</label>
                        <div className='form-group has-feedback' id='city'>
                          <Select
                            id='city'
                            options={buyer_city}
                            value={this.state.edit_city_id}
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
                            value={this.state.edit_state_id}
                            onChange={this.handleChangeState}
                            className='basic-select'
                            classNamePrefix='select'
                            required
                          />
                        </div>
                      </div>

                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='serial_no' className='control-label'>
                            Serial No
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='serial_no'
                            name='edit_serial_no'
                            onChange={this.handleOnChange}
                            value={this.state.edit_serial_no.toUpperCase()}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='brand' className='control-label'>
                            Brand
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='brand'
                            name='edit_brand'
                            onChange={this.handleOnChange}
                            value={this.state.edit_brand}
                            // required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label htmlFor='mpn' className='control-label'>
                            MPN | Modal
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='mpn'
                            name='edit_mpn'
                            onChange={this.handleOnChange}
                            value={this.state.edit_mpn}
                            // required
                          />
                        </div>
                      </div>

                      {/* <div className='col-sm-2'>
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
                            name='edit_advance_payment'
                            onChange={this.handleOnChange}
                            value={this.state.edit_advance_payment}
                            thousandSeparator
                            prefix={'$'}
                          />
                        </div>
                      </div> */}
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='repaire_des'
                            className='control-label'
                          >
                            Repaire Description
                          </label>
                          <textarea
                            rows='4'
                            cols='50'
                            id='repaire_des'
                            name='edit_repaire_des'
                            className='form-control'
                            onChange={this.handleOnChange}
                            value={this.state.edit_repaire_des}
                            style={{ resize: 'none', width: '450px' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='col-sm-3'>
                        <label htmlFor='Repair_status'>Repair Status</label>
                        <div
                          className='form-group has-feedback'
                          id='Repair_status'
                        >
                          <Select
                            id='Repair_status'
                            options={repair_status}
                            value={this.state.edit_repair_status}
                            onChange={this.handleChangeRepairStatus}
                            className='basic-select'
                            classNamePrefix='select'
                            // required
                          />
                        </div>
                      </div>
                      <div
                        className='col-sm-2'
                        style={{ float: 'right', marginTop: '50px' }}
                      >
                        <div className='form-group'>
                          <Button
                            type='submit'
                            className='btn btn-primary btn-block btn-flat'
                            // onClick={this.saveInvoicePos}
                            // disabled={!button}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <hr />
              {/**

              Edit Scan Barcode

              */}
              {/* <!-- /.box-header --> */}
              <h3 className='box-title' style={{ marginLeft: '18px' }}>
                Scan Barcode
              </h3>
              <div className='box-body'>
                <div className='col-sm-12'>
                  <form onSubmit={this.scan_Barcode_edit}>
                    <div className='col-sm-3'>
                      <div className='input-group'>
                        <label htmlFor='scan_barcode' className='control-label'>
                          Scan Barcode:
                        </label>
                        <input
                          type='text'
                          className='form-control scan_barcode '
                          id='scan_barcode'
                          name='scan_barcode_edit'
                          value={this.state.scan_barcode_edit}
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
              <hr />
              {/**

              Edit DataTable

              */}

              <h3 className='box-title' style={{ marginLeft: '18px' }}>
                Scan Barcode Detail
              </h3>

              {/* <!-- /.box-header --> */}
              <div className='box-body'>
                {/* <div className='row'> */}
                <RepairFormEditDataTable {...this.props} />
                {/* </div> */}
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-default'
                  data-dismiss='modal'
                  onClick={this.unmount_data}
                >
                  Cancel
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>

        <BootstrapTable
          data={this.props.repaire_data}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          trClassName={this.trClassFormat}
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='LZ_POS_REPAIRE_ID'
            dataFormat={editButton}
            isKey
            dataSort
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='PRODUCT_OWNER'
            //   dataFormat={line_Type}
            dataSort
          >
            Product Owner
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='STORE_NAME'
            dataSort
          >
            Store Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='REPAIRE_DES'
            //   dataFormat={Dis_Charge}
            dataSort
            hidden
          >
            Repaire Desc
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='EMAIL'
            dataSort
            editable={false}
          >
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='PHONE_NO'
            dataSort
            editable={false}
          >
            Phone No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='BRAND'
            // editable
            // dataFormat={net_price}
            dataSort
          >
            Brand
          </TableHeaderColumn>

          {/* <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='STATE_DESC'
            editable
            //   dataFormat={dis_per}
            dataSort
          >
            State
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='CITY_DESC'
            editable
            //   dataFormat={dis_amount}
            dataSort
          >
            City
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='EXPT_REPAIRE_COST'
            dataFormat={exp_cost}
            dataSort
          >
            Expt Cost
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='EXPT_DEL_DATE'
            // editable
            // dataFormat={net_price}
            dataSort
          >
            Expt Delivery Date
          </TableHeaderColumn>

          <TableHeaderColumn
            width='4%'
            headerAlign='center'
            dataAlign='center'
            dataField='SERIAL_NO'
            //   dataFormat={Dis_Charge}
            dataSort
          >
            Serial No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='MPN'
            //   dataFormat={Dis_Charge}
            dataSort
            hidden
          >
            Mpn
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='RECEIPT_BARCODE_NO'
            // dataFormat={exp_payable}
            dataSort
          >
            Barcode
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='ADVANCE_PAYMENT'
            dataFormat={adv_pay}
            dataSort
          >
            Advance Pay
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='SERVICE_CHARGES'
            dataFormat={ser_charge}
            dataSort
          >
            service charges
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='EXPECTED_PAYABLE'
            dataFormat={exp_payable}
            dataSort
          >
            Expt Payable
          </TableHeaderColumn>
          <TableHeaderColumn
            width='7%'
            headerAlign='center'
            dataAlign='center'
            dataField='REPAIR_STATUS'
            // dataFormat={exp_payable}
            dataSort
          >
            Status
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default ReapireFromDatatable
