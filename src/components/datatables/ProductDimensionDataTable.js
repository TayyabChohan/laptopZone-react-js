import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import { toastr } from 'react-redux-toastr'

// const cellEditProp = {
//   mode: 'click',
//   // blurToSave: true
// }

// class ProductDimensionDataTable extends React.Component {
//   render () {
//     const options = {
//       tabMoves: { row: 0, col: 1 }
//     }
//     return (
//       <BootstrapTable
//         data={this.props.data}
//         cellEdit={cellEditProp}
//         options={options}
//       >
//         <TableHeaderColumn dataField='ITEM_ID' isKey>
//           Product ID
//         </TableHeaderColumn>
//         <TableHeaderColumn dataField='I_WIDTH'>Product Name</TableHeaderColumn>
//         <TableHeaderColumn dataField='I_LENGTH'>
//           Product Price
//         </TableHeaderColumn>
//       </BootstrapTable>
//     )
//   }
// }
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
    </React.Fragment>
  )
}
var that = ''
const onAfterSaveCell = (row, cellName, cellValue) => {
  const data = {
    item_id: row.ITEM_ID,
    cellName: cellName,
    cellValue: Number(cellValue).toFixed(2),
    user_id: localStorage.getItem('userId')
  }
  // console.log(data)
  that.props.update_product_detail(data)
  // alert(`Save cell ${cellName} with value ${cellValue} with ${row.DT_ID}`)
}

const onBeforeSaveCell = (row, cellName, cellValue) => {
  // You can do any validation on here for editing value,
  // return false for reject the editing

  return cellValue > 0 || cellValue === ''
  // console.log(cellValue)
  // return true
}
const cellEditProp = {
  mode: 'click',
  // blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell // a hook for after saving cell
}

const I_length = (cell, row) => {
  let value = Number(row.I_LENGTH)
  return value.toFixed(2)
}

const I_width = (cell, row) => {
  let value = Number(row.I_WIDTH)
  return value.toFixed(2)
}

const I_height = (cell, row) => {
  let value = Number(row.I_HEIGHT)
  return value.toFixed(2)
}
class ProductDimensionDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell_Id: '',
      open: false,
      errType: '',
      errMsg: ''
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
    // this.props.genrateBarcodeByDT_ID(cell)
  }

  render () {
    // console.log(this.props.data1)

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
          data={this.props.data}
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
          tableStyle={{ background: '#DCDCDC' }}
          headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='ITEM_ID'
            editable={false}
            isKey
            dataSort
            // dataFormat={editButton}
          >
            Item Id
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='CATEGORY_ID'
            editable={false}
            dataSort
          >
            Category Id
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='ITEM_DESC'
            editable={false}
            dataSort
          >
            Item Description
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='OBJECT_NAME'
            editable={false}
            dataSort
          >
            Object Name
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='BRAND'
            editable={false}
            dataSort
          >
            Brand
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='MPN'
            editable={false}
            dataSort
          >
            MPN
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='UPC'
            editable={false}
            dataSort
          >
            UPC
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='I_LENGTH'
            dataFormat={I_length}
            dataSort
            // editable={{ validator: ProductDetailValidator }}
          >
            Length
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataFormat={I_width}
            dataField='I_WIDTH'
            dataSort
          >
            Width
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataFormat={I_height}
            dataField='I_HEIGHT'
            dataSort
          >
            Height
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default ProductDimensionDataTable
