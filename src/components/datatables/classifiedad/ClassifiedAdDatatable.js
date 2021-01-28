import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import $ from 'jquery'
import { RViewer, RViewerTrigger } from 'react-viewerjs'
import ClassifiedModel from '../../classified_ad/ClassifiedModel.js'
const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-primary'
        size='xs'
        data-toggle='modal'
        data-target='#myModalSearch'
        data-dismiss='modal'
        onClick={() => that.AssignBarcodes(cell, row)}
        title='Assign this image to selected barcodes'
      >
        <span className='glyphicon glyphicon-edit p-b-5' aria-hidden='true' />
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
            imageUrls={this.state.imagesUrl[this.props.row.BARCODE_NO]}
          >
            <RViewerTrigger>
              <div className='col-md-12'>
                <img
                  className='getCss'
                  src={this.state.imagesUrl[this.props.row.BARCODE_NO][0]}
                  width='50px'
                  height='50px'
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

// const des = (cell, row) => {
//   const data = row.LOT_REMARKS
//   return data
// }

var that = ''
class ClassifiedAdDatatable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      button_status: false,
      row: '',
      image: this.props.images
    }
    that = this
  }
  AssignBarcodes = (cell, row) => {
    console.log(row)
    this.setState({
      ...this.state,
      row: row
    })
    const data = {
      special_lot_barcodes: this.props.toggle_barcodes,
      get_barcode: row.BARCODE_PRV_NO
    }
    this.props.get_pices_specific_ad_id(row.BARCODE_NO)
  }

  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  render () {
    console.log(this.state.row)
    const onRowSelect = (row, isSelected, e) => {
      if (isSelected) {
        // this.props.toggle_Function_Barcodes(row)
      } else {
        // this.props.toggle_Function_Barcodes(row)
      }
    }

    const onSelectAll = (isSelected, rows) => {
      if (isSelected) {
        // this.props.toggle_Function_Barcodes_all(this.props.special_lot_data)
      } else {
        // this.props.toggle_Function_Barcodes_all(this.props.special_lot_data)
      }
    }

    const selectRowProp = {
      mode: 'checkbox',
      // clickToSelect: true,
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
          value: this.props.search_classified_data.length
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
    return (
      <React.Fragment>
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
                      //   onClick={this.RemoveSearchBarcodes}
                    >
                      &times;
                    </button>
                    <h4 className='modal-title'>Classified Ad Update</h4>
                  </div>
                  <ClassifiedModel {...this.props} row={this.state.row} />
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-default'
                      data-dismiss='modal'
                      //   onClick={this.RemoveSearchBarcodes}
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
          data={this.props.search_classified_data}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          //   selectRow={selectRowProp}
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='AD_ID'
            isKey
            dataSort
            dataFormat={editButton}
            // hidden
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='IDENT_BY'
            dataSort
          >
            Ident
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
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
            width='8%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='PIC_BY'
            dataSort
          >
            Pic By
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='IDENT_BY'
            dataSort
            hidden
          >
            Ident By
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='BARCODE_NO'
            dataSort
          >
            Barcode No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='12%'
            headerAlign='center'
            dataAlign='center'
            dataField='ITEM_DESC'
            tdStyle={{ whiteSpace: 'normal' }}
            dataSort
            editable={false}
          >
            Mpn Des
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='UPC'
            editable
            dataSort
          >
            UPC
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='MPN'
            editable
            dataSort
          >
            MPN
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='CONDITION_NAME'
            editable={false}
            dataSort
          >
            Condition Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='9%'
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
            dataField='ITEM_COST'
            dataSort
          >
            Item Cost
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='CONDITION_REMARKS'
            dataSort
          >
            Lot Remarks
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default ClassifiedAdDatatable
