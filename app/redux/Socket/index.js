// 链接地址
const SOCKET_URL = 'ws://123.207.136.134:9010/ajaxchattest'

/**
 * ws.readyState
  CONNECTING：值为0，表示正在连接。
  OPEN：值为1，表示连接成功，可以通信了。
  CLOSING：值为2，表示连接正在关闭。
  CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
 */

/**
 * Socket主方法
 * dispatch: redux store中的dispatch
 */
class Socket {
  constructor(dispatch) {
    if (typeof dispatch !== 'function') {
      throw new Error('dispatch must be a function')
    }
    this.dispatch = dispatch;
    this.ws = null; // webSocket 实例化对象
    this.heartTimer = null; // 保持socket心跳的延时器timer
    this.isClose = false; // 是否是关闭状态
    this.resetCount = 0;
    this.resetTimer = null;
    this.initSocket();
  }

  /**
   * 初始化webSocket
   */
  initSocket(callback) {
    this.ws = new WebSocket(SOCKET_URL);
    this.ws.onopen = () => {
      clearTimeout(this.heartTimer);
      clearTimeout(this.resetTimer);
      this.subscribe();
      this.heartSocket();
      this.resetCount = 0;
      this.isClose = false;
      console.log('socket: 初始化socket成功');
      callback && callback(this);
    }

    this.ws.onclose = () => {
      clearTimeout(this.heartTimer);
      clearTimeout(this.resetTimer);
      this.isClose = true;
      console.log('socket: 关闭websocket链接成功');
    }

    this.ws.onerror = () => {
      if (this.resetCount === 4) {
        this.isClose = true
        console.log('socket: websocket链接失败');
        return;
      }
      this.resetTimer = setTimeout(() => {
        if (!this.isClose) {
          this.resetCount++;
          this.initSocket();
        }
      }, 2000 * this.resetCount)
    }
  }

  /**
   * 订阅服务器返回的消息，通过this.dispatch触发相应的reducer
   */
  subscribe() {
    this.ws.onmessage = (message) => {
      console.log('socket onmessage: ', message);
      // TODO: 根据message来触发相应的dispatch
      this.dispatch({
        type: 'socket/changeTest',
        data: 'test',
      })
      this.heartSocket();
    }
  }

  /**
   * 向服务器发送消息
   */
  send(value, callback) {
    console.log('socket send: ', value);
    const { readyState } = this.ws;
    let timer = null;
    // 链接成功状态
    if (readyState === 1) {
      this.ws.send(value);
      this.heartSocket();
      callback && callback();
    }
    // 链接中状态
    else if (readyState === 0) {
      timer = setInterval(() => {
        if (this.ws.readyState === 1) {
          clearInterval(timer);
          this.ws.send(value);
          this.heartSocket();
          callback && callback();
        }
      }, 300)
    }
    // 链接失败
    else {
      this.initSocket(() => {
        this.ws.send(value);
        callback && callback();
      })
    }
  }

  /**
   * 心跳机制，保持socket链接
   */
  heartSocket() {
    clearTimeout(this.heartTimer);
    this.heartTimer = setTimeout(() => {
      // 正在链接或者链接成功
      if ([0, 1].includes(this.ws.readyState)) {
        // this.ws.send('heart , socket'); // 向服务器随便发点什么
        this.heartSocket();
      } else {
        this.initSocket();
      }
    }, 59000)
  }

  /**
   * 关闭socket
   */
  close() {
    this.ws.close();
  }

  /**
   * 重启socket
   */
  open() {
    this.initSocket();
  }

}

export default Socket;