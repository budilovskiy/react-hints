import React, {Component} from 'react';
import './TapHint.css';

class TapHint extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {}
        };
    }

    onAction() {
        console.log('Tap onAction()');
        this.setState({style: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.1) translateY(-40%)',
            transition: 'all 250ms ease'
        }});
        setTimeout(() => {
            this.setState({style: {
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                transform: 'scale(1.0) translateY(-45%)',
                transition: 'all 250ms ease'
            }});
        }, 250);
    }

    render() {
        if (this.props.visible) {
            return (
                <div className='tap-hint'>
                    <div className='tap-hint-image' style={this.state.style}>
                        {this.props.text ? <div>{this.props.text}</div> : <img src={this.props.image} alt="Tap"/>}
                    </div>
                </div>
            );
        } else {
            return (
                <div/>
            )
        }
    }
}

export default TapHint;