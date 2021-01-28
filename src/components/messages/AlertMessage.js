import React, { Component } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
// @import 'react-redux-toastr/src/styles/index';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'

class AlertMessage extends Component {
  //   constructor (props) {
  //     super(props)
  //   }

  render () {
    return (
      <div>
        {/* {this.props.open == true && this.props.status == 'success' ? ( */}
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          preventDuplicates
          position='top-center'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          progressBar
          closeOnToastrClick
          onCloseButtonClick
        />
        {/* ) : (
          ''
        )} */}
      </div>
    )
  }
}

export default AlertMessage
