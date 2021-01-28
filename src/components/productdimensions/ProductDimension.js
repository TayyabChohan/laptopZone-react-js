import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { getMerchantDetail } from '../../action/merchantLotDetailActions.js'
import { connect } from 'react-redux'
import Select from 'react-select'
import {
  get_merchant_product,
  update_product_detail
} from '../../action/productDimensionAction.js'
import ProductDimensionDataTable from '../datatables/ProductDimensionDataTable.js'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
class ProductDimension extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      open: true,
      merchant_id: ''
    }
  }
  handleOnClick = e => {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }
  componentDidMount () {
    const data = {
      mid: localStorage.getItem('merId'),
      // user_id: localStorage.getItem('userId')
      user_id: 2
    }
    this.props.getMerchantDetail(data)
  }

  componentWillMount () {
    if (localStorage.getItem('userName')) {
      // console.log('setion find')
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }
  handleChangeMerchantId = merchant_id => {
    this.setState({
      merchant_id: merchant_id
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.merchant_id != this.state.merchant_id) {
      this.props.get_merchant_product(this.state.merchant_id.value)
      // console.log(this.state.merchant_id.value)
      // console.log('prevstate', prevState.merchant_id.value)
    }
  }
  componentWillUnmount () {
    this.props.get_merchant_product()
  }
  render () {
    // console.log(this.state)
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    const specific_merchant = this.props.merchant_name.filter(
      item =>
        item.CONTACT_PERSON !== 'DFWONLINE' &&
        item.CONTACT_PERSON !== 'TechBargain'
    )
    const merchant_name = []

    specific_merchant.map(item => {
      merchant_name.push({
        value: item.MERCHANT_ID,
        label: item.CONTACT_PERSON
      })
    })
    const all_merchant = []
    this.props.merchant_name.map(item =>
      all_merchant.push({
        value: item.MERCHANT_ID,
        label: item.CONTACT_PERSON
      })
    )
    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Product Dimension</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Product Dimension</a>
            </li>
            <li className='active'>Product Dimension</li>
          </ol>
        </section>
        <section class='content'>
          <div class='row'>
            <div class='col-sm-12'>
              <div className={this.state.open ? 'box' : 'box collapsed-box'}>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Select Merchant</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open ? 'fa fa-minus' : 'fa fa-plus'
                        }
                        onClick={this.handleOnClick}
                      />
                    </button>
                  </div>
                </div>
                <div className='box-body'>
                  <form
                    onSubmit={this.handleOnSubmit}
                    ref={el => (this.myFormRef = el)}
                  >
                    <div className='row'>
                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label for='merchantname'>Merchant Name</label>
                          <div
                            className='form-group has-feedback'
                            id='merchantname'
                          >
                            <Select
                              id='merchantname'
                              // isMulti
                              options={all_merchant}
                              value={this.state.merchant_id}
                              onChange={this.handleChangeMerchantId}
                              className='basic-select'
                              classNamePrefix='select'
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Product Dimensions</h3>
                </div>
                <div className='box-body'>
                  <ProductDimensionDataTable
                    data={this.props.merchant_products || []}
                    {...this.props}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <ErrorMessage /> */}
        <AlertMessage />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    merchant_name: state.genrateBarcodeReducer.merchantname,
    merchant_products: state.productDimensionReducer.merchant_product_detail
  }
}
export default connect(
  mapStateToProps,
  {
    get_merchant_product,
    getMerchantDetail,
    update_product_detail
  }
)(ProductDimension)
