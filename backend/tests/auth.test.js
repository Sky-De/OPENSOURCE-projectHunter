import { beforeAll, afterAll, expect, test } from 'vitest'
import { setupDatabase, teardownDatabase } from './setupDatabase'

beforeAll(async () => {
    await setupDatabase()
})

afterAll(async () => {
    await teardownDatabase()
})

test('should add 1 + 2 to be 3', () => {
    expect(1 + 2).toBe(3)
})
