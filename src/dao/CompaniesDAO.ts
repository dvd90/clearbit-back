import { Company, ICompany } from '../models';
import { Helpers } from '../utils';

export class CompaniesDAO {
  static async getAll(): Promise<ICompany[]> {
    try {
      return Company.find().lean();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getById(company_id: string): Promise<ICompany[]> {
    try {
      return Company.findOne({ company_id }).lean();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getByDomain(domain: string): Promise<ICompany[]> {
    try {
      return Company.findOne({ domain }).lean();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async create(payload: Partial<ICompany>): Promise<ICompany> {
    try {
      return Company.create({ company_id: Helpers.standardID(), ...payload });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
