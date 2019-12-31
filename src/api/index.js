import axios from 'axios'
// 设置请求的基本路径
axios.defaults.baseURL = 'http://47.102.113.38:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 1. 发送之前先获取token
  let token = localStorage.getItem('myitcast')

  // 2. 判断是否有token
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

// 实现登陆验证
export const login = (obj, callback) => {
  // axios.post是一个promise对象
  // .then返回的还是一个promise对象
  return axios.post('login', obj)
    .then((result) => {
      return result
    })
}
// 获取所有用户的数据
export const getUserList = pa => {
  return axios.get('users', {
    params: pa
  })
    .then(result => {
      return result.data
    })
}

// 添加用户
export const addUser = pa => {
  return axios.post('users', pa)
    .then(result => {
      return result.data
    })
}

// 编辑用户
export const editUser = pa => {
  return axios.put(`users/${pa.id}`, pa)
    .then(result => {
      return result.data
    })
}

// 删除用户
export const deUser = id => {
  return axios.delete(`users/${id}`)
    .then(result => {
      return result.data
    })
}

// 更新用户状态
export const updateUserStateById = pa => {
  return axios.put(`users/${pa.uId}/state/${pa.type}`)
    .then(result => {
      return result.data
    })
}

// 加载默认角色列表
export const getRolesList = () => {
  return axios.get('roles')
    .then(result => {
      return result.data
    })
}

// 实现分配用户角色
export const grantUser = (pa) => {
  return axios.put(`users/${pa.id}/role`, {
    rid: pa.rid
  })
    .then(result => {
      return result.data
    })
}
