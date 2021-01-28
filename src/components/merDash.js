import React from 'react'
// import ReactDOM from 'react-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import NumberFormat from 'react-number-format'
import 'gasparesganga-jquery-loading-overlay'

import $ from 'jquery'
import './App.css'
import InvoiceDetailDashboard from './dashboard/InvoiceDetailDashboard.js'
class MerchDash extends React.Component {
  constructor (props) {
    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname

    super(props)
    this.state = {
      baseUrl: finalurl,
      error: null,
      isLoaded: false,
      merchData: [],
      redirectToReferrer: false,
      messg: 'Loading .....'
    }
  }

  componentDidMount () {
    $.ajax({
      url:
        this.state.baseUrl +
        '/laptopzone/reactcontroller/c_react/merchant_dashboard',
      dataType: 'json',
      type: 'POST',
      data: { merchId: sessionStorage.getItem('merId') },
      success: function (data) {
        if (data.exist == true) {
          this.setState({
            isLoaded: true,
            merchData: data.merhc_dash
          })
        } else {
          // 	this.setState({
          // 	isLoaded: false
          // });
          // 		alert('Seed Not Created');
          //     return false;
        }
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        console.log(xhr, resp, text)
      }
    })
  }

  componentWillMount () {
    if (sessionStorage.getItem('userName')) {
      console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }

  render () {
    const { error, isLoaded } = this.state
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>
            My Dashboard <b>{sessionStorage.getItem('merName')}</b>
          </h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Dashboard</a>
            </li>
            <li className='active'>My Dashboard</li>
          </ol>
        </section>

        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header'>
                  <h3 className='box-title'>Search Criteria</h3>
                </div>

                <div className='box-body' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-3'>
              <div className='box box-info '>
                <div className='box-header with-border'>
                  <h3 className='box-title'>List Queue</h3>

                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i className='fa fa-minus' />
                    </button>
                    {/* <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button> */}
                  </div>
                </div>

                <div className='box-body'>
                  <div className='table-responsive'>
                    <table className='table no-margin'>
                      <tbody>
                        {this.state.merchData.map((tit, index) => (
                          <React.Fragment key={index}>
                            {/* <tr>
				                                        <td><a  href="javascript:void(0)">Total Lots</a><a  className=" pull-right"href="javascript:void(0)">{tit.TOT_BARC}</a></td>
				                                    </tr> */}
                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/totalBarcodes'
                                  }}
                                >
                                  <a href='javascript:void(0)'>
                                    Total Barcodes{' '}
                                  </a>
                                  <a
                                    className=' pull-right'
                                    href='javascript:void(0)'
                                  >
                                    {tit.TOT_BARC}
                                  </a>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/picturesDone'
                                  }}
                                >
                                  <a href='javascript:void(0)'>Pictures Done</a>
                                  <a
                                    className=' pull-right'
                                    href='javascript:void(0)'
                                  >
                                    {tit.PICTURS_DONE}
                                  </a>
                                </Link>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: "/itemReturned"
                                  }}
                                >
                                  <a href="javascript:void(0)">Item Returned</a>
                                  <a
                                    className=" pull-right"
                                    href="javascript:void(0)"
                                  >
                                    0
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xs-3'>
              <div className='box box-info '>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Lot & Barcodes</h3>

                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i className='fa fa-minus' />
                    </button>
                    {/* <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button> */}
                  </div>
                </div>

                <div className='box-body'>
                  <div className='table-responsive'>
                    <table className='table no-margin'>
                      <tbody>
                        {this.state.merchData.map((tit, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/barcodeProcess'
                                  }}
                                >
                                  <a href='javascript:void(0)'>
                                    Barcode Process
                                  </a>
                                  <NumberFormat
                                    className=' pull-right'
                                    value={tit.BARCODE_CREATED}
                                    displayType={'text'}
                                    thousandSeparator
                                  />
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/merchantListing'
                                  }}
                                >
                                  <a>Active Listed</a>
                                  <NumberFormat
                                    className=' pull-right'
                                    value={tit.ACTIVE_LISTED}
                                    displayType={'text'}
                                    thousandSeparator
                                  />
                                </Link>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/activeNotListed'
                                  }}
                                >
                                  <a>Active Not Listed</a>
                                  <NumberFormat
                                    className=' pull-right'
                                    value={tit.NOT_LISTED}
                                    displayType={'text'}
                                    thousandSeparator
                                  />
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/solditem'
                                  }}
                                >
                                  <a href='javascript:void(0)'>Sold</a>
                                  <NumberFormat
                                    className=' pull-right'
                                    value={tit.SOLD}
                                    displayType={'text'}
                                    thousandSeparator
                                  />
                                </Link>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-xs-3'>
              <div className='box box-info '>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Stats</h3>

                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i className='fa fa-minus' />
                    </button>
                    {/* <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button> */}
                  </div>
                </div>

                <div className='box-body'>
                  <div className='table-responsive'>
                    <table className='table no-margin'>
                      <tbody>
                        {this.state.merchData.map((tit, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>
                                <a href='javascript:void(0)'>
                                  Process Qty / Value
                                </a>
                                <NumberFormat
                                  className=' pull-right'
                                  value={tit.PROCESED_QTY_VAL}
                                  displayType={'text'}
                                  thousandSeparator
                                  prefix={'$ '}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href='javascript:void(0)'>
                                  Listed Qty / Value{' '}
                                </a>
                                <NumberFormat
                                  className=' pull-right'
                                  value={tit.ACTIV_LIST_QTY_VAL}
                                  displayType={'text'}
                                  thousandSeparator
                                  prefix={'$ '}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href='javascript:void(0)'>
                                  Not Listed Qty / Value
                                </a>
                                <NumberFormat
                                  className=' pull-right'
                                  value={tit.ACTIV_NOT_LIST_QTY_VAL}
                                  displayType={'text'}
                                  thousandSeparator
                                  prefix={'$ '}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href='javascript:void(0)'>
                                  Sold Qty / Value
                                </a>
                                <NumberFormat
                                  className=' pull-right'
                                  value={tit.SOLD_QTY_VAL}
                                  displayType={'text'}
                                  thousandSeparator
                                  prefix={'$ '}
                                />
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xs-3'>
              <div className='box box-info '>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Orders</h3>

                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i className='fa fa-minus' />
                    </button>
                    {/* <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button> */}
                  </div>
                </div>

                <div className='box-body'>
                  <div className='table-responsive'>
                    <table className='table no-margin'>
                      <tbody>
                        {this.state.merchData.map((tit, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/awaitingShipment'
                                  }}
                                >
                                  <a href='javascript:void(0)'>
                                    Awaiting Shipment
                                  </a>
                                  <a
                                    className=' pull-right'
                                    href='javascript:void(0)'
                                  >
                                    0
                                  </a>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/shipped'
                                  }}
                                >
                                  <a href='javascript:void(0)'>Shipped</a>
                                  <a
                                    className=' pull-right'
                                    href='javascript:void(0)'
                                  >
                                    0
                                  </a>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a href='javascript:void(0)'>Not Shipped</a>
                                <a
                                  className=' pull-right'
                                  href='javascript:void(0)'
                                >
                                  0
                                </a>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <InvoiceDetailDashboard />
          </div>
        </section>
        {/* <section className='content'>
          <InvoiceDetailDashboard />
        </section> */}
      </React.Fragment>
    )
  }
}

export default MerchDash
