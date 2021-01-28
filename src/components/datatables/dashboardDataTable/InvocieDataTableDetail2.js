import React, { Component } from 'react' // import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import overlayFactory from 'react-bootstrap-table2-overlay'
import '../../../invoiceDatatabe.css'
import $ from 'jquery'

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
  return '$ ' + value.toFixed(2)
}
const total_Charge = (cell, row) => {
  let value = Number(row.TOTAL_CHARGE)
  return '$ ' + value.toFixed(2)
}
const Dis_Charge = (cell, row) => {
  const chnage_charge =
    row.DIS_AMOUNT > 0 ? Number(row.TOTAL_CHARGE - row.DIS_AMOUNT) : 0
  let value = Number(chnage_charge)
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
// const Sum_Dis_Amount = (total, columnData) => {
//   total = total + Number(columnData)
//   return "$ "+total.toFixed(2)
// }

// const Sum_Dis_Amount_Perc = (total, columnData) => {
//   // const col = columnData.CHARGES.replace('%', '')
//   total = total + Number(columnData)
//   return total.toFixed(2)
// }

// const Sum_Dis_Charges = (total, columnData) => {
//   total = total + Number(columnData)
//   return total.toFixed(2)
// }
// const Sum_Total_Charges = (total, columnData) => {
//   total = Number(total) + Number(columnData)
//   return total.toFixed(2)
// }
class InvoiceDataTableDetail2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dis_amount: '',
      dis_perc: '',
      invoice_id: '',
      ser_rate_id: ''
    }
    that = this
  }

  render () {
    const columns = [
      {
        dataField: 'INV_DT_ID',
        text: 'Invoice Id',
        sort: true,
        footer: '',
        hidden: true
      },
      {
        dataField: 'SERVICE_DESC',
        text: 'Service Name',
        sort: true,
        footer: ''
      },
      {
        dataField: 'RATE',
        text: 'Rate',
        formatter: Rate,
        sort: true,
        footer: ''
      },
      {
        dataField: 'QUANTITY',
        text: 'Quantity',
        sort: true,
        footer: ''
      },
      {
        dataField: 'TOTAL_CHARGE',
        text: 'Total Charges',
        formatter: total_Charge,
        sort: true,
        // footerStyle: {
        //   backgroundColor: '#FFA500',
        //   color: '#FDF5E6'
        // },
        footer: columnData => {
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
        hidden: true
      },
      {
        dataField: 'SER_RATE_ID',
        text: 'Ser Rate Id',
        hidden: true
      }
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
      clickToExpand: true,
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
      hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
      onPageChange: (page, sizePerPage) => {}, // callback function when page was changing
      onSizePerPageChange: (sizePerPage, page) => {} // callback function when page size was changing
      // paginationTotalRenderer: (from, to, size) => { ... }
    }
    const expandRow = {
      // showExpandColumn: true,
      onlyOneExpanding: true,
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
            {/* <BootstrapTable
              keyField='EBAY_ITEM_ID'
              data={this.props.specific_invoice_detail || []}
              columns={columnss}
            /> */}
          </React.Fragment>
        </div>
      )
    }

    const { SearchBar, ClearSearchButton } = Search
    return (
      <React.Fragment>
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
                selectRow={selectRow}
                overlay={overlayFactory({
                  spinner: true,
                  background: 'rgba(192,192,192,0.3)'
                })}
              />
              {/* <div className='row'>
                <div
                  className='col-md-3 offset-md-3'
                  // style={{ marginTop: '30px', marginLeft: '30px' }}
                >
                  <SearchBar
                    {...props.searchProps}
                    // style={{ marginLeft: '60px' }}
                  />
                  <ClearSearchButton {...props.searchProps} />
                </div>
              </div> */}
            </React.Fragment>
          )}
        </ToolkitProvider>
        <section className='context'>
          <div className='row'>
            <div className='col-sm-12'>
              <div class='col-xs-6' style={{ float: 'right' }}>
                <h4 class='card-title'> Invoice Summary </h4>
                <table class='table'>
                  {/* <caption>Invoice Summary</caption> */}
                  <tbody>
                    <tr>
                      <th scope='row'>Total Charge</th>
                      <td>
                        <p
                          class='card-text'
                          id='sub_total'
                          style={{ fontSize: '20px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>Total Discount</th>
                      <td>
                        <p
                          class='card-text'
                          id='total_dis'
                          style={{ fontSize: '20px' }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>Total</th>
                      <td>
                        <p
                          class='card-text'
                          id='total'
                          style={{ fontSize: '20px' }}
                        >
                          {'$' +
                            Number(
                              this.props.invoice_summary.TOTAL
                              // this.props.invoice_summary.DISCOUNT == 0
                              //   ? this.props.invoice_summary.TOTAL
                              //   : this.props.invoice_summary.DISCOUNT
                            ).toFixed(2)}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}
export default InvoiceDataTableDetail2
