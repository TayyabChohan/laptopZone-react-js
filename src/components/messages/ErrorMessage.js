import React, { Component } from 'react'
import { closeErrorMessage } from '../../action/eBayIntegrationActions.js'
import { closeErrorMessageLot } from '../../action/createLotActions.js'
import SweetAlert from 'react-bootstrap-sweetalert'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
class ErrorMessage extends Component {
  handleOnClose = () => {
    this.props.closeErrorMessage()
    this.props.closeErrorMessageLot()
  }
  render () {
    return (
      <div>
        {this.props.open === true && this.props.status === 'error' ? (
          <SweetAlert
            error
            confirmBtnText='OK'
            confirmBtnBsStyle='danger'
            title='Error'
            onConfirm={this.handleOnClose}
          >
            {this.props.error_message}
          </SweetAlert>
        ) : this.props.open === true && this.props.status === 'success' ? (
          <SweetAlert
            success
            confirmBtnText='OK'
            confirmBtnBsStyle='success'
            title='Success'
            onConfirm={this.handleOnClose}
          >
            {this.props.success_message}
          </SweetAlert>
        ) : this.props.open === true && this.props.status === 'server_error' ? (
          <SweetAlert
            error
            confirmBtnText='OK'
            confirmBtnBsStyle='danger'
            title='Error'
            onConfirm={this.handleOnClose}
          >
            {this.props.server_error}
          </SweetAlert>
        ) : this.props.open === true &&
          this.props.status === 'alert_success' ? (
            <Alert dismissible variant='danger'>
              <p>{this.props.alert_message}</p>
            </Alert>
          ) : this.props.open1 === true &&
          this.props.status1 === 'Please Save Images' ? (
            <SweetAlert
                error
                confirmBtnText='OK'
                confirmBtnBsStyle='danger'
                title='Error'
                onConfirm={this.handleOnClose}
              >
                {this.props.server_error1}
              </SweetAlert>
            ) : (
              <div />
            )}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    open: state.eBayReducer.open,
    error_message: state.eBayReducer.error_message,
    success_message: state.eBayReducer.success_message,
    status: state.eBayReducer.status,
    server_error: state.eBayReducer.server_error,
    alert_message: state.eBayReducer.alert_message,
    open1: state.createLotReducer.open,
    server_error1: state.createLotReducer.server_error,
    status1: state.createLotReducer.status
  }
}
export default connect(
  mapStateToProps,
  { closeErrorMessage, closeErrorMessageLot }
)(ErrorMessage)
