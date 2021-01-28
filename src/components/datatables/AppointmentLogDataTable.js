import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import swal from 'sweetalert'
import '../../dataTable.css'
import Select from 'react-select'

const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        style={{ marginRight: '3px', marginTop: '3px' }}
        className='btn btn-danger'
        size='sm'
        // disabled={that.props.status === 'Complete'}
        onClick={() => that.onCLickDelete(row)}
      >
        <span className='glyphicon glyphicon-trash p-b-5' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}
const saveButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-secondary'
        size='xs'
        // onClick={() => that.onProcess(row)}
      >
        <span className='glyphicon glyphicon-saved p-b-5' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}

const packingList = (cell, row) => {
  const data = (that.props.appointment_packing || []).filter(
    item => item.BARCODE_NO == cell
  )
  // console.log(data)
  const packing_detail = []
  data.map(item => {
    return packing_detail.push({
      value: item.PACKING_ID,
      label:
        item.PACKING_NAME +
        '|' +
        item.PACKING_TYPE +
        '|' +
        item.PACKING_LENGTH +
        '*' +
        item.PACKING_WIDTH +
        '*' +
        item.PACKING_HEIGTH
    })
  })
  return (
    <ul style={{ listStyleType: 'none' }}>
      {data.map((item, key) => (
        <li key={key}>
          {item.PACKING_NAME +
            '|' +
            item.PACKING_TYPE +
            '|' +
            item.PACKING_LENGTH +
            '*' +
            item.PACKING_WIDTH +
            '*' +
            item.PACKING_HEIGTH}
        </li>
      ))}
    </ul>
  )
}
class MultiplePacking extends Component {
  constructor (props) {
    super(props)
    this.state = {
      packing_id: '',
      packing_detail: ''
    }
  }
  handleChangePackingId = packing_id => {
    this.setState({
      ...this.state,
      packing_id: packing_id
    })
  }

  saveAppointmentPacking = () => {
    const data = {
      barcode: this.props.row.BARCODE_NO,
      service_id: this.props.row.SERVICE_ID,
      appointment_log_id: this.props.row.APPOINTMENT_LOG_ID,
      appointment_dt_id: this.props.row.APPOINTMENT_DT_ID,
      appointment_id: this.props.row.APPOINTMENT_ID,
      packing_id: this.state.packing_id,
      user_id: localStorage.getItem('userId')
    }
    that.props.save_Appointment_Packing(data)
    this.setState({
      packing_id: ''
    })
  }
  // componentDidUpdate (prevProps, prevState) {
  //   if (
  //     prevState.packing_id !== that.state.packing_id &&
  //     that.state.packing_id !== ''
  //   ) {
  //     this.setState({
  //       ...this.state,
  //       packing_id: that.state.packing_id
  //     })
  //   }
  //   // if (prevState.packing_detail !== that.state.packing_detail) {
  //   //   this.setState({
  //   //     packing_id:that.state.packing_detail
  //   //   })
  //   // }
  // }

  render () {
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-sm-8'>
            <div className='form-group'>
              <div className='form-group has-feedback' id='packing_type'>
                <Select
                  id='packing_type'
                  isMulti
                  closeMenuOnSelect={false}
                  options={that.state.packing_detail || []}
                  value={this.state.packing_id}
                  onChange={this.handleChangePackingId}
                  className='basic-multi-select'
                  classNamePrefix='select'
                  required
                />
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <Button
              className='btn btn-secondary'
              size='sm'
              style={{ float: 'left' }}
              onClick={this.saveAppointmentPacking}
              // disabled={this.state.packing_id}
            >
              <span
                className='glyphicon glyphicon-saved p-b-5'
                aria-hidden='true'
              />
            </Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const multiplePacking = (cell, row) => {
  return <MultiplePacking cell={cell} row={row} />
}

var that = ''
class AppointmentLogDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell_Id: '',
      open: false,
      detailModel: {},
      data: [],
      packing_detail: '',
      packing_id: this.props.packing_id_value
    }
    that = this
  }
  handleChangePackingId = packing_id => {
    this.setState({
      ...this.state,
      packing_id: packing_id
    })
  }

  onCLickDelete = row => {
    const Data = {
      service_id: row.SERVICE_ID,
      barcode_no: row.BARCODE_NO,
      appointment_dt_id: row.APPOINTMENT_DT_ID,
      appointment_id: row.APPOINTMENT_ID,
      appointment_log_id: row.APPOINTMENT_LOG_ID
    }
    this.props.delete_appointment_services(Data)
  }
  onclickToDeleteAll = () => {
    const data = {
      data: this.props.log_data
    }
    const reducerData = {
      status: this.props.detailModel.APPOINTMENT_STATUS,
      id: this.props.detailModel.APPOINTMENT_ID,
      log_id: this.props.detailModel.APPOINTMENT_ID
    }
    this.props.delete_all_appointment_barcode(data, reducerData)
  }
  onclickToSavePacking = () => {
    const data = {
      data: this.props.log_data,
      packing_id: this.state.packing_id,
      user_id: localStorage.getItem('userId')
    }
    this.props.add_packing_all_appointment_barcode(data)
    this.setState({
      packing_id: ''
    })
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
    if (row.START_TIME === '' || row.START_TIME === null) {
      return 'tr-Approved'
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.packing_item_detail !== this.props.packing_item_detail) {
      const packing_detail = []
      this.props.packing_item_detail.map(item => {
        return packing_detail.push({
          value: item.PACKING_ID,
          label:
            item.PACKING_NAME +
            '|' +
            item.PACKING_TYPE +
            '|' +
            item.PACKING_LENGTH +
            '*' +
            item.PACKING_WIDTH +
            '*' +
            item.PACKING_HEIGTH
        })
      })
      this.setState({
        packing_detail: packing_detail
      })
    }
  }
  render () {
    // console.log(this.state)
    // console.log(this.state.packing_id)
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
          value: this.props.log_data.length || []
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
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }
    // console.log(this.props.log_data)
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-sm-3' style={{ float: 'right' }}>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-danger'
                onClick={this.onclickToDeleteAll}
                disabled={!this.props.log_data.length || [] > 0}
              >
                Delete All
              </button>
            </div>
          </div>
          <div className='col-sm-3' style={{ float: 'right' }}>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <button
                type='button'
                className='btn btn-primary btn-block btn-flat btn-primary'
                onClick={this.onclickToSavePacking}
                disabled={!this.props.log_data.length || [] > 0}
              >
                Save Packing
              </button>
            </div>
          </div>
          <div className='col-sm-4' style={{ float: 'right' }}>
            <div className='form-group' style={{ marginTop: '25px' }}>
              <div className='form-group has-feedback' id='packing_type'>
                <Select
                  id='packing_type'
                  isMulti
                  closeMenuOnSelect={false}
                  options={this.state.packing_detail || []}
                  value={this.state.packing_id}
                  onChange={this.handleChangePackingId}
                  className='basic-multi-select'
                  classNamePrefix='select'
                />
              </div>
            </div>
          </div>
        </div>

        <BootstrapTable
          data={this.props.log_data}
          // striped
          hover
          trClassName={this.trClassFormat}
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='APPOINTMENT_LOG_ID'
            isKey
            dataSort
            dataFormat={editButton}
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='APPOINTMENT_ID'
            dataSort
            hidden
          >
            Appointment Id
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BARCODE_NO'
            dataSort
          >
            Barcode No
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
            dataField='SERVICE_DESC'
          >
            Service Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='START_TIME'
            hidden
          >
            Start Time
          </TableHeaderColumn>

          <TableHeaderColumn
            width='13%'
            headerAlign='center'
            dataAlign='center'
            dataField='PACKING_ID'
            dataFormat={multiplePacking}
          >
            Select Packing
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BARCODE_NO'
            dataFormat={packingList}
          >
            Select Packing
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='APPOINTMENT_LOG_ID'
            dataSort
            dataFormat={saveButton}
          >
            Action
          </TableHeaderColumn> */}
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default AppointmentLogDataTable
