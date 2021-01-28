import React from 'react'
import { RViewer, RViewerTrigger } from 'react-viewerjs'
import DragSortableList from 'react-drag-sortable'
import { Button } from 'react-bootstrap'
import AlertError from './messages/AlertMessage'
import $ from 'jquery'
import './App.css'
import './drag.css'
import { toastr } from 'react-redux-toastr'

// import cc from './E:/wamp/www/item_pictures/dekitted_pictures/117001/A_2esatpr7zt2.JPG';

class ImageViews extends React.Component {
  constructor (props) {
    var getUrl = window.location
    var finalurl = getUrl.protocol + '//' + getUrl.hostname

    super(props)
    this.state = {
      baseUrl: finalurl,
      error: null,
      isLoaded: false,
      imageArray: [],
      getBarcode: this.props.passMyBarc,
      updatedImage: [],
      add: true,
      imageSelect: '',
      imageDelete: [],
      checked: false
    }
  }

  componentDidMount () {
    $.ajax({
      url:
        this.state.baseUrl + '/laptopzone/reactcontroller/c_react/get_pictures',
      dataType: 'json',
      type: 'POST',
      data: { barocde_no: this.state.getBarcode },
      success: function (data) {
        this.setState({
          imageArray: data.uri
        })
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }
  closeModel = () => {
    $.ajax({
      url:
        this.state.baseUrl + '/laptopzone/reactcontroller/c_react/get_pictures',
      dataType: 'json',
      type: 'POST',
      data: { barocde_no: this.state.getBarcode },
      success: function (data) {
        this.setState({
          imageArray: data.uri
        })
      }.bind(this),
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }

  update_image = () => {
    console.log(this.state.updatedImage)
    const path = this.state.baseUrl
    $.ajax({
      url: path + '/laptopzone/reactcontroller/c_haziqreact/update_image',
      dataType: 'json',
      type: 'POST',
      data: {
        barcode: this.state.getBarcode,
        master_reorder: this.state.updatedImage
      },
      success: function (data) {
        console.log(data)
        if (data == true) {
          toastr.success('Success', 'Image Update')
        } else {
          toastr.error('Error', 'Image Not Update')
        }
        // this.setState({
        //   imageArray: data.uri
        // })
      },
      error: function (xhr, resp, text) {
        // show error to console
        // console.log(xhr,resp,text);
      }
    })
  }
  delete_image = async () => {
    console.log(this.state.imageDelete)
    const path = this.state.baseUrl
    const data = { images: this.state.imageDelete }
    const url = path + '/laptopzone/reactcontroller/c_haziqreact/delete_image'
    new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: data
      }).then(
        data => {
          resolve(data)
        },
        err => {
          reject(err)
        }
      )
    })
      .then(result => {
        $('#delete').prop('checked', false)
        this.setState({
          imageSelect: '',
          imageDelete: []
        })
        $.ajax({
          url:
            this.state.baseUrl +
            '/laptopzone/reactcontroller/c_react/get_pictures',
          dataType: 'json',
          type: 'POST',
          data: { barocde_no: this.state.getBarcode },
          success: function (data) {
            this.setState({
              imageArray: data.uri
            })
          }.bind(this),
          error: function (xhr, resp, text) {
            // show error to console
            // console.log(xhr,resp,text);
          }
        })
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
  selectImage = e => {
    const { name, value } = e.target
    this.setState(prevState => ({
      ...this.state,
      add: !prevState.add,
      [name]: value
    }))
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevState.add !== this.state.add) {
      // console.log(this.state.imageSelect)
      const images = this.state.imageDelete.filter(
        item => item == this.state.imageSelect
      )
      // console.log(images)
      if (images == '') {
        this.setState({
          ...this.state,
          imageDelete: [
            ...(this.state.imageDelete || ''),
            this.state.imageSelect
          ]
        })
      } else {
        const images = this.state.imageDelete.filter(
          item => item !== this.state.imageSelect
        )
        // console.log(images)
        this.setState({
          ...this.state,
          imageDelete: images
        })
      }
    }
  }
  render () {
    // console.log(this.state.imageSelect)
    console.log(this.state.imageArray)
    let options = {
      toolbar: {
        zoomIn: true,
        zoomOut: true,
        oneToOne: true,
        reset: true,
        prev: true,
        play: {
          show: true,
          size: 'large'
        },
        title: {
          show: false
        },
        next: true,
        rotateLeft: true,
        rotateRight: true,
        flipHorizontal: 0,
        flipVertical: 0
      },

      navbar: {
        default: true
      }
    }
    var list1 = this.state.imageArray.map((pic, index) => ({
      content: (
        <div>
          <img src={pic} alt='Img' width='90px' height='90px' />
        </div>
      )
    }))

    const onSort = (sortedList, dropEvent) => {
      console.log('sortedList', sortedList)
      const image = []
      sortedList.map(item =>
        image.push({ image: item.content.props.children.props.src })
      )
      // console.log(image)
      // console.log('change')
      this.state.updatedImage = image
    }
    var placeholder = <div className='placeholderContent'>Drag Image</div>
    return (
      <React.Fragment>
        <RViewer options={options} imageUrls={this.state.imageArray}>
          <ul>
            {this.state.imageArray.map((pic, index) => {
              return (
                <React.Fragment>
                  <li
                    key={index}
                    style={{
                      width: '140px',
                      height: '130px',
                      float: 'left',
                      overflow: ' hidden'
                      // position: "relative"
                    }}
                  >
                    {/* <span>image {index + 1}</span> */}
                    {/* By default, the index value is 0,So it is necessary to set the index prop */}
                    <RViewerTrigger index={index}>
                      <div className='col-md-12'>
                        <img
                          className='getmyCss'
                          src={pic}
                          width='90px'
                          height='90px'
                        />
                      </div>
                    </RViewerTrigger>
                    <input
                      // checked={this.state.checked}
                      type='checkbox'
                      value={pic}
                      name='imageSelect'
                      id='delete'
                      onChange={this.selectImage}
                    />
                    image {index + 1}
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
        </RViewer>
        {this.state.imageArray !== '' ? (
          <div className='row'>
            <div className='col-md-12'>
              <div className='col-md-3 pull-right'>
                <Button
                  type='button'
                  className='btn btn-danger'
                  title='Delete Image'
                  onClick={this.delete_image}
                  disabled={this.state.imageArray == ''}
                >
                  Delete Image
                </Button>

                <Button
                  className='btn btn-dark'
                  myUpdate
                  data-toggle='modal'
                  data-target='#myModalSearch'
                  data-dismiss='modal'
                  disabled={this.state.imageArray == ''}
                  title='Update Image Order'
                >
                  Update Image Order
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {/**

Model For Image Update

*/}

        <div className='row'>
          <div className='col-sm-12'>
            <div
              className='modal fade'
              id='myModalSearch'
              data-backdrop='static'
              tabIndex='-1'
            >
              <div className='modal-dialog modal-lg' style={{ width: '70%' }}>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                      onClick={this.closeModel}
                    >
                      &times;
                    </button>
                    <h4 className='modal-title'>Update Images</h4>
                  </div>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <DragSortableList
                        items={list1}
                        moveTransitionDuration={0.3}
                        dropBackTransitionDuration={0.3}
                        onSort={onSort}
                        type='horizontal'
                      />
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={this.update_image}
                    >
                      Update
                    </button>

                    <button
                      type='button'
                      className='btn btn-default'
                      data-dismiss='modal'
                      onClick={this.closeModel}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AlertError />
      </React.Fragment>
    )
  }
}

export default ImageViews
