import buildApi from './buildApi'

const urls = {
  login: { url: 'users/login', method: 'post' },
  logout: 'users/logout',
  signIn: { url: 'users/signIn', method: 'post' },
  //供应商管理
  getSuppliers: 'suppliers',
  getSupplierById: 'suppliers/:id',
  putSupplier: { url: 'suppliers', method: 'put' },
  postSupplier: { url: 'suppliers', method: 'post' },
  deleteSupplier: { url: 'suppliers/:id', method: 'delete' },
  //
}

export default buildApi(urls)