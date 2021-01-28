import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import SearchRepairDataTable from '../datatables/PosDatatables/SearchRepairDataTable.js'
import {
  get_scan_barcode_detail,
  get_barcodes_aganist_barcode_repair_search
} from '../../action/posActions.js'
import {
  search_repair_form,
  add_repair_to_pos
} from '../../action/posActions.js'
class SearchRepair extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search_barcode: '',
      open: true,
      redirectToReferrer: false
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
  }
  handleOnSubmit = e => {
    e.preventDefault()
    const data = {
      search_barcode: this.state.search_barcode,
      phoneNumber: this.state.phoneNumber
    }
    this.props.search_repair_form(data)
  }

  //   componentDidUpdate (prevProps, prevState) {
  //     if (
  //       prevProps.searchData.service_detail !=
  //         this.props.searchData.service_detail ||
  //       prevProps.searchData.appointment_id !=
  //         this.props.searchData.appointment_id
  //     ) {
  //       this.setState({
  //         // service_id: {
  //         //   value: this.props.searchData.service_detail.value,
  //         //   label: this.props.searchData.service_detail.label
  //         // },
  //         service_id: this.props.searchData.service_detail,
  //         search_barcode: ''
  //       })
  //     }
  //     if (
  //       prevProps.searchData.appointment_id !=
  //         this.props.searchData.appointment_id ||
  //       this.props.searchData.search_barcode
  //     ) {
  //       //   this.state.search_barcode = ''
  //       this.setState({
  //         search_barcode: ''
  //       })
  //     }
  //   }

  render () {
    return (
      <React.Fragment>
        <div className={this.state.open ? 'box' : 'box collapsed-box'}>
          <div className='box-header with-border'>
            <h3 className='box-title'>Search Repair</h3>
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
                <div className='col-sm-6'>
                  <label>Search Barcode/ NAME /phone_number </label>
                  <div className='form-group has-feedback'>
                    <input
                      type='text'
                      name='search_barcode'
                      id='search_barcode'
                      className='form-control'
                      value={this.state.search_barcode}
                      onChange={this.handleOnChange}
                      required
                    />
                    <span className='glyphicon glyphicon-search form-control-feedback' />
                  </div>
                </div>

                <div className='col-sm-2 '>
                  <div className='form-group' style={{ marginTop: '7px' }}>
                    <label className='control-label' />
                    <Button
                      type='submit'
                      title='Search  Barcode'
                      id='save_merch_lot'
                      name='save_merch_lot'
                      className='btn btn-success btn-block btn-flat'
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'> Repair Forms </h3>
                </div>
                <div className='box-body'>
                  <SearchRepairDataTable {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    search_repair_data: state.posReducer.search_repair_data
  }
}

export default connect(
  mapStateToProps,
  {
    search_repair_form,
    add_repair_to_pos,
    get_scan_barcode_detail,
    get_barcodes_aganist_barcode_repair_search
  }
)(SearchRepair)
