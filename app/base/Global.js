import React,{Component} from 'react';
import {scaleSizeW,setSpText,scaleSizeH} from '../util/AutoLayout';
import Config from './Config'
import FontSize from './FontSize';
import Color from './Color'
import Image from '../resources/Image';
import Styles from './Styles'
global.Images = Image;
global.scaleSizeW= scaleSizeW;
global.scaleSizeH = scaleSizeH;
global.setSpText = setSpText;
global.FontSize = FontSize;
global.Color = Color;
global.Config = Config;
global.Styles =Styles;
