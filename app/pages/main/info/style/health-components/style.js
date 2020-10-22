import { StyleSheet } from 'react-native';
import { setSpText, scaleSizeH, scaleSizeW } from '../../../../../util/AutoLayout';
import { ThemeFlags } from "../../../../../styles/ThemeFactory";

var styles = StyleSheet.create({
  // ToolBar
  toolsBar: {
    marginTop: ThemeFlags['content-margin-vertical'],
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoSource: {
    width: scaleSizeW(70),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  toolsBarText: {
    fontSize: ThemeFlags['text-size-s'],
    color: ThemeFlags['text-tl-color'],
  },
  viewNum: {
    width: scaleSizeW(60),
    flexDirection: 'row',
    // alignItems: 'center',
  },
  // CommentItems
  tabContainer: {
    flex: 1,
  },
  numText: {
    fontSize: ThemeFlags['text-size-s'],
    color: ThemeFlags['text-fl-color'],
  },
  marR: {
    marginRight: ThemeFlags['content-margin-horizontal'],
  },
  marL: {
    marginLeft: ThemeFlags['content-margin-horizontal'],
  },
  userPhoto: {
    width: scaleSizeW(32),
    height: scaleSizeW(32),
    borderRadius: 99,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  colContainer: {
    flexDirection: 'column',
    marginLeft: ThemeFlags['content-margin-horizontal'],
  },
  nameAndZan: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  padR: {
    paddingRight: ThemeFlags['content-margin-horizontal'],
  },
  nameText: {
    color: ThemeFlags['Green'],
    fontSize: setSpText(15),
  },
  comContentText: {
    fontSize: setSpText(15),
    lineHeight: scaleSizeH(23),
    color: ThemeFlags['text-fl-color'],
    marginVertical: 4,
  },
  littleText: {
    fontSize: setSpText(12),
    color: ThemeFlags['text-tl-color'],
    marginRight: 5,
  },
  comTextContainer: {
    width: scaleSizeW(310),
    // marginRight: ThemeFlags['content-margin-horizontal'],
  },
  comTextContainerC: {
    width: scaleSizeW(280),
  },
  remarkText: {
    fontSize: setSpText(12),
    color: ThemeFlags['text-fl-color'],
  },
  littleUserPhoto: {
    width: scaleSizeW(20),
    height: scaleSizeW(20),
    borderRadius: 99,
  },
  littleTextC: {
    fontSize: ThemeFlags['text-size-s'],
    color: ThemeFlags['text-tl-color'],
  },
  nameTextC: {
    fontSize: ThemeFlags['text-size-s'],
    color: ThemeFlags['Green'],
  },
  marT: {
    marginTop: ThemeFlags['content-margin-vertical'],
  },
})

module.exports = styles;
