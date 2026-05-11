import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

/** Acceso ERP: ADMINISTRADOR y VENDEDOR */
export const ErpAccess = () => Roles('ADMINISTRADOR', 'VENDEDOR');

/** Acceso Ecommerce: CLIENTE */
export const EcommerceAccess = () => Roles('CLIENTE');
