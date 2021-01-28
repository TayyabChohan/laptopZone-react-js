// import React, { Component } from 'react'
// import Dropzone from 'react-dropzone'

// class File_Upload extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       hover: false
//     }
//   }
//   render () {
//     return <Dropzone />
//   }
// }
// export default File_Upload
// // import './drop.css'
// // var fileReader
// // class File_Upload extends Component {
// //   constructor (props) {
// //     super(props)

// //     this.state = {
// //       hover: false
// //     }
// //     this.onDragOver = this.onDragOver.bind(this)
// //     this.onDragLeave = this.onDragLeave.bind(this)
// //     this.onDrop = this.onDrop.bind(this)
// //     this.onFilesAdded = this.onFilesAdded.bind(this)
// //     this.openFileDialog = this.openFileDialog.bind(this)
// //     this.fileInputRef = React.createRef()
// //   }

// //   /**
// //    * Handle file dropped into drag area
// //    * @param {Object} event
// //    */
// //   onDrop (event) {
// //     this.stopEvent(event)

// //     const { files } = event.dataTransfer
// //     this.props.onFilesAdded(this.fileListToArray(files))

// //     this.setState({ hover: false })
// //   }

// //   /**
// //    * Handle file being dragged over drag area
// //    * @param {Object} event
// //    */
// //   onDragOver (event) {
// //     this.stopEvent(event)
// //     this.setState({ hover: true })
// //   }

// //   /**
// //    * Handle file being dragged out of drag area
// //    * @param {Object} event
// //    */
// //   onDragLeave (event) {
// //     this.stopEvent(event)
// //     this.setState({ hover: false })
// //   }

// //   /**
// //    * Handle adding files through file dialog
// //    * @param {Object} event
// //    */
// //   onFilesAdded (event) {
// //     const { files } = event.target
// //     console.log(this.fileListToArray(files))
// //     // this.props.onFilesAdded(this.fileListToArray(files))
// //   }

// //   /**
// //    * Opens file system dialog
// //    */
// //   openFileDialog () {
// //     this.fileInputRef.current.click()
// //   }

// //   /**
// //    * Prevent default event. Just in case
// //    */
// //   stopEvent = event => {
// //     event.preventDefault()
// //     event.stopPropagation()
// //   }

// //   /**
// //    * Converts FileList into Array
// //    */
// //   fileListToArray = list => {
// //     // let fileReader
// //     // fileReader = new FileReader()
// //     // fileReader.onloadend = this.onFilesAdded
// //     // fileReader.readAsText(list)
// //     const result = []
// //     for (let i = 0; i < list.length; i++) {
// //       result.push(list.item(i))
// //     }
// //     return result
// //   }

// //   handleFileRead = e => {
// //     const content = fileReader.result
// //     console.log(content)
// //     console.log(fileReader)
// //     // … do something with the 'content' …
// //   }
// //   handleFileChosen = file => {
// //     fileReader = new FileReader()
// //     fileReader.onloadend = this.handleFileRead
// //     fileReader.readAsText(file)
// //   }
// //   render () {
// //     const { hover } = this.state

// //     return (
// //       <React.Fragment>
// //         <section className='content-header'>
// //           <h1>File Upload</h1>
// //           <ol className='breadcrumb'>
// //             <li>
// //               <a href='#'>
// //                 <i className='fa fa-dashboard' /> Home
// //               </a>
// //             </li>
// //             <li>
// //               <a href='#'>File Upload</a>
// //             </li>
// //             <li className='active'>File Upload</li>
// //           </ol>
// //         </section>
// //         <section className='content'>
// //           <div className='row'>
// //             <div className='col-sm-12'>
// //               {/* <section className='content'> */}
// //               <div className='box'>
// //                 <div className='box-header with-border'>
// //                   <h3 className='box-title'>File Upload</h3>
// //                 </div>
// //                 <div className='box-body'>
// //                   <div className='row'>
// //                     <div className='col-xs-12'>
// //                       {/* <div
// //                         onDrop={this.onDrop}
// //                         onClick={this.openFileDialog}
// //                         onDragLeave={this.onDragLeave}
// //                         onDragOver={this.onDragOver}
// //                         className={
// //                           hover
// //                             ? 'drop-zone-container hover'
// //                             : 'drop-zone-container'
// //                         }
// //                       > */}
// //                       <input
// //                         type='file'
// //                         id='file'
// //                         className='input-file'
// //                         accept='.csv'
// //                         onChange={e => this.handleFileChosen(e.target.files[0])}
// //                       />
// //                       <div className='drag-files'>Drag files to upload</div>
// //                       {/* </div> */}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       </React.Fragment>
// //     )
// //   }
// // }

// // export default File_Upload
