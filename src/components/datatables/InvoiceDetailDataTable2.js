import React, { Component } from 'react' // import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
// import paginationFactory from 'react-bootstrap-table2-paginator'
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator'
import overlayFactory from 'react-bootstrap-table2-overlay'
import cellEditFactory from 'react-bootstrap-table2-editor'
import $ from 'jquery'
import '../../invoiceDatatabe.css'
var that

const dis_amouunt = (cell, row) => {
  let value = Number(row.DIS_AMOUNT)
  let val = 0
  // return row.DIS_AMOUNT > row.TOTAL_CHARGE ? val.toFixed(2) : value.toFixed(2)
  return '$ ' + value.toFixed(2)
}
const Charges = (cell, row) => {
  let value
  row.SER_RATE_ID == 6
    ? (value = Number(row.CHARGES).toFixed(4))
    : (value = Number(row.CHARGES).toFixed(2))
  return '$ ' + value
}
const Dis_Amount_perc = (cell, row) => {
  let value = Number(row.DIS_AMOUNT_PERC)
  return value.toFixed(2) + '%'
}
const total_Charge = (cell, row) => {
  let value = Number(row.TOTAL_CHARGE)
  return '$ ' + value.toFixed(2)
}
const Dis_Charge = (cell, row) => {
  //   const chnage_charge =
  //     row.DIS_AMOUNT > 0 ? Number(row.TOTAL_CHARGE - row.DIS_AMOUNT) : 0
  //   let value = Number(chnage_charge)
  let value = Number(row.DISCOUNT_AMOUNT)
  return '$ ' + value.toFixed(2)
}
const Rate = (cell, row) => {
  let value = Number(row.RATE)
  return '$ ' + value.toFixed(4)
}
const Ebay_Price = (cell, row) => {
  let value = Number(row.EBAY_PRICE)
  return '$ ' + value.toFixed(2)
}
const ChargesPacking = (cell, row) => {
  let value = Number(row.CHARGES)
  return '$ ' + value.toFixed(2)
}
const PackingCost = (cell, row) => {
  let value = Number(row.PACKING_COST)
  return '$ ' + value.toFixed(2)
}
const SalePrice = (cell, row) => {
  let value = Number(row.SALE_PRICE)
  return '$ ' + value.toFixed(2)
}
const ShippingRate = (cell, row) => {
  let value = Number(row.SHIPING_RATE)
  return '$ ' + value.toFixed(2)
}
const EbayFee = (cell, row) => {
  let value = Number(row.EBAY_FEE)
  return '$ ' + value.toFixed(2)
}
const MarketPlace = (cell, row) => {
  let value = Number(row.MARKETPLACE)
  return '$ ' + value.toFixed(4)
}
const priceFormatter = (column, colIndex) => {
  return <button className='btn btn-primary'>Save</button>
}

class InvoiceDetailDataTable2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dis_amount: '',
      dis_perc: '',
      invoice_id: '',
      ser_rate_id: '',
      total_dis_charge: '',
      total_char: ''
    }
    that = this
  }
  hanldeSaveAllRecord = () => {
    let data = []
    for (
      let i = 0, tableDataLen = this.node.table.props.data.length;
      i < tableDataLen;
      i++
    ) {
      data.push({
        INV_DT_ID: this.node.table.props.data[i].INV_DT_ID,
        total_charge: this.node.table.props.data[i].TOTAL_CHARGE,
        dis_amount: this.node.table.props.data[i].DIS_AMOUNT,
        dis_amount_perc: this.node.table.props.data[i].DIS_AMOUNT_PERC,
        invoice_id: this.node.table.props.data[i].INVOICE_ID
      })
    }
    const array = {
      data: data,
      user_id: localStorage.getItem('userId')
    }
    this.props.SaveAllDisAmountChanges(array)
  }
  sumTotal = () => {
    let total
    for (
      let i = 0, tableDataLen = this.node.table.props.data.length;
      i < tableDataLen;
      i++
    ) {
      total = +this.node.table.props.data[i].TOTAL_CHARGE
    }
    console.log(total)
  }
  //   discountCharge = () => {
  //     let total = 0
  //     let dis_charge = 0
  //     for (
  //       let i = 0, tableDataLen = this.node.table.props.data.length;
  //       i < tableDataLen;
  //       i++
  //     ) {
  //       dis_charge =
  //         this.node.table.props.data[i].DIS_AMOUNT > 0
  //           ? Number(
  //             this.node.table.props.data[i].TOTAL_CHARGE -
  //                 this.node.table.props.data[i].DIS_AMOUNT
  //           )
  //           : 0
  //       total = Number(total) + Number(dis_charge)
  //     }

  //     return <strong>{total.toFixed(2)}</strong>
  //   }

  render () {
    // console.log(this.props)
    const columns = [
      {
        dataField: 'INV_DT_ID',
        text: 'Invoice Id',
        sort: true,
        footer: '',
        editable: false,
        hidden: true
      },
      {
        dataField: 'SERVICE_DESC',
        text: 'Service Name',
        sort: true,
        footer: '',
        editable: false
      },
      {
        dataField: 'RATE',
        text: 'Rate',
        formatter: Rate,
        sort: true,
        editable: false,
        footer: ''
      },
      {
        dataField: 'QUANTITY',
        text: 'Quantity',
        sort: true,
        editable: false,
        footer: ''
      },
      {
        dataField: 'FROM_DATE',
        text: 'From Date',
        footer: '',
        editable: false
        // hidden: true
      },
      {
        dataField: 'TO_DATE',
        text: 'To Date',
        footer: '',
        editable: false
        // hidden: true
      },
      {
        dataField: 'DURATION',
        text: 'Duration',
        sort: true,
        editable: false,
        footer: ''
      },
      {
        dataField: 'TOTAL_CHARGE',
        text: 'Total Charges',
        editable: false,
        formatter: total_Charge,
        sort: true,
        // footerFormatter: this.sumTotal,
        // footerStyle: {
        //   backgroundColor: '#FFA500',
        //   color: '#FDF5E6'
        // },
        footer: columnData => {
          // // this.state.total_char = columnData
          //   .reduce((acc, item) => acc + Number(item), 0)
          //   .toFixed(2)
          $('#sub_total').text(
            '$ ' +
              columnData.reduce((acc, item) => acc + Number(item), 0).toFixed(2)
          )
          return (
            '$ ' +
            columnData.reduce((acc, item) => acc + Number(item), 0).toFixed(2)
          )
        }
      },
      // {
      //   dataField: 'DISCOUNT_AMOUNT',
      //   text: 'Discount Charges',
      //   editable: false,
      //   formatter: Dis_Charge,
      //   sort: true,
      //   footer: columnData => {
      //     return columnData
      //       .reduce((acc, item) => acc + Number(item), 0)
      //       .toFixed(2)
      //   }
      // },
      {
        dataField: 'DIS_AMOUNT',
        text: 'Discount Amount',
        formatter: dis_amouunt,
        sort: true,
        footer: columnData => {
          $('#total_dis').text(
            '$ ' +
              columnData.reduce((acc, item) => acc + Number(item), 0).toFixed(2)
          )
          return (
            '$ ' +
            columnData.reduce((acc, item) => acc + Number(item), 0).toFixed(2)
          )
        }
      },
      {
        dataField: 'DIS_AMOUNT_PERC',
        text: 'Discount Amount%',
        formatter: Dis_Amount_perc,
        sort: true,
        footer: columnData => {
          return (
            '$ ' +
            columnData.reduce((acc, item) => acc + Number(item), 0).toFixed(2)
          )
        }
      },
      {
        dataField: 'INVOICE_ID',
        text: 'Invoice Id',
        footer: '',
        editable: false,
        hidden: true
      },
      {
        dataField: 'SER_RATE_ID',
        text: 'Ser Rate Id',
        footer: '',
        editable: false,
        hidden: true
      }

      // {
      //   text: 'Action',
      //   footer: 'Footer',
      //   editable: false,
      //   footerFormatter: priceFormatter,
      //   footerEvents: {
      //     onClick: this.hanldeSaveAllRecord
      //   }
      // }
    ]

    const columnss = [
      {
        dataField: 'EBAY_ITEM_ID',
        text: 'Ebay Id',
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '110px', textAlign: 'center' }
        }
        // footer: 'Footer 7',
        // hidden: true
      },
      {
        dataField: 'BARCODE_NO',
        text: 'Barcode No',
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '110px', textAlign: 'center' }
        }
        // footer: 'Footer 7'
      },
      {
        dataField: 'ITEM_TITLE',
        text: 'Item Title',
        sort: true,
        align: (cell, row, rowIndex, colIndex) => {
          return 'justify'
        },
        headerStyle: (colum, colIndex) => {
          return { width: '500px', textAlign: 'center' }
        }
      },
      {
        dataField: 'COND_NAME',
        text: 'Cond Name',
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '110px', textAlign: 'center' }
        }
      },
      {
        dataField: 'EBAY_PRICE',
        text: 'Ebay Price',
        formatter: Ebay_Price,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '110px', textAlign: 'center' }
        }
      },
      {
        dataField: 'CHARGES',
        text: 'Charges',
        formatter: Charges,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '110px', textAlign: 'center' }
        }
      },
      {
        dataField: 'SER_RATE_ID',
        text: 'Ser Rate Id',
        sort: true,
        hidden: true
      }
    ]
    const serColumns = [
      {
        dataField: 'EBAY_ID',
        text: 'Ebay Id',
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '110px', textAlign: 'center' }
        }
      },
      {
        dataField: 'SALE_RECORD_NUMBER',
        text: 'Sale Record Number',
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '80px', textAlign: 'center' }
        }
      },
      {
        dataField: 'ITEM_TITLE',
        text: 'Item Title',
        sort: true,
        align: (cell, row, rowIndex, colIndex) => {
          return 'justify'
        },
        headerStyle: (colum, colIndex) => {
          return { width: '320px', textAlign: 'center' }
        }
      },
      {
        dataField: 'SALE_PRICE',
        text: 'Sale Price',
        formatter: SalePrice,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '80px', textAlign: 'center' }
        }
      },
      {
        dataField: 'QTY',
        text: 'Qty',
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '60px', textAlign: 'center' }
        }
      },
      {
        dataField: 'SHIPING_RATE',
        text: 'Shiping Rate',
        formatter: ShippingRate,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '100px', textAlign: 'center' }
        }
      },
      {
        dataField: 'PACKING_COST',
        text: 'Packing Cost',
        formatter: PackingCost,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '100px', textAlign: 'center' }
        }
      },
      {
        dataField: 'EBAY_FEE',
        text: 'Ebay Fee',
        formatter: EbayFee,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '100px', textAlign: 'center' }
        }
      },
      {
        dataField: 'MARKETPLACE',
        text: 'Marketplace',
        formatter: MarketPlace,
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: '100px', textAlign: 'center' }
        }
      },
      {
        dataField: 'CHARGES',
        text: 'Charges',
        sort: true,
        formatter: ChargesPacking,
        headerStyle: (colum, colIndex) => {
          return { width: '100px', textAlign: 'center' }
        }
      }
    ]
    const rowClasses = (row, rowIndex) => {
      if (rowIndex == 0) {
        return 'custom-row-class'
      }
    }
    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      //   clickToExpand: true,
      clickToEdit: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        // this.props.get_specific_invoice_detail(row.INVOICE_ID, row.SER_RATE_ID)
        row.SER_RATE_ID == 5
          ? this.props.get_specific_invoice_detail(
            row.INVOICE_ID,
            row.SER_RATE_ID
          )
          : this.props.get_specific_invoice_detail(
            row.INVOICE_ID,
            row.SER_RATE_ID
          )
      },
      onSelectAll: (isSelect, rows, e) => {}
    }

    const customTotal = (from, to, size) => (
      <span className='react-bootstrap-table-pagination-total'>
        Showing {from} to {to} of {size} Results
      </span>
    )
    const paginationOptions = {
      custom: true,
      totalSize: this.props.specific_invoice_detail || [].length,
      // page, // Specify the current page. It's necessary when remote is enabled
      sizePerPage: 25, // Specify the size per page. It's necessary when remote is enabled
      // totalSize, // Total data size. It's necessary when remote is enabled
      pageStartIndex: 0, // first page will be 0, default is 1
      paginationSize: 3, // the pagination bar size, default is 5
      showTotal: true, // display pagination information
      sizePerPageList: [
        {
          text: '5',
          value: 25
        },
        {
          text: '10',
          value: 50
        },
        {
          text: 'All',
          value: this.props.specific_invoice_detail || [].length
        }
      ], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
      withFirstAndLast: false, // hide the going to first and last page button
      alwaysShowAllBtns: true, // always show the next and previous page button
      firstPageText: 'First', // the text of first page button
      prePageText: 'Prev', // the text of previous page button
      nextPageText: 'Next', // the text of next page button
      lastPageText: 'Last', // the text of last page button
      nextPageTitle: 'Go to next', // the title of next page button
      prePageTitle: 'Go to previous', // the title of previous page button
      firstPageTitle: 'Go to first', // the title of first page button
      lastPageTitle: 'Go to last', // the title of last page button
      hideSizePerPage: true, // hide the size per page dropdown
      paginationPosition: 'top',
      hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
      onPageChange: (page, sizePerPage) => {}, // callback function when page was changing
      onSizePerPageChange: (sizePerPage, page) => {} // callback function when page size was changing
      // paginationTotalRenderer: (from, to, size) => { ... }
    }

    const expandRow = {
      //   showExpandColumn: true,
      onlyOneExpanding: true,
      //   expandByColumnOnly: true,
      renderer: row => (
        <div>
          <React.Fragment>
            {row.SER_RATE_ID == 5 ? (
              <BootstrapTable
                keyField='SALE_RECORD_NUMBER'
                data={this.props.specific_invoice_detail || []}
                columns={serColumns}
                rowClasses={rowClasses}
                overlay={overlayFactory({
                  spinner: true,
                  background: 'rgba(192,192,192,0.3)'
                })}
              />
            ) : (
              <BootstrapTable
                keyField='BARCODE_NO'
                data={this.props.specific_invoice_detail || []}
                columns={columnss}
                rowClasses={rowClasses}
                overlay={overlayFactory({
                  spinner: true,
                  background: 'rgba(192,192,192,0.3)'
                })}
              />
            )}
          </React.Fragment>
        </div>
      ),
      showExpandColumn: true,
      expandByColumnOnly: true,
      onExpand: (row, isExpand, rowIndex, e) => {
        row.SER_RATE_ID == 5
          ? this.props.get_specific_invoice_detail(
            row.INVOICE_ID,
            row.SER_RATE_ID
          )
          : this.props.get_specific_invoice_detail(
            row.INVOICE_ID,
            row.SER_RATE_ID
          )
        // console.log(row.id)
      },
      onExpandAll: (isExpandAll, rows, e) => {}
    }

    const { SearchBar, ClearSearchButton } = Search
    return (
      <React.Fragment>
        {/* <PaginationProvider pagination={paginationFactory(paginationOptions)}>
          {({ paginationProps, paginationTableProps }) => (
            <React.Fragment>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='col-sm-4'>
                    <PaginationTotalStandalone {...paginationProps} />
                  </div>
                  <div className='col-sm-2'>
                    <SizePerPageDropdownStandalone {...paginationProps} />
                  </div>
                  <div className='col-sm-6' style={{ float: 'left' }}>
                    <PaginationListStandalone {...paginationProps} />
                  </div>
                </div>
              </div>
              <BootstrapTable
                keyField='id'
                data={this.props.data1 || []}
                columns={columns}
                {...paginationTableProps}
                expandRow={expandRow}
                ref={n => (this.node = n)}
                cellEdit={cellEditFactory({
                  mode: 'click',
                  beforeSaveCell: (oldValue, newValue, row, column, done) => {
                    return newValue > -1 || newValue === ''
                  },
                  afterSaveCell: (oldValue, newValue, row, column, done) => {
                    const data = {
                      amount: row.DIS_AMOUNT,
                      cell: row.INV_DT_ID
                    }
                    if (column.dataField == 'DIS_AMOUNT') {
                      that.props.change_Dis_Amount(data)
                    } else {
                      const data = {
                        percantage: row.DIS_AMOUNT_PERC,
                        cell: row.INV_DT_ID
                      }
                      that.props.change_Dis_Amount_Perc(data)
                    }
                  }
                })}
                overlay={overlayFactory({
                  spinner: true,
                  background: 'rgba(192,192,192,0.3)'
                })}
              />
            </React.Fragment>
          )}
        </PaginationProvider>
        <section className='context'>
          <div className='row'>
            <div className='col-sm-12'>
              <div class='col-xs-6' style={{ float: 'right' }}>
                <h4 class='card-title'> Invoice Summary </h4>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='col-sm-6'>
                      <p class='card-text'>
                        <b> Sub Total Charge :</b>ssadsa{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='col-sm-6'>
                      <p class='card-text'>
                        <b> Sub Total Discount :</b>ssadsa{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='col-sm-6'>
                      <p class='card-text'>
                        <b> Total Amount :</b>ssadsa{' '}
                      </p>
                    </div>
                  </div>
                </div>
                {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </section> */}
        <ToolkitProvider
          keyField='INV_DT_ID'
          data={this.props.data1 || []}
          columns={columns}
          search
        >
          {props => (
            <React.Fragment>
              <BootstrapTable
                {...props.baseProps}
                // pagination={paginationFactory(paginationOptions)}
                expandRow={expandRow}
                ref={n => (this.node = n)}
                cellEdit={cellEditFactory({
                  mode: 'click',
                  beforeSaveCell: (oldValue, newValue, row, column, done) => {
                    return newValue > -1 || newValue === ''
                  },
                  afterSaveCell: (oldValue, newValue, row, column, done) => {
                    const data = {
                      amount: row.DIS_AMOUNT,
                      cell: row.INV_DT_ID
                    }
                    setTimeout(() => {
                      let total = $('#sub_total').text()
                      total = total.split('$ ')
                      let dis = $('#total_dis').text()
                      dis = dis.split('$ ')
                      // console.log(total[1], dis[1])
                      $('#total').text(
                        '$ ' + (Number(total[1]) - Number(dis[1])).toFixed(2)
                      )
                    }, 10)

                    if (column.dataField == 'DIS_AMOUNT') {
                      that.props.change_Dis_Amount(data)
                    } else {
                      const data = {
                        percantage: row.DIS_AMOUNT_PERC,
                        cell: row.INV_DT_ID
                      }
                      that.props.change_Dis_Amount_Perc(data)
                    }
                  }
                })}
                overlay={overlayFactory({
                  spinner: true,
                  background: 'rgba(192,192,192,0.3)'
                })}
              />
            </React.Fragment>
          )}
        </ToolkitProvider>
        <section className='context'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='col-xs-6' style={{ float: 'right' }}>
                <h4 className='card-title'> Invoice Summary </h4>
                <table className='table'>
                  {/* <caption>Invoice Summary</caption> */}
                  <tbody>
                    <tr>
                      <th scope='row'>Total Charge</th>
                      <td>
                        <b>
                          {
                            <p
                              className='card-text'
                              id='sub_total'
                              style={{ fontSize: '20px' }}
                            />
                          }
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>Total Discount</th>
                      <td>
                        <b>
                          {
                            <p
                              className='card-text'
                              id='total_dis'
                              style={{ fontSize: '20px' }}
                            />
                          }
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>Total</th>
                      <td>
                        <b>
                          <p
                            className='card-text'
                            id='total'
                            style={{ fontSize: '20px' }}
                          >
                            {'$ ' +
                              Number(
                                this.props.invoice_summary.TOTAL
                                // this.props.invoice_summary.DISCOUNT == 0
                                //   ? this.props.invoice_summary.TOTAL
                                //   : this.props.invoice_summary.DISCOUNT
                              ).toFixed(2)}
                          </p>
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3' style={{ float: 'right' }}>
              <h4>
                <span className='label label-default' />
              </h4>
              <div className='form-group' style={{ marginTop: '35px' }}>
                <button
                  type='button'
                  className='btn btn-primary btn-block btn-flat'
                  onClick={this.hanldeSaveAllRecord}
                  style={{ float: 'right' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}
export default InvoiceDetailDataTable2
