import { Controller } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Crud } from "@nestjsx/crud";
import { Role } from "./entity/role.entity";

@Crud({
	model: {
		type: Role
	},
	params: {
		role: {
			field: 'role',
      type: 'string',
      primary: true
		}
	}
})
@Controller('role')
export class RoleController {
	constructor (public service: RoleService) {}
}