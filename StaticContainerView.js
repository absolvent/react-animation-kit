/**
 * Copyright (c) 2016-present, Lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import React from 'react';

export default class StaticContainerView extends React.Component {
  static propTypes = {
    animation: React.PropTypes.object,
    renderScene: React.PropTypes.func.isRequired,
    renderSceneWrapper: React.PropTypes.func.isRequired,
    redrawKey: React.PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.privateSymbol = Symbol();
  }

  componentWillMount() {
    this.refresh(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redrawKey !== this.props.redrawKey) {
      this.refresh(nextProps);
    }
  }

  refresh(props) {
    this[this.privateSymbol] = props.renderScene();
  }

  render() {
    return this.props.renderSceneWrapper(this[this.privateSymbol], this.props.animation);
  }
}
