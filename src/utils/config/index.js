const API_DEV_HOST = `http://192.168.1.2:9002/`;
const CJ_API_HOST = `http://192.168.1.2:9002/cj/api/v1/`;
const API_PRO_HOST = ``;
const Config = {
    // 0 => Devlopment env, 1 => Production env
    APP_MODE: 0,
    DEVELOPMENT: {
        API_HOST: `${API_DEV_HOST}`,
        API_ACCESS_POINT: `${API_DEV_HOST}`,
        CJ_ACCESS_POINT: `${CJ_API_HOST}`,
    },
    PRODUCTION: {
        API_HOST: `${API_PRO_HOST}`,
        API_ACCESS_POINT: `${API_PRO_HOST}`,
        CJ_ACCESS_POINT: `${CJ_API_HOST}`,
    },
};

export default function getBaseUrl() {
    let config = {
        apihost: '',
        accesspoint: '',
        CJ_ACCESS_POINT:''
    };

    if (Config.APP_MODE === 0) {
        config = {
            ...config,
            apihost: Config.DEVELOPMENT.API_HOST,
            CJ_ACCESS_POINT: Config.DEVELOPMENT.CJ_ACCESS_POINT,
            accesspoint: Config.DEVELOPMENT.API_ACCESS_POINT,
        };
    } else {
        config = {
            ...config,
            apihost: Config.PRODUCTION.API_HOST,
            CJ_ACCESS_POINT: Config.DEVELOPMENT.CJ_ACCESS_POINT,
            accesspoint: Config.PRODUCTION.API_ACCESS_POINT,
        };
    }

    return config;
}
