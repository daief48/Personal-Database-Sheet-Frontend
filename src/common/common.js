
const storageData = JSON.parse(localStorage.getItem('user'));

  export const authHeader = () => {
    if(storageData){
      const header = {
        headers:{
          'Authorization': storageData.token_type +' '+ storageData.access_token
        }
      };
      return header;
    }else{
      return {};
    }
  };

  