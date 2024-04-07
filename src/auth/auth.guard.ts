import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import {verifyJWT} from '../common/utils/jwt';
  import { UsersService } from '../users/users.service';
  import { AdminsService } from '../admins/admins.service';
  

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private usersService: UsersService, private adminsService: AdminsService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Invalid authorization. Please enter a token');
      }
      
      try {
        // Verify token
        const verifiedToken = await verifyJWT(token);

        // find user 
        const {id, role} = verifiedToken;

        let currentUser: any
        if (role === 'user') {
            currentUser = await this.usersService.findById(id)
        } else if (role === 'admin') {
            currentUser = await this.adminsService.findById(id)
        }

        request['user'] = currentUser;
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }