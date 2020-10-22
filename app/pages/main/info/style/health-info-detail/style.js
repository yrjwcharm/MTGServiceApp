import { StyleSheet } from 'react-native';
import { setSpText, scaleSizeH, scaleSizeW } from '../../../../../util/AutoLayout';
import { ThemeFlags } from "../../../../../styles/ThemeFactory";

var styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    // paddingHorizontal: ThemeFlags['content-margin-horizontal'],
    // paddingTop: ThemeFlags['content-margin-vertical'],
    paddingBottom: 0,
  },
  detailHeader: {
    flexDirection: 'column',
    marginHorizontal: ThemeFlags['content-margin-horizontal'],
    marginTop: ThemeFlags['content-margin-vertical'],
  },
  detailTitle: {
    fontSize: setSpText(18),
    color: ThemeFlags['text-fl-color'],
    lineHeight: 25,
    marginBottom: -5,
  },
  detailFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scaleSizeH(40),
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  contentBtn: {
    width: scaleSizeW(110),
    height: scaleSizeH(28),
    borderRadius: 99,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: ThemeFlags['content-margin-horizontal'],
  },
  toolsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: ThemeFlags['content-margin-horizontal'],
  },
  numText: {
    fontSize: ThemeFlags['text-size-m'],
    color: ThemeFlags['text-fl-color'],
    marginLeft: 2,
  },
  marR: {
    marginRight: ThemeFlags['content-margin-horizontal'],
  },
  comOrTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

module.exports = styles;
