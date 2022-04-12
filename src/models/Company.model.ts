import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  company_id: string;
  logo: string;
  name: string;
  type: string;
  domain: string;
  description: string;
  industry: string;
  moneyRaised: number;
  marketCap: string;
  annualRevenue: string;
  location: string;
  numberOfEmployees: number;
  updatedAt: Date | number;
  createdAt: Date | number;
}

const CompanySchema: Schema = new Schema({
  company_id: String,
  logo: String,
  name: String,
  type: String,
  domain: String,
  description: String,
  industry: String,
  moneyRaised: Number,
  marketCap: String,
  annualRevenue: String,
  location: String,
  numberOfEmployees: Number,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const Company = mongoose.model<ICompany>(
  'companies',
  CompanySchema,
  'companies'
);
