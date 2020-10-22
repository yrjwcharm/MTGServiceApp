import { StyleSheet } from 'react-native';
import { setSpText, scaleSizeH, scaleSizeW } from '../../../../util/AutoLayout';
import { ThemeFlags } from "../../../../styles/ThemeFactory";

var styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeFlags['screen-background-color'],
    flex: 1,
  },
  headContainer: {
    marginHorizontal: ThemeFlags['content-margin-horizontal'],
    height: scaleSizeH(36),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: ThemeFlags['content-margin-horizontal'],
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: ThemeFlags['content-margin-horizontal'],
    marginBottom: ThemeFlags['content-margin-horizontal'],
    paddingTop: ThemeFlags['content-margin-horizontal'],
  },
  selectedType: {
    fontSize: ThemeFlags['text-size-h'],
    color: ThemeFlags['Green'],
    marginRight: scaleSizeW(26),
  },
  disSelectedType: {
    fontSize: ThemeFlags['text-size-h'],
    color: ThemeFlags['text-fl-color'],
    marginRight: scaleSizeW(26),
  },
  infoTitle: {
    marginBottom: 5,
  },
  infoTitleText: {
    fontSize: ThemeFlags['text-size-m'],
    color: ThemeFlags['text-fl-color'],
    lineHeight: 20,
  },
  infoImgBig: {
    width: '100%',
    height: scaleSizeH(155),
    borderRadius: 5,
  },
  manyImgs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoImgLittle: {
    width: '32%',
    height: scaleSizeH(70),
    borderRadius: 5,
  },
  rightHasImgContainer: {
    flexDirection: 'row',
  },
  twoColumnContainer: {
    justifyContent: 'space-between',
    flex: 2,
    marginRight: ThemeFlags['content-margin-horizontal'],
  },
  twoColumnContainerLeft: {
    justifyContent: 'space-between',
    flex: 2,
    marginLeft: ThemeFlags['content-margin-horizontal'],
  },
  rightImg: {
    flex: 1,
    alignItems: 'flex-end',
  },
  leftImg: {
    flex: 1,
  },
  littleImg: {
    width: '100%',
    height: scaleSizeH(70),
    borderRadius: 5,
  },
  loadingFooter: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }
})

module.exports = styles;
