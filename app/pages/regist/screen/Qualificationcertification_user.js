'use strict';
import React, {Component} from 'react';
import {
  DeviceEventEmitter,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  RefreshControl, Dimensions,
  TouchableOpacity
} from 'react-native';
import {Button, Modal,} from '@ant-design/react-native';
import {connect,} from 'react-redux';
import {Toast} from 'teaset'

import commonStyle from '../../../styles/common';
import PerfectUserInfoStyle from '../style/PerfectUserInfoStyle';
import {scaleSizeH, scaleSizeW, setSpText} from "../../../util/AutoLayout";
import WidgetStyles from "../../../styles/WidgetStyles";
import {CustomPickerItem} from '../../../components/CustomPickerItem'
import {regExp} from "../../../util/reg";
import Loading from '../../../components/Loading'
import {isEmpty} from '../../../util/EmptyUtils';
import ImageResizer from 'react-native-image-resizer';
import {ThemeFlags} from "../../../styles/ThemeFactory";
import Iconfont from '../../../components/iconfont/Icon';
import ImagePicker from 'react-native-image-crop-picker';
import {checkParity} from "../../../util/IdCardUtils";

const {width, height} = Dimensions.get('window');

/**
 * @author: liy_lmn
 * @date: 2019-10-07
 * @description: 身份认证（普通用户） status:1待审批2认证通过3申请驳回4认证取消
 */
let that;//外部申明
class Qualificationcertification_user extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '身份认证',
  })

  constructor(props) {
    super(props);
    that = this;
    this.state = {
      files: [],
      buUserIdverifyAnnexIdList: [],
      visible: false,
      refreshing: false,
      isAllImage: false,//是否选全了图片，判断是提交时候是否显示提示框
      img0: '',//身份证正面
      img1: '',//身份证背面
      imgid0: '',//身份证正面
      imgid1: '',//身份证背面
      imgid2: '',//医师证手持面
      imgid3: '',//医师证正面
      status: 0,
    };
  }

  componentWillMount() {
    this.setState({
      cardType: '621350261704622080',
    })
    this.props.fetGetUserIdverify({
      userId: this.props.userInfo.userId
    }, this.GetQualificationSuccess);
    this.props.fetBaVerifyType({
      verifyType: 1
    });
    this.props.fetchCardType();
  }

  // 返回时刷新列表
  componentWillUnmount() {
    DeviceEventEmitter.emit('BASESETTING');
  }

  GetQualificationSuccess = (qualificationData) => {
    this.setState({...qualificationData})
    this.setState({
      img0: qualificationData.buUserIdverifyAnnexUrlList[0],
      img1: qualificationData.buUserIdverifyAnnexUrlList[1],
      imgid0: qualificationData.buUserIdverifyAnnexIdList[0],
      imgid1: qualificationData.buUserIdverifyAnnexIdList[1],
    })
    // if (!qualificationData.cardType) {
    //   this.setState({
    //     cardType:'621350261704622080',
    //   })
    // }
  }

  //相机权限
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': '需要访问相册',
          'message': '需要访问相册',
        },
      )
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          granted: true,
        })
      } else {
        this.setState({
          granted: false,
        })
      }
    } catch (err) {
      console.warn(err)
    }
  }

  // async componentWillMount(){
  //   if (Platform.OS == 'android') {
  //         await this.requestCameraPermission();
  //       }
  // }

  async componentDidMount() {
    if (Platform.OS == 'android') {
      await this.requestCameraPermission();
    }
    this.initPageFromConfirmSign();
  }

  initPageFromConfirmSign = () => {
    const {signData} = this.props.route.params || {};
    if (!signData) return;
    this.signData = signData; // 存一份, 用于disabled校验等
    const {realName, cardType, cardNo} = signData;
    this.setState({
      realName,
      cardType,
      cardNo,
    })
  }

  goTextInputScreen_card = () => {
    const {status} = this.state
    if (status == undefined || status == '' || status == 0 || status == 3 || status == 4) {
      this.props.navigation.navigate('TextInput', {
        defaultValue: this.state.cardNo,
        onChange: this.setCardNumber,
        validator: this.validator_cardnumber,
        placeholder: '请填写证件号',
        tip: '请输入符合规范的证件号',
        title: '证件号'
      })
    }
  }

  validator_cardnumber = (text) => {
    if (text == undefined || !text.search(regExp.RegNull)) {
      return '证件号不能为空';
    } else if (!checkParity(text)) {
      return '请输入正确的身份证号,如有X需要大写'
    }

  }

  setCardNumber = (cardNo) => {
    this.setState({
      cardNo: cardNo
    })
  }

  goTextInputScreen_name = () => {
    const {status} = this.state
    if (status == undefined || status == '' || status == 0 || status == 3 || status == 4) {
      this.props.navigation.navigate('TextInput', {
        defaultValue: this.state.realName,
        onChange: this.setrealName,
        validator: this.validator_name,
        placeholder: '请输入您的姓名',
        tip: '2-10个汉字',
        title: '姓名'
      })
    }

  }

  validator_name = (text) => {
    if (text == undefined || !text.search(regExp.RegNull)) {
      return '姓名不能为空';
    }
    if (text.search(regExp.Reg_RelName)) {
      return '请输入2-10个汉字';
    }
  }

  setrealName = (realName) => {
    this.setState({
      realName: realName
    })
  }


  onVisibleChange_card = isVisible => {
    if (isVisible) {
      if (!this.props.data_card) {
        this.props.fetchCardType();
      }
    }
  }
  setCardType = (value) => {
    this.setState({
      cardType: value[0]
    })
  }

  submit = () => {
    const {realName, cardType, cardNo, buUserIdverifyAnnexIdList, files, status, img0, img1, imgid0, imgid1,} = this.state
    if (status == 2) {
      this.props.navigation.navigate('Main')
    } else {
      if (isEmpty(realName)) {
        Toast.info('姓名不能为空');
        return;
      }
      if (isEmpty(cardType)) {
        Toast.info('请选择证件类型',  );
        return;
      }
      if (isEmpty(cardNo)) {
        Toast.info('证件号不能为空',  );
        return;
      }
      if (isEmpty(img0)) {
        Toast.info('请上传身份证人像面照片',  );
        return;
      }
      if (isEmpty(img1)) {
        Toast.info('请上传身份证国徽面照片',  );
        return;
      }
      let imgids = []
      imgids.push(imgid0)
      imgids.push(imgid1)
      // if (!isEmpty(files) && files.length == 2) {
      if (status == undefined || status == '' || status == 0) {
        this.props.fetInsertUserIdverify({
          cardType: cardType,
          cardNo: cardNo,
          realName: realName,
          userId: this.props.userInfo.userId,
          buUserIdverifyAnnexIdList: imgids,
        }, this.goBack)
      } else {
        this.props.fetChangeUserIdverify({
          cardType: cardType,
          cardNo: cardNo,
          realName: realName,
          userId: this.props.userInfo.userId,
          buUserIdverifyAnnexIdList: imgids,
        }, this.goBack)
      }

      // } else {
      //   this.setState({isAllImage: true})
      //   // Toast.info('请先上传证件照', 1.5, null, false)
      // }
    }

  }
  goBack = (data) => {
    const {callback} = this.props.route.params || {};
    if (data.code == 200) {
      this.props.fetchFindInfo(() => {
        this.showAddModal();
        callback ? callback() : this.props.navigation.goBack();
      })
    } else {
      Toast.info(data.msg,);
    }
  }
  handleFileChange = (files) => {
    if (files.length < 3) {
      if (files.length < this.state.files.length) {
        this.setState({
          files: files
        })
        const {buUserIdverifyAnnexIdList} = this.state;
        let _buUserIdverifyAnnexIdList = buUserIdverifyAnnexIdList;
        _buUserIdverifyAnnexIdList.pop();
        this.setState({
          buUserIdverifyAnnexIdList: _buUserIdverifyAnnexIdList
        })
      } else {
        this.uploadAnnex(files);
      }

    } else {
      Toast.info('已超出选择图片张数', )
    }

  }

  uploadAnnex = (files) => {
    var newFiles = files.map((v, i) => {
      if (i == files.length - 1) {
        return v.url;
      }
    });
    var _newFiles = newFiles.slice(newFiles.length - 1, newFiles.length)
    var file = [];

    ImageResizer.createResizedImage(_newFiles[0], 600, 800, 'PNG', 0, 0, null).then((response) => {
      file.push(response.uri);
      console.log(file)
      let formData = new FormData();
      formData.append('userId', this.props.userInfo.userId)
      this.props.fetchUploadAnnex(
        file,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }, () => {
          this.uploadAnnex_success(files)
        })
    }).catch((err) => {
      console.log(err)

    });


  }

  uploadAnnex_success = (files) => {
    Toast.info('上传成功', );
    const {buUserIdverifyAnnexIdList} = this.state;
    const {uploadAnnexData} = this.props;
    console.log(uploadAnnexData);
    let _buUserIdverifyAnnexIdList = buUserIdverifyAnnexIdList;
    _buUserIdverifyAnnexIdList.push(uploadAnnexData.annexId);
    this.setState({
      buUserIdverifyAnnexIdList: _buUserIdverifyAnnexIdList
    })
    this.setState({
      files: files
    })

  }
  showAddModal = () => {

    this.setState({
      visible: true
    })
    this.timer = setTimeout(() => {

      this.closeAddModal();

    }, 1000);
  }
  closeAddModal = () => {
    this.setState({
      visible: false
    })
  }


  showAddModal = () => {

    this.setState({
      visible: true
    })
    this.timer = setTimeout(() => {

      this.closeAddModal();

    }, 1000);
  }
  closeAddModal = () => {
    this.setState({
      visible: false
    })
  }

  openModal = (index) => {
    Modal.operation([
      {text: '打开相机', onPress: () => this.openCamera(index)},
      {text: '打开相册', onPress: () => this.openPicker(index)},
    ]);
  }

  // 打开相机
  openCamera = (index) => {
    ImagePicker.openCamera({
      // width: 480,
      // height: 300,
      // cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      // this.uploadPhoto(image.path, index);
      console.log(image);
      if (image.size > 307200) {
        ImageResizer.createResizedImage(image.path, 960, 600, 'JPEG', 100, 0, null).then((response) => {
          console.log(response);
          this.uploadPhoto(response.uri, index);
        })
      } else {
        this.uploadPhoto(image.path, index);
      }
    });
  }

  // 打开相册
  openPicker = (index) => {
    ImagePicker.openPicker({
      // width: 480,
      // height: 300,
      // cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      console.log(image);
      // this.uploadPhoto(image.path, index);
      if (image.size > 307200) {
        ImageResizer.createResizedImage(image.path, 960, 600, 'JPEG', 100, 0, null).then((response) => {
          console.log(response);
          this.uploadPhoto(response.uri, index);
        })
      } else {
        this.uploadPhoto(image.path, index);
      }
    })
  }

  // 上传照片
  uploadPhoto = (uri, index) => {
    const {fetchUploadAnnex} = this.props;
    let uris = [];
    uris.push(uri)
    let formData = new FormData();
    formData.append('userId', this.props.userInfo.userId)
    fetchUploadAnnex(
      uris,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }, (data) => {
        console.log('data======' + JSON.stringify(data))
        if (data.code == 200) {
          Toast.info('上传成功', );

          if (index == 0) {
            this.setState({
              img0: data.data.axnexUrl,
              imgid0: data.data.annexId
            })
          } else if (index == 1) {
            this.setState({
              img1: data.data.axnexUrl,
              imgid1: data.data.annexId

            })
          }
        } else {
          Toast.info(data.msg, );
        }
      }
    )
  }

  render() {
    if (Platform.OS == 'android' && !this.state.granted) {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>需要访问相册的权限</Text>
        </View>);
    }
    const des1s = ['请确保上传的证件清晰可见，否则系统无法识别，影响您的认证结果；', '  我们承诺,身份审核时间最长不超过48个小时；', '  您已经通过身份认证；', '  您可以根据驳回原因描述问题重新修改后提交；', '  您的身份认证已被取消；']
    const des2s = ['如果您选择了通过文件上传认证图片，每张大小不能超过300kb，否则系统无法接收；', '审核成功之后,我们将发送短信通知至您的手机,请注意保持手机畅通；', '  希望您遵守用户操作协议,违规系统将会取消您的认证；', '  提交资料必须真实,因其他问题导致申请驳回时,可以重新申请,但您最多只有3次提交机会,超过3次后也会取消申请资格,请您谨慎提交；', '  取消原因,您违反《佑健康APP用户管理协议》及《佑健康隐私政策》,如有疑问请发邮件至service@youjiankang.net' + '\n']
    const titles = ['', '您的身份申请已成功提交', '您的身份申请已通过', '您的身份申请未通过', '您的身份申请已取消']
    const title_types = ['', '等待审批', '审批通过', '审批已驳回', '审批已取消']
    const title_type_colors = ['#FF9300', '#FF9300', '#04B42F', '#FF0000', '#FF0000']
    const {data_card, isLoading, qualificationData} = this.props
    const {status, realName, cardNo, cardType, isAllowAsk, buUserIdverifyAnnexUrlList, verifyDesc, cancelDesc, files, img0, img1,} = this.state
    const disabled = (status == undefined || status == '' || status == 0 || status == 3 || status == 4 ? false : true) || this.signData; // 如果从签约页面过来，则不可编辑姓名身份证号等信息
    // const status=4;
    return (
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <View style={{backgroundColor: '#f3f3f3', flex: 1}}>
          <Modal
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0
            }}
            transparent={true}
            visible={this.state.isAllImage}
            animationType={'fade'}
            onRequestClose={() => this.setState({isAllImage: false})}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <TouchableOpacity onPress={() => this.setState({isAllImage: false})}>
                <Text style={{
                  color: ThemeFlags["text-sl-color"],
                  fontSize: 14
                }}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({isAllImage: false})}>
                <Text style={{
                  color: ThemeFlags.Green,
                  fontSize: 14
                }}>确定</Text>
              </TouchableOpacity>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#F3F3F3',
              paddingVertical: 9
            }}>
              <Text style={{
                fontSize: 14,
                color: ThemeFlags["text-fl-color"],
                fontWeight: '500'
              }}>手持身份证照片</Text>
              <Text style={{
                fontSize: 14,
                color: files.length >= 1 ? ThemeFlags.Green : '#EC0E0E'
              }}>{files.length >= 1 ? '(已上传）' : '(未上传）'}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#F3F3F3',
              paddingVertical: 9
            }}>
              <Text style={{
                fontSize: 14,
                color: ThemeFlags["text-fl-color"],
                fontWeight: '500'
              }}>身份证背面照片</Text>
              <Text style={{
                fontSize: 14,
                color: files.length >= 2 ? ThemeFlags.Green : '#EC0E0E'
              }}>{files.length >= 2 ? '(已上传）' : '(未上传）'}</Text>
            </View>
          </Modal>
          <ScrollView style={[PerfectUserInfoStyle.Wrap, {marginBottom: 45}]}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          colors={['#ff0000', '#00ff00', '#0000ff']}
                          progressBackgroundColor={"#ffffff"}
                          onRefresh={() => {
                            this.props.fetGetUserIdverify({
                              userId: this.props.userInfo.userId
                            }, this.GetQualificationSuccess);
                            this.props.fetBaVerifyType({
                              verifyType: 1
                            });
                            this.props.fetchCardType();
                            this.setState({
                              files: []
                            })
                          }}
                        />
                      }
          >
            <Loading isVisible={isLoading}/>
            <Modal
              transparent
              onClose={this.closeAddModal}
              maskClosable
              visible={this.state.visible}
            >
              <View style={{height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{
                    height: 28
                  }}
                  resizeMode={'contain'}
                  source={Images.ic_success}/>
                <Text style={{
                  fontSize: setSpText(18),
                  color: ThemeFlags["text-fl-color"],
                  marginLeft: 10
                }}>手持证件照片已经上传</Text>
              </View>
            </Modal>
            <ScrollView style={{
              flex: 1,
              width: '100%'
            }}>

              {status == undefined || status == '' || status == 0
                ?
                null
                :
                <View style={styles.view_title}>
                  <View style={styles.view_title_content}>
                    <Image
                      style={{width: 40,}}
                      resizeMode={'contain'}
                      source={status == 1
                        ? Images.ic_test
                        : status == 2
                          ? Images.ic_pass
                          : status == 3
                            ?Images.ic_fail
                            : Images.ic_cancel}/>

                    <View>
                      <Text style={{
                        fontSize: 16,
                        marginLeft: 6,
                        color: '#04B48D'
                      }}>
                        {titles[status]}
                      </Text>
                      <Text style={styles.text_status}>
                        当前申请状态：
                        <Text style={{
                          fontSize: 12,
                          color: title_type_colors[status]
                        }}>{title_types[status]}</Text>
                      </Text>
                      {status == undefined || status == '' || status == 3 || status == 4 ?
                        <Text style={{
                          fontSize: 12,
                          marginLeft: 6,
                          marginTop: 1,
                          color: '#666666'
                        }}>
                          驳回原因：
                          <Text style={{color: '#FF0000'}}>
                            {status == 3 ? verifyDesc : status == 4 ? cancelDesc : ""}
                          </Text>
                        </Text> : null}
                    </View>
                  </View>


                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <Text style={
                      {
                        fontSize: 12,
                        color: '#666666',
                        lineHeight: 20,
                        marginLeft: 5
                      }}>
                      您提交的身份认证申请信息如下：
                    </Text>
                  </View>

                </View>
              }
              <ItemView
                des={'姓名'}
                data={realName}
                onPress={disabled ? null : this.goTextInputScreen_name}
                ishideImg={disabled}
              />

              <CustomPickerItem
                disabled={true}
                value={[cardType]}
                onOk={this.setCardType}
                label='证件类型'
                cols={1}
                data={
                  data_card
                }
                onVisibleChange={
                  this.onVisibleChange_card
                }
                style={{marginBottom: 1, marginTop: 0, paddingLeft: 5}}
              />

              <ItemView
                des={'证件号'}
                data={cardNo && cardNo.toString().replace(/^(.{6})(?:\w+)(.{4})$/, "\$1********\$2")}
                onPress={disabled ? null : this.goTextInputScreen_card}
                ishideImg={disabled}
              />
              {
                status == undefined || status == '' || status == 0 || status == 3 || status == 4
                  ? <View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.littleTriangle}></View>
                      <View style={styles.bigTriangle}></View>
                    </View>
                    <View style={styles.tipsContainer}>
                      <Iconfont
                        style={{marginLeft: 15, marginRight: 5,}}
                        name={'tishi'}
                        size={14}
                      />
                      <Text style={styles.tishiText}>为了您顺利通过认证，请务必填写真实信息</Text>
                    </View>
                  </View>
                  : null
              }

              {status == undefined || status == '' || status == 0 || status == 1 || status == 2 || status == 3 || status == 4
                ?
                <View style={styles.view_imagepicker}>
                  {/*<ImagePicker*/}
                  {/*  ref={ref => this.imagepicker = ref}*/}
                  {/*  onChange={this.handleFileChange}*/}
                  {/*  files={this.state.files}*/}
                  {/*  selectable={false}*/}
                  {/*/>*/}
                  {/*<TouchableOpacity*/}
                  {/*  onPress={() => {*/}
                  {/*    this.imagepicker.showPicker();*/}
                  {/*  }}*/}
                  {/*  style={{*/}
                  {/*    height: 78,*/}
                  {/*    width: 78,*/}
                  {/*    backgroundColor: ThemeFlags.White,*/}
                  {/*    alignItems: 'center',*/}
                  {/*    justifyContent: 'center',*/}
                  {/*    marginTop: this.state.files.length > 0 ? 10 : 0,*/}
                  {/*    borderRadius:5*/}
                  {/*  }}>*/}
                  {/*  <Iconfont name="tianjia" size={24}/>*/}
                  {/*  <Text style={{fontSize: 13, color: '#333333', marginTop: 4}}>*/}
                  {/*    添加图片*/}
                  {/*  </Text>*/}
                  {/*</TouchableOpacity>*/}
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}>
                    <View style={{
                      alignItems: 'center'
                    }}>
                      <TouchableOpacity onPress={() => {
                        if (status == 0 || isAllowAsk == 1) {
                          this.openModal(0)
                        }
                      }}>
                        <Image
                          style={{
                            height: 89,
                            width: 145
                          }}
                          source={img0 ? {uri: img0} :Images.ic_idcard_positive}/>
                      </TouchableOpacity>

                      <Text style={{
                        fontSize: 12,
                        marginTop: 10,

                        color: ThemeFlags["text-fl-color"]
                      }}>{status == 0 || isAllowAsk == 1 ? '点击拍摄/上传身份证人像面' : ''}</Text>
                    </View>
                    <View style={{
                      alignItems: 'center'
                    }}>
                      <TouchableOpacity onPress={() => {
                        if (status == 0 || isAllowAsk == 1) {
                          this.openModal(1)
                        }
                      }}>
                        <Image
                          style={{
                            height: 89,
                            width: 145
                          }}
                          source={img1 ? {uri: img1} : Images.id_card_back}/>
                      </TouchableOpacity>
                      <Text style={{
                        fontSize: 12,
                        marginTop: 10,

                        color: ThemeFlags["text-fl-color"]
                      }}>{status == 0 || isAllowAsk == 1 ? '点击拍摄/上传身份证国徽面' : ''}</Text>
                    </View>
                  </View>
                </View>
                :
                null
              }

              {/*{status == 3 || status == 4*/}
              {/*  ?*/}
              {/*  null*/}
              {/*  :*/}
              {/*  <View style={{*/}
              {/*    flexDirection: 'row',*/}
              {/*    flex: 1,*/}
              {/*    marginTop: 15,*/}
              {/*    paddingHorizontal: 15,*/}
              {/*    alignItems: 'center',*/}
              {/*  }}>*/}
              {/*    {*/}
              {/*      isEmpty(buUserIdverifyAnnexUrlList)*/}
              {/*        ?*/}
              {/*        null*/}
              {/*        :*/}
              {/*        buUserIdverifyAnnexUrlList.map((item, index) => {*/}
              {/*          return (<Image*/}
              {/*              key={index}*/}
              {/*              style={styles.img_list}*/}
              {/*              source={{uri: item}}/>*/}
              {/*          );*/}
              {/*        })*/}
              {/*    }*/}
              {/*    <View style={styles.img_list}/>*/}
              {/*    <View style={styles.img_list}/>*/}
              {/*  </View>*/}

              {/*}*/}

              {/*{status == undefined || status == '' || status == 0 || status == 3 || status == 4*/}
              {/*  ?*/}
              {/*  <View style={{marginTop: 20}}>*/}
              {/*    <Text style={PerfectUserInfoStyle.text_content_left}>*/}
              {/*      示例：*/}
              {/*    </Text>*/}

              {/*    <View style={styles.view_sample}>*/}
              {/*      <Image*/}
              {/*        style={styles.img_list}*/}
              {/*        resizeMode={'contain'}*/}

              {/*        source={require('../../../../imgs/perfectinformation/ic_idcard1.png')}/>*/}

              {/*      <Image*/}
              {/*        style={styles.img_list}*/}
              {/*        resizeMode={'contain'}*/}

              {/*        source={require('../../../../imgs/perfectinformation/ic_idcard2.png')}/>*/}
              {/*      <View style={styles.img_list}/>*/}
              {/*      <View style={styles.img_list}/>*/}
              {/*    </View>*/}

              {/*  </View>*/}
              {/*  :*/}
              {/*  null}*/}

              {/*{status == undefined || status == '' || status == 0*/}
              {/*  ?*/}
              {/*  null*/}
              {/*  :*/}
              <View>
                <View style={{
                  flexDirection: 'row',
                  marginTop: 18,
                  marginLeft: 10,
                  alignItems: 'center'
                }}>
                  <Image style={{marginRight: 5, width: 12,}}
                         source={Images.ic_remind}
                         resizeMode={'contain'}
                  />
                  <Text style={{
                    fontSize: 12,
                    color: '#00B88B',
                  }}>
                    温馨提示
                  </Text>
                </View>


                <View style={{
                  marginLeft: 5,
                  marginRight: 15,
                  marginTop: 5
                }}>
                  {status == 1
                    ?
                    <View style={{flexDirection: 'row', paddingRight: 15}}>
                      <Text style={[styles.text_tip,]}>
                        1.
                      </Text>
                      <Text style={styles.text_tip}>
                        我们承诺，身份审核时间最长不超过<Text style={{
                        fontSize: setSpText(12),
                        color: '#FCA52F'
                      }}>48</Text>个小时；
                      </Text>
                    </View>
                    :
                    <View style={{flexDirection: 'row', paddingRight: 15}}>
                      <Text style={[styles.text_tip,]}>
                        1.
                      </Text>
                      <Text
                        style={[styles.text_tip, {lineHeight: 15}]}>
                        {des1s[status]}
                      </Text>
                    </View>
                  }
                  <View style={{flexDirection: 'row', paddingRight: 15}}>
                    <Text style={[styles.text_tip,]}>
                      2.
                    </Text>
                    <Text style={styles.text_tip}>
                      {des2s[status]}
                    </Text>
                  </View>
                </View>
              </View>
              {/*}*/}

            </ScrollView>


          </ScrollView>

        </View>
        {
          status == 1 || status == 2
            ?
            null
            :
            <View style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
            }}>
              <Button
                onPress={this.submit}
                disabled={status != 2&&isAllowAsk == 0 ? true : false}
                styles={WidgetStyles.getButtonStyles()}
                style={[commonStyle.btn_style, {marginTop: 0}]}
                type={'primary'}
              >{status == undefined || status == '' || status == 0 ? '提交认证' : '重新提交'}</Button>
            </View>
        }
      </View>
    );
  }
}

const ItemView = (props) => {
  const {onPress, des, data, ishideImg} = props
  return (<TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.view_item}>
        <Text style={{
          fontSize: setSpText(14),
          color: '#333333',
          marginLeft: 15,
          fontWeight: '400',
          lineHeight: 20
        }}>
          {des}
        </Text>
        <View style={styles.view_data}>
          <Text style={{
            fontSize: 14,
            color: '#333333',
            marginRight: 15,
          }}>
            {data}
          </Text>
          {
            ishideImg ? null : <Image
              style={styles.img_item}
              resizeMode={'contain'}
              source={Images.ic_rn_list_item_right}/>
          }

        </View>

      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  tipsContainer: {
    width: '100%',
    height: 34,
    backgroundColor: '#F7F4D4',
    borderColor: '#EAE6B9',
    borderWidth: 1,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tishiText: {
    fontSize: ThemeFlags['text-size-s'],
    color: ThemeFlags['text-sl-color'],
  },
  littleTriangle: {
    width: 0,
    height: 0,
    borderWidth: 5,
    borderStyle: "solid",
    borderBottomColor: '#F7F4D4',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    position: 'absolute',
    left: 40,
    top: -4,
  },
  bigTriangle: {
    width: 0,
    height: 0,
    borderWidth: 5,
    borderStyle: "solid",
    borderBottomColor: '#EAE6B9',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    position: 'absolute',
    left: 40,
    top: -5,
  },
  img_item: {
    width: scaleSizeW(7),
    height: scaleSizeH(13),
    marginRight: scaleSizeW(10)
  },
  view_item: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
    backgroundColor: '#FFFFFF',
  },
  view_data: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  view_imagepicker: {
    paddingHorizontal: 15,
    paddingTop: 15
  },
  img_list: {
    flex: 1,
    width: 96,
    height: 66,
    marginRight: 10
  },
  view_sample: {
    flexDirection: 'row',
    marginLeft: scaleSizeW(10),
    marginTop: scaleSizeH(10)
  },
  img_sample: {
    width: scaleSizeW(84),
    height: scaleSizeH(58),
    marginRight: scaleSizeW(4)
  },
  view_title: {
    paddingLeft: scaleSizeW(10),
    paddingRight: scaleSizeW(10),
    backgroundColor: '#F3F3F3',
    paddingBottom: scaleSizeH(10),
  },
  view_title_content: {
    backgroundColor: '#F3F3F3',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 28,
    flexDirection: 'row',
    marginLeft: 93,
    marginRight: 80,
  },
  text_status: {
    fontSize: 12,
    marginLeft: 6,
    marginTop: 1,
    color: '#666666'

  },
  text_tip: {
    color: ThemeFlags['text-tl-color'],
    fontSize: ThemeFlags['text-size-s'],
    marginLeft: scaleSizeW(10),
    fontWeight: '400',
    lineHeight: 20,
  },

})

const mapStateToProps = (
  {
    dictionaries: {
      data_card,
    },
    user: {
      qualificationData,
      isLoading,
      uploadAnnexData,
      baVerifyTypeData,
    },
    whitelistdata: {
      userInfo
    },
  }) => ({
  isLoading,
  qualificationData,
  data_card,
  userInfo,
  uploadAnnexData,
  baVerifyTypeData,
});

const mapDispatchToProps = dispatch => ({
  fetInsertUserIdverify(params, callback) {
    dispatch({type: 'user/fetInsertUserIdverify', params, callback});
  },
  fetChangeUserIdverify(params, callback) {
    dispatch({type: 'user/fetChangeUserIdverify', params, callback});
  },
  fetGetUserIdverify(params, callback) {
    dispatch({type: 'user/fetGetUserIdverify', params, callback});
  },
  fetBaVerifyType(params, callback) {
    dispatch({type: 'user/fetBaVerifyType', params, callback});
  },
  fetchCardType(params, callback) {
    dispatch({type: 'dictionaries/fetchCardType', params, callback});
  },
  fetchUploadAnnex(images, params, options, callback) {
    dispatch({type: 'user/fetchUploadAnnex', images, params, options, callback});
  },
  updateData(data) {
    dispatch({type: 'user/changeQualificationData', data: data,});
  },
  fetchFindInfo(callback) {
    dispatch({type: 'login/fetchFindInfo', restOptions: {}, callback});
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(Qualificationcertification_user);
