import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import { get_item_cond } from '../../action/createLotActions.js'
import { connect } from 'react-redux'
import Select from 'react-select'
import dateFormat from 'dateformat'
import { update_classified_data } from '../../action/classifiedActions.js'
class ClassifiedModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ad_id: '',
      barcode_no: '',
      bin_id: '',
      pic_date: '',
      pic_by: '',
      selectcondition: '',
      item_desc: '',
      upc: '',
      mpn: '',
      ean: '',
      brand: '',
      item_cost: '',
      lot_id: '',
      pic_dir: '',
      category_id: '',
      category_name: '',
      pic_remarks: '',
      condition_remarks: '',
      ident_remarks: '',
      discard_remarks: '',
      discard_by: '',
      discard_date: '',
      ident_date: new Date(),
      ident_by: ''
    }
  }
  componentDidMount () {
    this.props.get_item_cond()
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.row !== this.props.row && this.props.row !== '') {
      this.setState({
        ad_id: this.props.row.AD_ID,
        barcode_no: this.props.row.BARCODE_NO,
        bin_id: this.props.row.BIN_ID,
        pic_date: this.props.row.PIC_DATE,
        pic_by: this.props.row.PIC_BY,
        selectcondition: {
          value: this.props.row.CONDITION_ID,
          label: this.props.row.CONDITION_NAME
        },
        item_desc: this.props.row.ITEM_DESC,
        upc: this.props.row.UPC,
        mpn: this.props.row.MPN,
        brand: this.props.row.BRAND,
        item_cost: this.props.row.ITEM_COST,
        lot_id: this.props.row.lot_id,
        category_id: this.props.row.CATEGORY_ID,
        category_name: this.props.row.CATEGORY_NAME,
        pic_remarks: this.props.row.PIC_REMARKS,
        condition_remarks: this.props.row.CONDITION_REMARKS,
        ident_remarks: this.props.row.IDENT_REMARKS,
        ident_date: this.props.row.IDENT_DATE,
        ident_by: this.props.row.IDENT_BY
      })
    }
    // if (prevProps.images !== this.props.images && this.props.images !== '') {
    //   // const images = this.props.images(
    //   //   (item, index) => index !== this.props.row.BARCODE_NO
    //   // )
    //   this.setState({ ...this.state, images: this.props.images })
    //   console.log(this.props.images)
    // }
  }
  handleChangeCondition = selectcondition => {
    this.setState({
      ...this.state,
      selectcondition: selectcondition
    })
  }
  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  handleOnUpdate = () => {
    const data = {
      ad_id: this.state.ad_id,
      barcode_no: this.state.barcode_no,
      bin_id: this.state.bin_id,
      pic_date: this.state.pic_date,
      pic_by: this.state.pic_by,
      selectcondition: this.state.selectcondition,
      item_desc: this.state.item_desc,
      upc: this.state.upc,
      mpn: this.state.mpn,
      brand: this.state.brand,
      item_cost: this.state.item_cost,
      lot_id: this.state.lot_id,
      category_id: this.state.category_id,
      category_name: this.state.category_name,
      pic_remarks: this.state.pic_remarks,
      condition_remarks: this.state.condition_remarks,
      ident_remarks: this.state.ident_remarks,
      // ident_date: this.state.ident_date,
      ident_by: localStorage.getItem('userId')
    }
    this.props.update_classified_data(data)
  }
  render () {
    const data = []
    console.log(this.props.filterImage)
    this.props.condition.map(item => {
      return data.push({
        value: item.ID,
        label: item.COND_NAME
      })
    })
    return (
      <React.Fragment>
        <div className='modal-body'>
          <section className='content'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='ad_id'>AD_ID</label>
                    <NumberFormat
                      className='form-control'
                      id='ad_id'
                      name='ad_id'
                      displayType={'text'}
                      value={this.state.ad_id}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='barcode_no'>Barcode</label>
                    <NumberFormat
                      className='form-control'
                      id='barcode_no'
                      name='barcode_no'
                      displayType={'text'}
                      value={this.state.barcode_no}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='bin_id'>Bin_Id</label>
                    <NumberFormat
                      className='form-control'
                      id='bin_id'
                      name='bin_id'
                      value={this.state.bin_id}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='pic_date'>Pic_Date</label>
                    <NumberFormat
                      className='form-control'
                      format='##/##/####'
                      placeholder='MM/MM/YYYY'
                      id='pic_date'
                      name='pic_date'
                      value={this.state.pic_date}
                      displayType={'text'}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='pic_by'>Pic_By</label>
                    <NumberFormat
                      className='form-control'
                      id='pic_by'
                      name='pic_by'
                      displayType={'text'}
                      value={this.state.pic_by}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='selectcondition'>Condition Name</label>
                    <Select
                      id='selectcondition'
                      options={data}
                      value={this.state.selectcondition}
                      onChange={this.handleChangeCondition}
                      className='basic-single'
                      classPrefix='select'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='col-sm-12'>
                <div className='col-sm-6'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='Item_Desc'>Item Description</label>
                    <input
                      type='text'
                      id='Item_Desc'
                      className='form-control'
                      name='item_desc'
                      placeholder='Item Desc'
                      value={this.state.item_desc}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='upc'>UPC</label>
                    <input
                      type='text'
                      id='upc'
                      className='form-control'
                      name='upc'
                      placeholder='UPC'
                      value={this.state.upc}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='mpn'>MPN</label>
                    <input
                      type='text'
                      id='mpn'
                      className='form-control'
                      name='mpn'
                      placeholder='MPN'
                      value={this.state.mpn}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='brand'>Brand</label>
                    <input
                      type='text'
                      id='brand'
                      className='form-control'
                      name='brand'
                      placeholder='Brand'
                      value={this.state.brand}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
              </div>
              <div classNmae='col-sm-12'>
                <div className='col-sm-6'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='pic_remarks'>Pic Remarks</label>
                    <input
                      type='text'
                      id='pic_remarks'
                      className='form-control'
                      name='pic_remarks'
                      placeholder='Pic Remarks'
                      value={this.state.pic_remarks}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='condition_remarks'>Condition Remarks</label>
                    <input
                      type='text'
                      id='condition_remarks'
                      className='form-control'
                      name='condition_remarks'
                      placeholder='Condition Remarks'
                      value={this.state.condition_remarks}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
              </div>
              <div className='col-sm-12'>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='item_cost'>Item Cost</label>
                    <NumberFormat
                      className='form-control'
                      id='item_cost'
                      name='item_cost'
                      placeholder='Item Cost'
                      value={this.state.item_cost}
                      onChange={this.handleOnChange}
                      thousandSeparator
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='category_id'>Category Id</label>
                    <input
                      type='text'
                      id='category_id'
                      className='form-control'
                      name='category_id'
                      placeholder='Category Id'
                      value={this.state.category_id}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='category_name'>Category Name</label>
                    <input
                      type='text'
                      id='category_name'
                      className='form-control'
                      name='category_name'
                      placeholder='Category Name'
                      value={this.state.category_name}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='ident_remarks'>Ident Remarks</label>
                    <input
                      type='text'
                      id='ident_remarks'
                      className='form-control'
                      name='ident_remarks'
                      placeholder='Ident Remarks'
                      value={this.state.ident_remarks}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </div>
              </div>
              <div className='col-sm-12'>
                <div className='col-sm-2'>
                  <div className='form-group has-feedback'>
                    <label htmlFor='ident_date'>Ident Date</label>
                    <input
                      type='text'
                      id='ident_date'
                      className='form-control'
                      name='ident_date'
                      placeholder='Ident Date'
                      value={dateFormat(this.state.ident_date, 'yyyy-mm-dd')}
                      onChange={this.handleOnChange}
                      disabled
                    />
                  </div>
                </div>
                <div className='col-xs-2' style={{ float: 'right' }}>
                  <button
                    type='submbuttonit'
                    className='btn btn-primary btn-block btn-flat'
                    onClick={this.handleOnUpdate}
                  >
                    Update Record
                  </button>
                </div>
              </div>
            </div>
            <div classname='row'>
              <div className='col-sm-12' />
            </div>
          </section>
        </div>{' '}
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    condition: state.createLotReducer.item_cond_detail,
    filterImage: state.classifiedadReducer.filterImage
  }
}

export default connect(
  mapStateToProps,
  {
    get_item_cond,
    update_classified_data
  }
)(ClassifiedModel)
