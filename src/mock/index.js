import Mock from 'mockjs'
import loginAPI from './login'
import loginLogAPI from './zero/loginLog'
import auditLogAPI from './zero/auditLog'
import organizationUnitAPI from './zero/organizationUnit'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 系统管理相关
// 登录日志
Mock.mock(/\/zero\/loginLog\/list/, 'get', loginLogAPI.getList)
// 审计日志
Mock.mock(/\/zero\/auditLog\/list/, 'get', auditLogAPI.getList)
// 组织节点管理
Mock.mock(/\/zero\/organizationUnit\/list/, 'get', organizationUnitAPI.getList)

export default Mock
