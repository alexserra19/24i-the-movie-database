import helpers from "../utils/helpers";

const interceptor = {
    async doRequest(url: string, body = null, method = 'GET', contentType = 'application/json', formData = false) {        
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': contentType,
                },
                body: body ? (formData ? body : JSON.stringify(body)) : null
            });

            const responseJson = await this.responseConvertToJson(response)
            return responseJson;

        } catch (error) {
            helpers.handleNetworkError()
        }
    },

    async responseConvertToJson(response: any) {

        let respBody = null;

        if (response.headers?.get('content-type')?.match(/application\/json/)) {
            respBody = await response.json();
        }

        return (
            {
                isSuccess: (response.status >= 200 && response.status <= 299),
                body: respBody
            }
        )
    }
}

export default interceptor;