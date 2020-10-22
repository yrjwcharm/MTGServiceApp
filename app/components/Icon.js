import React, { Component } from 'react';
import SvgUri from 'react-native-svg-uri';
import svgs from '../resources/svg/svgs';

export default class Svg extends Component{
  render() {
    const {
      name,
      color,
      size,
      ...rest
    } = this.props;
    const svgXmlData = svgs[name];

    if (!svgXmlData) {
      const err_msg = `没有"${name}"这个icon，请检查/js/imgs/svg/${name}.svg文件`;
      throw new Error(err_msg);
    }
    return (
      <SvgUri
        width={size}
        height={size}
        svgXmlData={svgXmlData}
        fill={color}
        {...rest}
      />
    )
  }
}
