const getLanyard = async (id: string) => {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data?.success ? data.data : null;
  } catch (error) {
    return null;
  }
};

export { getLanyard };
