import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import '../../createLotImages.css'
import { toastr } from 'react-redux-toastr'

class UnpostNewImageSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkall: false,
      images: [],
      disable: true
    }
  }
  addImageInArray = item => {
    const imagee = this.state.images.filter(
      image =>
        image.barcode == item.barcode &&
        image.filename == item.filename &&
        image.extension == item.extension
    )
    // const imageArray = this.
    if (imagee.length > 0) {
      const data = this.state.images.filter(image => image !== item)
      this.setState({
        images: data
      })
    } else {
      this.setState({
        images: [...this.state.images, item]
      })
    }
  }

  handleOnClick = () => {
    this.props.add_Image_UnPoste_Lot(this.state.images)
    const data = {
      save: true
    }
    const data1 = {
      save: false,
      button: 'image save'
    }
    this.state.images.length === 0 || this.state.images === undefined
      ? this.props.change_Save_Lot_prop_unpost(data1)
      : this.props.change_Save_Lot_prop_unpost(data)
  }

  handleOnClickSkip = () => {
    const data = {
      save: true
    }
    this.props.change_Save_Lot_prop_unpost(data)
  }

  UnSelectAll () {
    var items = document.getElementsByName('unPostimageSelected')
    if (items.length <= 11) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox') items[i].checked = false
      }
    } else {
      for (var i = 0; i <= 11; i++) {
        if (items[i].type == 'checkbox') items[i].checked = false
      }
    }
  }
  selectAll () {
    var items = document.getElementsByName('unPostimageSelected')
    if (items.length <= 11) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox') items[i].checked = true
      }
    } else {
      for (var i = 0; i <= 11; i++) {
        if (items[i].type == 'checkbox') items[i].checked = true
      }
    }
  }

  handleOnClickToggleSelect = () => {
    if (this.state.checkall == false) {
      this.selectAll()
      this.setState({
        checkall: true,
        images:
          this.props.unposted_images.length > 12
            ? this.props.unposted_images.filter((item, index) => index < 12)
            : this.props.unposted_images
      })
    } else {
      this.UnSelectAll()
      this.props.unSelect_All_Unpost_Images()
      this.setState({
        checkall: false,
        disable: true,
        images: []
      })
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.images !== this.state.images &&
      this.state.images.length !== 0 &&
      this.state.images.length < 13
    ) {
      this.setState(prevState => ({
        disable: false
      }))
      const data = {
        save: false
      }
      this.props.change_Save_Lot_prop_unpost(data)
    }
    if (
      prevState.images !== this.state.images &&
      this.state.images.length > 12
    ) {
      this.setState(prevState => ({
        disable: true
      }))
      toastr.error('Error', 'Please Select Only 12 Images')
    }
  }
  render () {
    console.log(this.state.images)
    const disbaleSkip = this.state.images.length > 0

    return (
      <React.Fragment>
        <div className='box'>
          <div className='box-header'>
            <h3 className='box-title'> Barcode Images </h3>
          </div>
          <div className='box-body'>
            <ul id='lot_image_ul'>
              {this.props.unposted_images.map((item, i) => (
                <div className='col-xs-2'>
                  <li id='lot_image_li'>
                    <input
                      type='checkbox'
                      id={'lot_images' + i}
                      className='lot_images_checkBox'
                      name='unPostimageSelected'
                      onClick={() => this.addImageInArray(item)}
                    />
                    <label for={'lot_images' + i} className='lot_images_label'>
                      <img
                        src={'data:image;base64,' + item.image}
                        alt={item.filename}
                        style={{ width: '140px', height: '140px' }}
                      />
                    </label>
                    {i + 1 + '-' + item.barcode}
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='col-sm-2' style={{ float: 'right' }}>
                <div className='form-group'>
                  <button
                    type='button'
                    className={
                      this.state.checkall == false
                        ? 'btn btn-warning btn-block btn-sm'
                        : 'btn btn-danger btn-block btn-sm'
                    }
                    onClick={this.handleOnClickToggleSelect}
                  >
                    {this.state.checkall == false
                      ? 'Select All'
                      : 'Un Select All'}{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='col-sm-2' style={{ float: 'right' }}>
                <div className='form-group'>
                  <button
                    type='button'
                    onClick={this.handleOnClick}
                    disabled={this.state.disable}
                    data-dismiss='modal'
                    className='btn btn-primary btn-block btn-flat'
                  >
                    Save Image
                  </button>
                </div>
              </div>
              <div className='col-sm-2' style={{ float: 'right' }}>
                <div className='form-group'>
                  <button
                    type='button'
                    onClick={this.handleOnClickSkip}
                    data-dismiss='modal'
                    className='btn btn-warning btn-block btn-flat'
                    disabled={disbaleSkip}
                  >
                    Skip Images
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default UnpostNewImageSelector
