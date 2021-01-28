import React, { Component } from 'react'
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from 'react-bootstrap-table'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import {
  insertPacking22,
  getPacking,
  deletePacking,
  updatePacking
} from '../actions/packingAction.jsx'
import { connect } from 'react-redux'
import swal from 'sweetalert'

const action = {
  insertPacking22,
  getPacking,
  deletePacking,
  updatePacking
}

function actionFormatter (cell, row) {
  return (
    <div>
      <button
        className='btn btn-danger glyphicon glyphicon-trash'
        call='list'
        id='item_list'
        onClick={() => that.clickDelete(cell, row)}
      />
      <button
        type='button'
        className='btn btn-primary glyphicon glyphicon-tasks'
        data-toggle='modal'
        data-target='#myModal'
        onClick={() => that.clickUpdate(cell, row)}
      />
    </div>
  )
}
var that = ''

class PackingEntry extends Component {
  constructor (props) {
    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname
    super(props)
    that = this
    this.state = {
      error: null,
      isLoaded: true,
      baseUrl: finalurl,
      redirectToReferrer: false,
      error: false,
      show: false,
      PackingName: '',
      PackingCodeName: '',
      LengthName: '',
      widthName: '',
      HeightName: '',
      PackingWeigthName: '',
      PackingCostName: '',
      packingData: [],
      radio: '',
      PACKING_ID: '',
      charges: '',
      PackingNameModel: '',
      PackingCodeNameModel: '',
      LengthNameModel: '',
      widthNameModel: '',
      HeightNameModel: '',
      PackingWeigthNameModel: '',
      PackingCostNameModel: '',
      radioModel: ''
    }

    this.handleOnsubmit = this.handleOnsubmit.bind(this)
    this.onInputHandler = this.onInputHandler.bind(this)
    this.handleOnChangeRadio = this.handleOnChangeRadio.bind(this)
    this.clickUpdate = this.clickUpdate.bind(this)
    this.clickSaveUpdate = this.clickSaveUpdate.bind(this)
  }

  clickSaveUpdate = id => {
    const data = {
      PACKING_ID: id,
      PackingNameModel: this.state.PackingNameModel,
      PackingCodeNameModel: this.state.PackingCodeNameModel,
      LengthNameModel: Number(this.state.LengthNameModel).toFixed(2),
      widthNameModel: Number(this.state.widthNameModel).toFixed(2),
      HeightNameModel: Number(this.state.HeightNameModel).toFixed(2),
      PackingWeigthNameModel: Number(this.state.PackingWeigthNameModel).toFixed(
        2
      ),
      PackingCostNameModel: Number(this.state.PackingCostNameModel).toFixed(2),
      radioModel: this.state.radioModel
    }
    if (
      this.state.PackingCostNameModel <= 0 ||
      this.state.PackingCostNameModel < -1
    ) {
      alert('Cost is invalid')
      return false
    }
    if (
      this.state.PackingWeigthNameModel <= 0 ||
      this.state.PackingWeigthNameModel < -1
    ) {
      alert('Weight is invalid')
      return false
    }
    if (this.state.HeightNameModel <= 0 || this.state.HeightNameModel < -1) {
      alert('Height is invalid')
      return false
    }
    if (this.state.widthNameModel <= 0 || this.state.widthNameModel < -1) {
      alert('Width is invalid')
      return false
    }
    if (this.state.LengthNameModel <= 0 || this.state.LengthNameModel < -1) {
      alert('Length is invalid')
      return false
    } else {
      this.props.updatePacking(data)
      // console.log(data)
      this.setState({
        PackingCostNameModel: '',
        PackingWeigthNameModel: '',
        HeightNameModel: '',
        widthNameModel: '',
        LengthNameModel: '',
        PackingNameModel: '',
        radioModel: '',
        PackingCodeNameModel: ''
      })
    }
  }

  clickUpdate = (cell, row) => {
    var cost = row.PACKING_COST.replace('$', '')
    this.state.charges = cost
    // console.log(row);
    this.setState({
      PackingNameModel: row.PACKING_NAME,
      PackingCodeNameModel: row.PACKING_CODE,
      LengthNameModel: row.PACKING_LENGTH,
      widthNameModel: row.PACKING_WIDTH,
      HeightNameModel: row.PACKING_HEIGTH,
      PackingWeigthNameModel: row.PACKING_WEIGTH,
      PackingCostNameModel: this.state.charges,
      radioModel: row.PACKING_TYPE,
      PACKING_ID: row.PACKING_ID
    })
  }
  clickDelete = cell => {
    swal({
      title: 'Are you Sure?',
      text: 'Once deleted, you will not be able to recover this Data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.deletePacking(cell)
      } else {
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

  componentDidMount () {
    this.props.getPacking()
  }

  onInputHandlerModel = e => {
    let RoundOff = Number(e.target.value).toFixed(2)
    this.setState(
      {
        ...this.state,
        [e.target.name]: e.target.value,
        charges: RoundOff
      }
      // () => {
      //     if (this.state.PackingCostNameModel <= 0) {
      //         this.setState({
      //             ...this.state,
      //             PackingCostNameModel: ''
      //         })
      //     }

      // }
    )
    // console.log(this.state.PackingCodeNameModel);
  }

  onInputHandler = e => {
    if (
      e.target.name == 'PackingCostName' ||
      e.target.name == 'LengthName' ||
      e.target.name == 'widthName' ||
      e.target.name == 'HeightName' ||
      e.target.name == 'PackingWeigthName'
    ) {
      let RoundOff = 0
      RoundOff = Number(e.target.value).toFixed(2)
      this.setState({
        [e.target.name]: RoundOff
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleOnChangeRadio = event => {
    this.setState({
      radio: event.target.value
    })
  }

  handleOnChangeRadioModel = event => {
    this.setState({
      radioModel: event.target.value
    })
  }

  handleOnsubmit = event => {
    event.preventDefault()
    const { radio } = this.state
    const data = {
      PACKING_TYPE: radio,
      PACKING_NAME: this.state.PackingName,
      PACKING_CODE: this.state.PackingCodeName,
      PACKING_LENGTH: this.state.LengthName,
      PACKING_WIDTH: this.state.widthName,
      PACKING_HEIGTH: this.state.HeightName,
      PACKING_WEIGTH: this.state.PackingWeigthName,
      PACKING_COST: this.state.PackingCostName,
      created_by: localStorage.getItem('userId')
    }

    if (this.state.PackingCostName <= 0 || this.state.PackingCostName < -1) {
      alert('Cost is invalid')
      return false
    }
    if (
      this.state.PackingWeigthName <= 0 ||
      this.state.PackingWeigthName < -1
    ) {
      alert('Weight is invalid')
      return false
    }
    if (this.state.HeightName <= 0 || this.state.HeightName < -1) {
      alert('Height is invalid')
      return false
    }
    if (this.state.widthName <= 0 || this.state.widthName < -1) {
      alert('Width is invalid')
      return false
    }
    if (this.state.LengthName <= 0 || this.state.LengthName < -1) {
      alert('Length is invalid')
      return false
    } else {
      this.props.insertPacking22(data)
      // console.log(data)
      this.myFormRef.reset()
    }
  }

  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  render () {
   

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    const box = this.state.radioModel == 'Box'


    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: '5',
          value: 5
        },
        {
          text: '10',
          value: 10
        },
        {
          text: '15',
          value: 15
        },
        {
          text: '20',
          value: 20
        },
        {
          text: '25',
          value: 25
        },
        {
          text: 'All',
          value: this.props.packingData.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 10, // which size per page you want to locate as default
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
      paginationPosition: 'both', // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }

    const { error, isLoaded } = this.state
    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    if (error) {
      return <div> Error: {error.message}</div>
    } else if (!isLoaded) {
      return (
        <section className='content-header'>
          <h1>LOADING......</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Tables</a>
            </li>
            <li className='active'>Unposted Items</li>
          </ol>
        </section>
      )
    } else {
      return (
        <React.Fragment>
          <section className='content-header'>
            <h1>
              Packing Entry Form
              <small>Control panel</small>
            </h1>
            <ol className='breadcrumb'>
              <li>
                <p>Home</p>
              </li>
              <li className='active'>Packing Entry Form</li>
            </ol>
          </section>

          <section className='content'>
            <div className='row'>
              <div className='modal fade' id='myModal' role='dialog modal-lg'>
                <div className='modal-dialog' style={{ width: '80%' }}>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                      >
                        &times;
                      </button>
                      <h4 className='modal-title'>Update Packing</h4>
                    </div>
                    <form onSubmit={() => this.handleModleOnsubmit()}>
                      <div className='modal-body'>
                        <div className='col-sm-12'>
                          <div className='col-sm-3'>
                            <label>Packing Name:</label>
                            <input
                              type='char'
                              className='form-control'
                              name='PackingNameModel'
                              onChange={this.onInputHandlerModel}
                              value={this.state.PackingNameModel}
                              placeholder='Packing Name'
                              id='PackingNameId'
                              required
                            />
                          </div>

                          <div className='col-sm-2'>
                            <label>Packing Code:</label>
                            <input
                              type='char'
                              className='form-control'
                              name='PackingCodeNameModel'
                              onChange={this.onInputHandlerModel}
                              value={this.state.PackingCodeNameModel}
                              placeholder=' Packing Code'
                              id=' PackingCodId'
                              required
                            />
                          </div>
                          <div className='col-sm-1'>
                            <label>Length:</label>
                            <input
                              type='float'
                              className='form-control'
                              name='LengthNameModel'
                              onChange={this.onInputHandlerModel}
                              value={this.state.LengthNameModel}
                              placeholder='Length'
                              id='LengthId'
                              required
                            />
                          </div>
                          <div className='col-sm-1'>
                            <label>Width:</label>
                            <input
                              type='float'
                              className='form-control'
                              name='widthNameModel'
                              onChange={this.onInputHandlerModel}
                              value={this.state.widthNameModel}
                              placeholder='Width'
                              id='widthId'
                              required
                            />
                          </div>
                          <div className='col-sm-1'>
                            <label>Height:</label>
                            <input
                              type='float'
                              className='form-control'
                              name='HeightNameModel'
                              onChange={this.onInputHandlerModel}
                              value={this.state.HeightNameModel}
                              placeholder='Height'
                              id='HeightId'
                              required
                            />
                          </div>

                          <div className='col-sm-2'>
                            <label>Packing Weigth:</label>
                            <input
                              type='float'
                              className='form-control'
                              name='PackingWeigthNameModel'
                              onChange={this.onInputHandlerModel}
                              value={this.state.PackingWeigthNameModel}
                              placeholder=' Packing Weigth'
                              id=' PackingWeigthId'
                              required
                            />
                          </div>
                          <div className='col-sm-2'>
                            <label>Packing Cost:</label>
                            <input
                              type='float'
                              className='form-control'
                              name='PackingCostNameModel'
                              onChange={this.onInputHandlerModel}
                              value={this.state.PackingCostNameModel}
                              placeholder='Packing Cost'
                              id='PackingCostId'
                              required
                            />
                          </div>
                        </div>

                        <div className='col-sm-12'>
                          <div className='col-sm-4'>
                            <br />
                            <label>Packing Type:</label>
                            <br />
                            <div
                              className='custom-control custom-radio custom-control-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                className='custom-control-input'
                                id='defaultInline1'
                                name='inlineDefaultRadiosExample'
                                value='Box'
                                checked={this.state.radioModel == 'Box'}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className='custom-control-label'
                                for='faultInline1'
                              >
                                Box
                              </label>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div
                              className='custom-control custom-radio custom-control-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                className='custom-control-input'
                                id='defaultInline2'
                                name='inlineDefaultRadiosExample'
                                value='Envelope'
                                checked={this.state.radioModel == 'Envelope'}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className='custom-control-label'
                                for='defaunline2'
                              >
                                Envelope
                              </label>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div
                              className='custom-control custom-radio custom-control-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                className='custom-control-input'
                                id='defaultInline2'
                                name='inlineDefaultRadiosExample'
                                value='Flat'
                                checked={this.state.radioModel == 'Flat'}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className='custom-control-label'
                                for='defaunline2'
                              >
                                Flat
                              </label>
                            </div>
                            &nbsp;&nbsp;&nbsp;
                            <div
                              className='custom-control custom-radio custom-control-inline'
                              style={{ display: 'inline' }}
                            >
                              <input
                                type='radio'
                                className='custom-control-input'
                                id='defaultInline2'
                                name='inlineDefaultRadiosExample'
                                value='None'
                                checked={this.state.radioModel == 'None'}
                                onClick={this.handleOnChangeRadioModel}
                                required
                              />
                              <label
                                className='custom-control-label'
                                for='defaunline2'
                              >
                                None
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          onClick={() =>
                            this.clickSaveUpdate(this.state.PACKING_ID)
                          }
                        >
                          Update
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          data-dismiss='modal'
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className='col-sm-12'>
                <div className='box'>
                  <div className='box-header with-border'>
                    <h3 className='box-title'>Packing Entry Form</h3>
                    <div className='box-tools pull-right'>
                      <button
                        type='button'
                        className='btn btn-box-tool'
                        data-widget='collapse'
                      >
                        <i className='fa fa-minus' />
                      </button>
                    </div>
                  </div>

                  <div className='box-body'>
                    <form
                      onSubmit={this.handleOnsubmit}
                      ref={el => (this.myFormRef = el)}
                    >
                      <div className='col-sm-12'>
                        <div className='col-sm-4'>
                          <label>Packing Type:</label>
                          <br />
                          <div
                            className='custom-control custom-radio custom-control-inline'
                            style={{ display: 'inline' }}
                          >
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='defaultInline1'
                              name='inlineDefaultRadiosExample'
                              value='Box'
                              onClick={this.handleOnChangeRadio}
                              required
                            />
                            <label
                              className='custom-control-label'
                              for='faultInline1'
                            >
                              Box
                            </label>
                          </div>
                          &nbsp;&nbsp;&nbsp;
                          <div
                            className='custom-control custom-radio custom-control-inline'
                            style={{ display: 'inline' }}
                          >
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='defaultInline2'
                              name='inlineDefaultRadiosExample'
                              value='Envelope'
                              onClick={this.handleOnChangeRadio}
                              required
                            />
                            <label
                              className='custom-control-label'
                              for='defaunline2'
                            >
                              Envelope
                            </label>
                          </div>
                          &nbsp;&nbsp;&nbsp;
                          <div
                            className='custom-control custom-radio custom-control-inline'
                            style={{ display: 'inline' }}
                          >
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='defaultInline2'
                              name='inlineDefaultRadiosExample'
                              value='Flat'
                              onClick={this.handleOnChangeRadio}
                              required
                            />
                            <label
                              className='custom-control-label'
                              for='defaunline2'
                            >
                              Flat
                            </label>
                          </div>
                          &nbsp;&nbsp;&nbsp;
                          <div
                            className='custom-control custom-radio custom-control-inline'
                            style={{ display: 'inline' }}
                          >
                            <input
                              type='radio'
                              className='custom-control-input'
                              id='defaultInline2'
                              name='inlineDefaultRadiosExample'
                              value='None'
                              onClick={this.handleOnChangeRadio}
                              required
                            />
                            <label
                              className='custom-control-label'
                              for='defaunline2'
                            >
                              None
                            </label>
                          </div>
                        </div>

                        <div className='col-sm-3'>
                          <label>Packing Name:</label>
                          <input
                            type='char'
                            className='form-control'
                            name='PackingName'
                            onChange={this.onInputHandler}
                            placeholder='Packing Name'
                            id='PackingNameId'
                            required
                          />
                        </div>

                        <div className='col-sm-2'>
                          <label>Packing Code:</label>
                          <input
                            type='char'
                            className='form-control'
                            name='PackingCodeName'
                            onChange={this.onInputHandler}
                            placeholder=' Packing Code'
                            id=' PackingCodId'
                            required
                          />
                        </div>
                        <div className='col-sm-1'>
                          <label>Length:</label>
                          <input
                            type='float'
                            className='form-control'
                            name='LengthName'
                            onChange={this.onInputHandler}
                            placeholder='Length'
                            id='LengthId'
                            required
                          />
                        </div>
                        <div className='col-sm-1'>
                          <label>Width:</label>
                          <input
                            type='float'
                            className='form-control'
                            name='widthName'
                            onChange={this.onInputHandler}
                            placeholder='Width'
                            id='widthId'
                            required
                          />
                        </div>
                        <div className='col-sm-1'>
                          <label>Height:</label>
                          <input
                            type='float'
                            className='form-control'
                            name='HeightName'
                            onChange={this.onInputHandler}
                            placeholder='Height'
                            id='HeightId'
                            required
                          />
                        </div>
                      </div>

                      <div className='col-sm-12'>
                        <div className='col-sm-2'>
                          <label>Packing Weigth:</label>
                          <input
                            type='float'
                            className='form-control'
                            name='PackingWeigthName'
                            onChange={this.onInputHandler}
                            placeholder=' Packing Weigth'
                            id=' PackingWeigthId'
                            required
                          />
                        </div>
                        <div className='col-sm-2'>
                          <label>Packing Cost:</label>
                          <input
                            type='float'
                            className='form-control'
                            name='PackingCostName'
                            onChange={this.onInputHandler}
                            placeholder='Packing Cost'
                            id='PackingCostId'
                            required
                          />
                        </div>

                        <div className='col-sm-2'>
                          <br />
                          <button
                            type='submit'
                            className='btn btn-primary btn-md'
                            style={{ width: '45%', marginTop: '5px' }}
                          >
                            {' '}
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='box'>
                  <br />

                  <div className='row'  style={{ height: '40%', overflow_y: 'auto'}}>
                    <div className='col-sm-12'>
                      <BootstrapTable
                        data={this.props.packingData}
                        // footerData={footerData}
                        // footer
                        //rowStyle={ {overflow_y:'scroll'}
                        pagination
                        search
                        options={options}
                        
                        // totalRow={totalRow}
                        // insertRow
                        exportCSV
                        // deleteRow={true}
                        // selectRow={selectRowProp}
                        // options={options}
                      >
                        <TableHeaderColumn
                          width='9.09%'
                          export={false}
                          isKey
                          dataFormat={actionFormatter}
                          dataField='PACKING_ID'
                        >
                          Action
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          dataSort
                          dataField='PACKING_NAME'
                        >
                          Name
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          dataSort
                          dataField='PACKING_CODE'
                        >
                          Code
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          dataSort
                          dataField='PACKING_TYPE'
                        >
                          Type{' '}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          ordering
                          dataSort
                          dataField='PACKING_LENGTH'
                        >
                          Length{' '}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          ordering
                          dataSort
                          dataField='PACKING_WIDTH'
                        >
                          Width
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          ordering
                          dataSort
                          dataField='PACKING_HEIGTH'
                        >
                          Height
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          ordering
                          dataSort
                          dataField='PACKING_WEIGTH'
                        >
                          Weigth
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          ordering
                          dataSort
                          dataField='PACKING_COST'
                        >
                          CostEach
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          dataSort
                          dataField='PACKING_DATE'
                        >
                          Date
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9.09%'
                          dataSort
                          dataField='USER_NAME'
                        >
                          Entered By
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    packingData: state.packingReducer.packingData
  }
}

export default connect(
  mapStateToProps,
  action
)(PackingEntry)
