import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'

const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-secondary'
        size='sm'
        onClick={() => that.onClickEdit(cell, row)}
      >
        <span className='glyphicon glyphicon-saved' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}
const dataFormet = (cell, row) => {
  let value = Number(row.TOTAL_CHARGE)
  value = value.toFixed(2)
  return value
}
const rateFormet = (cell, row) => {
  let value = Number(row.RATE)
  value = value.toFixed(4)
  return value
}
class BSTable extends Component {
  render () {
    return (
      <BootstrapTable data={this.props.data || []}>
        <TableHeaderColumn isKey dataField='BARCODE_NO'>
          Barcode No
        </TableHeaderColumn>
        <TableHeaderColumn dataField='CHARGES'>Charges</TableHeaderColumn>
        <TableHeaderColumn dataField='MPN_DESCRIPTION'>
          Mpm Description
        </TableHeaderColumn>
        <TableHeaderColumn dataField='CARD_UPC'>Card Upc</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}
const Dis_Amount = (cell, row) => {
  let value = Number(row.DIS_AMOUNT)
  let val = 0
  // return row.DIS_AMOUNT > row.TOTAL_CHARGE ? val.toFixed(2) : value.toFixed(2)
  return value.toFixed(2)
}

const Dis_Amount_perc = (cell, row) => {
  let value = Number(row.DIS_AMOUNT_PERC)
  return value.toFixed(2) + '%'
}

const Dis_Charge = (cell, row) => {
  // const chnage_charge = row.DISCOUNT_CHARGE ? row.DISCOUNT_CHARGE : 0
  const chnage_charge =
    row.DIS_AMOUNT > 0 ? Number(row.TOTAL_CHARGE - row.DIS_AMOUNT) : 0
  let value = Number(chnage_charge)
  return  value.toFixed(2)
}
const onAfterSaveCell = (row, cellName, cellValue) => {
  const data = {
    // amount: row.DIS_AMOUNT >= row.TOTAL_CHARGE ? 0 : row.DIS_AMOUNT,
    amount: row.DIS_AMOUNT,
    cell: row.INV_DT_ID
  }
  if (cellName == 'DIS_AMOUNT') {
    that.props.change_Dis_Amount(data)
  } else {
    const data = {
      percantage: row.DIS_AMOUNT_PERC,
      cell: row.INV_DT_ID
    }
    that.props.change_Dis_Amount_Perc(data)
  }
  const data1 = {
    amount: row.DIS_AMOUNT,
    cell: row.INV_DT_ID
  }
  // that.props.Change_Charge(data1)
}

const onBeforeSaveCell = (row, cellName, cellValue) => {
  // You can do any validation on here for editing value,
  // return false for reject the editing

  return cellValue > -1 || cellValue === ''
}

const cellEditProp = {
  mode: 'click',
  // blurToSave: true
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell // a hook for after saving cell
}

var that = ''

class InvoiceDataTableDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dis_amount: '',
      dis_perc: '',
      invoice_id: ''
    }
    that = this
  }

  onClickEdit = (cell, row) => {
    // console.log(cell)
    // console.log(row)
    const data = {
      INV_DT_ID: cell,
      discount_amount: row.DIS_AMOUNT,
      discount_per: row.DIS_AMOUNT_PERC,
      invoice_id: row.INVOICE_ID
    }
    // console.log(data)
    this.props.save_Discount_Amount(data)
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  onClickSaveAllAmount = data => {
    const array = {
      data: data
    }
    this.props.SaveAllDisAmountChanges(array)
  }

  // componentDidUpdate (prevProps, prevState) {
  //   if (
  //     prevState.dis_amount != this.state.dis_amount &&
  //     this.state.dis_amount != ''
  //   ) {
  //     this.props.changeAllDisAmount(this.state.dis_amount)
  //   }
  //   if (
  //     prevState.dis_perc != this.state.dis_perc &&
  //     this.state.dis_perc != ''
  //   ) {
  //     this.props.changeAllDisPerc(this.state.dis_perc)
  //   }
  // }

  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  isExpandableRow = row => {
    if (row.SER_RATE_ID > 0) {
      return true
    } else {
      return false
    }
  }
  handleExpand (rowKey, isExpand) {
    if (isExpand) {
      console.log(`row: ${rowKey} is ready to expand`)
    } else {
      console.log(`row: ${rowKey} is ready to collapse`)
    }
  }
  expandComponent = row => {
    console.log(row.SER_RATE_ID)
    if (row.SER_RATE_ID) {
      const data = {
        invoice_id: row.INV_DT_ID,
        ser_rate_id: row.SER_RATE_ID
      }
      this.props.get_specific_invoice_detail(data)
      return <BSTable data={this.props.specific_invoice_detail || []} />
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevState.invoice_id == '') {
      this.setState({
        invoice_id: this.props.invoice_id
      })
    }
  }
  render () {
    const footerData = [
      [
        {
          label: 'Total',
          columnIndex: 1,
          align: 'center'
        },
        {
          label: 'Total value',
          columnIndex: 4,
          align: 'center',
          formatter: tableData => {
            let sum = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum = sum + Number(tableData[i].TOTAL_CHARGE)
            }
            return <strong>{sum.toFixed(2)}</strong>
          }
        },
        {
          label: 'Total value',
          columnIndex: 5,
          align: 'center',
          formatter: tableData => {
            // let label = 0
            let sum = 0
            let total = 0
            let dif = 0
            let dis_charge = 0
            let total_charge = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              // dis_charge =
              //   tableData[i].DIS_AMOUNT > 0
              //     ? dis_charge + Number(tableData[i].DISCOUNT_CHARGE)
              //     : // Number(tableData[i].TOTAL_CHARGE - tableData[i].DIS_AMOUNT)
              //     0
              dis_charge =
                tableData[i].DIS_AMOUNT > 0
                  ? Number(tableData[i].TOTAL_CHARGE - tableData[i].DIS_AMOUNT)
                  : 0
              total = Number(total) + Number(dis_charge)
              // dis_charge =
              //   tableData[i].DIS_AMOUNT > 0
              //     ? Number(tableData[i].TOTAL_CHARGE) -
              //       Number(tableData[i].TOTAL_CHARGE - tableData[i].DIS_AMOUNT)
              //     : 0
              // // dif = Number(tableData[i].TOTAL_CHARGE) - dis_charge

              // sum = sum + dis_charge
              // console.log(total)
              // total_charge =
              //   sum > 0 ? total_charge + Number(tableData[i].TOTAL_CHARGE) : 0
              //   console.log(total_charge)
            }
            // dif = total_charge - sum
            // console.log(Number(total))
            return <strong>{total.toFixed(2)}</strong>
          }
        },
        {
          label: 'Save',
          columnIndex: 6,
          align: 'center',
          formatter: tableData => {
            let sum = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum = sum + Number(tableData[i].DIS_AMOUNT)
            }
            this.state.dis_amount = sum.toFixed(2)
            return (
              <React.Fragment>
                <input
                  className='form-control input-sm'
                  min='0'
                  type='number'
                  name='dis_amount'
                  value={this.state.dis_amount}
                  onChange={this.handleOnChange}
                  readOnly
                />
              </React.Fragment>
            )
          }
        },
        {
          label: 'Save',
          columnIndex: 7,
          align: 'center',
          formatter: tableData => {
            let sum = 0
            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              sum = sum + Number(tableData[i].DIS_AMOUNT_PERC)
            }
            this.state.dis_perc = sum.toFixed(2)
            return (
              <React.Fragment>
                <input
                  className='form-control input-sm'
                  type='number'
                  min='0'
                  name='dis_perc'
                  size='xs'
                  value={this.state.dis_perc}
                  onChange={this.handleOnChange}
                  readOnly
                />
              </React.Fragment>
            )
          }
        },
        {
          label: 'Save',
          columnIndex: 10,
          align: 'center',
          formatter: tableData => {
            // let label = 0
            let data = []

            for (
              let i = 0, tableDataLen = tableData.length;
              i < tableDataLen;
              i++
            ) {
              data.push({
                INV_DT_ID: tableData[i].INV_DT_ID,
                total_charge: tableData[i].TOTAL_CHARGE,
                dis_amount: tableData[i].DIS_AMOUNT,
                dis_amount_perc: tableData[i].DIS_AMOUNT_PERC,
                invoice_id: tableData[i].INVOICE_ID
              })
            }

            return (
              <React.Fragment>
                <Button
                  className='btn btn-secondary'
                  size='sm'
                  onClick={() => this.onClickSaveAllAmount(data)}
                >
                  Save All
                </Button>
              </React.Fragment>
            )
          }
        }
      ]
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
    const selectRow = {
      mode: 'checkbox',
      // clickToSelect: true, // click to select, default is false
      clickToExpand: true // click to expand row, default is false
    }
    return (
      <React.Fragment>
        <BootstrapTable
          data={this.props.data1}
          striped
          condensed
          pagination
          search
          footerData={footerData}
          footer
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Invoice Detail'
          cellEdit={cellEditProp}
          // exportCSV
          // selectRow={selectRow}
          // expandableRow={this.isExpandableRow}
          // expandComponent={this.expandComponent}
          // expandColumnOptions={{
          //   expandColumnVisible: true,
          //   columnWidth: '2%',
          //   onExpand: this.handleExpand
          // }}
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            isKey
            dataField='INV_DT_ID'
            editable={false}
            hidden
            dataSort
          >
            Invoice Id
          </TableHeaderColumn>

          {/* <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='MT_ID'
            isKey
            dataSort
          >
            Product ID
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='SERVICE_DESC'
            editable={false}
            expandable={false}
            dataSort
          >
            Service Descritpion
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='RATE'
            dataFormat={rateFormet}
            editable={false}
            expandable={false}
            dataSort
          >
            Rate
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='QUANTITY'
            editable={false}
            expandable={false}
            dataSort
          >
            Quantity
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='TOTAL_CHARGE'
            editable={false}
            expandable={false}
            dataFormat={dataFormet}
            dataSort
          >
            Total Charges
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='DISCOUNT_CHARGE'
            dataFormat={Dis_Charge}
            expandable={false}
            editable={false}
            dataSort
          >
            Discounted Charge
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='DIS_AMOUNT'
            expandable={false}
            dataFormat={Dis_Amount}
            dataSort
          >
            Discount Amount
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='DIS_AMOUNT_PERC'
            dataFormat={Dis_Amount_perc}
            expandable={false}
            dataSort
          >
            Discount %
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DICOUNT_CHARGE'
            expandable={false}
            hidden
            dataSort
          >
            Discounted Charge
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='DISCOUNT_AMOUNT'
            expandable={false}
            hidden
            dataSort
          >
            Discount Amount
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            expandable={false}
          >
            Action   
          </TableHeaderColumn>
          {/* <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='INV_DT_ID'
            dataFormat={editButton}
            dataSort
          >
            Action
          </TableHeaderColumn> */}
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='INVOICE_ID'
            editable={false}
            hidden
            dataSort
          >
            Invoice Id
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default InvoiceDataTableDetail
