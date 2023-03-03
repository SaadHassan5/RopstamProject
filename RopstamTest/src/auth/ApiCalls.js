import axios from "axios"
import AlertService from "../assets/service/alert";
import { ApiConsts } from "./Api_Consts"

async function For_GET(req,data) {
    try {
        let temp = [];
        console.log('QUERY==>', `${ApiConsts.base2}${req}`);
        await axios.get(`${ApiConsts.base2}${req}`,).then((res) => {
            console.log('===>', res);
            temp = [...res?.data]
        })
        return temp;
    } catch (error) {
        console.log('EROR', error);
        AlertService.toastPrompt(JSON?.stringify(error).slice(0, 50))
        return []
    }
}
async function For_POST(req, data) {
    let f = false;
    try {
        await axios.post(`${ApiConsts.base2}${req}`, data
        ).then((res) => {
            console.log('===>', res);
            f = true
        })
    } catch (error) {
        console.log('===>', error);

        f = false
    }
    return f;
}
async function For_POSTServer(req, data) {
    let f = false;
    try {
        await axios.post(`${ApiConsts.base2}${req}`, data
        ).then((res) => {
            console.log('===>', res);
            f = true
        })
    } catch (error) {
        console.log('===>', error);

        f = false
    }
    return f;
}
async function Update(req, data) {
    let f = false;
    try {
        await axios.put(`${ApiConsts.base2}${req}`, data
        ).then((res) => {
            console.log('===>', res);
            f = true
        })
    } catch (error) {
        console.log('===>', error);

        f = false
    }
    return f;
}
async function Delete(req) {
    let f = false;
    try {
        console.log('REQUEST===>',`${ApiConsts.base2}${req}`)
        await axios.delete(`${ApiConsts.base2}${req}`
        ).then((res) => {
            console.log('===>', res);
            f = true
        })
    } catch (error) {
        console.log('===>', error);
        f = false
    }
    return f;
}
export const API_Calls = {
    For_GET, For_POST,For_POSTServer,Update,Delete
}