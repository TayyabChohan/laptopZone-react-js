import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import $ from 'jquery'
import { RViewer, RViewerTrigger } from 'react-viewerjs'
const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-primary'
        size='xs'
        onClick={() => that.AssignBarcodes(cell, row)}
        title='Assign this image to selected barcodes'
        disabled={that.props.toggle_barcodes == ''}
      >
        <span className='glyphicon glyphicon-copy p-b-5' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}

export class ImageView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cell: this.props.cell,
      row: this.props.row,
      imagesUrl: that.props.images
    }
  }
  render () {
    // console.log(this.state);

    let options = {
      toolbar: {
        prev: true,
        next: true
      },

      navbar: {
        default: true
      }
    }
    // console.log(imagesUrl[this.props.cell][0]);
    // console.log(this.props.cell);
    return (
      <React.Fragment>
        <div
          style={{
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <RViewer
            index={this.props.cell}
            options={options}
            imageUrls={this.state.imagesUrl[this.props.row.BARCODE_PRV_NO]}
          >
            <RViewerTrigger>
              <div className='col-md-12'>
                <img
                  className='getCss'
                  src={this.state.imagesUrl[this.props.row.BARCODE_PRV_NO][0]}
                  width='10px'
                  height='10px'
                />
              </div>
            </RViewerTrigger>
          </RViewer>
        </div>
      </React.Fragment>
    )
  }
}
function image (cell, row) {
  return <ImageView cell={cell} row={row} />
}
// const image = (cell, row) => {
//   return (
//     <React.Fragment>
//       <img src={row.IMAGE_PATH} alt='Image' width="100px" height='100px' />
//       {/* <img src={'data:image;base64,' + row.IMAGE_PATH} alt='Image' /> */}
//     </React.Fragment>
//   )
// }
const des = (cell, row) => {
  const data = row.LOT_REMARKS
  return data
}

var that = ''
class AssignBarcodeDataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      button_status: false
    }
    that = this
  }
  AssignBarcodes = (cell, row) => {
    console.log(row)
    console.log(this.props.toggle_barcodes)
    const data = {
      special_lot_barcodes: this.props.toggle_barcodes,
      get_barcode: row.BARCODE_PRV_NO
    }
    this.props.combine_pices_specific_barcode(data)
  }

  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  render () {
    const onRowSelect = (row, isSelected, e) => {
      let select
      if (isSelected) {
        select = true
        this.props.toggle_Function_Barcodes(row)
      } else {
        select = false
        this.props.toggle_Function_Barcodes(row)
      }
    }

    const onSelectAll = (isSelected, rows) => {
      let select
      if (isSelected) {
        select = true
        this.props.toggle_Function_Barcodes_all(this.props.special_lot_data, select)
      } else {
        select = false
        this.props.toggle_Function_Barcodes_all(this.props.special_lot_data, select)
      }
    }

    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      columnWidth: '20px',
      bgColor: 'pink',
      onSelect: onRowSelect,
      onSelectAll: onSelectAll
    }
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
          value: this.props.special_lot_data.length
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
    // let colums = []
    return (
      <React.Fragment>
        <BootstrapTable
          data={this.props.special_lot_data}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          selectRow={selectRowProp}
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='PK_ID'
            isKey
            dataSort
            dataFormat={editButton}
            // hidden
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DEKIT_ITEM'
            dataSort
          >
            DEKIT_ITEM
          </TableHeaderColumn>

          <TableHeaderColumn
            width='15%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='IMAGE_PATH'
            dataFormat={image}
            dataSort
          >
            Images
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='USER_NAME'
            dataSort
          >
            Assign To
          </TableHeaderColumn>
          <TableHeaderColumn
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='ASSIGN_TO'
            dataSort
            hidden
          >
            Assign To
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='BARCODE_PRV_NO'
            dataSort
          >
            Barcode No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='MPN_DESCRIPTION'
            tdStyle={{ whiteSpace: 'normal' }}
            dataFormat={des}
            dataSort
            editable={false}
          >
            Mpn Des
          </TableHeaderColumn>

          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='UPC'
            editable
            dataSort
          >
            UPC
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='MPN'
            editable
            dataSort
          >
            MPN
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='COND_NAME'
            editable={false}
            dataSort
          >
            Cond Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='BRAND'
            editable={false}
            dataSort
          >
            Brand
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='AVG_SELL_PRICE'
            dataSort
          >
            Avg Sell Price
          </TableHeaderColumn>

          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='REMARKS'
            dataSort
          >
            Lot Remarks
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='MAS_BAR'
            dataSort
          >
           Master Barcode
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='MAST_MPN_DESC'
            dataSort
          >
           Mas MPN Desc
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default AssignBarcodeDataTable
