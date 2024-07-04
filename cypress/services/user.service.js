import Rest from './_rest.service'

// req
const url = 'api/users/'

export default class User extends Rest {
  static get_user(id) {
    return super.get(`${url}${id}`)
  }

  static post_user(body){
    return super.post(url,body)
  }

  static put_user(body){
    return super.put(url,body)
  }
}
