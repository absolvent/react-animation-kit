/**
 * Copyright (c) 2016-present, Lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import addSpringToStyles from './addSpringToStyles';
import includes from 'lodash/includes';
import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import { Motion } from 'react-motion';

function shouldMountAfter(props) {
  return !includes(props.unmountAfter, props.state);
}

function shouldMountBefore(props) {
  return !includes(props.unmountBefore, props.state);
}

export default class StateMachineMotion extends React.Component {
  static propTypes = {
    children: React.PropTypes.func.isRequired,
    initialState: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
    stateAnimation: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    unmountAfter: React.PropTypes.arrayOf(React.PropTypes.string),
  };

  static defaultProps = {
    unmountAfter: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      defaultStyle: this.props.stateAnimation[this.props.initialState],
      isMounted: shouldMountAfter(this.props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isMounted) {
      return;
    }

    this.setState({
      isMounted: shouldMountAfter(nextProps),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  @autobind
  onRest() {
    if (!shouldMountAfter(this.props)) {
      this.setState({
        defaultStyle: this.props.stateAnimation[this.props.state],
        isMounted: false,
      });
    }
  }

  render() {
    if (!this.state.isMounted || !shouldMountBefore(this.props)) {
      return null;
    }

    return (
      <Motion
        defaultStyle={this.state.defaultStyle}
        onRest={this.onRest}
        style={addSpringToStyles(this.props.stateAnimation[this.props.state])}
      >{this.props.children}</Motion>
    );
  }
}
