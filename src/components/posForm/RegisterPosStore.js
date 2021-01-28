import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Select from 'react-select'
import { pos_form_data, pos_form_state } from '../../action/posActions.js'
import {
  save_pos_store,
  get_pos_store,
  delete_store,
  pos_form_state_edit,
  update_pos_store
} from '../../action/registerStorePosActions.js'
import PosStoreDatatable from '../datatables/PosDatatables/PosStoreDatatable.js'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
import { Redirect } from 'react-router-dom'
class RegisterPosStore extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      finalurl: '',
      open_box: true,
      open_table: true,
      phoneNumber: '',
      address: '',
      owner_name: '',
      email: '',
      city_id: '',
      state_id: '',
      zip: '',
      store_name: '',
      sale_tax: ''
    }
  }
  componentWillMount () {
    if (localStorage.getItem('userName')) {
    } else {
      let getUrl = window.location
      let finalurl = getUrl.protocol + '//' + getUrl.hostname

      this.setState({ redirectToReferrer: true, finalurl: finalurl })
    }
  }

  componentDidMount () {
    this.props.pos_form_data()
    this.props.get_pos_store()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.city_id !== this.state.city_id && this.state.city_id !== '') {
      const data = {
        city_id: this.state.city_id
      }
      this.props.pos_form_state(data)
    }

    if (
      prevProps.pos_state !== this.props.pos_state &&
      this.props.pos_state !== ''
    ) {
      const default_buyer_state = []
      default_buyer_state.push({
        value: this.props.pos_state[0].STATE_ID || '',
        label: this.props.pos_state[0].STATE_DESC || ''
      })
      this.setState({
        state_id: default_buyer_state[0]
      })
    }
  }
  handleOnClickBox = () => {
    this.setState(prevState => ({
      open_box: !prevState.open_box
    }))
  }
  handleOnClickTable = () => {
    this.setState(prevState => ({
      open_table: !prevState.open_table
    }))
  }
  handleChangeState = state_id => {
    this.setState({
      state_id: state_id
    })
  }

  handleChangeCity = city_id => {
    this.setState({
      city_id: city_id
    })
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  savePosStore = e => {
    e.preventDefault()
    const data = {
      owner_name: this.state.owner_name,
      store_name: this.state.store_name,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      email: this.state.email,
      city_id: this.state.city_id,
      state_id: this.state.state_id,
      zip: this.state.zip,
      sale_tax: this.state.sale_tax,
      user_id: localStorage.getItem('userId')
    }
    // console.table(data)
    this.props.save_pos_store(data)
    this.setState({
      owner_name: '',
      store_name: '',
      phoneNumber: '',
      address: '',
      email: '',
      city_id: '',
      state_id: '',
      zip: '',
      sale_tax: ''
    })
  }
  // componentWillUnmount () {
  //   this.props.pos_form_state()
  //   this.props.pos_form_data()
  //   this.props.get_pos_store()
  // }
  render () {
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    const button = this.state.city_id !== '' && this.state.state_id !== ''
    // console.log(button)
    const buyer_city = []
    this.props.pos_city.map(item => {
      buyer_city.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      })
    })
    // const buyer_states = []

    // this.props.pos_state.map(item => {
    //   buyer_states.push({
    //     value: item.STATE_ID,
    //     label: item.STATE_DESC
    //   })
    // })
    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>Register POS Store</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>Point Of Sale</li>
            <li className='active'>Register POS</li>
          </ol>
        </section>

        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={this.state.open_box ? 'box' : 'box collapsed-box'}
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Add New Store</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_box ? 'fa fa-minus' : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickBox}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    <form onSubmit={this.savePosStore}>
                      <div className='col-sm-12'>
                        <div className='col-sm-2'>
                          <div className='form-group'>
                            <label htmlFor='Doc No' className='control-label'>
                              Owner Name
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              id='owner_name'
                              name='owner_name'
                              value={this.state.owner_name}
                              onChange={this.handleOnChange}
                              required
                            />
                          </div>
                        </div>

                        <div className='col-sm-2 '>
                          <div className='form-group'>
                            <label
                              htmlFor='store_name'
                              className='control-label'
                            >
                              Store Name
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              id='store_name'
                              name='store_name'
                              value={this.state.store_name}
                              onChange={this.handleOnChange}
                              required
                            />
                          </div>
                        </div>

                        <div className='col-sm-2'>
                          <div className='form-group'>
                            <label htmlFor='Phone' className='control-label'>
                              Phone
                            </label>
                            <NumberFormat
                              className='form-control'
                              format='(###) ###-########'
                              mask='_'
                              onChange={this.handleOnChange}
                              name='phoneNumber'
                              value={this.state.phoneNumber}
                              required
                            />
                          </div>
                        </div>

                        <div className='col-sm-3'>
                          <div className='form-group'>
                            <label htmlFor='Email' className='control-label'>
                              Email
                            </label>
                            <input
                              type='email'
                              className='form-control'
                              id='email'
                              name='email'
                              onChange={this.handleOnChange}
                              value={this.state.email}
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='form-group'>
                            <label htmlFor='sale_tax' className='control-label'>
                              Sale Tax
                            </label>
                            <NumberFormat
                              className='form-control'
                              id='sale_tax'
                              name='sale_tax'
                              onChange={this.handleOnChange}
                              value={this.state.sale_tax}
                              thousandSeparator
                              prefix={'$ '}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-sm-12'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='Address' className='control-label'>
                              Address
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              id='address'
                              name='address'
                              onChange={this.handleOnChange}
                              value={this.state.address}
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-3'>
                          <label htmlFor='city'>City Name</label>
                          <div className='form-group has-feedback' id='city'>
                            <Select
                              id='city'
                              options={buyer_city}
                              value={this.state.city_id}
                              onChange={this.handleChangeCity}
                              className='basic-select'
                              classNamePrefix='select'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <label htmlFor='state'>State Name</label>
                          <div className='form-group has-feedback' id='state'>
                            <Select
                              id='state'
                              // options={buyer_states}
                              value={this.state.state_id}
                              onChange={this.handleChangeState}
                              className='basic-select'
                              classNamePrefix='select'
                              required
                            />
                          </div>
                        </div>

                        <div className='col-sm-2'>
                          <div className='form-group'>
                            <label htmlFor='Zip' className='control-label'>
                              Zip
                            </label>
                            <input
                              type='text'
                              className='form-control'
                              id='zip'
                              name='zip'
                              onChange={this.handleOnChange}
                              value={this.state.zip}
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div
                            className='form-group'
                            style={{ marginTop: '22px' }}
                          >
                            <Button
                              type='submit'
                              className='btn btn-primary btn-block btn-flat'
                              disabled={!button}
                              //   onClick={this.saveInvoicePos}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={this.state.open_table ? 'box' : 'box collapsed-box'}
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Add New Store</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_table ? 'fa fa-minus' : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickTable}
                      />
                    </button>
                  </div>
                </div>{' '}
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <PosStoreDatatable {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <ErrorMessage />
        <AlertMessage />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    pos_state: state.posReducer.pos_state,
    pos_city: state.posReducer.pos_city,
    store_data: state.posReducer.store_data,
    pos_state_edit: state.posReducer.pos_state_edit
  }
}
export default connect(
  mapStateToProps,
  {
    pos_form_data,
    save_pos_store,
    pos_form_state,
    get_pos_store,
    delete_store,
    pos_form_state_edit,
    update_pos_store
  }
)(RegisterPosStore)
{
}
