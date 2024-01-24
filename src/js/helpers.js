import { TIMEOUT_VALUE} from './config.js';

export const makeAjaxCall = async function(url, recipeData = undefined) {
  try {
    const fetchpromise = recipeData ? fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(recipeData)
    }) : fetch(url);
    const res = await Promise.race([fetchpromise, timeout(TIMEOUT_VALUE)]);
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
} catch(err){
    throw err;
}
}

export const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };