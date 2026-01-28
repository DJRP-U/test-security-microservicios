const URL_CUENTA_SERVICE = "http://localhost:8001/api"
const URL_EVENTO_SERVICE = "http://localhost:8002/api"
// No se sube ): 

// Método genérico que devuelve la URL según el servicio
const obtenerURLServicio = (service) => {
    switch(service) {
        case 'cuenta':
            return URL_CUENTA_SERVICE;
        case 'evento':
            return URL_EVENTO_SERVICE;
        default:
            throw new Error('Servicio no reconocido');
    }
}

export const LoginPost = async (data, url, service) => {
    const baseURL = obtenerURLServicio(service); // Obtener URL según el servicio
    console.log(baseURL);
    console.log(data);
    const headers = {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
    };
   
    const datos = await (await fetch(`${baseURL}/${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const PeticionGet = async (key, url, service) => {
    const baseURL = obtenerURLServicio(service); // Obtener URL según el servicio
    const headers = {
        "Content-Type": "application/json",
        "x-api-token": key
    };
    const datos = await (await fetch(`${baseURL}/${url}`, {
        method: "GET",
        headers: headers,
    })).json();
    return datos;
}

export const PeticionPost = async (key, url, data, service) => {
    const baseURL = obtenerURLServicio(service); // Obtener URL según el servicio
    const headers = {
        "Content-Type": "application/json",
        "x-api-token": key
    };
    const datos = await (await fetch(`${baseURL}/${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    return datos;
}

export const PeticionGetSinToken = async (url, service) => {
    const baseURL = obtenerURLServicio(service); // Obtener URL según el servicio
    const headers = {
        "Content-Type": "application/json",
    };
    const datos = await (await fetch(`${baseURL}/${url}`, {
        method: "GET",
        headers: headers,
    })).json();
    return datos;
}

export const PeticionPostSinToken = async (url, data, service) => {
    const baseURL = obtenerURLServicio(service); // Obtener URL según el servicio
    const headers = {
        "Content-Type": "application/json",
    };
    const datos = await (await fetch(`${baseURL}/${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    return datos;
}