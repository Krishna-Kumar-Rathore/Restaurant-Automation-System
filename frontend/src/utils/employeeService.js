import api from './api'

const employeeService = {
  getEmployees: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await api.get(`/employees?${queryString}`)
    return response.data
  },

  getEmployeeById: async (id) => {
    const response = await api.get(`/employees/${id}`)
    return response.data
  },

  createEmployee: async (employeeData) => {
    const response = await api.post('/employees', employeeData)
    return response.data
  },

  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData)
    return response.data
  },

  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees/${id}`)
    return response.data
  },

  getEmployeesByRole: async (role) => {
    const response = await api.get(`/employees/role/${role}`)
    return response.data
  }
}

export default employeeService