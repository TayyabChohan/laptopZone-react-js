import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import {
  e_Bay_Store_Name,
  e_Bay_Save_Store_Name,
  e_Bay_Select_All_Store_Data,
  e_Bay_Session_Id,
  e_Bay_Fetch_Token,
  accountToggleFunction,
  defaultStoreToggleFunction,
  get_portal_name
} from '../../action/eBayIntegrationActions.js'
import { connect } from 'react-redux'
// import moment from 'moment'
import axios from 'axios'
import 'gasparesganga-jquery-loading-overlay'
import ErrorMessage from '../messages/ErrorMessage.js'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import AlertMessage from '../messages/AlertMessage.js'

class eBayIntegration extends Component {
  constructor (props) {
    let getUrl = window.location
    let finalurl = getUrl.protocol + '//' + getUrl.hostname
    super(props)
    this.state = {
      storename: '',
      email: '',
      // portalname: [],
      selectedportalname: '',
      token: '',
      baseUrl: finalurl,
      disable: false,
      default_merchant: '0',
      selectedOption: ''
      // data: []
    }
  }

  componentWillMount () {
    if (localStorage.getItem('userName')) {
      // console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }

  componentDidMount () {
    // axios
    //   .get(
    //     this.state.baseUrl +
    //       '/laptopzone/reactcontroller/c_haziqreact/get_portal'
    //   )
    //   .then(response => {
    //     this.setState({
    //       ...this.state,
    //       portalname: response.data
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err.message)
    //   })
    this.props.get_portal_name()
    const merchant_id = localStorage.getItem('merId')
    const user_id = localStorage.getItem('userId')
    // console.log(merchant_id)
    this.props.e_Bay_Select_All_Store_Data(merchant_id, user_id)
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.portal_name != this.props.portal_name) {
      const data2 = this.props.portal_name.filter(
        item =>
          item.PORTAL_DESC == 'EBAY' ||
          item.PORTAL_DESC == 'Ebay' ||
          item.PORTAL_DESC == 'eBay' ||
          item.PORTAL_DESC == 'ebay'
      )
      const data = []
      data2.map(item => {
        return data.push({ label: item.PORTAL_DESC, value: item.PORTAL_ID })
        // label:item.PORTAL_DESC
      })
      this.setState({
        ...this.state,
        selectedportalname: data[0]
      })
    }
  }
  handleOnChange = e => {
    const { value, name } = e.target
    this.setState({ ...this.state, [name]: value })
  }

  handleOnCLick = e => {
    this.props.e_Bay_Store_Name(this.state.storename)
  }

  changeStateOnCLick = e => {
    this.setState(prevState => ({
      disable: !prevState.disable
    }))
  }
  handleChange = selectedportalname => {
    this.setState({ selectedportalname: selectedportalname })
  }
  handleOnSubmit = e => {
    e.preventDefault()
    const data = {
      storename: this.state.storename,
      selectedportalname: this.state.selectedportalname.value,
      marchantid: localStorage.getItem('merId'),
      insertedby: localStorage.getItem('userId'),
      email: this.state.email,
      default_merchant: this.state.default_merchant
    }
    console.log(data)
    this.props.e_Bay_Save_Store_Name(data)
  }

  render () {
    // const data = []
    // this.state.portalname.map(item => {
    //   return data.push({ label: item.PORTAL_DESC, value: item.PORTAL_ID })
    //   // label:item.PORTAL_DESC
    // })
    console.log(this.state)
    const data2 = this.props.portal_name.filter(
      item =>
        item.PORTAL_DESC == 'EBAY' ||
        item.PORTAL_DESC == 'Ebay' ||
        item.PORTAL_DESC == 'eBay' ||
        item.PORTAL_DESC == 'ebay'
    )
    const data = []
    data2.map(item => {
      return data.push({ label: item.PORTAL_DESC, value: item.PORTAL_ID })
      // label:item.PORTAL_DESC
    })
    const enable =
      this.state.storename.length > 3 && this.state.storename != null
    const enablebutton = this.state.selectedportalname.value >= 1 && enable

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>eBay Integration</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>client setup</a>
            </li>
            <li className='active'>eBay Integration</li>
          </ol>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <section className='content'>
                {/* <div className='row'>
                  <div className='col-xs-12'>
                    <div className='box'>
                      <div className='box-header'>
                        <h3 className='box-title'>eBay Integration</h3>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className='box'>
                  <div className='box-header with-border'>
                    <h3 className='box-title'>eBay Integration</h3>
                  </div>
                  <div className='box-body'>
                    {/* <div className='box'> */}
                    {/* <p className='login-box-msg'>eBay Integration</p> */}
                    <div className='row'>
                      <div className='col-xs-12'>
                        <form onSubmit={this.handleOnSubmit}>
                          <div className='row'>
                            <div className='col-sm-4'>
                              <label htmlFor='exampleportalname'>
                                MarketPlace
                              </label>
                              <div
                                className='form-group has-feedback'
                                id='exampleportalname'
                              >
                                <Select
                                  className='basic-single'
                                  classNamePrefix='select'
                                  value={this.state.selectedportalname}
                                  isSearchable
                                  onChange={this.handleChange}
                                  options={data}
                                />
                                {/* <select
                                  id='accountType'
                                  className='form-control selectpicker'
                                  name='selectedportalname'
                                  onChange={this.handleOnChange}
                                  data-live-search='true'
                                  required
                                  // disabled={!enable}
                                >
                                  {/* <option value='0'>Select Portal</option> */}
                                {/*  {this.state.portalname.map(portal_data => {
                                    let select = ''
                                    if (portal_data.PORTAL_DESC === 'ebay') {
                                      select = 'selected'
                                    }
                                    return (
                                      <option
                                        key={portal_data.PORTAL_ID}
                                        value={portal_data.PORTAL_ID}
                                        selected={select}
                                      >
                                        {portal_data.PORTAL_DESC}
                                      </option>
                                    )
                                  })}
                                  ;
                                </select> */}
                              </div>
                            </div>
                            <div className='col-sm-4'>
                              <div className='form-group has-feedback'>
                                <label htmlFor='examplestorename'>
                                  Ebay User Id
                                </label>
                                <input
                                  type='text'
                                  id='examplestorename'
                                  className='form-control'
                                  name='storename'
                                  placeholder='Ebay User Id'
                                  onChange={this.handleOnChange}
                                  required
                                />
                              </div>
                            </div>
                            <div className='col-sm-4'>
                              <div className='form-group has-feedback'>
                                <label htmlFor='paypalemail'>
                                  Paypal Email
                                </label>
                                <input
                                  type='email'
                                  id='paypalemail'
                                  className='form-control'
                                  name='email'
                                  placeholder='PayPal Email'
                                  onChange={this.handleOnChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-xs-4'>
                              <button
                                type='submit'
                                className='btn btn-primary btn-block btn-flat'
                                disabled={!enablebutton}
                              >
                                Save Record
                              </button>
                            </div>
                            <div className='col-xs-4'>
                              {/* <button type="button" className="btn btn-primary btn-block btn-flat" disabled={!enable} >Generate Token</button> */}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/*

                            Display Data In Table

                        */}
              <section className='content'>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='box'>
                      <div className='box-header'>
                        <h3 className='box-title'>eBay Integration</h3>
                      </div>
                      <div className='box-body'>
                        <Table
                          responsive
                          id='table'
                          className='table table-bordered table-hover'
                        >
                          <thead>
                            <tr>
                              {/* <th>ACCT_ID</th>
                        <th>MERCHANT_ID</th> */}
                              <th>Account Name</th>
                              <th>Portal Name</th>
                              {/* <th>TOKEN</th> */}
                              <th>Token Expiry</th>
                              <th>Date</th>
                              <th>Name</th>
                              <th>Genrate Token</th>
                              <th>Fetch Token</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(this.props.ebaystorename || []).map(
                              (data, key) => (
                                <tr key={key}>
                                  {/* <td key={data.ACCT_ID}>{data.ACCT_ID}</td>
                          <td>{data.MERCHANT_ID}</td> */}
                                  <td key={data.ACCT_ID}>
                                    {data.ACCOUNT_NAME}
                                  </td>
                                  <td>{data.PORTAL_DESC}</td>
                                  {/* <td>{data.TOKEN}</td> */}
                                  <td>{data.TOKEN_EXPIRY}</td>
                                  <td>{data.INSERTED_DATE}</td>
                                  <td>{data.USER_NAME}</td>
                                  <td>
                                    <Button
                                      type='button'
                                      size='sm'
                                      className='btn btn-primary btn-block btn-flat'
                                      onClick={() =>
                                        this.props.e_Bay_Session_Id(
                                          data.INSERTED_BY,
                                          data.MERCHANT_ID,
                                          data.ACCT_ID
                                        )
                                      }
                                      disabled={
                                        (data.button_load &&
                                          data.button_name ==
                                            'generate_token') ||
                                        data.MERCHANT_STATUS == 0
                                      }
                                    >
                                      {data.button_load &&
                                      data.button_name == 'generate_token'
                                        ? 'Loading'
                                        : 'Generate Token'}
                                    </Button>
                                  </td>
                                  <td>
                                    <Button
                                      type='button'
                                      size='sm'
                                      className='btn btn-primary btn-block btn-flat'
                                      onClick={() =>
                                        this.props.e_Bay_Fetch_Token(
                                          data.INSERTED_BY,
                                          data.MERCHANT_ID,
                                          data.ACCT_ID
                                        )
                                      }
                                      disabled={
                                        (data.button_load &&
                                          data.button_name == 'fetch_token') ||
                                        data.MERCHANT_STATUS == 0
                                      }
                                    >
                                      {' '}
                                      {data.button_load &&
                                      data.button_name == 'fetch_token'
                                        ? 'Loading'
                                        : 'Fetch Token'}{' '}
                                    </Button>
                                  </td>
                                  <td>
                                    <Button
                                      className='btn btn-danger'
                                      size='xs'
                                      style={{ margin: '3px' }}
                                    >
                                      {' '}
                                      <span
                                        className='glyphicon glyphicon-trash'
                                        aria-hidden='true'
                                      />
                                    </Button>
                                    <Button
                                      title={
                                        data.MERCHANT_STATUS == 1
                                          ? 'Active'
                                          : 'Disable'
                                      }
                                      size='xs'
                                      className={
                                        data.MERCHANT_STATUS == 1
                                          ? 'btn btn-warning'
                                          : 'btn btn-success'
                                      }
                                      onClick={() =>
                                        this.props.accountToggleFunction(
                                          data.ACCT_ID,
                                          data.MERCHANT_STATUS == 1 ? 0 : 1
                                        )
                                      }
                                    >
                                      {' '}
                                      <span
                                        className={
                                          data.MERCHANT_STATUS == '1'
                                            ? 'glyphicon glyphicon-ok'
                                            : 'glyphicon glyphicon-remove'
                                        }
                                        aria-hidden='true'
                                      />
                                    </Button>
                                    <Button
                                      title={
                                        data.DEFAULT_MERCHANT == 1
                                          ? 'Default Seller Account'
                                          : 'Not Default Seller Account'
                                      }
                                      style={{ margin: '3px' }}
                                      className={
                                        data.DEFAULT_MERCHANT == 1
                                          ? 'btn btn-success'
                                          : 'btn btn-warning'
                                      }
                                      size='xs'
                                      onClick={() =>
                                        this.props.defaultStoreToggleFunction(
                                          data.ACCT_ID,
                                          data.DEFAULT_MERCHANT == 1 ? 0 : 1,
                                          data.MERCHANT_ID,
                                          localStorage.getItem('userId')
                                        )
                                      }
                                    >
                                      {' '}
                                      <span
                                        className={
                                          data.DEFAULT_MERCHANT == '1'
                                            ? 'glyphicon glyphicon-user'
                                            : 'glyphicon glyphicon-user'
                                        }
                                        aria-hidden='true'
                                      />
                                    </Button>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* </div> */}
        </section>
        <ErrorMessage />
        <AlertMessage />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ebaystorename: state.eBayReducer.ebaystorename,
    isloading: state.eBayReducer.isloading,
    merchant_name: state.genrateBarcodeReducer.merchantname,
    portal_name: state.eBayReducer.portal_name
  }
}

export default connect(
  mapStateToProps,
  {
    e_Bay_Store_Name,
    e_Bay_Save_Store_Name,
    e_Bay_Select_All_Store_Data,
    e_Bay_Session_Id,
    e_Bay_Fetch_Token,
    accountToggleFunction,
    defaultStoreToggleFunction,
    get_portal_name
  }
)(eBayIntegration)
