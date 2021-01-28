import React, {Component} from 'react';
import {Helmet} from "react-helmet";

class LoadLibraries extends Component {
    render(){
        return(
            <Helmet
    encodeSpecialCharacters={true}
    onChangeClientState={(newState) => console.log(newState)}
>
 
    {/* multiple script elements */}
    <script src="assets/JS/epos-2.12.0.js"></script>

</Helmet>
        );
    }
}
export default LoadLibraries;