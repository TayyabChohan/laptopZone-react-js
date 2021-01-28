import React, { Component } from 'react'
import Select from 'react-select'
import {
  get_lot_barcode_detail,
  delete_Barcode_From_Lot,
  get_item_cond,
  save_lot_data,
  get_object_cond,
  create_lot_object,
  get_lot_range_barcode_detail,
  add_Image_Lot,
  change_Save_Lot_prop,
  suggest_lot_categories,
  get_lot_range_unposted_barcode_detail,
  get_lot_unposted_barcode_detail,
  delete_UnPosted_Barcode_From_Lot,
  change_Save_Lot_prop_unpost,
  add_Image_UnPoste_Lot,
  save_unposted_lot_data,
  unSelect_All_Images,
  unSelect_All_Unpost_Images,
  remove_suggest_category
} from '../../action/createLotActions.js'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import AlertMessage from '../messages/AlertMessage.js'
import ErrorMessage from '../messages/ErrorMessage.js'
import UnpostCreatLot from './UnpostCreatLot.js'
import PostCreatLot from './PostCreatLot.js'
class Create_Lot extends Component {
  constructor (props) {
    super(props)
    this.state = {
      UnpostLot: false
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
    return (
      <React.Fragment>
        {/* <!-- Content Header (Page header) --> */}
        <section className='content-header'>
          <h1>Create Lot</h1>
          <ol className='breadcrumb'>
            <li>
              <a href='#'>
                <i className='fa fa-dashboard' /> Home
              </a>
            </li>
            <li>
              <a href='#'>Create_Lot</a>
            </li>
            <li className='active'>Create Lot</li>
          </ol>
        </section>

        {/* <!-- Main content --> */}
        <section className='content'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>
                    Create Lot{' '}
                    {this.state.UnpostLot == false
                      ? 'For Posted Barcode'
                      : 'For UnPosted Barcode'}{' '}
                  </h3>
                  <div class='btn-group btn-toggle' style={{ float: 'right' }}>
                    <button
                      class={
                        this.state.UnpostLot == false
                          ? 'btn btn-sm btn-primary active'
                          : 'btn btn-sm btn-default'
                      }
                      onClick={this.changeUnpostLot}
                    >
                      Post
                    </button>
                    <button
                      class={
                        this.state.UnpostLot == true
                          ? 'btn btn-sm btn-primary active'
                          : 'btn btn-sm btn-default'
                      }
                      onClick={this.changeUnpostLot}
                    >
                      UnPost
                    </button>
                  </div>
                </div>
              </div>
              {this.state.UnpostLot == false ? (
                <PostCreatLot {...this.props} />
              ) : (
                <UnpostCreatLot {...this.props} />
              )}
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
    merchant_detail: state.createLotReducer.merchant_detail,
    lot_barcode_detail: state.createLotReducer.lot_barcode_detail,
    condition: state.createLotReducer.item_cond_detail,
    object: state.createLotReducer.object_cond_detail,
    images: state.createLotReducer.images,
    save: state.createLotReducer.save,
    unpostsave: state.createLotReducer.unpostsave,
    unposted_images: state.createLotReducer.unposted_images,
    lot_unposted_barcode_detail:
      state.createLotReducer.lot_unposted_barcode_detail,
      suggest_category: state.createLotReducer.suggest_category
  }
}

export default connect(
  mapStateToProps,
  {
    get_lot_barcode_detail,
    delete_Barcode_From_Lot,
    get_item_cond,
    save_lot_data,
    get_object_cond,
    create_lot_object,
    get_lot_range_barcode_detail,
    add_Image_Lot,
    change_Save_Lot_prop,
    suggest_lot_categories,
    get_lot_range_unposted_barcode_detail,
    get_lot_unposted_barcode_detail,
    delete_UnPosted_Barcode_From_Lot,
    change_Save_Lot_prop_unpost,
    add_Image_UnPoste_Lot,
    save_unposted_lot_data,
    unSelect_All_Images,
    unSelect_All_Unpost_Images,
    remove_suggest_category
  }
)(Create_Lot)
