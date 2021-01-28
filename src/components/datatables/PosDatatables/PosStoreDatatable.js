import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import NumberFormat from 'react-number-format'

const editButton = (cell, row) => {
  return (
    <React.Fragment>
      <Button
        className='btn btn-danger'
        size='xs'
        onClick={() => that.onClickDelete(cell, row)}
        disabled={that.props.store_data.length == 1}
      >
        <span className='glyphicon glyphicon-trash p-b-5' aria-hidden='true' />
      </Button>
      <Button
        style={{ marginLeft: '3px' }}
        className='btn btn-warning'
        size='xs'
        title='Detail'
        data-toggle='modal'
        data-target='#myModal'
        onClick={() => that.onClickEdit(cell, row)}
      >
        <span className='glyphicon glyphicon-pencil p-b-5' aria-hidden='true' />
      </Button>
    </React.Fragment>
  )
}
const sale_tax = (cell, row) => {
  const value = Number(row.SALE_TAX)
  return '$ ' + value.toFixed(2)
}
var that = ''
class PosStoreDatatable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      store_data: '',
      edit_phoneNumber: '',
      edit_address: '',
      edit_owner_name: '',
      edit_email: '',
      edit_city_id: '',
      edit_state_id: '',
      edit_zip: '',
      edit_store_name: '',
      edit_sale_tax: ''
    }
    that = this
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.store_data !== this.state.store_data &&
      this.state.store_data !== ''
    ) {
      const data = this.props.pos_city.filter(
        item => item.CITY_ID === this.state.store_data.CITY_ID
      )
      const default_buyer = []
      data.map(item => {
        return default_buyer.push({
          value: item.CITY_ID,
          label: item.CITY_DESC
        })
      })
      this.setState({
        edit_phoneNumber: this.state.store_data.PHONE_NO,
        edit_address: this.state.store_data.ADDRESS,
        edit_owner_name: this.state.store_data.OWNER_NAME,
        edit_email: this.state.store_data.EMAIL,
        edit_city_id: default_buyer[0],
        edit_zip: this.state.store_data.ZIP,
        edit_store_name: this.state.store_data.STORE_NAME,
        edit_sale_tax: this.state.store_data.SALE_TAX
      })
    }
    if (
      prevState.edit_city_id !== this.state.edit_city_id &&
      this.state.edit_city_id !== ''
    ) {
      const data = {
        city_id: this.state.edit_city_id
      }
      // console.log(data)
      this.props.pos_form_state_edit(data)
    }

    if (
      prevProps.pos_state_edit !== this.props.pos_state_edit &&
      this.props.pos_state_edit !== ''
    ) {
      const default_buyer_state = []
      default_buyer_state.push({
        value: this.props.pos_state_edit[0].STATE_ID,
        label: this.props.pos_state_edit[0].STATE_DESC
      })
      this.setState({
        edit_state_id: default_buyer_state[0]
      })
    }
  }
  onClickDelete = (cell, row) => {
    const data = {
      lz_pos_store_id: cell
    }
    this.props.delete_store(data)
  }
  onClickEdit = (cell, row) => {
    console.log(row)
    this.setState({
      store_data: row
    })
  }

  handleChangeState = edit_state_id => {
    this.setState({
      edit_state_id: edit_state_id
    })
  }

  handleChangeCity = edit_city_id => {
    this.setState({
      edit_city_id: edit_city_id
    })
  }

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }
  updatePosStore = e => {
    e.preventDefault()
    const data = {
      edit_phoneNumber: this.state.edit_phoneNumber,
      edit_address: this.state.edit_address,
      edit_owner_name: this.state.edit_owner_name,
      edit_email: this.state.edit_email,
      edit_city_id: this.state.edit_city_id,
      edit_zip: this.state.edit_zip,
      edit_store_name: this.state.edit_store_name,
      store_id: this.state.store_data.LJ_POS_STORE_ID,
      edit_sale_tax: this.state.edit_sale_tax,
      edit_state_id: this.state.edit_state_id,
      user_id: localStorage.getItem('userId')
    }
    console.table(data)
    this.props.update_pos_store(data, this.state.store_data.LJ_POS_STORE_ID)
  }

  renderShowsTotal (start, to, total) {
    return (
      <p style={{ color: '#696969' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    )
  }
  render () {
    const buyer_city = []
    this.props.pos_city.map(item => {
      buyer_city.push({
        value: item.CITY_ID,
        label: item.CITY_DESC
      })
    })

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
          value: this.props.store_data.length
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
      paginationPosition: 'bottom', // default is bottom, top and both is all available
      clearSearch: true
      // keepSizePerPageState: true //default is false, enable will keep sizePerPage dropdown state(open/clode) when external rerender happened
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      // hidePageListOnlyOnePage: true > Hide the page list if only one page.
    }
    // console.log(this.props.datatable_data)
    // let colums = []
    return (
      <React.Fragment>
        <div className='modal fade' id='myModal' role='dialog'>
          <div className='modal-dialog modal-lg' style={{ width: '70%' }}>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>
                  &times;
                </button>
                <h4 className='modal-title'>Store Detail Edit</h4>
              </div>
              {/* <form> */}
              <div className='modal-body'>
                <h4> POS Store</h4>
                <div className='row'>
                  <form onSubmit={this.updatePosStore}>
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
                            name='edit_owner_name'
                            value={this.state.edit_owner_name}
                            onChange={this.handleOnChange}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-sm-2 '>
                        <div className='form-group'>
                          <label htmlFor='store_name' className='control-label'>
                            Store Name
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            id='store_name'
                            name='edit_store_name'
                            value={this.state.edit_store_name}
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
                            name='edit_phoneNumber'
                            value={this.state.edit_phoneNumber}
                            required
                          />
                        </div>
                      </div>

                      <div className='col-sm-3'>
                        <div className='form-group'>
                          <label htmlFor='edit_email' className='control-label'>
                            Email
                          </label>
                          <input
                            type='email'
                            className='form-control'
                            id='edit_email'
                            name='edit_email'
                            onChange={this.handleOnChange}
                            value={this.state.edit_email}
                            required
                          />
                        </div>
                      </div>
                      <div className='col-sm-2'>
                        <div className='form-group'>
                          <label
                            htmlFor='edit_sale_tax'
                            className='control-label'
                          >
                            Sale Tax
                          </label>
                          <input
                            type='number'
                            className='form-control'
                            id='edit_sale_tax'
                            name='edit_sale_tax'
                            onChange={this.handleOnChange}
                            value={this.state.edit_sale_tax}
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
                            name='edit_address'
                            onChange={this.handleOnChange}
                            value={this.state.edit_address}
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
                            value={this.state.edit_city_id}
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
                            value={this.state.edit_state_id}
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
                            name='edit_zip'
                            onChange={this.handleOnChange}
                            value={this.state.edit_zip}
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
                            //   disabled={!button}
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
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-default'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>

        <BootstrapTable
          data={this.props.store_data}
          striped
          // hover
          condensed
          pagination
          search
          options={options}
          searchPlaceholder='Search...'
          csvFileName='Barcode Detail'
          exportCSV
          // containerStyle={ { background: '#00ff00' } }
          // tableStyle={{ background: '#DCDCDC' }}
          // headerStyle={{ background: '#DCDCDC' }}
        >
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='LJ_POS_STORE_ID'
            dataFormat={editButton}
            isKey
            dataSort
          >
            Action
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='OWNER_NAME'
            //   dataFormat={line_Type}
            dataSort
          >
            Store Owner
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            editable={false}
            dataField='STORE_NAME'
            dataSort
          >
            Store Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='PHONE_NO'
            dataSort
            editable={false}
          >
            Phone No
          </TableHeaderColumn>

          <TableHeaderColumn
            width='8%'
            headerAlign='center'
            dataAlign='center'
            dataField='EMAIL'
            dataSort
            editable={false}
          >
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='ADDRESS'
            editable
            //   dataFormat={cost_price}
            dataSort
          >
            Address
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='STATE_DESC'
            editable
            //   dataFormat={dis_per}
            dataSort
          >
            State
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='CITY_DESC'
            editable
            //   dataFormat={dis_amount}
            dataSort
          >
            City
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='SALE_TAX'
            dataFormat={sale_tax}
            dataSort
          >
            Sale Tax
          </TableHeaderColumn>
          <TableHeaderColumn
            width='5%'
            headerAlign='center'
            dataAlign='center'
            dataField='ZIP'
            // editable
            //   dataFormat={net_price}
            dataSort
          >
            Zip
          </TableHeaderColumn>

          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='USER_NAME'
            //   dataFormat={Dis_Charge}
            dataSort
          >
            User Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='CITY_ID'
            //   dataFormat={Dis_Charge}
            dataSort
            hidden
          >
            User Name
          </TableHeaderColumn>
          <TableHeaderColumn
            width='10%'
            headerAlign='center'
            dataAlign='center'
            dataField='STATE_ID'
            //   dataFormat={Dis_Charge}
            dataSort
            hidden
          >
            User Name
          </TableHeaderColumn>
        </BootstrapTable>
      </React.Fragment>
    )
  }
}
export default PosStoreDatatable
