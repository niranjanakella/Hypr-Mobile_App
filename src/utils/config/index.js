const API_DEV_HOST = `http://10.0.3.2:9002/`;
const API_PRO_HOST = ``;
const Config = {
    // 0 => Devlopment env, 1 => Production env
    APP_MODE: 0,
    DEVELOPMENT: {
        API_HOST: `${API_DEV_HOST}`,
        API_ACCESS_POINT: `${API_DEV_HOST}`,
    },
    PRODUCTION: {
        API_HOST: `${API_PRO_HOST}`,
        API_ACCESS_POINT: `${API_PRO_HOST}`,
    },
};

export default function getBaseUrl() {
    let config = {
        apihost: '',
        accesspoint: '',
    };

    if (Config.APP_MODE === 0) {
        config = {
            ...config,
            apihost: Config.DEVELOPMENT.API_HOST,
            accesspoint: Config.DEVELOPMENT.API_ACCESS_POINT,
        };
    } else {
        config = {
            ...config,
            apihost: Config.PRODUCTION.API_HOST,
            accesspoint: Config.PRODUCTION.API_ACCESS_POINT,
        };
    }

    return config;
}
