import React, { Component } from 'react'
import Select from 'react-select'
import { Creatable } from 'react-select'
import { Button } from 'react-bootstrap'
import {
  get_products,
  get_brands,
  get_series,
  get_models,
  save_object_binding,
  save_series_binding,
  save_model_binding,
  save_new_object,
  save_new_brand,
  save_new_series,
  save_new_model,
  save_all_bind,
  get_lzw_config_detail
} from '../../action/lzwConfigActions.js'
import LzwConfigDatatable from '../datatables/lzwConfig/LzwConfigDatatable.jsx'
import { connect } from 'react-redux'
import ErrorMessage from '../messages/ErrorMessage.js'
import AlertMessage from '../messages/AlertMessage.js'
class Lzw_Config extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open_object: false,
      object_id: '',
      brand_id: '',
      brand_id2: '',
      series_id: '',
      series_id2: '',
      model_id: '',
      add_new_object: '',
      add_new_brand: '',
      add_new_series: '',
      add_new_model: '',
      open_series: false,
      open_model: false,
      open_addObject: true,
      open_addBrand: true,
      open_addSeries: true,
      open_addModel: true
    }
  }
  componentDidMount () {
    this.props.get_products()
    this.props.get_brands()
    this.props.get_series()
    this.props.get_models()
    this.props.get_lzw_config_detail()
  }
  handleOnClickObject = () => {
    this.setState(prevState => ({
      open_object: !prevState.open_object
    }))
  }
  handleOnClickSeries = () => {
    this.setState(prevState => ({
      open_series: !prevState.open_series
    }))
  }
  handleOnClickModel = () => {
    this.setState(prevState => ({
      open_model: !prevState.open_model
    }))
  }
  handleOnClickAddObject = () => {
    this.setState(prevState => ({
      open_addObject: !prevState.open_addObject
    }))
  }
  handleOnClickAddBrand = () => {
    this.setState(prevState => ({
      open_addBrand: !prevState.open_addBrand
    }))
  }
  handleOnClickAddSeries = () => {
    this.setState(prevState => ({
      open_addSeries: !prevState.open_addSeries
    }))
  }
  handleOnClickAddModel = () => {
    this.setState(prevState => ({
      open_addModel: !prevState.open_addModel
    }))
  }
  handleChange = newValue => {
    this.setState({
      ...this.state,
      object_id: newValue
    })
  }
  handleChangeBrand = newValue => {
    this.setState({
      ...this.state,
      brand_id: newValue
    })
  }
  handleChangeBrand2 = newValue => {
    this.setState({
      ...this.state,
      brand_id2: newValue
    })
  }

  handleChangeSeries = newValue => {
    this.setState({
      ...this.state,
      series_id: newValue
    })
  }
  handleChangeSeries2 = newValue => {
    this.setState({
      ...this.state,
      series_id2: newValue
    })
  }

  handleChangeModel = newValue => {
    this.setState({
      ...this.state,
      model_id: newValue
    })
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  saveNewObject = () => {
    const data = {
      new_product: this.state.add_new_object,
      user_id: localStorage.getItem('userId')
    }
    // console.log(data)
    this.props.save_new_object(data)
    this.setState({
      ...this.state,
      add_new_object: ''
    })
  }
  saveNewBrand = () => {
    const data = {
      new_brand: this.state.add_new_brand,
      user_id: localStorage.getItem('userId')
    }
    // console.log(data)
    this.props.save_new_brand(data)
    this.setState({
      ...this.state,
      add_new_brand: ''
    })
  }
  saveNewSeries = () => {
    const data = {
      new_series: this.state.add_new_series,
      user_id: localStorage.getItem('userId')
    }
    // console.log(data)
    this.props.save_new_series(data)
    this.setState({
      ...this.state,
      add_new_series: ''
    })
  }
  saveNewModel = () => {
    const data = {
      new_model: this.state.add_new_model,
      user_id: localStorage.getItem('userId')
    }
    // console.log(data)
    this.props.save_new_model(data)
    this.setState({
      ...this.state,
      add_new_model: ''
    })
  }

  saveAllBinding = () => {
    const data = {
      product: this.state.object_id,
      brand: this.state.brand_id,
      series: this.state.series_id,
      model: this.state.model_id,
      user_id: localStorage.getItem('userId')
    }
    console.log(data)
    this.props.save_all_bind(data)
  }

  saveObjectBinding = e => {
    e.preventDefault()
    const data = {
      product: this.state.object_id,
      brand: this.state.brand_id,
      user_id: localStorage.getItem('userId')
    }
    // console.log(data)
    this.props.save_object_binding(data)
    this.setState({
      ...this.state,
      object_id: '',
      brand_id: ''
    })
  }
  saveSeriesBinding = e => {
    e.preventDefault()

    const data = {
      brand: this.state.brand_id2,
      series: this.state.series_id,
      user_id: localStorage.getItem('userId')
    }
    // console.log(data)
    this.props.save_series_binding(data)
    this.setState({
      ...this.state,
      brand_id2: '',
      series_id: ''
    })
  }
  saveModelBinding = e => {
    e.preventDefault()

    const data = {
      series: this.state.series_id2,
      model: this.state.model_id,
      user_id: localStorage.getItem('userId')
    }
    // console.log(data)
    this.props.save_model_binding(data)
    this.setState({
      ...this.state,
      series_id2: '',
      model_id: ''
    })
  }
  render () {
    const disableObjecBind =
      this.state.object_id == '' && this.state.brand_id == ''
    const disabledSeriesBind =
      this.state.brand_id2 == '' && this.state.series_id == ''
    const disabledModelBind =
      this.state.series_id2 == '' && this.state.model_id == ''
    const products = []
    this.props.products.map(item =>
      products.push({
        value: item.OBJECT_ID,
        label: item.OBJECT_NAME
      })
    )
    const brands = []
    this.props.brands.map(item =>
      brands.push({
        value: item.BRAND_ID,
        label: item.DESCRIPTION
      })
    )
    const series = []
    this.props.series.map(item =>
      series.push({
        value: item.SERIES_ID,
        label: item.DESCRIPTION
      })
    )

    const models = []
    this.props.models.map(item =>
      models.push({
        value: item.MODEL_ID,
        label: item.DESCRIPTION
      })
    )
    return (
      <React.Fragment>
        <section className='content-header'>
          <h1>LZW Config</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>User End Objects</li>
            <li className='active'>lzw config</li>
          </ol>
        </section>
        <section className='content'>
          {/* <div className='row'>
            <div className='col-sm-12'>
              <div
                className={
                  this.state.open_addObject ? 'box' : 'box collapsed-box'
                }
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Add New Object</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_addObject
                            ? 'fa fa-minus'
                            : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickAddObject}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> *
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='add_new_object'>Product Name</label>
                          <input
                            type='text'
                            className='form-control add_new_object '
                            id='add_new_object'
                            name='add_new_object'
                            value={this.state.add_new_object}
                            onChange={this.handleOnChange}
                            placeholder='Add Product Name'
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div
                          className='form-group has-feedback'
                          style={{ marginTop: '40px' }}
                        >
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.saveNewObject}
                            disabled={!this.state.add_new_object}
                          >
                            Save Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/**

            Add New Brand

          */}
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={
                  this.state.open_addBrand ? 'box' : 'box collapsed-box'
                }
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Add New Brand</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_addBrand
                            ? 'fa fa-minus'
                            : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickAddBrand}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='add_new_brand'>Brand Name</label>
                          <input
                            type='text'
                            className='form-control add_new_brand '
                            id='add_new_brand'
                            name='add_new_brand'
                            value={this.state.add_new_brand}
                            onChange={this.handleOnChange}
                            placeholder='Add Brand Name'
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div
                          className='form-group has-feedback'
                          style={{ marginTop: '40px' }}
                        >
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.saveNewBrand}
                            disabled={!this.state.add_new_brand}
                          >
                            Save Brand
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**

          Add New Series

          */}
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={
                  this.state.open_addSeries ? 'box' : 'box collapsed-box'
                }
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Add New Series</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_addSeries
                            ? 'fa fa-minus'
                            : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickAddSeries}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='add_new_series'>Series Name</label>
                          <input
                            type='text'
                            className='form-control add_new_series '
                            id='add_new_series'
                            name='add_new_series'
                            value={this.state.add_new_series}
                            onChange={this.handleOnChange}
                            placeholder='Add Series Name'
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div
                          className='form-group has-feedback'
                          style={{ marginTop: '40px' }}
                        >
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.saveNewSeries}
                            disabled={!this.state.add_new_series}
                          >
                            Save Series
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**

          Add New Model

          */}
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={
                  this.state.open_addModel ? 'box' : 'box collapsed-box'
                }
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Add New Model</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_addModel
                            ? 'fa fa-minus'
                            : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickAddModel}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='add_new_model'>Model Name</label>
                          <input
                            type='text'
                            className='form-control add_new_model '
                            id='add_new_model'
                            name='add_new_model'
                            value={this.state.add_new_model}
                            onChange={this.handleOnChange}
                            placeholder='Add Model Name'
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div
                          className='form-group has-feedback'
                          style={{ marginTop: '40px' }}
                        >
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.saveNewModel}
                            disabled={!this.state.add_new_model}
                          >
                            Save Model
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**

  Bindings

*/}

          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={this.state.open_object ? 'box' : 'box collapsed-box'}
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Object Binding</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_object ? 'fa fa-minus' : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickObject}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> */}
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      {/* <form onSubmit={this.saveObject}> */}
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_Object'>Product</label>
                          <Select
                            id='select_Object'
                            options={products}
                            value={this.state.object_id}
                            onChange={this.handleChange}
                            className='basic-select'
                            classNamePrefix='select'
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_brand'>Brand</label>
                          <Select
                            id='select_brand'
                            options={brands}
                            value={this.state.brand_id}
                            onChange={this.handleChangeBrand}
                            className='basic-select'
                            classNamePrefix='select'
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_series'>Series</label>
                          <Select
                            id='select_series'
                            options={series}
                            value={this.state.series_id}
                            onChange={this.handleChangeSeries}
                            // onInputChange={this.handleInputChangeSeries}
                            className='basic-select'
                            classNamePrefix='select'
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_model'>Model</label>
                          <Select
                            id='select_model'
                            options={models}
                            value={this.state.model_id}
                            onChange={this.handleChangeModel}
                            className='basic-select'
                            classNamePrefix='select'
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div
                          className='form-group has-feedback'
                          style={{ marginTop: '40px' }}
                        >
                          {/* <label for='save_object'> Save </label> */}
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.saveAllBinding}
                            // disabled={disableBind}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                      {/* <div className='col-sm-2'>
                        <div
                          className='form-group has-feedback'
                          style={{ marginTop: '40px' }}
                        >
                          {/* <label for='save_object'> Save </label> *
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.saveObjectBinding}
                            disabled={disableObjecBind}
                          >
                            Save
                          </Button>
                        </div>
                      </div> */}
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**

          Series Bindings
          */}
          {/* <div className='row'>
            <div className='col-sm-12'>
              <div
                className={this.state.open_series ? 'box' : 'box collapsed-box'}
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Series Binding</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_series ? 'fa fa-minus' : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickSeries}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> *
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_brand'>Brand</label>
                          <Select
                            id='select_brand'
                            options={brands}
                            value={this.state.brand_id2}
                            onChange={this.handleChangeBrand2}
                            className='basic-select'
                            classNamePrefix='select'
                            isClearable
                            required
                          />
                        </div>
                      </div>

                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_series'>Series</label>
                          <Select
                            id='select_series'
                            options={series}
                            value={this.state.series_id}
                            onChange={this.handleChangeSeries}
                            // onInputChange={this.handleInputChangeSeries}
                            className='basic-select'
                            classNamePrefix='select'
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div
                          className='form-group has-feedback'
                          style={{ marginTop: '40px' }}
                        >
                          {/* <label for='save_object'> Save </label> *
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.saveSeriesBinding}
                            disabled={disabledSeriesBind}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <div
                className={this.state.open_model ? 'box' : 'box collapsed-box'}
              >
                <div className='box-header with-border'>
                  <h3 className='box-title'>Model Binding</h3>
                  <div className='box-tools pull-right'>
                    <button
                      type='button'
                      className='btn btn-box-tool'
                      data-widget='collapse'
                    >
                      <i
                        className={
                          this.state.open_model ? 'fa fa-minus' : 'fa fa-plus'
                        }
                        onClick={this.handleOnClickModel}
                      />
                    </button>
                  </div>
                </div>
                {/* <!-- /.box-header --> *
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_series'>Series</label>
                          <Select
                            id='select_series'
                            options={series}
                            value={this.state.series_id2}
                            onChange={this.handleChangeSeries2}
                            className='basic-select'
                            classNamePrefix='select'
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className='col-xs-2'>
                        <div className='form-group has-feedback'>
                          <label for='select_model'>Model</label>
                          <Select
                            id='select_model'
                            options={models}
                            value={this.state.model_id}
                            onChange={this.handleChangeModel}
                            className='basic-select'
                            classNamePrefix='select'
                            isClearable
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div
                          className='form-group has-feedback'
                          style={{ marginTop: '40px' }}
                        >
                          {/* <label for='save_object'> Save </label> *
                          <Button
                            type='button'
                            className='btn btn-primary btn-block btn-flat'
                            onClick={this.saveModelBinding}
                            disabled={disabledModelBind}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>LZW Repaire Detail</h3>
                </div>
                <div className='box-body'>
                  <LzwConfigDatatable {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <AlertMessage />
        <ErrorMessage />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.lzwConfigReducer.products,
    brands: state.lzwConfigReducer.brands,
    series: state.lzwConfigReducer.series,
    models: state.lzwConfigReducer.models,
    lzw_config_data: state.lzwConfigReducer.lzw_config_data
  }
}
export default connect(
  mapStateToProps,
  {
    get_products,
    get_brands,
    get_series,
    get_models,
    save_object_binding,
    save_series_binding,
    save_model_binding,
    save_new_object,
    save_new_brand,
    save_new_series,
    save_new_model,
    save_all_bind,
    get_lzw_config_detail
  }
)(Lzw_Config)
