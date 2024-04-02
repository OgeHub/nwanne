import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin}  from './admin.schema';
import { CreateAdminDto } from './create-admin.dto'


@Injectable()
export class AdminsService {
    constructor(@InjectModel (Admin.name) private adminModel: Model<Admin> ) {}

    async create(createAdminDto: CreateAdminDto): Promise<Admin> {
        const admin = await this.findOne(createAdminDto.email)
        if (admin) throw new BadRequestException('Admin already exist. Kindly login instead')

        const newAdmin = new this.adminModel(createAdminDto);
        return newAdmin.save();
      }

    async findOne(email: string): Promise<Admin> {
        const admin = this.adminModel.findOne({email}).exec();
        return admin;
    }
}
