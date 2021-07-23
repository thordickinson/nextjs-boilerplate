function template(string, obj) {
    var s = string;
    for (var prop in obj) {
        s = s.replace(new RegExp('{' + prop + '}', 'g'), obj[prop]);
    }
    return s;
}


export function fetchJson(urlTemplate: string, params: any) {
    if (!params) return async () => ({})
    if (Object.values(params).findIndex(v => !v) > -1) return async () => ({})

    const url = template(urlTemplate, params)
    return async () => {
        const request = await fetch(url)
        const data = await request.json()
        return data
    }
}