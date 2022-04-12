import { indexedObject } from './interfaces';
import axios from 'axios';

export async function getCompanyClearbitData(
  companyDomain: string
): Promise<indexedObject> {
  try {
    const { data } = await axios.get(
      `https://company.clearbit.com/v2/companies/find?domain=${companyDomain}`,
      { headers: { Authorization: process.env.TOKEN_CB } }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
}
