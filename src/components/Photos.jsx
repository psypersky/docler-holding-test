import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { branch } from 'baobab-react/higher-order';

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const TOUCH_TRIGGER = 30;

@branch({
  photos: ['photos']
})

export default class Photos extends React.Component {
  constructor(props) {
    super(props);

    const { width, height } = props.photos.size;

    this.state = {
      sliding: false,
      slides: {
        left: {
          src: `http://placehold.it/${width}x${height}`,
        },
        center: {
          src: `http://lorempixel.com/${width}/${height}?d=${Math.floor(Math.random() * 10000)}`,
        },
        right: {
          src: `http://lorempixel.com/${width}/${height}?d=${Math.floor(Math.random() * 10000)}`,
        }
      }
    };

    this.handleClickRight = ::this.handleClickRight;
    this.handleClickLeft = ::this.handleClickLeft;
    this.handleCarouselAnimationEnd = ::this.handleCarouselAnimationEnd;
    this.handleCarouselTouchStart = ::this.handleCarouselTouchStart;
    this.handleCarouselTouchEnd = ::this.handleCarouselTouchEnd;
  }

  componentDidMount() {
    // TODO: detect if animationend is defined or we need to add a prefix
    const carouselEl = this.refs.carousel;
    carouselEl.addEventListener('animationend', this.handleCarouselAnimationEnd);
  }

  handleClickRight() {
    const { sliding } = this.state;

    if (sliding) {
      return;
    }

    this.setState({ sliding: 'right' });
  }

  handleClickLeft() {
    const { sliding } = this.state;

    if (sliding) {
      return;
    }

    this.setState({ sliding: 'left' });
  }

  handleCarouselAnimationEnd() {
    const { sliding, slides: { left, center, right } } = this.state;
    const { width, height } = this.props.photos.size;

    if (sliding === 'right') {
      this.setState({
        sliding: false,
        slides: {
          right: center,
          center: left,
          left: {
            src: `http://placehold.it/${width}x${height}`,
          },
        },
      });
    } else if (sliding === 'left') {
      this.setState({
        sliding: false,
        slides: {
          left: center,
          center: right,
          right: {
            src: `http://lorempixel.com/${width}/${height}?d=${Math.floor(Math.random() * 10000)}`,
          }
        },
      });
    }
  }

  finishSliding(direction) {
    const { sliding } = this.state;

    if (sliding === 'right') {

    }
  }

  handleCarouselTouchStart(event) {
    touchstartX = event.touches[0].screenX;
  }

  handleCarouselTouchEnd(event) {
    touchendX = event.changedTouches[0].screenX;
    this.handleGesture();
  }

  handleGesture() {
    if ((touchendX < touchstartX) && ((touchstartX - touchendX) > TOUCH_TRIGGER)) {
        this.handleClickLeft();
    } else if ((touchendX > touchstartX) && ((touchendX - touchstartX) > TOUCH_TRIGGER)) {
        this.handleClickRight();
    }
  }

  render() {
    const { sliding, slides: { left, center, right } } = this.state;
    const { width, height } = this.props.photos.size;


    const carouselClasses = classNames('carousel', {
      'slide-in-right': sliding === 'right',
      'slide-in-left': sliding === 'left',
    });

    const leftStyle = {
      left: `-${width}px`,
    };

    const centerStyle = {
      left: 0,
    };

    const rightStyle = {
      left: `${width}px`,
    };

    const carouselContainerStyle = {
      width: `${width}px`,
      height: `${height}px`,
    };

    return (
      <div className="photos">
        <div className="carousel-container" style={carouselContainerStyle}>
          <div
            className={carouselClasses}
            ref='carousel'
            onTouchStart={this.handleCarouselTouchStart}
            onTouchEnd={this.handleCarouselTouchEnd}
          >
            <div className="slide slide-in" style={leftStyle}><img src={left.src}/></div>
            <div className="slide slide-in" style={centerStyle}><img src={center.src}/></div>
            <div className="slide slide-in" style={rightStyle}><img src={right.src}/></div>
          </div>
          <div className="controls">
            <div className="right" onClick={this.handleClickRight}></div>
            <div className="left" onClick={this.handleClickLeft}></div>
          </div>
        </div>
      </div>
    );
  }
}
