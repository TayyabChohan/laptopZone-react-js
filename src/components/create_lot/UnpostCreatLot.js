import React, { Component } from 'react'
import Select from 'react-select'
import { Table, Button } from 'react-bootstrap'
import NewObjectModal from './NewObjectModal.js'
import UnPostImageSelector from './UnPostImageSelector.js'
import UnpostNewImageSelector from './UnpostNewImageSelector.js'
class UnpostCreatLot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      merchant_name: '',
      data: '',
      images: [],
      merchant_id: '',
      bar_range: '0',
      disable: false,
      dataObject: '',
      UnpostLot: false,
      unpostedselectcondition: '',
      unpostedtitle: '',
      unpostedmpn: '',
      unpostedbrand: '',
      unpostedbin: '',
      unpostedmanu: '',
      unpostedcategory: '',
      unpostedselectobject: '',
      unpostedimages: [],
      unposteddata: '',
      unposteddataObject: '',
      unpoststart_ser_barcode: '',
      unpostend_ser_barcode: '',
      unpostser_barcode: ''
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

  handleUnpostedChange = unpostedselectcondition => {
    this.setState({
      ...this.state,
      unpostedselectcondition: unpostedselectcondition
    })
  }
  handleChangeUnpostedObject = unpostedselectobject => {
    this.setState({
      ...this.state,
      unpostedselectobject: unpostedselectobject
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
    this.props.change_Save_Lot_prop_unpost(data)
  }

  deleteUnPostedBarcodeFromLot = (barcode, key) => {
    this.props.delete_UnPosted_Barcode_From_Lot(barcode, key)
  }

  saveLot = e => {
    e.preventDefault()
    const unPostedBarcodeData = {
      images: this.state.unpostedimages,
      selectcondition: this.state.unpostedselectcondition.label,
      selectconditionid: this.state.unpostedselectcondition.value,
      title: this.state.unpostedtitle,
      mpn: this.state.unpostedmpn,
      bin: this.state.unpostedbin,
      manu: this.state.merchant_name,
      enter_manu: this.state.unpostedbrand,
      category: this.state.unpostedcategory,
      data: this.state.unposteddata,
      user_id: localStorage.getItem('userId'),
      object_id: this.state.unpostedselectobject.value,
      merchant_id: this.state.merchant_id
    }
    // console.log(unPostedBarcodeData)

    this.props.save_unposted_lot_data(unPostedBarcodeData)
    this.setState({
      unpostedselectcondition: '',
      unpostedtitle: '',
      unpostedmpn: '',
      unpostedbrand: '',
      unpostedbin: '',
      unpostedmanu: '',
      unpostedcategory: '',
      unpostedselectobject: '',
      unpostedimages: [],
      unposteddata: '',
      unposteddataObject: '',
      unpoststart_ser_barcode: '',
      unpostend_ser_barcode: '',
      unpostser_barcode: ''
    })
  }
  SearchBarcode = e => {
    e.preventDefault()
    this.props.get_lot_unposted_barcode_detail(
      this.state.unpostser_barcode,
      this.state.merchant_name
    )
    const data = {
      save: false
    }
    this.props.change_Save_Lot_prop_unpost(data)

    this.setState({
      unpostser_barcode: ''
    })
  }

  searchRangeLotBarcode = e => {
    e.preventDefault()

    const unpostData = {
      start_ser_barcode: this.state.unpoststart_ser_barcode,
      end_ser_barcode: this.state.unpostend_ser_barcode
    }
    // console.log(data)

    this.props.get_lot_range_unposted_barcode_detail(
      unpostData,
      this.state.merchant_name
    )
    const data1 = {
      save: false
    }

    this.props.change_Save_Lot_prop_unpost(data1)
    this.setState({
      unpoststart_ser_barcode: '',
      unpostend_ser_barcode: ''
    })
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.merchant_detail !== this.props.merchant_detail) {
      this.setState({
        merchant_name: this.props.merchant_detail[0].CONTACT_PERSON,
        merchant_id: this.props.merchant_detail[0].MERCHANT_ID
      })
    }
    /*
     *
     *   UnPosted
     *
     */

    if (
      prevProps.lot_unposted_barcode_detail !==
        this.props.lot_unposted_barcode_detail &&
      this.props.lot_unposted_barcode_detail.length !== 0
    ) {
      const matchCond = this.props.lot_unposted_barcode_detail.map(
        (item, i) => {
          return item.CONDIOTION
        }
      )
      const resultcond = matchCond.every(
        (val, i, matchCond) => val === matchCond[0]
      )
      const dataObject = this.props.lot_unposted_barcode_detail[0] || []
      const cond = this.props.condition.filter(
        item => dataObject.CONDITION == item.COND_NAME
      )
      // console.log(cond)
      // Match MPN
      const matchMpn = this.props.lot_unposted_barcode_detail.map((item, i) => {
        return item.MPN || ''
      })
      const resultMpn = matchMpn.every(
        (val, i, matchMpn) => val === matchMpn[0]
      )
      const selectedCondition = {
        value: cond[0].ID,
        label: cond[0].COND_NAME
      }
      if (resultcond == true && resultMpn == true) {
        this.setState({
          unpostedselectcondition: selectedCondition,
          unpostedmpn: matchMpn[0],
          // unpostedcategory: matchCategoie[0],
          unpostedbin: dataObject.BIN,
          unpostedbrand: dataObject.BRAND
        })
      } else {
        this.setState({
          unpoststart_ser_barcode: '',
          unpostend_ser_barcode: '',
          unpostser_barcode: '',
          unpostedselectcondition: '',
          unpostedmpn: '',
          unpostedcategory: '',
          unpostedbin: '',
          unpostedbrand: '',
          unpostedselectobject: ''
        })
      }
      this.setState({
        unposteddata: this.props.lot_unposted_barcode_detail,
        unposteddataObject: this.props.lot_unposted_barcode_detail[0]
      })
    }

    if (prevProps.unposted_images !== this.props.unposted_images) {
      const data = this.props.unposted_images.filter(
        img => img.addToLot === true
      )
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
        unpostedimages: imageArray
      })
    }
  }
  changeUnpostLot = () => {
    this.setState(prevState => ({
      UnpostLot: !prevState.UnpostLot
    }))
  }
  render () {
    // console.log(this.props.images)
    // console.log(this.state.data)
    // console.log(this.state.dataObject)
    // console.log(this.state.selectobject)
    // console.log(this.state.selectcondition)
    const barcode =
      (this.state.unpoststart_ser_barcode !== '' &&
        this.state.unpostend_ser_barcode !== '') ||
      this.state.merchant_name !== ''
    const enablebutton =
      this.state.merchant_name !== '' &&
      this.props.lot_barcode_detail.length !== 0
    const enableUnpostSave =
      this.state.merchant_name !== '' &&
      this.props.lot_unposted_barcode_detail.length !== 0
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
                              name='unpoststart_ser_barcode'
                              value={this.state.unpoststart_ser_barcode}
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
                              name='unpostend_ser_barcode'
                              value={this.state.unpostend_ser_barcode}
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
                          {this.state.UnpostLot == false ? (
                            <button
                              type='submit'
                              size='xs'
                              className='btn btn-primary btn-block btn-flat float-right btn-sm'
                              // onClick={this.searchRangeLotBarcode}
                              //   disabled={!searchEnable}
                            >
                              Search
                            </button>
                          ) : (
                            <button
                              type='submit'
                              size='xs'
                              className='btn btn-primary btn-block btn-flat float-right btn-sm'
                              // onClick={this.searchRangeLotBarcode}
                              // disabled={!searchEnable}
                            >
                              Search
                            </button>
                          )}
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
                            name='unpostser_barcode'
                            value={this.state.unpostser_barcode}
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
                      name='unpostedtitle'
                      onChange={this.HandleOnChange}
                      placeholder='Enter Title'
                      value={this.state.unpostedtitle || ''}
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
                      id='unpostedselectcondition'
                      options={data}
                      value={this.state.unpostedselectcondition}
                      onChange={this.handleUnpostedChange}
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
                      id='unpostedselectobject'
                      options={Objects}
                      value={this.state.unpostedselectobject}
                      onChange={this.handleChangeUnpostedObject}
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
                      name='unpostedcategory'
                      value={this.state.unpostedcategory || ''}
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
                        name='unpostedmpn'
                        value={this.state.unpostedmpn || ''}
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
                        name='unpostedbrand'
                        value={this.state.unpostedbrand || ''}
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
                        name='unpostedbin'
                        value={this.state.unpostedbin}
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
                      {this.props.unpostsave === true ? (
                        <button
                          type='submit'
                          className='btn btn-primary btn-block btn-flat'
                          disabled={!enableUnpostSave}
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
        {this.props.unposted_images.length !== 0 ? (
          <div className='row'>
            <div className='col-xs-12'>
              <UnpostNewImageSelector {...this.props} />
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
                <h3 className='box-title'>UnPosted Barcode Details</h3>
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
                    {(this.props.lot_unposted_barcode_detail || []).map(
                      (data, key) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{data.BARCODE || ''}</td>
                          <td>{data.TITLE || ''}</td>
                          <td>{data.BRAND || ''}</td>
                          <td>{data.MPN || ''}</td>
                          <td>{data.UPC || ''}</td>
                          <td>{data.CONDITION || ''}</td>
                          <td>{data.COST_PRICE || ''}</td>
                          <td>{data.WEIGHT || ''}</td>
                          <td>{data.CATEGORY || ''}</td>
                          <td>
                            <Button
                              type='button'
                              size='sm'
                              className='btn btn-danger'
                              onClick={() =>
                                this.deleteUnPostedBarcodeFromLot(
                                  data.BARCODE_NO,
                                  key
                                )
                              }
                            >
                              <span
                                className='glyphicon glyphicon-trash p-b-5'
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
                    <UnPostImageSelector {...this.props} />
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-danger'
                      style={{ marginTop: '2%' }}
                      data-dismiss='modal'
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

export default UnpostCreatLot
