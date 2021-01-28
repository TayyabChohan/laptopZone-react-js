import React, { Component } from 'react'
import Select from 'react-select'
import { Table, Button } from 'react-bootstrap'
class NewObjectModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      service: '',
      category_id: '',
      obj_name: '',
      obj_cost: '',
      obj_weig: '',
      title: ''
    }
  }
  saveObject = e => {
    e.preventDefault()
    const data = {
      service: this.state.service.label,
      category_id: this.state.category_id,
      obj_name: this.state.obj_name,
      obj_cost: this.state.obj_cost,
      obj_weig: this.state.obj_weig,
      user_id: localStorage.getItem('userId'),
      title: this.state.title
    }
    this.props.create_lot_object(data)
    this.setState({
      service: '',
      category_id: '',
      obj_name: '',
      obj_cost: '',
      obj_weig: '',
      title: ''
    })
    console.log(data)
  }
  handleChange = service => {
    this.setState({
      ...this.state,
      service: service
    })
  }
  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  handleOnClickKeyWord = () => {
    const data = {
      TITLE: this.state.title
    }
    this.props.suggest_lot_categories(data)
  }
  addCategoryId = data => {
    this.setState({
      category_id: data
    })
  }
  onClosModal = () => {
    this.setState({
      service: '',
      category_id: '',
      obj_name: '',
      obj_cost: '',
      obj_weig: '',
      title: ''
    })
    this.props.remove_suggest_category()
  }
  render () {
    const options = [
      {
        value: 1,
        label: 'USPSParcel'
      },
      {
        value: 2,
        label: 'USPSFirstClass'
      },
      {
        value: 3,
        label: 'USPSPriority'
      },
      {
        value: 4,
        label: 'FedExHomeDelivery'
      },
      {
        value: 5,
        label: 'USPSPriorityFlatRateEnvelope'
      },
      {
        value: 6,
        label: 'USPSPriorityMailSmallFlatRateBox'
      },
      {
        value: 7,
        label: 'USPSPriorityFlatRateBox'
      },
      {
        value: 8,
        label: 'USPSPriorityMailLargeFlatRateBox'
      },
      {
        value: 9,
        label: 'USPSPriorityMailPaddedFlatRateEnvelope'
      },
      {
        value: 10,
        label: 'USPSPriorityMailLegalFlatRateEnvelope'
      }
    ]
    return (
      <React.Fragment>
        <form onSubmit={this.saveObject}>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='col-sm-3'>
                <div className='form-group'>
                  <label>Category Id</label>
                  <input
                    type='number'
                    name='category_id'
                    id='category_id'
                    className='form-control'
                    value={this.state.category_id}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className='col-sm-2'>
                <div className='form-group'>
                  <label>Object Name</label>
                  <input
                    type='text'
                    name='obj_name'
                    id='obj_name'
                    className='form-control'
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className='col-sm-3'>
                <div className='form-group has-feedback' id='selectcondition'>
                  <label>Service:</label>
                  <Select
                    id='selectcondition'
                    //   isMulti
                    options={options}
                    value={this.state.service}
                    onChange={this.handleChange}
                    className='basic-select'
                    classPrefix='select'
                    required
                  />
                </div>
              </div>
              <div className='col-sm-2'>
                <div className='form-group'>
                  <label>Cost</label>
                  <input
                    type='number'
                    name='obj_cost'
                    id='obj_cost'
                    value={this.state.obj_cost}
                    onChange={this.handleOnChange}
                    className='form-control'
                    required
                  />
                </div>
              </div>
              <div className='col-sm-2'>
                <div className='form-group'>
                  <label>Weight (oz)</label>
                  <input
                    type='number'
                    name='obj_weig'
                    id='obj_weig'
                    value={this.state.obj_weig}
                    onChange={this.handleOnChange}
                    className='form-control'
                    required
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='title'>Keyword:</label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={this.state.title}
                        onChange={this.handleOnChange}
                        id='title'
                      />
                      <a
                        href={'#'}
                        className='crsr-pntr'
                        onClick={this.handleOnClickKeyWord}
                        title='Click here for category suggestion'
                        id='Suggest_Categories_for_title'
                      >
                        Suggest Category Against Keyword
                      </a>
                    </div>
                  </div>
                  <div className='col-sm-2 p-t-26'>
                    <h4>
                      <span className='label label-default' />
                    </h4>
                    <div className='form-group' style={{ marginTop: '25px' }}>
                      <button
                        type='submit'
                        className='btn btn-primary btn-block btn-flat'
                        //   disabled={!enablebutton}
                      >
                        Save Object
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/*

                            Display Data In Table

                        */}
        {this.props.suggest_category.length > 0 ? (
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
                        <th> Category Id </th>
                        {/* <th>TOKEN</th> */}
                        <th> Category Name </th>
                        <th> Category Parent Id </th>
                        <th> Category Parent Name </th>
                        <th> Select </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(this.props.suggest_category || []).map((data, key) => (
                        <tr key={key}>
                          <td>{data.CategoryID}</td>
                          <td>{data.CategoryName}</td>
                          <td>{data.CategoryName}</td>
                          <td>{data.CategoryParentName}</td>
                          <td>
                            <Button
                              type='button'
                              size='sm'
                              className='btn btn-danger'
                              onClick={() =>
                                this.addCategoryId(data.CategoryID)
                              }
                            >
                              <span
                                className='glyphicon glyphicon-plus p-b-5'
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
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}
export default NewObjectModal
