import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import {
  save_merchant_lot,
  getMerchantDetail
} from '../../action/merchantLotDetailActions.js'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import dateFormat from 'dateformat'

class MerchantLotDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lot_desc: '',
      lot_ref: '',
      purch_date: '',
      lot_mini_prof: '',
      lot_cost: '',
      lot_sourc: '',
      mer_name: localStorage.getItem('merId'),
      est_reques: '0',
      part_lis: '0',
      lis_cost: '0',
      appr_list: '0',
      open: false,
      startDate: new Date()
    }
  }
  componentDidMount () {
    const data = {
      mid: localStorage.getItem('merId'),
      user_id: localStorage.getItem('userId')
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

  handleOnClick = e => {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({ ...this.state, [name]: value })
    // console.log(this.state)
  }
  handleOnSubmit = e => {
    e.preventDefault()
    const data = {
      lot_desc: this.state.lot_desc,
      lot_ref: this.state.lot_ref,
      purch_date: dateFormat(this.state.purch_date, 'd/m/yy H:M:ss'),
      lot_mini_prof: this.state.lot_mini_prof,
      lot_cost: this.state.lot_cost,
      lot_sourc: this.state.lot_sourc,
      mer_name: this.state.mer_name,
      est_reques: this.state.est_reques,
      part_lis: this.state.part_lis,
      lis_cost: this.state.lis_cost,
      appr_list: this.state.appr_list
      //   user_id: localStorage.getItem("userId")
    }
    this.props.save_merchant_lot(data)
    this.myFormRef.reset()
  }
  render () {
    // console.log(this.state.purch_date)
    // console.log(this.props.merchant_name);
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    const yyyy = today.getFullYear()
    today = mm + '/' + dd + '/' + yyyy
    if (this.state.purch_date == '') {
      this.setState({
        ...this.state,
        purch_date: today
      })
    }

    return (
      <React.Fragment>
        <div className={this.state.open ? 'box' : 'box collapsed-box'}>
          <div className='box-header with-border'>
            <h3 className='box-title'>Add Merchant Lot Detail</h3>
            <div className='box-tools pull-right'>
              <button
                type='button'
                className='btn btn-box-tool'
                data-widget='collapse'
              >
                <i
                  className={this.state.open ? 'fa fa-minus' : 'fa fa-plus'}
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
                <div className='col-sm-2'>
                  <label for='mer_name'>Merchant Name:</label>
                  <div className='form-group has-feedback'>
                    <select
                      type='text'
                      name='mer_name'
                      id='mer_name'
                      className='form-control'
                      data-live-search='true'
                      onChange={this.handleOnChange}
                      //  required
                    >
                      <option value='0'>Select One</option>
                      {(this.props.merchant_name || []).map(data => {
                        let select = ''
                        if (data.MERCHANT_ID == localStorage.getItem('merId')) {
                          select = 'selected'
                        }
                        return (
                          <option
                            key={data.MERCHANT_ID}
                            value={data.MERCHANT_ID}
                            selected={select}
                          >
                            {data.CONTACT_PERSON}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                <div className='col-sm-3'>
                  <label>Lot Description</label>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='lot_desc'
                      id='lot_desc'
                      className='form-control'
                      onChange={this.handleOnChange}
                      required
                    />
                  </div>
                </div>

                <div className='col-sm-2'>
                  <label>Lot Ref #</label>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='lot_ref'
                      id='lot_ref'
                      className='form-control'
                      onChange={this.handleOnChange}
                      required
                    />
                  </div>
                </div>

                <div className='col-sm-2'>
                  <label>Purchase Date</label>
                  <div className='input-group'>
                    <input
                      type='text'
                      id='purch_date'
                      className='form-control'
                      name='purch_date'
                      placeholder='Purch Date'
                      readOnly
                      value={today}
                    />

                    <span className='input-group-addon'>
                      <span className='glyphicon glyphicon-calendar' />
                    </span>
                  </div>
                </div>

                <div className='col-sm-2'>
                  <label>Minimum Profit %</label>
                  <div className='form-group'>
                    <input
                      type='number'
                      name='lot_mini_prof'
                      id='lot_mini_prof'
                      className='form-control'
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>

                <div className='col-sm-1'>
                  <label>Cost</label>
                  <div className='form-group'>
                    <input
                      type='number'
                      name='lot_cost'
                      id='lot_cost'
                      className='form-control'
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-2'>
                  <label>Source</label>
                  <div className='form-group'>
                    <input
                      type='text'
                      name='lot_sourc'
                      id='lot_sourc'
                      className='form-control'
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>

                <div className='col-sm-2 p-t-24'>
                  <div className='input-group'>
                    <label
                      className='control-label'
                      style={{ color: 'red', fontSize: '18px' }}
                    >
                      Estimate Request:
                    </label>
                    &nbsp;&nbsp;
                    <input
                      type='radio'
                      className='est_reques'
                      name='est_reques'
                      onChange={this.handleOnChange}
                      value='1'
                    />
                    &nbsp;Yes&nbsp;&nbsp;
                    <input
                      type='radio'
                      className='est_reques'
                      name='est_reques'
                      value='0'
                      onChange={this.handleOnChange}
                      checked
                    />
                    &nbsp;No
                  </div>
                </div>

                <div className='col-sm-2 p-t-24'>
                  <div className='input-group'>
                    <label
                      className='control-label'
                      style={{ color: 'red', fontSize: '18px' }}
                    >
                      Partial Listing :
                    </label>
                    &nbsp;&nbsp;
                    <input
                      type='radio'
                      className='part_lis'
                      name='part_lis'
                      onChange={this.handleOnChange}
                      value='1'
                    />
                    &nbsp;Yes&nbsp;&nbsp;
                    <input
                      type='radio'
                      className='part_lis'
                      name='part_lis'
                      value='0'
                      onChange={this.handleOnChange}
                      checked
                    />
                    &nbsp;No
                  </div>
                </div>

                <div className='col-sm-2 p-t-24'>
                  <div className='input-group'>
                    <label
                      className='control-label'
                      style={{ color: 'red', fontSize: '18px' }}
                    >
                      Line Item Cost:
                    </label>
                    &nbsp;&nbsp;
                    <input
                      type='radio'
                      className='lis_Cost'
                      name='lis_cost'
                      onChange={this.handleOnChange}
                      value='1'
                    />
                    &nbsp;Yes&nbsp;&nbsp;
                    <input
                      type='radio'
                      className='lis_Cost'
                      name='lis_cost'
                      value='0'
                      onChange={this.handleOnChange}
                      checked
                    />
                    &nbsp;No
                  </div>
                </div>

                <div className='col-sm-2 p-t-24'>
                  <div className='input-group'>
                    <label
                      className='control-label'
                      style={{ color: 'red', fontSize: '18px' }}
                    >
                      Approval Required:
                    </label>
                    &nbsp;&nbsp;
                    <input
                      type='radio'
                      className='appr_list'
                      name='appr_list'
                      onChange={this.handleOnChange}
                      value='1'
                    />
                    &nbsp;Yes&nbsp;&nbsp;
                    <input
                      type='radio'
                      className='appr_list'
                      name='appr_list'
                      value='0'
                      onChange={this.handleOnChange}
                      checked
                    />
                    &nbsp;No
                  </div>
                </div>

                <div className='col-sm-2 '>
                  <div className='form-group'>
                    <label className='control-label' />
                    <Button
                      type='submit'
                      title='Save Merchant Lot'
                      id='save_merch_lot'
                      name='save_merch_lot'
                      className='btn btn-success form-control'
                    >
                      Save Lot
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    merchant_name: state.genrateBarcodeReducer.merchantname
  }
}
export default connect(
  mapStateToProps,
  { save_merchant_lot, getMerchantDetail }
)(MerchantLotDetail)
