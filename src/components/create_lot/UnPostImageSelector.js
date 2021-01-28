import React, { Component } from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import PropTypes from 'prop-types'
import { toastr } from 'react-redux-toastr'

// import img1 from './images/kitten/200.jpg'
// import img2 from './images/kitten/201.jpg'
// import img3 from './images/kitten/202.jpg'
// import img4 from './images/kitten/203.jpg'

class UnPostImageSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      images: [],
      disable: true
    }
  }

  onUnpostPickImages = images => {
    this.setState({
      images
    })
  }
  handleOnClick = () => {
    // console.log(this.state.images)
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
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-sm-12'>
            {/* <div className='col-sm-6'> */}

            <ImagePicker
              images={this.props.unposted_images.map((data, i) => ({
                src: 'data:image;base64,' + data.image,
                value: i
              }))}
              multiple
              onPick={this.onUnpostPickImages}
            />
          </div>
        </div>
        {/* </div> */}
        <div className='row'>
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
              >
                Skip Images
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
UnPostImageSelector.propTypes = {
  images: PropTypes.array,
  multiple: PropTypes.bool,
  onPick: PropTypes.func
}

export default UnPostImageSelector
