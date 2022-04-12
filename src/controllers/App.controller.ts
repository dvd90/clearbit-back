import express from 'express';

import { getCompanyClearbitData, ICustomRequest } from '../utils';
import { handleError, route } from '../decorators';
import { Routable } from '../routes/routable';
import { CompaniesDAO } from '../dao/CompaniesDAO';

// noinspection JSUnusedGlobalSymbols
export class AppController extends Routable {
  constructor() {
    super('/companies');
  }

  @route('get', '/')
  @handleError()
  async index(
    req: ICustomRequest,
    res: express.Response
  ): Promise<express.Response<unknown>> {
    const companies = await CompaniesDAO.getAll();

    return res.status(200).json(companies);
  }

  @route('get', '/:company_id')
  @handleError()
  async show(
    req: ICustomRequest,
    res: express.Response
  ): Promise<express.Response<unknown>> {
    const { company_id } = req.params;

    const company = await CompaniesDAO.getById(company_id);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    return res.status(200).json(company);
  }

  @route('post', '/')
  @handleError()
  async create(
    req: ICustomRequest,
    res: express.Response
  ): Promise<express.Response<unknown>> {
    const {
      body: { domain }
    } = req;
    if (!domain)
      return res.status(400).json({ message: 'Payload is required' });

    const cbCompany = await getCompanyClearbitData(domain);
    if (!cbCompany)
      return res.status(404).json({ message: 'Domain not found' });

    const companyFound = await CompaniesDAO.getByDomain(cbCompany.domain);
    if (companyFound) return res.status(200).json(companyFound);

    const { name, type, description, logo, category, metrics, location } =
      cbCompany;

    const newCompany = {
      logo,
      name,
      type,
      domain: cbCompany.domain,
      description,
      industry: category?.industry,
      moneyRaised: metrics?.raised,
      marketCap: metrics?.marketCap,
      annualRevenue: metrics?.annualRevenue,
      location,
      numberOfEmployees: metrics.employees
    };

    const companyDb = await CompaniesDAO.create(newCompany);

    return res.status(200).json(companyDb);
  }
}
