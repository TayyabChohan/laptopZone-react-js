import React, { Component } from 'react'
import {
  BootstrapTable,
  TableHeaderColumn,
  Dropdown
} from 'react-bootstrap-table'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
// import makeAnimated from 'react-select/lib/animated';
// import { colourOptions } from './data';
import {
  packingOrderDrop, marchantDrop, getPackingOrderDetail, upDatePostage,
  insertPackingDetail, detailInsertPackingName, insertPacking2,
  listViewPackingName, deleteListItem, upDateDemension
} from '../../actions/packingOrderAction.jsx'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import AlertMessage from '../../components/messages/AlertMessage.js'

const action = {
  packingOrderDrop,
  marchantDrop,
  getPackingOrderDetail,
  upDatePostage,
  insertPackingDetail,
  detailInsertPackingName,
  listViewPackingName,
  deleteListItem,
  insertPacking2,
  upDateDemension
}

const jobs = []

const onAfterSaveCell = (row, cellName, cellValue) => {
  if (row.LZ_SALESLOAD_DET_ID) {
    const data = {
      POSTAGE: row.POSTAGE.replace('$', ''),
      LZ_SALESLOAD_DET_ID: row.LZ_SALESLOAD_DET_ID
    }

    that.props.upDatePostage(data)
  }

  if (row.ITEMS_ID) {
    const data2 = {
      LWH: row.LWH,
      item_id: row.ITEMS_ID,

    }
    that.props.upDateDemension(data2)
  }
}

const onBeforeSaveCell = (row, cellName, cellValue) => {
  let value
  if (cellName == 'POSTAGE') {
    value = cellValue.replace('$', '')
    return value > 0
  }
  if (cellName == 'LWH') {
    value = cellValue.replace('x', '')
    return value
  }
  // console.log(value)
  // return cellValue > 0
}

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell
}

// const actionFormatter = (cell, row) => {

// return (
// <div>
// <button className='btn btn-danger glyphicon glyphicon-trash' call="list" id="item_list" onClick={() => console.log(cell, row)}></button>
// {/ <button type="button" className="btn btn-primary glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal" onClick={() => that.clickUpdate(cell, row)} ></button> /}

// </div>

// );
// }

var selectpackingNameTableArray = []
class MultipleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectPackingNameTable: ''
    }
  }

  handleDrowpChange = selectPackingNameTable => {
    this.setState({
      selectPackingNameTable: selectPackingNameTable
    })
  }

  OnClickdetailUpdate = (row, cell) => {
    that.setState({
      ORDER_PACKING_DT_ID: row.ORDER_PACKING_DT_ID,
      pakingId: row.PACKING_ID,
      ORDER_ID: row.ORDER_ID,
      ORDER_PACKING_ID: row.ORDER_PACKING_ID,
      ebayId: row.ITEM_ID,
      title: row.ITEM_TITLE,
      postage: row.POSTAGE,
      quantity: row.QUANTITY,
      price: row.SALE_PRICE,
      date: row.SELLING_DATE,
      demesion: row.LWH,
      Shipingservice: row.SHIPPING_SERVICE
    })
    // const id = row.ORDER_PACKING_ID[0].value
    console.log(row.ITEM_ID)
    // console.log(row.ORDER_PACKING_ID)
    const id = row.ORDER_PACKING_ID.value
      ? row.ORDER_PACKING_ID.value
      : row.ORDER_PACKING_ID
    // console.log(id)
    that.props.listViewPackingName(id)
  }

  savePackingName = row => {
    // const { selectPackingNameTable } = this.state;
    // selectPackingNameTable = selectPackingNameTable;

    const data1 = {
      MERCHANT_ID: that.state.selectMarchant.value,
      ORDER_ID: this.props.row.ORDER_ID,
      PACKING_ID: this.state.selectPackingNameTable,
      PACKING_BY: localStorage.getItem('userId'),
      ITEMS_ID: this.props.row.ITEMS_ID,
      QUANTITY: this.props.row.QUANTITY,
      item_id: this.props.row.ITEM_ID
    }
    // alert(selectPackingNameTable);
    if (!this.state.selectPackingNameTable) {
      alert('Plaese select data')
      return false
    }
    //console.log(data1)
    //console.log(this.props.row.ITEM_ID)
    // console.log(this.state.selectPackingNameTable)
    that.props.insertPackingDetail(data1)
    this.state.selectPackingNameTable = ''
    // that.setState({
    //   selectPackingNameTable: null
    // })
  }

  render() {
    // console.log(this.props.row.QUANTITY)
    // console.log(this.props.row.ITEMS_ID)
    const dropValue = []
    that.props.OrderData.map(item =>
      dropValue.push({
        value: item.PACKING_ID,
        label: item.PACKING_NAME
      })
    )

    // console.log(colourOptions)
    return (
      <React.Fragment>
        <div className='col-sm-12'>
          {this.props.row.ORDER_PACKING_ID == null ? (
            <Select
              id='servicetype'
              //   name='selectPackingNameTable'
              options={dropValue}
              value={this.state.selectPackingNameTable}
              onChange={this.handleDrowpChange}
              className='basic-multi-select'
              classNamePrefix='select'
              isSearchable
              // required
              // select-option
              isMulti
            />
          ) : (
              ''
            )}

          {this.props.row.ORDER_PACKING_ID == null ? (
            <button
              title='Save'
              className='btn btn-primary'
              onClick={() => this.savePackingName(this.props.row)}
            >
              <span className='glyphicon glyphicon-ok' aria-hidden='true' />
            </button>
          ) : (
              ''
            )}

          {this.props.row.ORDER_PACKING_ID == null ? (
            ''
          ) : (
              <button
                title='Update'
                className='btn btn-success'
                data-toggle='modal'
                data-target='#myModal'
                onClick={() =>
                  this.OnClickdetailUpdate(this.props.row, this.props.cell)
                }
              >
                <span className='glyphicon glyphicon-tasks' aria-hidden='true' />
              </button>
            )}
        </div>
      </React.Fragment>
    )
  }
}

function multipleSelect(cell, row) {
  return <MultipleSelect cell={cell} row={row} />
}

const ebayLink = (cell, row) => {
  var link = 'https://www.ebay.com/itm/' + row.ITEM_ID
  return (
    <a href={link} target='_blank'>
      {row.ITEM_ID}
    </a>
  )
}

var that = ''
const onAfterSaveCell1 = (row, cellName, cellValue) => {
  const data = {
    item_id: row.ITEM_ID,
    cellName: cellName,
    cellValue: Number(cellValue).toFixed(2),
    user_id: localStorage.getItem('userId')
  }
  // console.log(data)
  // that.props.update_product_detail(data)
  // alert(`Save cell ${cellName} with value ${cellValue} with ${row.DT_ID}`)
}

const onBeforeSaveCell1 = (row, cellName, cellValue) => {
  // You can do any validation on here for editing value,
  // return false for reject the editing

  return cellValue > 0 || cellValue === ''
  // console.log(cellValue)
  // return true
}

// const dataFormet = (cell, row) => {
//   let value = (row.LWH)
//   value = value.toFixed(2)
//   return value
// }
class PackingOrder extends Component {
  constructor(props) {
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
      // OrderData:[],
      selectPackingName: '',
      selectMarchant: '',
      detail: '',
      ORDER_ID: '',
      POSTAGE: '',
      PACKING_NAME: '',
      ITEMS_ID: '',
      QUANTITY: '',
      id: '',
      MERCHANT_ID: '',
      ebayId: '',
      title: '',
      quantity: '',
      date: '',
      price: '',
      Shipingservice: '',
      postage: '',
      pakingId: '',
      orderId: '',
      orderPackingId: '',
      ORDER_PACKING_ID: '',
      //   selectPackingNameTable: '',
      ORDER_PACKING_DT_ID: '',
      PackingNameModel: '',
      PackingCodeNameModel: '',
      LengthNameModel: '',
      widthNameModel: '',
      HeightNameModel: '',
      PackingWeigthNameModel: '',
      PackingCostNameModel: '',
      radioModel: '',
      packingData: [],
      PACKING_COST: '',
      charges: '',
      PACKING_ID: '',
      radio: '',
      inlineDefaultRadiosExample: '',
      selectPackingNameTable1: ''
    }
    // this.handleOnChangeRadioModel = this.handleOnChangeRadioModel.bind(this);
    // this.clickUpdate = this.clickUpdate.bind(this);
    // this.clickSaveUpdatepacking = this.clickSaveUpdatepacking.bind(this)
  }

  handleOnChangeRadioModel = event => {
    this.setState({
      inlineDefaultRadiosExample: event.target.value
    })
  }
  onInputHandlerModel = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  clickSaveUpdatepacking = () => {
    //   e.preventDefault();
    const { inlineDefaultRadiosExample } = this.state
    const data = {
      PACKING_TYPE: inlineDefaultRadiosExample,
      PACKING_NAME: this.state.PackingNameModel,
      PACKING_CODE: this.state.PackingCodeNameModel,
      PACKING_LENGTH: Number(this.state.LengthNameModel).toFixed(2),
      PACKING_WIDTH: Number(this.state.widthNameModel).toFixed(2),
      PACKING_WEIGTH: Number(this.state.PackingWeigthNameModel).toFixed(2),
      PACKING_COST: Number(this.state.PackingCostNameModel).toFixed(2),
      PACKING_HEIGTH: Number(this.state.HeightNameModel).toFixed(2),
      //   PACKING_CODE: this.state.PackingCodeNameModel,
      //   PACKING_LENGTH: this.state.LengthNameModel,
      //   PACKING_WIDTH: this.state.widthNameModel,
      //   PACKING_HEIGTH: this.state.HeightNameModel,
      //   PACKING_WEIGTH: this.state.PackingWeigthNameModel,
      //   PACKING_COST: this.state.PackingCostNameModel,
      created_by: localStorage.getItem('userId')
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
    }
    if (this.state.inlineDefaultRadiosExample == '') {
      alert('please enter packing type')
      return false
    }
    this.props.insertPacking2(data)
    this.setState({
      PackingCostNameModel: '',
      PackingWeigthNameModel: '',
      PackingCodeNameModel: '',
      HeightNameModel: '',
      widthNameModel: '',
      LengthNameModel: '',
      PackingNameModel: '',
      inlineDefaultRadiosExample: null
    })
  }

  componentDidMount() {
    this.props.packingOrderDrop()
    this.props.marchantDrop()
  }

  onInputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onHandleMarchantDrop = (selectMarchant, id) => {
    this.setState({
      selectMarchant: selectMarchant
      // id: selectMarchant.value
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectMarchant !== this.state.selectMarchant) {
      const id = this.state.selectMarchant.value
      this.props.getPackingOrderDetail(id)
    }
  }
  onClickdeleteList = (id, order_id, ebayId) => {
    // console.log(order_id)
    // console.log(id)
    this.props.deleteListItem(id, order_id, ebayId)
  }

  clickSaveUpdate = id => {
    // console.log(this.state.selectPackingNameTable[0].value)
    const order_packing_id = id.value ? id.value : id
    // console.log(order_packing_id)
    const data = {
      pakingId: this.state.selectPackingNameTable1,
      ORDER_PACKING_ID: order_packing_id
    }
    // console.log(this.state.selectPackingNameTable1)
    this.props.detailInsertPackingName(data)
    this.setState({
      selectPackingNameTable1: ''
    })
  }

  handleDrowpChange1 = selectPackingNameTable1 => {
    this.setState({
      selectPackingNameTable1: selectPackingNameTable1
    })
  }

  componentWillMount() {
    if (localStorage.getItem("userName")) {
      console.log("setion find");
    } else {
      this.setState({ redirectToReferrer: true });
    }
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }

  render() {

    if (this.state.redirectToReferrer) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    // console.log(this.props.packingNameList.ORDER_ID);
    const enable = this.state.selectPackingNameTable1 != ''

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
          value: this.props.packingDetaildata.length
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
      paginationPosition: 'both', // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }

    const dropValue = []
    const drop = ['2', '3', '4']
    // console.log(this.props.OrderData)
    this.props.OrderData.map(item =>
      dropValue.push({
        value: item.PACKING_ID,
        label: item.PACKING_NAME
      })
    )
    const valuesss = []
    this.props.OrderData.map(item =>
      valuesss.push({
        label: item.PACKING_NAME,
        value: item.PACKING_ID
      })
    )

    // console.log("valuess", valuesss.map(item => item.label))
    let dataArray = valuesss.map(item => item.label + '-' + item.value)
    // console.log("array", dataArray)

    const PACKING_IDS = this.props.packingDetaildata.map(
      item => item.PACKING_IDS
    )
    // console.log(PACKING_IDS);

    // console.log(PACKING_IDS.split(',').length)
    const dropMarchantvalue = []
    // console.log(this.props.OrderData)
    this.props.marchantData.map(item =>
      dropMarchantvalue.push({
        value: item.MERCHANT_ID,
        label: item.BUISNESS_NAME
      })
    )

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
              Order Packing Form
              <small>Control panel</small>
            </h1>
            <ol className='breadcrumb'>
              <li>
                <p>Home</p>
              </li>
              <li className='active'> Order Packing Form</li>
            </ol>
          </section>

          <section className='content'>
            <div className='row'>
              <div className='modal fade' id='myModal1' role='dialog'>
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
                      <h4 className='modal-title'>Add Packing</h4>
                    </div>
                    {/* <form onSubmit={this.clickSaveUpdatepacking}> */}
                    <div className='modal-body'>
                      <div className='col-sm-12'>
                        <div className='col-sm-3'>
                          <label>Packing Name:</label>
                          <input
                            type='text'
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
                            type='text'
                            className='form-control'
                            name='PackingCodeNameModel'
                            value={this.state.PackingCodeNameModel}
                            onChange={this.onInputHandlerModel}
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
                            value={this.state.LengthNameModel}
                            onChange={this.onInputHandlerModel}
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
                            name='widthNameModel' F
                            value={this.state.widthNameModel}
                            onChange={this.onInputHandlerModel}
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
                            value={this.state.HeightNameModel}
                            onChange={this.onInputHandlerModel}
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
                            value={this.state.PackingWeigthNameModel}
                            onChange={this.onInputHandlerModel}
                            placeholder='Packing Weigth'
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
                            value={this.state.PackingCostNameModel}
                            onChange={this.onInputHandlerModel}
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
                        className='btn btn-default'
                        // data-dismiss='modal'
                        onClick={() =>
                          this.clickSaveUpdatepacking(this.state.PACKING_ID)
                        }
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        className='btn btn-default'
                        data-dismiss='modal'
                      >
                        Cancel
                      </button>
                    </div>
                    {/* </form > */}
                  </div>
                </div>
              </div>

              <div className='modal fade' id='myModal' role='dialog'>
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
                      <h4 className='modal-title'>Update Packing Name</h4>
                    </div>
                    {/* <form onSubmit={() => this.handleModleOnsubmit()} */}
                    {/* ref={el => (this.myFormRef = el)}
> */}
                    <div className='modal-body'>
                      <div className='col-sm-12'>
                        <div className='col-sm-3'>
                          <label>ebay Id:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='ebayId'
                            value={this.state.ebayId}
                            onChange={this.onInputHandler}
                            placeholder='ebay Id'
                            id='ebayId'
                            readOnly
                            required
                          />
                        </div>
                        <div className='col-sm-6'>
                          <label>Title:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='title'
                            value={this.state.title}
                            onChange={this.onInputHandler}
                            placeholder='Title'
                            id='titleId'
                            readOnly
                            required
                          />
                        </div>

                        <div className='col-sm-3'>
                          <label>Quantity:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='quantity'
                            value={this.state.quantity}
                            onChange={this.onInputHandler}
                            placeholder='Quantity'
                            id='quantityId'
                            readOnly
                            required
                          />
                        </div>
                      </div>

                      <div className='col-sm-12'>
                        <div className='col-sm-2'>
                          <label>Date:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='date'
                            value={this.state.date}
                            onChange={this.onInputHandler}
                            placeholder='Date'
                            id='dateId'
                            readOnly
                            required
                          />
                        </div>
                        <div className='col-sm-2'>
                          <label>Price:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='price'
                            value={this.state.price}
                            onChange={this.onInputHandler}
                            placeholder='Price'
                            id='priceId'
                            readOnly
                            required
                          />
                        </div>

                        <div className='col-sm-2'>
                          <label>Shiping Service:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='Shipingservice'
                            value={this.state.Shipingservice}
                            onChange={this.onInputHandler}
                            placeholder='Shiping Service'
                            id='SHIPPINGSERVICEid'
                            readOnly
                            required
                          />
                        </div>

                        <div className='col-sm-2'>
                          <label>Postage:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='postage'
                            value={this.state.postage}
                            onChange={this.onInputHandler}
                            placeholder='Postage'
                            id='POSTAGEid'
                            readOnly
                            required
                          />
                        </div>
                        <div className='col-sm-3'>
                          <label>Demension:</label>
                          <input
                            type='text'
                            className='form-control'
                            name='demesion'
                            value={this.state.demesion}
                            onChange={this.onInputHandler}
                            placeholder='Demension'
                            id='demensionId'
                            readOnly
                            required
                          />
                        </div>
                      </div>

                      <div className='col-sm-12'>
                        <div className='col-sm-5'>
                          <label>Packing Name:</label>
                          <div
                            className='form-group has-feedback'
                            style={{ width: '100%' }}
                          >
                            <Select
                              id='servicetype'
                              // defaultValue={dropValue[1]}
                              //   name='selectPackingName'
                              options={dropValue}
                              value={this.state.selectPackingNameTable1}
                              onChange={this.handleDrowpChange1}
                              className='basic-multi-select'
                              classNamePrefix='select'
                              isSearchable
                              required
                              select-option
                              isMulti


                            // formatGroupLabel={formatGroupLabel}
                            />
                          </div>
                        </div>
                        <br />
                        <div className='col-sm-3'>
                          <button
                            type='submit'
                            className='btn btn-success'
                            style={{ marginTop: '2%' }}
                            disabled={!enable}
                            onClick={() =>
                              this.clickSaveUpdate(this.state.ORDER_PACKING_ID)
                            }
                          >
                            Save
                          </button>
                          &nbsp;&nbsp;&nbsp;
                        </div>
                      </div>

                      <div className='col-sm-12'>
                        <div class='modal-body'>
                          <div className='row'>
                            <div className='col-sm-5 w3-display-container'>
                              <label for='no_of_item'> Paking Name </label>
                              <ul className='list-group'>
                                {(this.props.packingNameList || []).map(
                                  (item, key) => (
                                    <li className='list-group-item' key={key}>
                                      {item.PACKING_NAME}
                                      <button
                                        className='btn btn-danger glyphicon glyphicon-trash pull-right'
                                        style={{ marginTop: '-2%' }}
                                        onClick={() =>
                                          this.onClickdeleteList(
                                            item.ORDER_PACKING_DT_ID,
                                            this.state.ORDER_ID,
                                            this.state.ebayId

                                          )
                                        }
                                      />
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-danger'
                        data-dismiss='modal'
                      >
                        Close
                      </button>
                    </div>
                    {/* </form > */}
                  </div>
                </div>
              </div>

              <div className='col-sm-12'>
                <div className='box'>
                  <div className='box-header with-border'>
                    <h3 className='box-title'>Order Packing Form</h3>
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
                        <div className='col-sm-3'>
                          <label>Merchant:</label>
                          <div
                            className='form-group has-feedback'
                            style={{ width: '100%' }}
                          >
                            <Select
                              id='servicetype'
                              // defaultValue={dropValue[1]}
                              name='selectPackingNamemarchant'
                              options={dropMarchantvalue}
                              value={this.state.selectMarchant}
                              onChange={this.onHandleMarchantDrop}
                              className='basic-single'
                              classNamePrefix='select'
                              isSearchable
                              required
                              select-option


                            // formatGroupLabel={formatGroupLabel}
                            />
                          </div>
                        </div>

                        <div className='col-sm-9'>
                          <br />

                          <button
                            type='button'
                            className='btn btn-primary pull-right'
                            data-target='#myModal1'
                            data-toggle='modal'
                            id='myModal1'
                          >
                            Add Packing
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

                  <div className='row'>
                    <div className='col-sm-12'>
                      <BootstrapTable
                        cellEdit={cellEditProp}
                        // insertRow={ true }
                        data={this.props.packingDetaildata || []}
                        // footerData={footerData}
                        // footer
                        pagination
                        search
                        trClassName={this.trClassFormat}
                        options={options}
                        // totalRow={totalRow}
                        // insertRow
                        exportCSV
                      // deleteRow={true}
                      // selectRow={selectRowProp}
                      // options={options}
                      >
                        <TableHeaderColumn
                          width='5%'
                          iskey
                          editable={false}
                          export={false}
                          dataField='SALES_RECORD_NUMBER'
                        >
                          ORDER ID{' '}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          editable={false}
                          dataSort
                          dataFormat={ebayLink}
                          dataField='ITEM_ID'
                        >
                          EBAY ID
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          editable={false}
                          dataSort
                          dataField='ITEMS_ID'
                          hidden
                        >
                          Item ID
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          editable={false}
                          dataSort
                          dataField='ITEM_TITLE'
                        >
                          TITLE{' '}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          editable={false}
                          ordering
                          dataSort
                          dataField='QUANTITY'
                        >
                          QUANTITY{' '}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          editable={false}
                          ordering
                          dataSort
                          dataField='SALE_PRICE'
                        >
                          PRICE
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          editable={false}
                          dataSort
                          dataField='SHIPPING_SERVICE'
                        >
                          SHIPPING SERVICE
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          dataSort
                          dataField='LWH'
                          //   dataFormat={dataFormet}
                          editable={{ type: 'textarea' }}
                        >
                          L x W x H
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          dataSort
                          dataField='POSTAGE'
                          editable={{ type: 'textarea' }}
                        >
                          POSTAGE
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          dataSort
                          dataField='USER_NAME'
                          editable={false}
                        >
                          User Name
                        </TableHeaderColumn>

                        <TableHeaderColumn
                          width='9%'
                          dataSort
                          dataField='ORDER_PACKING_ID'
                          hidden
                        >
                          User Name
                        </TableHeaderColumn>
                        {/* <TableHeaderColumn width='11.11%' editable={false} dataSort={true} dataField='PACKING_ID' editable={{ type: 'select', options: { values: dataArray } }}>PACKING DETAIL</TableHeaderColumn > */}
                        <TableHeaderColumn
                          width='13%'
                          editable={false}
                          dataSort
                          dataField='PACKING_ID'
                          dataFormat={multipleSelect}
                        >
                          PACKING DETAIL
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='13%'
                          editable={false}
                          dataSort
                          isKey
                          dataField='ORDER_ID'
                          hidden
                        >
                          order_Id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          width='9%'
                          dataSort
                          dataField='TRACKING_NUMBER'
                          editable={false}
                        >
                          Tracking Number
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <AlertMessage />
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    OrderData: state.packingOrderReducer.OrderData,
    marchantData: state.packingOrderReducer.marchantData,
    packingDetaildata: state.packingOrderReducer.packingDetaildata,
    packingNameList: state.packingOrderReducer.packingNameList,
    packingData: state.packingReducer.packingData

  }
}

export default connect(
  mapStateToProps,
  action
)(PackingOrder)
