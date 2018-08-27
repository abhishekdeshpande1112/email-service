import Api from '@/services/Api'

export default {
  sendEmail (resourcePath, data) {
    return Api().post(resourcePath, data, {'Content-Type': 'application/json'})
  }
}
