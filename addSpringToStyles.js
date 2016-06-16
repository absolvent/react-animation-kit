/**
 * Copyright (c) 2016-present, Lookly
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const mapValues = require('lodash/mapValues');
const reactMotion = require('react-motion');
const presets = reactMotion.presets;
const spring = reactMotion.spring;

function addSpringToStyles(styles, preset) {
  const normalizedPreset = preset || presets.noWobble;

  return mapValues(styles, style => spring(style, normalizedPreset));
}

module.exports = addSpringToStyles;
