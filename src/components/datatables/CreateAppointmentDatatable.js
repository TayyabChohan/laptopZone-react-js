import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button, Row, Modal } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import '../../dataTable.css'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import dateFormat from 'dateformat'
import AppointmentLogDataTable from './AppointmentLogDataTable.js'
import SearchBarcode from '../appointment/SearchBarcode.js'
import NumberFormat from 'react-number-format'
import LotBarcode from '../appointment/LotBarcode.js'
const editButton = (cell, row) => {
  return that.props.user_id == 2 ? (
    <React.Fragment>
      {/* <Button
        className={
          row.APPOINTMENT_STATUS == 'inqueue'
            ? 'btn btn-default'
            : row.APPOINTMENT_STATUS == 'Approved'
              ? 'btn btn-primary'
              : row.APPOINTMENT_STATUS == 'In Process'
                ? 'btn btn-secondary'
                : row.APPOINTMENT_STATUS == 'Complete'
                  ? 'btn-btn-success'
                  : row.APPOINTMENT_STATUS == 'Canecl'
                    ? 'btn btn-default'
                    : ''
        }
        size='sm'
        onClick={() =>
          that.onToggleConfirmAlertAdmin(cell, row.APPOINTMENT_STATUS)
        }
        disabled={
          row.APPOINTMENT_STATUS == 'Approved' ||
          row.APPOINTMENT_STATUS == 'Cancel By User'
        }
        title={row.APPOINTMENT_STATUS == 'inqueue' ? 'Approved' : 'Approved'}
      >
        <span className='glyphicon glyphicon-saved' aria-hidden='true' />
      </Button>
      <Button
        className='btn btn-danger'
        size='sm'
        onClick={() => that.onCancelConfirmAlert(cell)}
        disabled={row.APPOINTMENT_STATUS == 'Cancel By User'}
        title='Cancel'
      >
        <span className='glyphicon glyphicon-remove' aria-hidden='true' />
      </Button> */}
      {row.APPOINTMENT_STATUS != 'Complete' ? (
        <Button
          style={{ margin: '3px' }}
          className='btn btn-primary'
          size='xs'
          title='Detail'
          data-toggle='modal'
          data-target='#myModal'
          onClick={() => that.onClickDetail(cell, row)}
        >
          <span className='glyphicon glyphicon-list p-b-5' aria-hidden='true' />
        </Button>
      ) : (
        ''
      )}

      {row.APPOINTMENT_STATUS == 'Approved' ||
      row.APPOINTMENT_STATUS == 'Complete' ||
      row.APPOINTMENT_STATUS == 'In Process' ? (
        <Button
            style={{ marginRight: '3px' }}
            className='btn btn-warning'
            size='xs'
            title='Process'
            data-toggle='modal'
            data-target='#myModalProcess'
            onClick={() => that.onClickInProcess(cell, row)}
          >
            <span
            className='glyphicon glyphicon-pencil p-b-5'
            aria-hidden='true'
            />
          </Button>
        ) : (
          ''
        )}
      {row.APPOINTMENT_STATUS == 'In Process' ? (
        <Button
          className='btn btn-primary'
          size='xs'
          title='Complete'
          onClick={() => that.onCompleteAlertAdmin(cell, row)}
        >
          <span className='glyphicon glyphicon-ok p-b-5' aria-hidden='true' />
        </Button>
      ) : (
        ''
      )}
    </React.Fragment>
  ) : (
    <React.Fragment>
      {/* Send Request After Cancel User */}
      <Button
        className={
          row.APPOINTMENT_STATUS == 'inqueue'
            ? 'btn btn-success'
            : 'btn btn-success'
        }
        size='xs'
        onClick={() => that.onSendToApproveConfirmAlert(cell)}
        disabled={!(row.APPOINTMENT_STATUS == 'Cancel By User')}
        title={
          row.APPOINTMENT_STATUS == 'Cancel By User'
            ? 'Send to approve'
            : row.APPOINTMENT_STATUS == 'Approved'
              ? 'Approved By Admin'
              : row.APPOINTMENT_STATUS == 'In Process'
                ? 'In Process'
                : row.APPOINTMENT_STATUS == 'Complete'
                  ? 'Complete'
                  : row.APPOINTMENT_STATUS == 'inqueue'
                    ? 'Send For Approvel'
                    : row.APPOINTMENT_STATUS == 'Cancel By Admin'
                      ? 'Cancel'
                      : 'Send For Approvel'
        }
      >
        <span className='glyphicon glyphicon-ok' aria-hidden='true' />
      </Button>
      {/* Cancel Button User  */}
      <Button
        className='btn btn-danger'
        size='xs'
        onClick={() => that.onCancelConfirmAlert(cell)}
        disabled={
          row.APPOINTMENT_STATUS == 'Complete' ||
          row.APPOINTMENT_STATUS == 'Cancel By Admin' ||
          row.APPOINTMENT_STATUS == 'Cancel By User' ||
          row.APPOINTMENT_STATUS == 'Approved' ||
          row.APPOINTMENT_STATUS == 'In Process'
        }
        title='Cancel'
      >
        <span className='glyphicon glyphicon-remove' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}

var that = ''
class CreateAppointmentDatatable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell_Id: '',
      open: true,
      detailModel: {},
      service_id: '',
      startDate: new Date(),
      endDate: new Date(),
      remarks: '',
      bar_range: '0',
      startbarcode: '',
      endbarcode: '',
      scanbarcode: '',
      lot_id: '',
      customBarcode: [],
      searchBarcodeData: '',
      modalSearchOpen: false,
      showHours: true
    }
    that = this
  }
  /*

  USER CONFIRMATION FUNCTIONS

  */
  // CONFIRMATION ALERTS

  onCancelConfirmAlert = cell => {
    confirmAlert({
      title: 'Cancel', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.handleOnClickedCencel(cell, localStorage.getItem('userId'))
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }

  onSendToApproveConfirmAlert = cell => {
    confirmAlert({
      title: 'Send to approve', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.handleOnClickedsendToApprove(
              cell,
              localStorage.getItem('userId')
            )
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }
  /*

  END USER CONFIRMATION FUNCTIONS

  */
  /*
ADMIN  CONFIRMATION FUNCTIONS

*/
  onToggleConfirmAlertAdmin = (cell, appointmentStatus) => {
    confirmAlert({
      title:
        appointmentStatus == 'Cancel By Admin'
          ? 'Inqueue'
          : appointmentStatus == 'Cancel By User'
            ? 'Inqueue'
            : 'Approve', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.toggleconfirm(
              cell,
              localStorage.getItem('userId'),
              appointmentStatus
            )
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }

  onCompleteAlertAdmin = (cell, row) => {
    confirmAlert({
      title: 'Complete', // Title dialog
      message: 'Are you sure to do this.', // Message dialog
      closeOnEscape: true,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.onClickComplete(cell, row)
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    })
  }

  /*

  END ADMIN  CONFIRMATION FUNCTIONS

*/
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }
  trClassFormat (row, rowIndex) {
    // row is the current row data
    if (row.APPOINTMENT_STATUS === 'Approved') {
      return 'tr-Approved'
    }
    if (
      row.APPOINTMENT_STATUS === 'Cancel By Admin' ||
      row.APPOINTMENT_STATUS === 'Cancel By User'
    ) {
      return 'tr-Cancel'
    }
    if (row.APPOINTMENT_STATUS === 'inqueue') {
      return 'tr-inqueue'
    }
    if (row.APPOINTMENT_STATUS === 'In Process') {
      return 'tr-InProcess'
    }
    if (row.APPOINTMENT_STATUS === 'Complete') {
      return 'tr-Complete'
    }
  }

  handleOnClick = e => {
    this.setState(prevState => ({
      open: !prevState.open
    }))
    alert()
  }
  handleOnClickedCenceladmin = (cell, user_id) => {
    this.props.cencel_Appointment(cell, user_id)
  }

  handleOnClickedCencel = (cell, user_id) => {
    this.props.cencel_Appointment(cell, user_id)
    this.setState({ open: true, cell_Id: cell })
  }

  toggleconfirm = (cell, user_id, status) => {
    this.props.approved_APPOINTMENT(cell, user_id, status)
  }

  onClickInProcess = (cell, row) => {
    const data = {
      appointment_id: row.APPOINTMENT_ID,
      appointment_dt_id: row.APPOINTMENT_DT_ID
    }
    // console.log(cell)
    this.props.get_specific_services(cell)
    this.props.get_specific_log_detail(cell)
    this.props.get_appointment_summary(data)
    this.props.get_all_appointment_packing(cell)
    const data1 = {
      merchant_id: row.MERCHANT_ID
    }
    this.props.get_lot_aganist_appointment_merchant(data1)
    this.setState({
      ...this.state,
      detailModel: row,
      service_id: ''
      // bar_range: null
    })
  }
  onClickDetail = (cell, row) => {
    this.props.get_specific_services(cell)
    this.setState({
      ...this.state,
      detailModel: row
    })
  }
  handleOnChangeRange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  onClickComplete = (cell, row) => {
    this.props.complete_appointment(cell)
  }
  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  removeFromList = index => {
    const customBarcode = this.state.customBarcode.filter(
      (item, key) => key != index
    )
    this.setState({
      customBarcode: customBarcode
    })
  }

  handleChangeService_id = service_id => {
    this.setState({
      service_id: service_id
    })
  }
  handleChangelot_id = lot_id => {
    this.setState({
      lot_id: lot_id
    })
  }
  handleOnClickedsendToApprove = (cell, user_id) => {
    this.props.pending_Appointment(cell, user_id)
  }

  RemoveSearchBarcodes = () => {
    this.setState({
      modalSearchOpen: false
    })
    this.props.Remove_Search_Barcodes()
  }
  RemoveLotBarcodes = () => {
    this.props.Remove_Lot_Barcodes()
  }
  sendDataToSearch = () => {
    const customData = {
      startDate: dateFormat(this.state.startDate, 'd/m/yyyy H:M:ss'),
      endDate: dateFormat(this.state.endDate, 'd/m/yyyy H:M:ss'),
      user_id: localStorage.getItem('userId'),
      service_id: this.state.service_id.value,
      service_detail: this.state.service_id,
      barcode: this.state.scanbarcode,
      remarks: this.state.remarks,
      label: this.state.service_id.label,
      appointment_id: this.state.detailModel.APPOINTMENT_ID,
      merchant_id: this.state.detailModel.MERCHANT_ID,
      search_barcode: ''
    }

    this.setState({
      searchBarcodeData: customData,
      modalSearchOpen: true
    })
  }
  handelSaveDate = e => {
    // e.preventDefault()
    const data = {
      startDate: dateFormat(this.state.startDate, 'd/m/yyyy H:M:ss'),
      endDate: dateFormat(this.state.endDate, 'd/m/yyyy H:M:ss'),
      appointment_id: this.state.detailModel.APPOINTMENT_ID,
      service_id: this.state.service_id.value,
      save: 'all'
    }
    // console.log(data)
    this.props.save_date_appointmetnt_Barcode_log(data)
  }

  handelSaveDateNot = e => {
    // e.preventDefault()
    const data = {
      startDate: dateFormat(this.state.startDate, 'd/m/yyyy H:M:ss'),
      endDate: dateFormat(this.state.endDate, 'd/m/yyyy H:M:ss'),
      appointment_id: this.state.detailModel.APPOINTMENT_ID,
      service_id: this.state.service_id.value,
      save: 'selected'
    }
    // console.log(data)
    this.props.save_date_appointmetnt_Barcode_log(data)
  }
  handleOnSubmit = e => {
    e.preventDefault()
    const data = {
      // startDate: dateFormat(this.state.startDate, 'd/m/yy H:M:ss'),
      // endDate: dateFormat(this.state.endDate, 'd/m/yy H:M:ss'),
      user_id: localStorage.getItem('userId'),
      service_id: this.state.service_id.value,
      remarks: this.state.remarks,
      appointment_id: this.state.detailModel.APPOINTMENT_ID,
      start_barcode: this.state.startbarcode,
      end_barcode: this.state.endbarcode,
      // scan_barcode: this.state.scanbarcode,
      merchant_id: this.state.detailModel.MERCHANT_ID,
      label: this.state.service_id.label
      // customBarcode: this.state.customBarcode
    }

    const customData = {
      // startDate: dateFormat(this.state.startDate, 'd/m/yy H:M:ss'),
      // endDate: dateFormat(this.state.endDate, 'd/m/yy H:M:ss'),
      user_id: localStorage.getItem('userId'),
      service_id: this.state.service_id.value,
      barcode: this.state.scanbarcode,
      label: this.state.service_id.label,
      remarks: this.state.remarks,
      appointment_id: this.state.detailModel.APPOINTMENT_ID,
      merchant_id: this.state.detailModel.MERCHANT_ID
    }
    const lot_barcode = {
      user_id: localStorage.getItem('userId'),
      service_id: this.state.service_id.value,
      remarks: this.state.remarks,
      appointment_id: this.state.detailModel.APPOINTMENT_ID,
      start_barcode: this.state.startbarcode,
      end_barcode: this.state.endbarcode,
      scan_barcode: this.state.scanbarcode,
      merchant_id: this.state.detailModel.MERCHANT_ID,
      label: this.state.service_id.label,
      lot_id: this.state.lot_id
    }
    // console.log(customData)
    // console.log(data)
    const reducerData = {
      status: this.state.detailModel.APPOINTMENT_STATUS,
      id: this.state.detailModel.APPOINTMENT_ID
    }
    this.state.lot_id !== '' && this.state.lot_id !== null
      ? this.props.add_barcode_aganist_lot_and_barcode(lot_barcode, reducerData)
      : this.state.bar_range == 1
        ? this.props.in_process_appointment(data, reducerData)
        : this.props.checkCustomBarcode(customData, reducerData)
    this.setState({
      // service_id: '',
      // bar_range: null,
      scanbarcode: '',
      startbarcode: '',
      endbarcode: ''
    })
    // this.myFormRef.reset()
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevProps.specific_service !== this.props.specific_service &&
      this.props.specific_service !== ''
    ) {
      const services = []
      services.push({
        value: this.props.specific_service[0].SERVICE_ID,
        label: this.props.specific_service[0].SERVICE_DESC
      })
      this.setState({
        service_id: services[0]
      })
    }

    if (prevState.endDate !== this.state.endDate) {
      const data = {
        startDate: dateFormat(this.state.startDate, 'd/m/yyyy H:M:ss'),
        endDate: dateFormat(this.state.endDate, 'd/m/yyyy H:M:ss')
      }
      this.props.diff_Mins(data)
      this.setState(prevState => ({
        showHours: true
      }))
    }
  }
  render () {
    const UnProcessedAppointment = (this.props.log_detail || []).filter(
      item => item.START_TIME === null
    )
    const processedAppointment = (this.props.log_detail || []).filter(
      item => item.LOT_ID !== null
    )
    // console.log(this.props)
    // console.log(this.state)
    // console.log(this.props.appointment_merchant_lot)
    // console.log(this.state.detailModel)
    // console.log(this.state.searchBarcodeData.APPOINTMENT_ID)
    const lot = []
    ;(this.props.appointment_merchant_lot || []).map(item => {
      lot.push({
        value: item.LOT_ID,
        label: item.LOT_DESC
      })
    })
    const services = []
    // console.log(this.props.specific_service.length)
    // console.log(this.props.specific_service[0])
    // console.log(this.state.bar_range)
    this.props.specific_service.map(item => {
      services.push({
        value: item.SERVICE_ID,
        label: item.SERVICE_DESC
      })
    })
    // const enabledate = this.state.endDate !== '' && this.state.startDate !== ''
    const enabledate = this.props.diffTime !== ''
    const processEnable =
      this.state.service_id != '' && this.state.bar_range != ''
    const enableCustomBarcode =
      this.state.service_id != '' &&
      this.state.bar_range == 0 &&
      this.state.bar_range != ''
    const enableSave =
      (this.state.startbarcode !== '' && this.state.endbarcode !== '') ||
      this.state.scanbarcode !== ''
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
          text: '100',
          value: 100
        },
        {
          text: 'All',
          value: this.props.data.length
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
      paginationPosition: 'both', // default is bottom, top and both is all available
      clearSearch: true
      // onDeleteRow: this.handleDeleteRow
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }
    // const startDate = dateFormat(this.state.startDate, 'dd/mm/yyyy H:M:ss')
    // const endDate = dateFormat(this.state.endDate, 'dd/mm/yyyy H:M:ss')
    // const start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss')
    // const end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss')
    // const duration = moment.duration(end_date.diff(start_date))
    // const days = duration.asHours()
    // console.log(days)
    return (
      <React.Fragment>
        <div className='modal fade' id='myModal' role='dialog'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div
                className='modal-header'
                style={{ backgroundColor: 'paleturquoise' }}
              >
                <button type='button' className='close' data-dismiss='modal'>
                  &times;
                </button>
                <h4 className='modal-title'>Appointment Detail</h4>
              </div>
              {/* <form> */}
              <div className='modal-body'>
                <h4> Appointments </h4>
                <div className='row'>
                  <div className='col-sm-4'>
                    <div className='form-group has-feedback'>
                      <label htmlFor='no_of_item'>Merchant Name</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.detailModel.BUISNESS_NAME}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-sm-4'>
                    <div className='form-group has-feedback'>
                      <label htmlFor='no_of_item'>User Name</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.detailModel.USER_NAME}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-sm-4'>
                    <div className='form-group has-feedback'>
                      <label htmlFor='no_of_item'>Appoint Status</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.detailModel.APPOINTMENT_STATUS}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-4'>
                    <div className='form-group has-feedback'>
                      <label htmlFor='no_of_item'>No Of Items</label>
                      <input
                        type='number'
                        className='form-control'
                        value={this.state.detailModel.EXPECTED_BARCODE}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-sm-4'>
                    <div className='form-group has-feedback'>
                      <label htmlFor='no_of_item'>Appoint Date</label>
                      <input
                        type='text'
                        className='form-control'
                        value={this.state.detailModel.APPOINTMENT_DATE}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className='modal-body'>
                  <div className='row'>
                    <h4>Service Detail</h4>

                    <div className='col-sm-5'>
                      <label htmlFor='no_of_item'> Secvices </label>
                      <ul className='list-group'>
                        {this.props.message ? (
                          <li className='list-group-item'>
                            {this.props.message}
                          </li>
                        ) : (
                          (this.props.specific_service || []).map(item => (
                            <li
                              className='list-group-item'
                              key={item.SERVICE_ID}
                            >
                              {item.SERVICE_DESC}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-danger float-right'
                  data-dismiss='modal'
                  onClick={() =>
                    this.onCancelConfirmAlert(
                      this.state.detailModel.APPOINTMENT_ID
                      // localStorage.getItem('userId')
                    )
                  }
                  disabled={
                    this.state.detailModel.APPOINTMENT_STATUS ==
                      'Cancel By User' ||
                    this.state.detailModel.APPOINTMENT_STATUS == 'In Process' ||
                    this.state.detailModel.APPOINTMENT_STATUS == 'Complete' ||
                    this.state.detailModel.APPOINTMENT_STATUS ==
                      'Cancel By Admin'
                  }
                >
                  <span
                    className='glyphicon glyphicon-remove'
                    aria-hidden='true'
                  />
                </button>
                <button
                  type='button'
                  className={
                    this.state.detailModel.APPOINTMENT_STATUS == 'inqueue'
                      ? 'btn btn-primary'
                      : this.state.detailModel.APPOINTMENT_STATUS == 'Approved'
                        ? 'btn btn-secondary'
                        : this.state.detailModel.APPOINTMENT_STATUS ==
                        'In Process'
                          ? 'btn btn-secondary'
                          : this.state.detailModel.APPOINTMENT_STATUS == 'Complete'
                            ? 'btn-btn-success'
                            : this.state.detailModel.APPOINTMENT_STATUS ==
                          'Cancel By User' ||
                        this.state.detailModel.APPOINTMENT_STATUS ==
                          'Cancel By Admin' ||
                        this.state.detailModel.APPOINTMENT_STATUS == 'Cancel'
                              ? 'btn btn-warning'
                              : ''
                  }
                  data-dismiss='modal'
                  onClick={() =>
                    this.onToggleConfirmAlertAdmin(
                      this.state.detailModel.APPOINTMENT_ID,
                      // localStorage.getItem('userId'),
                      this.state.detailModel.APPOINTMENT_STATUS
                    )
                  }
                  title={
                    this.state.detailModel.APPOINTMENT_STATUS ==
                    'Cancel By Admin'
                      ? 'inqueue'
                      : this.state.detailModel.APPOINTMENT_STATUS == 'inqueue'
                        ? 'Approved'
                        : this.state.detailModel.APPOINTMENT_STATUS == 'Approved'
                          ? 'In Process'
                          : this.state.detailModel.APPOINTMENT_STATUS ==
                        'In Process'
                            ? 'Complete'
                            : ''
                  }
                  disabled={
                    this.state.detailModel.APPOINTMENT_STATUS == 'Approved' ||
                    this.state.detailModel.APPOINTMENT_STATUS ==
                      'Cancel By User' ||
                    this.state.detailModel.APPOINTMENT_STATUS == 'In Process' ||
                    this.state.detailModel.APPOINTMENT_STATUS == 'Complete'
                  }
                >
                  <span
                    className='glyphicon glyphicon-saved'
                    aria-hidden='true'
                  />
                </button>
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
        {/*

            InProcess Model
        */}
        <div className='row'>
          <div className='col-sm-12'>
            <div
              className='modal'
              tabIndex='-1'
              // className='modal'
              id='myModalProcess'
              role='dialog'
            >
              <div className='modal-dialog modal-lg' style={{ width: '70%' }}>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      aria-hidden='true'
                    >
                      &times;
                    </button>
                    <h4 className='modal-title'>Appointment Detail</h4>
                  </div>

                  <div className='modal-body'>
                    <h4> Appointments </h4>
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='no_of_item'>Merchant Name</label>
                          <input
                            type='text'
                            className='form-control'
                            value={this.state.detailModel.BUISNESS_NAME}
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='no_of_item'>User Name</label>
                          <input
                            type='text'
                            className='form-control'
                            value={this.state.detailModel.USER_NAME}
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='no_of_item'>Appoint Status</label>
                          <input
                            type='text'
                            className='form-control'
                            value={this.state.detailModel.APPOINTMENT_STATUS}
                            disabled
                          />
                        </div>
                      </div>
                      {/* </div> */}
                      {/* <div className='row'> */}
                      <div className='col-sm-2'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='no_of_item'>Expected Barcodes</label>
                          <input
                            type='number'
                            className='form-control'
                            value={this.state.detailModel.EXPECTED_BARCODE}
                            disabled
                          />
                        </div>
                      </div>
                      <div className='col-sm-3'>
                        <div className='form-group has-feedback'>
                          <label htmlFor='no_of_item'>Appoint Date</label>
                          <input
                            type='text'
                            className='form-control'
                            value={this.state.detailModel.APPOINTMENT_DATE}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                    {/*
                     Summary
                     */}
                    <div className='modal-body'>
                      <h4> Summary </h4>
                      <div className='box-header with-border'>
                        <div className='box-tools pull-right' />
                      </div>

                      <div className='box-body'>
                        <div className='row'>
                          <div className='col-md-3 col-sm-3 col-xs-3'>
                            <div className='info-box'>
                              <span className='info-box-icon bg-aqua'>
                                <i className='fa fa-plus' />
                              </span>

                              <div className='info-box-content'>
                                <span className='info-box-text'>
                                  Total Barcode Process
                                </span>
                                <span className='info-box-number'>
                                  <NumberFormat
                                    className='pull-left'
                                    value={Number(
                                      this.props.appointment_summary.CNT
                                    )}
                                    displayType={'text'}
                                    fixedDecimalScale
                                    thousandSeparator
                                  />
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className='col-md-3 col-sm-3 col-xs-3'>
                            <div className='info-box'>
                              <span className='info-box-icon bg-red'>
                                <i className='fa fa-bolt' />
                              </span>

                              <div className='info-box-content'>
                                <span className='info-box-text'>
                                  Per Hour Charge
                                </span>
                                <span className='info-box-number'>
                                  <NumberFormat
                                    className=' pull-left'
                                    value={Number(
                                      this.props.appointment_summary.CHARGES
                                    ).toFixed(2)}
                                    displayType={'text'}
                                    fixedDecimalScale
                                    thousandSeparator
                                  />
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className='col-md-2 col-sm-2 col-xs-2'>
                            <div className='info-box'>
                              <span className='info-box-icon bg-red'>
                                <i className='fa fa-bolt' />
                              </span>

                              <div className='info-box-content'>
                                <span className='info-box-text'>
                                  Packing Cost
                                </span>
                                <span className='info-box-number'>
                                  <NumberFormat
                                    className=' pull-left'
                                    value={Number(
                                      this.props.appointment_summary
                                        .PACKING_COST
                                    ).toFixed(2)}
                                    displayType={'text'}
                                    fixedDecimalScale
                                    thousandSeparator
                                  />
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className='col-md-2 col-sm-2 col-xs-2'>
                            <div className='info-box'>
                              <span className='info-box-icon bg-green'>
                                <i className='fa fa-line-chart' />
                              </span>

                              <div className='info-box-content'>
                                <span className='info-box-text'>
                                  Total Amount
                                </span>
                                <span className='info-box-number'>
                                  <NumberFormat
                                    className=' pull-left'
                                    value={Number(
                                      this.props.total_charge
                                    ).toFixed(2)}
                                    displayType={'text'}
                                    fixedDecimalScale
                                    thousandSeparator
                                    prefix={'$ '}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className='col-md-2 col-sm-2 col-xs-2'>
                            <div className='info-box'>
                              <span className='info-box-icon bg-red'>
                                <i className='fa fa-clock-o' />
                              </span>

                              <div className='info-box-content'>
                                <span className='info-box-text'>
                                  TOTAL TIME
                                </span>
                                HH:MM:SS
                                <span className='info-box-number'>
                                  {this.props.appointment_time.TOTAL_TIME || ''}
                                  {/* <NumberFormat
                                    className=' pull-left'
                                    value={
                                      this.props.appointment_time.TOTAL_TIME
                                    }
                                    displayType={'text'}
                                    format="##:##:##"
                                  /> */}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*
                     Summary
                     */}
                    <div className='modal-body'>
                      <form
                        onSubmit={this.handleOnSubmit}
                        ref={el => (this.myFormRef = el)}
                      >
                        <div className='row'>
                          <h4>
                            {' '}
                            <b> Service Detail </b>
                          </h4>

                          <div className='col-xs-4'>
                            <div className='form-group has-feedback'>
                              <label
                                className='control-label'
                                style={{ color: 'red', marginTop: '25px' }}
                              >
                                Barcode Range:
                              </label>
                              &nbsp;&nbsp;
                              <input
                                type='radio'
                                className='bar_range'
                                name='bar_range'
                                value='1'
                                onChange={this.handleOnChangeRange}
                                checked={this.state.bar_range === '1'}
                              />
                              &nbsp;Yes&nbsp;&nbsp;
                              <input
                                type='radio'
                                className='bar_range'
                                name='bar_range'
                                value='0'
                                onChange={this.handleOnChangeRange}
                                checked={this.state.bar_range === '0'}
                              />
                              &nbsp;No
                            </div>
                          </div>
                          {this.state.bar_range == 1 &&
                          this.state.bar_range != '' ? (
                            <React.Fragment>
                                <div className='col-sm-3'>
                                <div className='form-group'>
                                    <label htmlFor='startBarcode'>
                                    Start Barcode:
                                  </label>
                                    <input
                                    type='number'
                                    min='1'
                                    className='form-control'
                                    name='startbarcode'
                                    value={this.state.startbarcode}
                                    onChange={this.handleOnChange}
                                    id='startBarcode'
                                    required
                                    disabled={!processEnable}
                                    />
                                  </div>
                              </div>
                                <div className='col-sm-3'>
                                <div className='form-group'>
                                    <label htmlFor='endBarcode'>
                                    End Barcode:
                                  </label>
                                    <input
                                    type='number'
                                    min='1'
                                    className='form-control'
                                    name='endbarcode'
                                    value={this.state.endbarcode}
                                    onChange={this.handleOnChange}
                                    id='endBarcode'
                                    required
                                    disabled={!processEnable}
                                    />
                                  </div>
                              </div>
                                {/* <div className='col-sm-3'>
                                <div
                                    className='form-group'
                                    style={{ marginTop: '25px' }}
                                  >
                                    <button
                                    type='submit'
                                    className='btn btn-primary btn-block btn-flat'
                                    data-dismiss='modal'
                                    // onClick={this.handleOnInProcess}
                                    disabled={!processEnable}
                                    >
                                    Save
                                  </button>
                                  </div>
                              </div> */}
                              </React.Fragment>
                            ) : this.state.bar_range == 0 &&
                            this.state.bar_range != '' ? (
                              <React.Fragment>
                                  {/* <form onSubmit={this.addMoreBarcode}> */}
                                  <div className='col-sm-3'>
                                  <div className='form-group'>
                                      <label htmlFor='scanBarcode'>
                                    Scan Barcode:
                                    </label>
                                      <input
                                      type='number'
                                      min='1'
                                      className='form-control'
                                      name='scanbarcode'
                                      id='scanBarcode'
                                      required
                                      value={this.state.scanbarcode}
                                      onChange={this.handleOnChange}
                                      disabled={!enableCustomBarcode}
                                      />
                                    </div>
                                </div>
                                  {/* <div className='col-sm-3'>
                                  <div className='form-group'>
                                      <button
                                      type='submit'
                                      className='btn btn-primary btn-block btn-flat'
                                      disabled={!enableCustomBarcode}
                                      style={{ marginTop: '25px' }}
                                      >
                                    Save
                                    </button>
                                    </div>
                                </div> */}
                                  {/* </form> */}
                                </React.Fragment>
                              ) : (
                                ''
                              )}
                        </div>
                        <div className='row'>
                          <div className='col-sm-3'>
                            <label htmlFor='servicetype'>Service Name</label>
                            <div
                              className='form-group has-feedback'
                              id='servicetype'
                            >
                              <Select
                                id='servicetype'
                                options={services}
                                value={this.state.service_id}
                                onChange={this.handleChangeService_id}
                                className='basic-select'
                                classNamePrefix='select'
                                required
                              />
                            </div>
                          </div>
                          {/* <div className='col-sm-3'>
                            <label htmlFor='servicetype'>Lot Name</label>
                            <div
                              className='form-group has-feedback'
                              id='servicetype'
                            >
                              <Select
                                id='servicetype'
                                isClearable
                                options={lot}
                                value={this.state.lot_id}
                                onChange={this.handleChangelot_id}
                                className='basic-select'
                                classNamePrefix='select'
                                required
                              />
                            </div>
                          </div> */}
                          <div className='col-sm-3'>
                            <div className='form-group'>
                              <label htmlFor='comment'>Comment:</label>
                              <input
                                type='text'
                                className='form-control'
                                name='remarks'
                                onChange={this.handleOnChange}
                                id='comment'
                              />
                            </div>
                          </div>
                          <div className='col-sm-2'>
                            <div
                              className='form-group'
                              style={{ marginTop: '25px' }}
                            >
                              <button
                                type='submit'
                                className='btn btn-primary btn-block btn-flat'
                                disabled={!enableSave}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                          <div className='col-sm-2'>
                            <div
                              className='form-group'
                              style={{ marginTop: '25px' }}
                            >
                              <button
                                type='button'
                                className='btn btn-warning btn-block btn-flat float-right'
                                data-toggle='modal'
                                data-target='#myModalSearch'
                                onClick={this.sendDataToSearch}
                                data-dismiss='modal'
                              >
                                Search
                              </button>
                            </div>
                          </div>
                          <div className='col-sm-2'>
                            <div
                              className='form-group'
                              style={{ marginTop: '25px' }}
                            >
                              <button
                                type='button'
                                className='btn btn-warning btn-block btn-flat float-right'
                                data-toggle='modal'
                                data-target='#myModalLot'
                                onClick={this.sendDataToSearch}
                                data-dismiss='modal'
                              >
                                Lot Barcode
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className='modal-body'>
                    <div className='row'>
                      <div className='col-sm-12'>
                        <h4>
                          {' '}
                          <b> Time Detail </b>
                        </h4>
                        <form onSubmit={this.handelSaveDate}>
                          <div className='col-sm-2'>
                            <label>Start Date</label>
                            <div className='input-group'>
                              <Flatpickr
                                options={{
                                  enableTime: true,
                                  maxDate: new Date(),
                                  dateFormat: 'Y-m-d H:i:s'
                                }}
                                value={this.state.startDate}
                                onChange={startDate => {
                                  this.setState({ startDate })
                                }}
                              />
                            </div>
                          </div>
                          <div className='col-sm-2'>
                            <label>End Date</label>
                            <div className='input-group'>
                              <Flatpickr
                                options={{
                                  enableTime: true,
                                  dateFormat: 'Y-m-d H:i:s'
                                }}
                                value={this.state.endDate}
                                onChange={endDate => {
                                  this.setState({ endDate })
                                }}
                              />
                            </div>
                          </div>
                          {this.state.showHours == true ? (
                            <div className='col-sm-3'>
                              <label>Diff Time HH/MM/SS</label>
                              <input
                                type='text'
                                className='form-control'
                                value={
                                  this.props.diffTime !== ''
                                    ? this.props.diffTime.TOTAL_TIME
                                    : ''
                                }
                                disabled
                              />
                            </div>
                          ) : (
                            ''
                          )}
                          <div className='col-sm-3'>
                            <div
                              className='form-group'
                              style={{ marginTop: '25px' }}
                            >
                              {' '}
                              <button
                                type='button'
                                className='btn btn-primary btn-block btn-flat'
                                disabled={!enabledate}
                                onClick={this.handelSaveDateNot}
                              >
                                Apply To Not Assign(
                                {UnProcessedAppointment.length
                                  ? UnProcessedAppointment.length
                                  : 0}
                                )
                              </button>
                            </div>
                          </div>
                          <div className='col-sm-2'>
                            <div
                              className='form-group'
                              style={{ marginTop: '25px' }}
                            >
                              {' '}
                              <button
                                type='button'
                                className='btn btn-primary btn-block btn-flat'
                                disabled={!enabledate}
                                onClick={this.handelSaveDate}
                              >
                                Apply To All (
                                {processedAppointment.length
                                  ? processedAppointment.length
                                  : 0}
                                )
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className='modal-body'>
                    <section className='content'>
                      <div className='row'>
                        <div className='col-xs-12'>
                          <div className='box'>
                            <div className='box-header with-border'>
                              <h3 className='box-title'>Appointments</h3>
                            </div>
                            <div className='box-body'>
                              <AppointmentLogDataTable
                                log_data={this.props.log_detail || []}
                                {...this.props}
                                status={
                                  this.state.detailModel.APPOINTMENT_STATUS
                                }
                                detailModel={this.state.detailModel}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-default'
                      data-dismiss='modal'
                      // onClick={this.removeAllModel}
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

In Process Model Finish

*/}
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
                    <h4 className='modal-title'>Search Barcodes </h4>
                  </div>
                  <div className='modal-body'>
                    <section className='content'>
                      <h4> Search Appointment Barcodes </h4>
                      <SearchBarcode
                        searchData={this.state.searchBarcodeData}
                        detailModel={this.state.detailModel || []}
                        service={this.props.specific_service || []}
                      />
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
        {/**
Lot Barcode Start
*/}
        <div className='row'>
          <div className='col-sm-12'>
            <div className='modal' id='myModalLot' data-backdrop='static'>
              <div className='modal-dialog modal-lg' style={{ width: '70%' }}>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      onClick={this.RemoveLotBarcodes}
                    >
                      &times;
                    </button>
                    <h4 className='modal-title'>Select Lot Barcodes</h4>
                  </div>
                  <div className='modal-body'>
                    <section className='content'>
                      <h4> Appointment Lot Barcodes </h4>
                      <LotBarcode
                        searchData={this.state.searchBarcodeData}
                        detailModel={this.state.detailModel || []}
                        service={this.props.specific_service || []}
                      />
                    </section>
                  </div>{' '}
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-default'
                      // data-toggle='modal'
                      data-dismiss='modal'
                      data-target='#myProcessModal'
                      onClick={this.RemoveLotBarcodes}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BootstrapTable
          data={this.props.data}
          // striped
          hover
          // remote
          // deleteRow
          trClassName={this.trClassFormat}
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          tableStyle={{ background: '#DCDCDC' }}
          headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='APPOINTMENT_ID'
            isKey
            dataSort
            dataFormat={editButton}
          >
            Action
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='APPOINTMENT_LOG_ID'
            isKey
            dataSort
            dataFormat={editButton}
          >
            Action
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='APPOINTMENT_DATE'
            dataSort
          >
            Appointment Date
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='APPOINTMENT_STATUS'
          >
            Appointment Status
          </TableHeaderColumn>

          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='EXPECTED_BARCODE'
          >
            Expected Barcode
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='TOTAL_PROCESS_BARCODE'
          >
            Process Barcode
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BUISNESS_NAME'
          >
            Merchant Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='USER_NAME'
          >
            User Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='REMARKS'
          >
            Remarks
          </TableHeaderColumn>
          <TableHeaderColumn
            width='15%'
            headerAlign='center'
            dataAlign='center'
            tdStyle={{ whiteSpace: 'normal' }}
            dataField='CREATED_DATE'
          >
            Created Date
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default CreateAppointmentDatatable
