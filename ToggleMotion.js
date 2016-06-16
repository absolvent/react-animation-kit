/**
 * Copyright (c) 2016-present, Lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import StateMachineMotion from './StateMachineMotion';

function isExpandedToStateName(isExpanded) {
  return isExpanded ? 'expanded' : 'contracted';
}

export default class ToggleMotion extends React.Component {
  static propTypes = {
    children: React.PropTypes.func.isRequired,
    contractedStyle: React.PropTypes.object.isRequired,
    expandedStyle: React.PropTypes.object.isRequired,
    isExpanded: React.PropTypes.bool.isRequired,
    isInitiallyExpanded: React.PropTypes.bool,
    unmountAfterContracted: React.PropTypes.bool,
  };

  static defaultProps = {
    isInitiallyExpanded: false,
    unmountAfterContracted: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      initialState: isExpandedToStateName(this.props.isInitiallyExpanded),
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <StateMachineMotion
        initialState={this.state.initialState}
        state={isExpandedToStateName(this.props.isExpanded)}
        stateAnimation={{
          contracted: this.props.contractedStyle,
          expanded: this.props.expandedStyle,
        }}
        unmountAfter={[
          this.props.unmountAfterContracted ? 'contracted' : null,
        ]}
      >{this.props.children}</StateMachineMotion>
    );
  }
}
