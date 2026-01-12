import axios from 'axios';

const getLanyard = async (id: string) => {
  const { data } = await axios.get(`https://api.lanyard.rest/v1/users/${id}`);

  return data?.success ? data.data : null;
};

export { getLanyard };
