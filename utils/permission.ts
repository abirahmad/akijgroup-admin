import { getAuthData } from "./auth"

export const getRoles = () => {
    const user = getAuthData();

    return user?.roles || [];
}

export const getAllPermissions = () => {
    const roles = getRoles();
    const allPermissions: any[] = [];

    roles.forEach(role => {
        allPermissions.push(...role.permissions);
    });

    return allPermissions;
}

export const getPermissionNames = () => {
    const allPermissions = getAllPermissions();
    return allPermissions.map(permission => permission.name);
}

export const hasPermission = (permissionName: string) => {
    const allPermissions = getAllPermissions();
    return allPermissions.some(permission => permission.name === permissionName);
}

export const hasPermissions = (permissionNames: Array<string>) => {
    const allPermissions = getAllPermissions();
    return permissionNames.every(permissionName => allPermissions.some(permission => permission.name === permissionName));
}