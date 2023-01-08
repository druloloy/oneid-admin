import Api, {baseURL} from './Api';
const loginUser = async (username, password) => {
    const response = await Api.post(`login`, { username, password });
    return response.data;
}

const me = async () => {
    const response = await Api.get(`me`);
    return response;
}

const logoutUser = async () => {
    const response = await Api.post(`logout`);
    return response.data;
}

const getTrendDiseases = async (start, end) => {
    const q = `?start=${start}&end=${end}`;
    const response = await Api.get(`diseases`+q, {
        baseURL: baseURL+'stats/'
    });
    return response.data;
}

const getQueueHistoryAnalysis = async (start, end) => {
    const q = `?start=${start}&end=${end}`;
    const response = await Api.get(`queueHistory${q}`);
    return response.data;
}

const getStaffs = async () => {
    const response = await Api.get(`staff`);
    return response.data;
}

const getPatient = async (id) => {
    const q = `id=${id}`;
    const response = await Api.get(`patient?${q}`);
    return response.data;
}

const getPatients = async (limit, offset) => {
    const q = `?limit=${limit}&offset=${offset}`;
    const response = await Api.get(`patients${q}`);
    return response.data;
}

const updatePatient = async (id, body) => {
    const q = `id=${id}`;
    const response = await Api.put(`patient/update?${q}`, body);
    return response.data;
}

const deletePatient = async (id) => {
    const q = `id=${id}`;
    const response = await Api.delete(`patient/delete?${q}`);
    return response.data;
}

const downloadPatients = async () => {
    const url = baseURL+'admin/backup/patients';
    window.open(url, '_blank');
}

const downloadAll = async () => {
    const url = baseURL+'admin/backup/all';
    window.open(url, '_blank');
}

const getStaff = async (id) => {
    const q = `id=${id}`;
    const response = await Api.get(`staff/get?${q}`);
    return response.data;
}
const updateStaff = async (id, data) => {
    const response = await Api.put(`staff/update?id=${id}`, data);
    return response.data;
}
const addStaff = async (data) => {
    const response = await Api.post(`staff/new`, data);
    return response.data;
}

const removeStaff = async (id) => {
    const q = `id=${id}`;
    const response = await Api.delete(`staff/delete?${q}`);
    return response.data;
}

const getAllSchedule = async () => {
    const response = await Api.get(`schedule`);
    return response.data;
}

const updateActivities = async (data) => {
    const response = await Api.put(`schedule/activities`, data);
    return response.data;
}

const removeSchedule = async (data) => {
    const response = await Api.delete(`schedule`, {data});
    return response.data;
}

const addSchedule = async (data) => {
    const response = await Api.post(`schedule`, data);
    return response.data;
}

const updateTime = async (data) => {
    // startTime, endTime
    const response = await Api.put(`schedule/time`, data);
    return response.data;
}

const updateAdminPassword = async (data) => {
    const response = await Api.put(`password`, data);
    return response.data;
}

const UserService = {
    loginUser,
    logoutUser,
    me, 
    getTrendDiseases,
    getQueueHistoryAnalysis,
    getStaffs,
    getPatients,
    downloadPatients,
    downloadAll,
    getStaff,
    updateStaff,
    addStaff,
    removeStaff,
    getPatient,
    updatePatient,
    deletePatient,
    getAllSchedule,
    updateActivities,
    removeSchedule,
    addSchedule,
    updateTime,
    updateAdminPassword
}

export default UserService;