import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-primary'
        size='sm'
        target='_blank'
        onClick={() => that.onClickPrint(cell, row)}
      >
        <span class='glyphicon glyphicon-print' aria-hidden='true' />
      </Button>
      <Button
        className='btn btn-danger'
        size='sm'
        target='_blank'
        onClick={() => that.onClickDelete(cell, row)}
      >
        <span class='glyphicon glyphicon-trash' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}
var that = ''
const onAfterSaveCell = (row, cellName, cellValue) => {
  const data = {
    dt_id: row.DT_ID,
    cost: cellValue
  }
  that.props.updateCost(data)
  // alert(`Save cell ${cellName} with value ${cellValue} with ${row.DT_ID}`)
}

const onBeforeSaveCell = (row, cellName, cellValue) => {
  // You can do any validation on here for editing value,
  // return false for reject the editing

  return true
}
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell // a hook for after saving cell
}
class SpecificBarcodeDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell_Id: '',
      open: false
    }
    that = this
  }
  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }
  onClickPrint = cell => {
    this.props.genrateBarcodeByDT_ID(cell)
  }
  onClickDelete = (cell, row) => {
    const data = {
      dt_id: cell,
      mt_id : this.props.mt_id,
      barcode: row.BARCODE_NO
    }
    this.props.delete_barcode(data)
  }
  render () {

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
          value: this.props.data1.length
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
    return (
      <React.Fragment>
        <BootstrapTable
          data={this.props.data1}
          striped
          // hover
          // condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          cellEdit={cellEditProp}
          // containerStyle={ { background: '#00ff00' } }
          tableStyle={{ background: '#b3e5fc' }}
          headerStyle={{ background: '#4fc3f7' }}
        >
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DT_ID'
            dataFormat={editButton}
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DT_ID'
            isKey
            dataSort
            editable={false}
          >
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BARCODE_NO'
            editable={false}
          >
            Barcode No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='COST'
          >
            Cost
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default SpecificBarcodeDataTable
