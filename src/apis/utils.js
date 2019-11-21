import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

export const handleError = (error) => {
  const { response, request, message } = error;
  if (response) {
    const { data, status } = response;
    if (isObject(data)) {
      const errorList = Object.keys(data).map(key => isArray(data[key]) ? data[key][0] : data[key]);
      return { error: errorList, errorStatus: status };
    }

    if (isArray(data)) return { error: data, errorStatus: status };

    // Request made and server responded
    if (data.includes('<!DOCTYPE html>')) {
      return {
        error: `[${status}] Unexpected error`,
        errorStatus: status,
      };
    }
    return { error: `[${status}] ${data}`, errorStatus: status };
  }
  if (request) {
    // The request was made but no response was received
    return { error: 'Unable to send your request' };
  }
  // Something happened in setting up the request that triggered an Error
  return { error: message };
};
