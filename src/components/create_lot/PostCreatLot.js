import React, { Component } from 'react'
import Select from 'react-select'
import { Table, Button } from 'react-bootstrap'
import NewObjectModal from './NewObjectModal.js'
import ImageSelector from './ImageSelector.js'
import NewImageSelector from './NewImageSelector.js'

class PostCreatLot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      merchant_name: '',
      selectcondition: '',
      title: '',
      mpn: '',
      brand: '',
      bin: '',
      manu: '',
      category: '',
      data: '',
      images: [],
      selectobject: '',
      merchant_id: '',
      bar_range: '0',
      start_ser_barcode: '',
      end_ser_barcode: '',
      ser_barcode: '',
      disable: false,
      dataObject: ''
    }
  }
  componentWillMount () {
    if (localStorage.getItem('userName')) {
    } else {
      this.setState({ redirectToReferrer: true })
    }
  }
  componentDidMount () {
    this.props.get_item_cond()
    this.props.get_object_cond()
  }
  HandleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  handleChange = selectcondition => {
    this.setState({
      ...this.state,
      selectcondition: selectcondition
    })
  }
  handleChangeObject = selectobject => {
    this.setState({
      ...this.state,
      selectobject: selectobject
    })
  }

  handleOnChangeRange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  showSowl = () => {
    const data = {
      save: false,
      button: true
    }
    this.props.change_Save_Lot_prop(data)
  }
  deleteBarcodeFromLot = (barcode, key) => {
    // console.log(barcode)
    // console.log(key)
    this.props.delete_Barcode_From_Lot(barcode, key)
  }

  saveLot = e => {
    e.preventDefault()

    const postedBarcodeData = {
      images: this.state.images,
      selectcondition: this.state.selectcondition.label,
      selectconditionid: this.state.selectcondition.value,
      title: this.state.title,
      mpn: this.state.mpn,
      bin: this.state.bin,
      manu: this.state.merchant_name,
      enter_manu: this.state.brand,
      category: this.state.category,
      data: this.state.data,
      user_id: localStorage.getItem('userId'),
      object_id: this.state.selectobject.value,
      merchant_id: this.state.merchant_id
    }
    // console.log(postedBarcodeData)

    this.props.save_lot_data(postedBarcodeData)
    this.setState({
      selectcondition: '',
      title: '',
      mpn: '',
      brand: '',
      bin: '',
      manu: '',
      category: '',
      data: '',
      images: [],
      selectobject: '',
      merchant_id: '',
      start_ser_barcode: '',
      end_ser_barcode: '',
      ser_barcode: ''
    })
  }
  SearchBarcode = e => {
    e.preventDefault()
    this.props.get_lot_barcode_detail(
      this.state.ser_barcode,
      this.state.merchant_name
    )

    const data = {
      save: false
    }
    this.props.change_Save_Lot_prop(data)

    this.setState({
      ser_barcode: ''
    })
  }

  searchRangeLotBarcode = e => {
    e.preventDefault()
    const data = {
      start_ser_barcode: this.state.start_ser_barcode,
      end_ser_barcode: this.state.end_ser_barcode
    }
    // console.log(data)
    this.props.get_lot_range_barcode_detail(data, this.state.merchant_name)

    const data1 = {
      save: false
    }
    this.props.change_Save_Lot_prop(data1)
    this.setState({
      start_ser_barcode: '',
      end_ser_barcode: ''
    })
  }

  onClosModalObject = () => {
    // this.setState({
    //   service: '',
    //   category_id: '',
    //   obj_name: '',
    //   obj_cost: '',
    //   obj_weig: '',
    //   title: ''
    // })
    this.props.remove_suggest_category()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.merchant_detail !== this.props.merchant_detail) {
      this.setState({
        merchant_name: this.props.merchant_detail[0].CONTACT_PERSON,
        merchant_id: this.props.merchant_detail[0].MERCHANT_ID
      })
    }

    if (
      prevProps.lot_barcode_detail != this.props.lot_barcode_detail &&
      this.props.lot_barcode_detail.length !== 0
    ) {
      const matchCond = this.props.lot_barcode_detail.map((item, i) => {
        return item.CONDIOTION || ''
      })
      const resultcond = matchCond.every(
        (val, i, matchCond) => val === matchCond[0]
      )
      // Match Categorie
      const matchCategoie = this.props.lot_barcode_detail.map((item, i) => {
        return item.CATEGORY || ''
      })

      const resultcate = matchCategoie.every(
        (val, i, matchCategoie) => val === matchCategoie[0]
      )
      const dataObject = this.props.lot_barcode_detail[0] || []
      const cond = this.props.condition.filter(
        item => dataObject.CONDIOTION == item.COND_NAME
      )
      // Match MPN
      const matchMpn = this.props.lot_barcode_detail.map((item, i) => {
        return item.MPN || ''
      })
      const resultMpn = matchMpn.every(
        (val, i, matchMpn) => val === matchMpn[0]
      )
      const selectedCondition = {
        value: cond[0].ID,
        label: cond[0].COND_NAME
      }
      if (resultcate == true && resultcond == true && resultMpn == true) {
        this.setState({
          selectcondition: selectedCondition,
          mpn: matchMpn[0],
          category: matchCategoie[0],
          bin: dataObject.BIN,
          brand: dataObject.BRAND
        })
      } else {
        this.setState({
          selectcondition: '',
          mpn: '',
          category: '',
          bin: '',
          brand: ''
        })
      }
      this.setState({
        data: this.props.lot_barcode_detail,
        dataObject: this.props.lot_barcode_detail[0]
      })
    }
    if (prevProps.images !== this.props.images) {
      const data = this.props.images.filter(img => img.addToLot === true)
      const imageArray = []
      data.map(item => {
        return imageArray.push({
          filename: item.filename,
          extension: item.extension,
          barcode: item.barcode
        })
      })

      // console.log(imageArray)
      this.setState({
        images: imageArray
      })
    }
    if (prevState.images == this.state.images && this.state.images == []) {
      this.setState(prevState => ({
        disable: !prevState.disable
      }))
    }
    if (
      prevProps.lot_barcode_detail !== this.props.lot_barcode_detail &&
      this.props.lot_barcode_detail.length === 0
    ) {
      this.setState({
        selectcondition: '',
        mpn: '',
        category: '',
        ent_bin: '',
        bin: '',
        brand: '',
        start_ser_barcode: '',
        end_ser_barcode: '',
        ser_barcode: ''
      })
    }
  }
  render () {
    // console.log(this.props.images)
    // console.log(this.state.data)
    // console.log(this.state.dataObject)
    // console.log(this.state.selectobject)
    // console.log(this.state.selectcondition)
    const barcode =
      (this.state.start_ser_barcode !== '' &&
        this.state.end_ser_barcode !== '') ||
      this.state.merchant_name !== ''
    const searchEnable =
      this.state.start_ser_barcode !== '' && this.state.end_ser_barcode !== ''
    const enablebutton =
      this.state.merchant_name !== '' &&
      this.props.lot_barcode_detail.length !== 0
    const data = []
    this.props.condition.map(item => {
      return data.push({
        value: item.ID,
        label: item.COND_NAME
      })
    })
    const Objects = []
    this.props.object.map(item => {
      return Objects.push({
        value: item.OBJECT_ID,
        label: item.OBJECT_NAME
      })
    })
    return (
      <React.Fragment>
        {/* <!-- Main content --> */}
        <div className='box'>
          <div className='box-body'>
            {/* <form onSubmit={this.saveLot}> */}
            <div className='row'>
              <div className='col-xs-12'>
                <div className='col-xs-2'>
                  <div className='form-group has-feedback'>
                    <label
                      className='control-label'
                      style={{ color: 'red', marginTop: '10px' }}
                    >
                      Range:
                    </label>
                    &nbsp;&nbsp;
                    <input
                      type='radio'
                      className='bar_range'
                      name='bar_range'
                      value='1'
                      onChange={this.handleOnChangeRange}
                      checked={this.state.bar_range === '1'}
                    />
                    &nbsp;Yes&nbsp;&nbsp;
                    <input
                      type='radio'
                      className='bar_range'
                      name='bar_range'
                      value='0'
                      onChange={this.handleOnChangeRange}
                      checked={this.state.bar_range === '0'}
                    />
                    &nbsp;No
                  </div>
                </div>
                {this.state.bar_range == 1 && this.state.bar_range != '' ? (
                  <React.Fragment>
                    <form onSubmit={this.searchRangeLotBarcode}>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <h4>
                            <span className='label label-default'>
                              Start Barcode:
                            </span>
                          </h4>
                          <div className='input-group '>
                            <input
                              type='text'
                              className='form-control ser_barcode '
                              id='start_ser_barcode'
                              name='start_ser_barcode'
                              value={this.state.start_ser_barcode}
                              onChange={this.HandleOnChange}
                              placeholder='Search Barcode '
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <h4>
                            <span className='label label-default'>
                              End Barcode:
                            </span>
                          </h4>
                          <div className='input-group '>
                            <input
                              type='text'
                              className='form-control ser_barcode '
                              id='end_ser_barcode'
                              name='end_ser_barcode'
                              value={this.state.end_ser_barcode}
                              onChange={this.HandleOnChange}
                              placeholder='Search Barcode '
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-xs-1'>
                        <div
                          className='form-group'
                          style={{ marginTop: '37px' }}
                        >
                          <button
                            type='submit'
                            size='xs'
                            className='btn btn-primary btn-block btn-flat float-right btn-sm'
                            // onClick={this.searchRangeLotBarcode}
                            disabled={!searchEnable}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </React.Fragment>
                ) : this.state.bar_range == 0 && this.state.bar_range != '' ? (
                  <React.Fragment>
                    <div className='col-sm-3'>
                      <h4>
                        <span className='label label-default'>
                          Search Barcode:
                        </span>
                      </h4>
                      <form onSubmit={this.SearchBarcode}>
                        <div className='input-group '>
                          <input
                            type='text'
                            className='form-control ser_barcode '
                            id='ser_barcode'
                            name='ser_barcode'
                            value={this.state.ser_barcode}
                            onChange={this.HandleOnChange}
                            placeholder='Search Barcode '
                          />
                          <div className='input-group-btn'>
                            <button
                              className='btn btn-info '
                              id='click_ser_barcode'
                              type='submit'
                              // onClick={this.SearchBarcode}
                            >
                              <i className='glyphicon glyphicon-search' />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </React.Fragment>
                ) : (
                  ''
                )}
              </div>
            </div>
            <form onSubmit={this.saveLot}>
              <div className='col-xs-12'>
                <div className='col-sm-2'>
                  <h4>
                    <span className='label label-default'>Merchant Name:</span>
                  </h4>
                  <div className='form-group '>
                    <input
                      type='text'
                      className='form-control  '
                      name='merchant_name'
                      placeholder='Enter Title'
                      value={this.state.merchant_name || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className='col-sm-4'>
                  <h4>
                    <span className='label label-default'>Enter Title:</span>
                  </h4>
                  <div className='form-group '>
                    <input
                      type='text'
                      className='form-control  '
                      id='ent_title'
                      name='title'
                      onChange={this.HandleOnChange}
                      placeholder='Enter Title'
                      value={this.state.title || ''}
                      required
                    />
                  </div>
                </div>

                <div className='col-sm-2'>
                  <h4>
                    <span className='label label-default'>
                      Select Condition:
                    </span>
                  </h4>
                  <div className='form-group has-feedback' id='selectcondition'>
                    <Select
                      id='selectcondition'
                      options={data}
                      value={this.state.selectcondition}
                      onChange={this.handleChange}
                      className='basic-single'
                      classPrefix='select'
                      required
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <h4>
                    <span className='label label-default'>Select Object:</span>
                  </h4>
                  <div className='form-group has-feedback' id='selectobject'>
                    <Select
                      id='selectobject'
                      options={Objects}
                      value={this.state.selectobject}
                      onChange={this.handleChangeObject}
                      className='basic-single'
                      classPrefix='select'
                      required
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <h4>
                    <span className='label label-default'>Enter Category:</span>
                  </h4>
                  <div className='form-group '>
                    <input
                      type='number'
                      className='form-control  '
                      id='ent_cat_id'
                      name='category'
                      value={this.state.category || ''}
                      onChange={this.HandleOnChange}
                      placeholder='Enter Category Id'
                      required
                    />
                  </div>
                </div>
              </div>
              {/* </div> */}
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='col-sm-2'>
                    <h4>
                      <span className='label label-default'>Enter Mpn:</span>
                    </h4>
                    <div className='form-group '>
                      <input
                        type='text'
                        className='form-control  '
                        id='enter_mp'
                        name='mpn'
                        value={this.state.mpn || ''}
                        onChange={this.HandleOnChange}
                        placeholder='Enter Mpn'
                      />
                    </div>
                  </div>
                  <div className='col-sm-2'>
                    <h4>
                      <span className='label label-default'>
                        Enter Manufacture:
                      </span>
                    </h4>
                    <div className='form-group '>
                      <input
                        type='text'
                        className='form-control  '
                        id='brand'
                        name='brand'
                        value={this.state.brand || ''}
                        onChange={this.HandleOnChange}
                        placeholder='Enter Manufacture'
                        required
                      />
                    </div>
                  </div>
                  <div className='col-sm-2'>
                    <h4>
                      <span className='label label-default'>Enter Bin:</span>
                    </h4>
                    <div className='form-group '>
                      <input
                        type='text'
                        className='form-control  '
                        id='ent_bin'
                        min='1'
                        name='bin'
                        value={this.state.bin || ''}
                        onChange={this.HandleOnChange}
                        placeholder='Enter Bin'
                      />
                    </div>
                  </div>
                  <div className='col-sm-2 p-t-26'>
                    <h4>
                      <span className='label label-default' />
                    </h4>
                    <div className='form-group' style={{ marginTop: '35px' }}>
                      {this.props.save === true ? (
                        <button
                          type='submit'
                          className='btn btn-primary btn-block btn-flat'
                          disabled={!enablebutton}
                        >
                          Save Lot
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='btn btn-primary btn-block btn-flat'
                          // disabled={!enablebutton}
                          onClick={this.showSowl}
                        >
                          Save Lots
                        </button>
                      )}
                    </div>
                  </div>
                  <div className='col-sm-2 p-t-26'>
                    <h4>
                      <span className='label label-default' />
                    </h4>
                    <div className='form-group' style={{ marginTop: '35px' }}>
                      <button
                        type='button'
                        className='btn btn-primary btn-block btn-flat'
                        data-toggle='modal'
                        size='xs'
                        data-target='#myModalSearch'
                        onClick={this.sendDataToSearch}
                        data-dismiss='modal'
                      >
                        New Obj
                      </button>
                    </div>
                  </div>
                  {/* <div className='col-sm-2 p-t-26'>
                    <h4>
                      <span className='label label-default' />
                    </h4>
                    <div className='form-group' style={{ marginTop: '35px' }}>
                      <button
                        type='button'
                        className='btn btn-primary btn-block btn-flat'
                        data-toggle='modal'
                        size='xs'
                        // disabled={!barcode}
                        data-target='#SelectImageModal'
                        // onClick={this.sendDataToSearch}
                        data-dismiss='modal'
                      >
                        Select Image
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
        {/**

                Display Images

            */}
        {this.props.images.length !== 0 ? (
          <div className='row'>
            <div className='col-xs-12'>
              <NewImageSelector {...this.props} />
            </div>
          </div>
        ) : (
          ''
        )}
        {/*

                            Display Data In Table

                        */}

        <div className='row'>
          <div className='col-xs-12'>
            <div className='box'>
              <div className='box-header'>
                <h3 className='box-title'>Posted Barcode Details</h3>
              </div>
              <div className='box-body'>
                <Table
                  responsive
                  id='table'
                  className='table table-bordered table-hover'
                >
                  <thead>
                    <tr>
                      <th> Sr No. </th>
                      <th> Barcode </th>
                      {/* <th>TOKEN</th> */}
                      <th> Item Description </th>
                      <th> Brand </th>
                      <th> MPN </th>
                      <th> UPC </th>
                      <th> Condition </th>
                      <th> Cost </th>
                      <th> Weight </th>
                      <th> Category </th>
                      <th> Delete </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(this.props.lot_barcode_detail || []).map((data, key) => (
                      <tr key={key}>
                        <td>{data.ITEM_ID}</td>
                        <td>{data.BARCODE_NO}</td>
                        <td>{data.TITLE}</td>
                        <td>{data.BRAND}</td>
                        <td>{data.MPN}</td>
                        <td>{data.UPC}</td>
                        <td>{data.CONDIOTION}</td>
                        <td>{data.COST_PRICE}</td>
                        <td>{data.WEIGHT}</td>
                        <td>{data.CATEGORY}</td>
                        <td>
                          <Button
                            type='button'
                            size='sm'
                            className='btn btn-danger'
                            onClick={() =>
                              this.deleteBarcodeFromLot(data.BARCODE_NO, key)
                            }
                          >
                            <span
                              className='glyphicon glyphicon-trash p-b-5'
                              aria-hidden='true'
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        {/* Modal New Object */}
        <section className='content'>
          <div className='row'>
            <div className='modal fade' id='myModalSearch' role='dialog'>
              <div className='modal-dialog' style={{ width: '80%' }}>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      onClick={this.onClosModalObject}
                    >
                      &times;
                    </button>
                    <h4 className='modal-title'> Update Data</h4>
                  </div>
                  <div className='modal-body'>
                    <NewObjectModal {...this.props} />
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-danger'
                      style={{ marginTop: '2%' }}
                      data-dismiss='modal'
                      onClick={this.onClosModalObject}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Modal For ultiple Image */}
        <section className='content'>
          <div className='row'>
            <div className='modal fade' id='SelectImageModal' role='dialog'>
              <div className='modal-dialog' style={{ width: '50%' }}>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      // disabled={this.state.disable}
                    >
                      &times;
                    </button>
                    <h4 className='modal-title'>Select Multiple Image</h4>
                  </div>
                  <div className='modal-body'>
                    <ImageSelector {...this.props} />
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-danger'
                      style={{ marginTop: '2%' }}
                      data-dismiss='modal'
                      // disabled={this.state.disable}
                    >
                      Close
                    </button>
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

export default PostCreatLot
