export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  created_at: new Date().toISOString(),
  ...overrides,
});

export const createMockUserProfile = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  username: 'testuser',
  avatar_url: null,
  timezone: 'UTC',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

