import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin}  from './admin.schema';
import { CreateAdminDto } from './create-admin.dto'


@Injectable()
export class AdminsService {
    constructor(@InjectModel (Admin.name) private adminModel: Model<Admin> ) {}

    async create(createAdminDto: CreateAdminDto): Promise<Admin> {
        const admin = await this.findByEmail(createAdminDto.email)
        if (admin) throw new BadRequestException('Admin already exist. Kindly login instead')

        const newAdmin = new this.adminModel(createAdminDto);
        return newAdmin.save();
      }

    async findById(id: string): Promise<Admin | null> {
        const admin = this.adminModel.findOne({_id: id}).exec();
        return admin;
    }

    async findByEmail(email: string): Promise<Admin | null> {
        const admin = this.adminModel.findOne({email}).select('+password').exec();
        return admin;
    }
}
