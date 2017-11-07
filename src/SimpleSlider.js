import React, {Component} from 'react';
import './SimpleSlider.css';
import Slider from "react-slick";
import SwipeLeftHint from "./SwipeLeftHint";
import TapHint from "./TapHint";
import SwipeRightHint from "./SwipeRightHint";

const public_url = process.env.PUBLIC_URL;
const themes = {
    white: {
        left: public_url + '/ic_swipe_left_preview.png',
        tap: public_url + '/ic_tap_preview.png',
        right: public_url + '/ic_swipe_right_preview.png'
    },
    green: {
        left: public_url + '/ic_swipe_left_preview.png',
        tap: public_url + '/ic_tap_preview.png',
        right: public_url + '/ic_swipe_right_preview.png'
    }
};
const hintsVisibilityTimeout = 10000;
const stepBackText = 'Please, stand back a little';


class SimpleSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hintsVisibility: {
                left: false,
                tap: false,
                right: false
            },
            hintsImages: {
                left: themes.white.left,
                tap: themes.white.tap,
                right: themes.white.right
            },
            zoomImage: false,
            stepBack: false,
        };
        this.timerID = undefined;
    }

    setHintsVisibility(left, tap, right) {
        if (this.timerID) {
            clearTimeout(this.timerID);
        }
        this.setState({
            hintsVisibility: {
                left: left,
                tap: tap,
                right: right
            },
            stepBack: false
        });
        this.timerID = setTimeout(
            () => {
                this.setState({
                    hintsVisibility: {
                        left: false,
                        tap: false,
                        right: false
                    },
                    zoomImage: false
                });
            }, hintsVisibilityTimeout
        );
    }

    onTapPressed() {
        this.setState({
            zoomImage: !this.state.zoomImage,
        })
    }

    onKeyPress = event => {
        console.log('event.keyCode:', event.keyCode);
        switch (event.keyCode) {
            case 122: {
                console.log('z pressed');
                this.setHintsVisibility(true, true, true);
                break;
            }
            case 97: {
                console.log('a pressed');
                this.setState({zoomImage: false});
                this.leftHint.onAction();
                this.slider.slickPrev();
                this.setHintsVisibility(true, true, true);
                break;
            }
            case 115: {
                console.log('s pressed');
                this.tapHint.onAction();
                this.setHintsVisibility(true, true, true);
                this.onTapPressed();
                break;
            }
            case 100: {
                console.log('d pressed');
                this.setState({zoomImage: false});
                this.rightHint.onAction();
                this.slider.slickNext();
                this.setHintsVisibility(true, true, true);
                break;
            }
            case 120: {
                console.log('x pressed');
                this.tapHint.onAction();
                this.setHintsVisibility(false, true, false);
                this.setState({stepBack: true});
                break;
            }
            case 99: {
                console.log('c pressed');
                this.setHintsVisibility(true, true, true);
                break;
            }
            default: {
                break;
            }
        }
    }

    getZoom() {
        return this.state.zoomImage ? {
            transform: 'scale(2.0)',
            transition: 'all 200ms ease'
        } : {
            transform: 'scale(1.0)',
            transition: 'all 200ms ease'
        }
    };

    componentDidMount() {
        document.addEventListener("keypress", this.onKeyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.onKeyPress, false);
    }

    render() {
        let settings = {
            dots: true,
            arrows: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <div className='slider-container'>
                <SwipeLeftHint
                    ref={instance => this.leftHint = instance}
                    visible={this.state.hintsVisibility.left}
                    image={this.state.hintsImages.left}
                />
                <TapHint
                    ref={instance => this.tapHint = instance}
                    visible={this.state.hintsVisibility.tap}
                    image={this.state.hintsImages.tap}
                    text={this.state.stepBack ? stepBackText : ''}
                />
                <SwipeRightHint
                    ref={instance => this.rightHint = instance}
                    visible={this.state.hintsVisibility.right}
                    image={this.state.hintsImages.right}
                />
                <Slider ref={instance => this.slider = instance} {...settings}>
                    <img src={public_url + '/1.jpeg'} style={this.getZoom()} alt="1"/>
                    <img src={public_url + '/2.jpeg'} style={this.getZoom()} alt="2"/>
                    <img src={public_url + '/3.jpeg'} style={this.getZoom()} alt="3"/>
                    <img src={public_url + '/4.jpeg'} style={this.getZoom()} alt="4"/>
                </Slider>
            </div>
        )
    }
}

export default SimpleSlider;