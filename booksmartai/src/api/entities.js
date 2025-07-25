import { base44 } from './base44Client.js';

// Create entity classes that use backend functions
function createEntityClass(entityName) {
  return class {
    static async list(sort, limit) {
      return base44.entityOperation(entityName, 'list', { sort, limit });
    }

    static async filter(filters, sort, limit) {
      return base44.entityOperation(entityName, 'filter', { filters, sort, limit });
    }

    static async create(data) {
      return base44.entityOperation(entityName, 'create', { data });
    }

    static async update(id, data) {
      return base44.entityOperation(entityName, 'update', { id, data });
    }

    static async delete(id) {
      return base44.entityOperation(entityName, 'delete', { id });
    }

    // User-specific methods
    static async me() {
      if (entityName !== 'User') throw new Error('me() only available on User entity');
      return base44.authOperation('me');
    }

    static async updateMyUserData(userData) {
      if (entityName !== 'User') throw new Error('updateMyUserData() only available on User entity');
      return base44.authOperation('updateMyUserData', { userData });
    }

    static async logout() {
      if (entityName !== 'User') throw new Error('logout() only available on User entity');
      return base44.authOperation('logout');
    }

    static async login() {
      if (entityName !== 'User') throw new Error('login() only available on User entity');
      return base44.authOperation('login');
    }
  };
}

// Export all your entities
export const User = createEntityClass('User');
export const Business = createEntityClass('Business');
export const Appointment = createEntityClass('Appointment');
export const Advertisement = createEntityClass('Advertisement');
export const BusinessHours = createEntityClass('BusinessHours');
export const TimeSlot = createEntityClass('TimeSlot');
export const BusinessOwnerRequest = createEntityClass('BusinessOwnerRequest');
