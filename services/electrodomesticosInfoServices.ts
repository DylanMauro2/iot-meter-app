const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getAllElectrodomesticosInfo = async () => {
  try {
    const res = await fetch(`${apiUrl}/electrodomesticos-info`);
    const electrodomesticosInfo = await res.json();

    return electrodomesticosInfo

  } catch (error) {
    console.log(error)
  }
}
