import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  

    async getItem(key: string) {
        const value = await AsyncStorage.getItem(key)
        return value ? JSON.parse(value) : null
    }

    async setItem(key: string, value: any) {
        if(key && value){
            await AsyncStorage.setItem(key, JSON.stringify(value))
        }
    }

    async removeItem(key: string){
        if(key){
            await AsyncStorage.removeItem(key)
        }
    }
    
}

export default new AsyncStorageService();
