  import home from '../../pages/main/home/store';
 // import my from '../../pages/main/my/store';
 import user from '../../pages/main/my/store';
 import login from '../../pages/login/store';
 import whitelistdata from './whitelistdata'
// import nativedata from './nativedata'
// import dictionaries from './dictionaries'
 import createLoading from './createLoading';
// import healthData from './healthData'
// import healthyPlan from '../../pages/main/home/store/healthyPlan';
 import healthInfo from '../../pages/main/info/store';
// import interrogation from '../../pages/main/interrogation/store';
// import prescription from '../../pages/prescription/store';
// import classroom from '../../pages/main/classroom/store';
// import find from '../../pages/main/find/store';
import socket from './socket';
// import order from '../../pages/main/my/store/order';


 export const model = {
       home,
     // my,
       login,
       whitelistdata,
//     dictionaries,
       user,
//     healthData,
//     healthyPlan,
      healthInfo,
//     interrogation,
//     prescription,
//     classroom,
//     find,
//     socket,
//     order,
//     nativedata,
}
const loading = createLoading(model);
export default {
    loading,
    ...model
}
