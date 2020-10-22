/**
 * 读取缓存中的数据
 */
import AsyncStorage from '@react-native-community/async-storage'
export default class AsyncStorageUtil{
    static _readLocalData = async (key,callback) => {
        try {
            const value = await AsyncStorage.getItem('api');
            if (value !== null) {
                let data = JSON.parse(value);
                callback(data);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    static _storeData = async (key,data) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            // Error saving data
        }
    }

}

