import React, { Component } from 'react';

class App extends Component {
    render () {
        return ( 
            <div>
                <div className="toolbar">
                    <i className="btn dripicons-media-record" />
                    <i className="btn dripicons-media-stop" />
                    <i className="btn dripicons-star separator" />
                    <i className="btn dripicons-duplicate" />
                    <i className="btn dripicons-wrong separator" />
                    <i className="btn dripicons-arrow-left" />
                    <i className="btn dripicons-arrow-right" />
                    <i className="btn dripicons-arrow-up" />
                    <i className="btn dripicons-arrow-down separator" />
                    <i className="btn dripicons-gear" />
                </div>
                <div id="drawing"></div>
            </div> 
        );
    }
}

export default App;